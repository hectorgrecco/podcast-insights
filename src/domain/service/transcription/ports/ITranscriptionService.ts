import { CreateTranscriptionInput } from "./input/create-transcription.input";

export interface ITranscriptionService {
    create(params: CreateTranscriptionInput): Promise<void>;
}