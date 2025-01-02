import { Inject, Injectable } from "@nestjs/common";
import { IInsightProvider } from "./ports/IInsightProvider";
import { IInsightRepository } from "./ports/IInsightRepository";
import { PodcastInsight } from "src/domain/model/PodcastInsight";
import { IInsightService } from "./ports/IInsightService";
import { GenerateInsightsOutput } from "./ports/output/generate-insights.output";

@Injectable()
export class InsightService implements IInsightService {
    constructor(
        @Inject('IInsightProvider') private readonly insightProvider: IInsightProvider,
        @Inject('IInsightRepository') private readonly insightRepository: IInsightRepository,
    ) {}

    async generate(transcriptionId: number): Promise<GenerateInsightsOutput[]> {
        const generatedInsights = await this.insightProvider.getInsights(transcriptionId);
        const insights = await this.insightRepository.createMany(generatedInsights);
        return insights.map(insight => new GenerateInsightsOutput(insight));
    }
    
    findByPodcastId(id: number): Promise<PodcastInsight[]> {
        throw new Error('Method not implemented.');
    }
}