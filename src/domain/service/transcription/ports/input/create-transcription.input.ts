import { TranscriptionStatusEnum } from "src/domain/enum/transcription/TranscriptionStatusEnum";
import { Transcription } from "src/domain/model/Transcription";

export class CreateTranscriptionInput {
    podcastId: number;
    episodeId: number;
    audioUrl: string;
    language: string;

    constructor(input: CreateTranscriptionInput) {
        this.podcastId = input.podcastId;
        this.episodeId = input.episodeId;
        this.audioUrl = input.audioUrl;
        this.language = input.language;
    }

    toDomain?(status: TranscriptionStatusEnum): Transcription {
        return new Transcription({
            podcastId: this.podcastId,
            episodeId: this.episodeId,
            audioUrl: this.audioUrl,
            status
        });
    }
}