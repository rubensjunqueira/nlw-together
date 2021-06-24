import { getCustomRepository } from "typeorm";
import { Tag } from "../../entities/Tag";
import { TagsRepository } from "../../repositories/TagsRepository";
import { classToPlain } from 'class-transformer';

export class ListTagService {
    async execute(): Promise<Record<string, any>> {
        const repository = getCustomRepository(TagsRepository);

        const tags = await repository.find();

        return classToPlain(tags);
    }
}