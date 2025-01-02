import { PodcastInsight } from "src/domain/model/PodcastInsight";

export interface IInsightRepository {
    create(insight: PodcastInsight): Promise<PodcastInsight>;
    createMany(insights: PodcastInsight[]): Promise<PodcastInsight[]>;
    findByPodcastId(id: number): Promise<PodcastInsight[]>;
}