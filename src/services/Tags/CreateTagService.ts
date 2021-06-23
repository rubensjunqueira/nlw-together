import { getCustomRepository } from "typeorm";
import { Tag } from "../../entities/Tag";
import { TagsRepository } from "../../repositories/TagsRepository";

export class CreateTagService {
    async execute(name: string): Promise<Tag> {
        if (!name || name.length === 0 ) throw new Error('Name must not be empty!')

        const repository = getCustomRepository(TagsRepository);

        const tagAlreadyExists = await repository.findOne({ name });

        if (tagAlreadyExists) throw new Error(`Tag ${name} already exists!`);

        const newTag = repository.create({ name });

        await repository.save(newTag);

        return newTag;
    }
}