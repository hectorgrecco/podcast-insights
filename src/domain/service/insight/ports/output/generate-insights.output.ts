import { PodcastInsight } from "src/domain/model/PodcastInsight";

export class GenerateInsightsOutput {
    id?: string;
    timecode: string;
    description: string;

    constructor(insight: PodcastInsight) {
        this.id = insight.id;
        this.timecode = insight.timecode;
        this.description = insight.description;
    }
}