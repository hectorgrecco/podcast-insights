import { PodcastInsight } from "../model/PodcastInsight";

export interface IPodcastInsightRepository {
    create(insight: PodcastInsight): Promise<PodcastInsight>;
    findByPodcastId(podcastId: number): Promise<PodcastInsight[]>;
}