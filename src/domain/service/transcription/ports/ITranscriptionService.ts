import { CreateTranscriptionInput } from "./input/create-transcription.input";
import { Transcription } from "src/domain/model/Transcription";

export interface ITranscriptionService {
    findById(id: number): Promise<Transcription>;
    update(transcription: Partial<Transcription>): Promise<Transcription>;
    create(params: CreateTranscriptionInput): Promise<void>;
    startTranscription(transcriptionId: number, audioUrl: string, language: string): Promise<void>;
}