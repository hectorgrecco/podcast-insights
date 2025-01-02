import { PodcastEpisode } from "../model/PodcastEpisode";

export interface IPodcastEpisodeRepository {
    findByEpisodeId(episodeId: number): Promise<PodcastEpisode | null>;
    findByPodcastId(podcastId: number): Promise<PodcastEpisode[]>;
}