import { LanguageCode, StartTranscriptionJobCommand, StartTranscriptionJobCommandInput, TranscribeClient } from "@aws-sdk/client-transcribe";
import { ITranscribeProvider } from "src/domain/service/transcription/ports/ITranscriptionProvider";

export class AwsTranscribeService implements ITranscribeProvider {
    private readonly client: TranscribeClient;

    constructor() {
        this.client = new TranscribeClient({ region: process.env.AWS_REGION });
    }

    async startTranscriptionJob(transcriptionId: number, audioUrl: string, language: string): Promise<void> {
        const params: StartTranscriptionJobCommandInput = {
            TranscriptionJobName: `TranscriptionJob-${transcriptionId}-${language}`,
            LanguageCode: language as LanguageCode,
            Media: {
                MediaFileUri: audioUrl,
            },
            OutputBucketName: process.env.AUDIO_TRANSCRIPTIONS_BUCKET_NAME,
        };
    
        try {
            const command = new StartTranscriptionJobCommand(params);
            await this.client.send(command);
          } catch (error) {
            console.error('Error starting AWS transcription job:', error);
            throw error;
          }
    }
}