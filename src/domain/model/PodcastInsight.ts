export class PodcastInsight {
    id?: string;
    podcastId: string;
    timecode: string;
    description: string;

    constructor(insight: PodcastInsight) {
        this.id = insight.id;
        this.podcastId = insight.podcastId;
        this.timecode = insight.timecode;
        this.description = insight.description;
    }
}