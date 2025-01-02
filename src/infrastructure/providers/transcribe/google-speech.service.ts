import { SpeechClient } from "@google-cloud/speech";
import { Injectable } from "@nestjs/common";
import { ITranscribeProvider } from "src/domain/service/transcription/ports/ITranscriptionProvider";

@Injectable()
export class GoogleSpeechToTextService implements ITranscribeProvider {
    private readonly client: SpeechClient;

    constructor() {
        this.client = new SpeechClient();
    }

    async startTranscriptionJob(transcriptionId: number, audioUrl: string, language: string): Promise<any> {
        const audio = {
          uri: audioUrl,
        };
    
        const config = {
          encoding: 8, // MP3
          sampleRateHertz: 16000,
          languageCode: language,
          model: 'latest_long' // Better for long media files
        };
    
        const request = {
          audio,
          config,
        };
    
        try {
          await this.client.longRunningRecognize(request, {
            apiName: `TranscriptionJob-${transcriptionId}-${language}`,
          });
        } catch (error) {
          console.error('Error starting Google Speech-to-Text job:', error);
          throw error;
        }
      }
}