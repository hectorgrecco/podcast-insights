import { Transcription } from "src/domain/model/Transcription";

export interface ITranscriptionRepository {
    create(transcription: Transcription): Promise<Transcription>;
    findById(id: number): Promise<Transcription | null>;
    update(transcription: Partial<Transcription>): Promise<Transcription>;
    delete(id: number): Promise<void>;
}