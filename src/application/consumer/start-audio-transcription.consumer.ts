import { Processor } from "@nestjs/bullmq";
import { Inject } from "@nestjs/common";
import { Job } from "bullmq";
import { TranscriptionStatusEnum } from "src/domain/enum/transcription/TranscriptionStatusEnum";
import { ITranscriptionService } from "src/domain/service/transcription/ports/ITranscriptionService";

@Processor('start-audio-transcription')
export class StartAudioTranscriptionConsumer {
    constructor(@Inject('ITranscriptionService') private readonly transcriptionService: ITranscriptionService) {}

    async startAudioTranscription(job: Job<{
        transcriptionId: number,
        audioUrl: string,
        language: string
    }>): Promise<void> {
        const { data } = job;

        const transcription = await this.transcriptionService.findById(data?.transcriptionId);
        
        await this.transcriptionService.startTranscription(transcription?.id, data?.audioUrl, data?.language);

        await this.transcriptionService.update({
            ...transcription,
            status: TranscriptionStatusEnum.IN_PROGRESS
        });
    }
}