import { Tag } from '../../../entities/Tag';
import { ITagsRepository } from '../ITagsRepository';

export class TagsRepositoryInMemory implements ITagsRepository {
    private repository: Tag[] = [];

    async list(): Promise<Tag[]> {
        return this.repository;
    }

    async create(name: string): Promise<Tag> {
        const newTag = new Tag();

        Object.assign(newTag, {
            name,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.repository.push(newTag);

        return newTag;
    }

    async find(id: string): Promise<Tag> {
        return this.repository.find((x) => x.id === id);
    }

    async findByName(name: string): Promise<Tag> {
        return this.repository.find((x) => x.name === name);
    }
}
