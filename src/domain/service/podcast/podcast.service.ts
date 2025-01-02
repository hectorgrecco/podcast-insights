import { Inject, Injectable } from "@nestjs/common";
import { Podcast } from "src/domain/model/Podcast";
import { IPodcastRepository } from "src/domain/repository/IPodcastRepository";
import { IPodcastService } from "src/domain/service/podcast/ports/IPodcastService";
import { ITranscriptionService } from "../transcription/ports/ITranscriptionService";
import { IPodcastEpisodeService } from "../episode/ports/IPodcastEpisodeService";
import { PodcastEpisode } from "src/domain/model/PodcastEpisode";

@Injectable()
export class PodcastService implements IPodcastService {
    constructor(
        @Inject('IPodcastRepository') private readonly podcastRepository: IPodcastRepository,
        @Inject('ITranscriptionService') private readonly transcriptionService: ITranscriptionService,
        @Inject('IPodcastEpisodeService') private readonly podcastEpisodeService: IPodcastEpisodeService
    ) {}

    async findById(id: number): Promise<Podcast> {
        const podcast = await this.podcastRepository.findById(id);
        if(!podcast) {
            throw new Error('Podcast not found.');
        }

        return podcast;
    }

    async search(query: string): Promise<Podcast[]> {
        const podcasts = await this.podcastRepository.findMany(query);
        return podcasts;
    }

    async listEpisodes(podcastId: number): Promise<PodcastEpisode[]> {
        const episodes = await this.podcastEpisodeService.findByPodcastId(podcastId);
        return episodes;
    }

    async generateInsights(podcastId: number, episodeId: number): Promise<void> {
        const podcast = await this.podcastRepository.findById(podcastId);
        if(!podcast) throw new Error('Podcast not found.');

        const episode = await this.podcastEpisodeService.findById(episodeId);
        if(!episode) throw new Error('Episode not found.');

        await this.transcriptionService.create({
            podcastId: podcast.id,
            episodeId: episode.id,
            audioUrl: episode.audioUrl,
            language: podcast.language
        });
    }
}