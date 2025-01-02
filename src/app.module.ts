import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.BULL_REDIS_HOST,
        port: +process.env.BULL_REDIS_PORT,
      },
    }),
    BullModule.registerQueue({
      name: 'audio-transcription'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
