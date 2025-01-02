import { PodcastInsight } from "src/domain/model/PodcastInsight";

export interface IPodcastInsightService {
    create(insight: PodcastInsight): Promise<PodcastInsight>;
    findByPodcastId(id: number): Promise<PodcastInsight[]>;
}