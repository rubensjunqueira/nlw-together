import { getCustomRepository } from "typeorm";
import { Tag } from "../../entities/Tag";
import { AppError } from "../../errors/AppError";
import { TagsRepository } from "../../repositories/Tags/TagsRepository";

export class CreateTagService {
    async execute(name: string): Promise<Tag> {
        if (!name || name.length === 0 ) throw new AppError('Name must not be empty!')

        const repository = getCustomRepository(TagsRepository);

        const tagAlreadyExists = await repository.findOne({ name });

        if (tagAlreadyExists) throw new AppError(`Tag ${name} already exists!`);

        const newTag = repository.create({ name });

        await repository.save(newTag);

        return newTag;
    }
}