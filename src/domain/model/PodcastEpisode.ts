export class PodcastEpisode {
    id?: number;
    name: string;
    podcastId: number;
    audioUrl: string;

    constructor(episode: PodcastEpisode) {
        this.id = episode.id;
        this.name = episode.name;
        this.podcastId = episode.podcastId;
        this.audioUrl = episode.audioUrl;
    }
}