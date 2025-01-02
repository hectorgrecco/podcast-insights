import { Inject, Injectable } from "@nestjs/common";
import { ITranscriptionService } from "./ports/ITranscriptionService";
import { ITranscriptionProvider } from "./ports/ITranscriptionProvider";
import { CreateTranscriptionInput } from "./ports/input/create-transcription.input";
import { ITranscriptionRepository } from "./ports/ITranscriptionRepository";
import { Transcription } from "src/domain/model/Transcription";
import { TranscriptionStatusEnum } from "src/domain/enum/transcription/TranscriptionStatusEnum";

@Injectable()
export class TranscriptionService implements ITranscriptionService {
    constructor(
        @Inject('ITranscriptionProvider') private readonly transcriptionProvider: ITranscriptionProvider,
        @Inject('ITranscriptionRepository') private readonly transcriptionRepository: ITranscriptionRepository
    ) {}
0
    async create(params: CreateTranscriptionInput): Promise<void> {
        const transcription = await this.transcriptionRepository.create(params.toDomain(TranscriptionStatusEnum.PENDING));
        await this.transcriptionProvider.startTranscriptionJob(transcription.id, params.audioUrl, params.language);
        await this.transcriptionRepository.update({
            ...transcription,
            status: TranscriptionStatusEnum.IN_PROGRESS
        });
    }
}