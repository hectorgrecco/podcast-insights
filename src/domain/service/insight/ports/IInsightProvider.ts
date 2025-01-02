import { PodcastInsight } from "src/domain/model/PodcastInsight";

export interface IInsightProvider {
    getInsights(transcriptionId: number): Promise<PodcastInsight[]>;
}