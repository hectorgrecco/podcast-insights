export class Podcast {
    id?: number;
    name: string;
    language: string;
    feed: string;

    constructor(podcast: Podcast) {
        this.id = podcast.id;
        this.name = podcast.name;
        this.feed = podcast.feed;
        this.language = podcast.language;
    }
}