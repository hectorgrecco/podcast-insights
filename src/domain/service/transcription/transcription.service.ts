import { Inject, Injectable } from "@nestjs/common";
import { ITranscriptionService } from "./ports/ITranscriptionService";
import { ITranscriptionProvider } from "./ports/ITranscriptionProvider";
import { CreateTranscriptionInput } from "./ports/input/create-transcription.input";
import { ITranscriptionRepository } from "./ports/ITranscriptionRepository";
import { Transcription } from "src/domain/model/Transcription";
import { TranscriptionStatusEnum } from "src/domain/enum/transcription/TranscriptionStatusEnum";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";

@Injectable()
export class TranscriptionService implements ITranscriptionService {
    constructor(
        @Inject('ITranscriptionProvider') private readonly transcriptionProvider: ITranscriptionProvider,
        @Inject('ITranscriptionRepository') private readonly transcriptionRepository: ITranscriptionRepository,
        @InjectQueue('audio-transcription') private processAudioTranscriptionQueue: Queue
    ) {}

    async findById(id: number): Promise<Transcription> {
        const transcription = await this.transcriptionRepository.findById(id);
        if(!transcription) throw new Error('Transcription not found.');
        return transcription;
    }
0
    async create(params: CreateTranscriptionInput): Promise<void> {
        const transcription = await this.transcriptionRepository.create(params.toDomain(TranscriptionStatusEnum.PENDING));

        await this.processAudioTranscriptionQueue.add('audio-transcription', {
            transcriptionId: transcription.id,
            audioUrl: params.audioUrl,
            language: params.language
        })
    }

    async update(transcription: Partial<Transcription>): Promise<Transcription> {
        await this.findById(transcription.id);
        return this.transcriptionRepository.update(transcription);
    }

    async startTranscription(transcriptionId: number, audioUrl: string, language: string): Promise<void> {
        await this.transcriptionProvider.startTranscriptionJob(transcriptionId, audioUrl, language);
    }
}