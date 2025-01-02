import { GetInsightsInput } from "./input/get-insights.input";
import { GetInsightsOutput } from "./output/get-insights.output";

export interface IInsightProvider {
    getInsights(transcriptions: GetInsightsInput[]): Promise<GetInsightsOutput[]>;
}