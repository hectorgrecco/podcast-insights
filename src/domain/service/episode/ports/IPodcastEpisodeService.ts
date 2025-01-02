import { PodcastEpisode } from "src/domain/model/PodcastEpisode";

export interface IPodcastEpisodeService {
    findById(id: number): Promise<PodcastEpisode | null>;
    findByPodcastId(id: number): Promise<PodcastEpisode[]>;
}