import { PodcastInsight } from "src/domain/model/PodcastInsight";
import { GenerateInsightsOutput } from "./output/generate-insights.output";

export interface IInsightService {
    generate(transcriptionId: number): Promise<GenerateInsightsOutput[]>;
    findByPodcastId(id: number): Promise<PodcastInsight[]>;
}