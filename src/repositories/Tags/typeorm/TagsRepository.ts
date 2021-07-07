import { getRepository, Repository } from 'typeorm';

import { Tag } from '../../../entities/Tag';
import { ITagsRepository } from '../ITagsRepository';

export class TagsRepository implements ITagsRepository {
    private repository: Repository<Tag>;

    constructor() {
        this.repository = getRepository(Tag);
    }

    async list(): Promise<Tag[]> {
        return this.repository.find();
    }

    async create(name: string): Promise<Tag> {
        const newTag = this.repository.create({ name });

        await this.repository.save(newTag);

        return newTag;
    }

    find(id: string): Promise<Tag> {
        return this.repository.findOne(id);
    }

    findByName(name: string): Promise<Tag> {
        return this.repository.findOne({ name });
    }
}
