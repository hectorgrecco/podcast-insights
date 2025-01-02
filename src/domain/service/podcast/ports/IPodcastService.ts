import { Podcast } from "src/domain/model/Podcast";

export interface IPodcastService {
    search(query: string): Promise<Podcast[]>;
    findById(id: number): Promise<Podcast>;
    generateInsights(podcastId: number, episodeId: number): Promise<void>;
}