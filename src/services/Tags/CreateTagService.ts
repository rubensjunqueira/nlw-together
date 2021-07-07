import { inject, injectable } from 'tsyringe';

import { Tag } from '../../entities/Tag';
import { InvalidTagNameError } from '../../errors/InvalidTagNameError';
import { TagAlreadyExistsError } from '../../errors/TagAlreadyExistsError';
import { ITagsRepository } from '../../repositories/Tags/ITagsRepository';

@injectable()
export class CreateTagService {
    constructor(
        @inject('TagsRepository') private tagsRepository: ITagsRepository
    ) {}

    async execute(name: string): Promise<Tag> {
        if (!name || name.length === 0) throw new InvalidTagNameError();

        const tagAlreadyExists = await this.tagsRepository.findByName(name);

        if (tagAlreadyExists)
            throw new TagAlreadyExistsError(`Tag ${name} already exists!`);

        const newTag = await this.tagsRepository.create(name);

        return newTag;
    }
}
