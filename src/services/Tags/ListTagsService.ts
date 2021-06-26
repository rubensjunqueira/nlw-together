import { getCustomRepository } from "typeorm";
import { Tag } from "../../entities/Tag";
import { classToPlain } from 'class-transformer';
import { TagsRepository } from "../../repositories/Tags/TagsRepository";

export class ListTagService {
    async execute(): Promise<Record<string, any>> {
        const repository = getCustomRepository(TagsRepository);

        const tags = await repository.find();

        return classToPlain(tags);
    }
}