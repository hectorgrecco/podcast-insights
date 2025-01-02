import { Podcast } from "../model/Podcast";

export interface IPodcastRepository {
    create(podcast: Podcast): Promise<Podcast>;
    findById(id: number): Promise<Podcast | null>;
    findMany(name?: string): Promise<Podcast[]>;
    update(podcast: Podcast): Promise<Podcast>;
    delete(id: number): Promise<void>;
}