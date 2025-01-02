import { Injectable } from "@nestjs/common";
import { IInsightProvider } from "src/domain/service/insight/ports/IInsightProvider";
import OpenAI from "openai";
import { GetInsightsInput } from "src/domain/service/insight/ports/input/get-insights.input";
import { GetInsightsOutput } from "src/domain/service/insight/ports/output/get-insights.output";

@Injectable()
export class OpenAiService implements IInsightProvider {
    private readonly openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async getInsights(transcriptions: GetInsightsInput[]): Promise<GetInsightsOutput[]> {
        
        const prompt = `Given a JSON structure representing a conversation with timecodes and text, group the timecodes into distinct segments based on conversational topics. For each segment, provide a concise insight summarizing what the conversation is about. Return the response as a JSON object with grouped time ranges and corresponding insights.\n\nInput JSON: \n${JSON.stringify(transcriptions, null, 2)}\n\nOutput JSON: \n${JSON.stringify({
            timeRange: "00:00:00 - 00:01:00",
            insight: "This segment is about...",
        })}`;

        try {
            const response = await this.openai.completions.create({
                model: "gpt-4o",
                prompt,
                max_tokens: 6000,
                temperature: 0.7,
            });

            const insights = JSON.parse(response.choices[0].text.trim());

            return insights.map((insight: any) => new GetInsightsOutput({
                timecode: insight.timeRange,
                text: insight.insight,
            }));
        } catch (error) {
            console.error("Error while generating insights:", error);
            throw new Error("Failed to generate insights from transcription.");
        }
    }
}
