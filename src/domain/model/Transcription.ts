import { TranscriptionStatusEnum } from "../enum/transcription/TranscriptionStatusEnum";

export class Transcription {
    id?: number;
    podcastId: number;
    episodeId: number;
    audioUrl: string;
    status: TranscriptionStatusEnum;

    constructor(transcription: Transcription) {
        this.id = transcription.id;
        this.podcastId = transcription.podcastId;
        this.audioUrl = transcription.audioUrl;
        this.status = transcription.status;
    }
}