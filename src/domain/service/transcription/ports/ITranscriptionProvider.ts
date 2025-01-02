export interface ITranscriptionProvider {
    startTranscriptionJob(transcriptionId: number, audioUrl: String, language: string): Promise<void>;
}