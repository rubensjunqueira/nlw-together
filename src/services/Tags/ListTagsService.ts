import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { ITagsRepository } from '../../repositories/Tags/ITagsRepository';

@injectable()
export class ListTagService {
    constructor(
        @inject('TagsRepository')
        private tagsRepository: ITagsRepository
    ) {}

    async execute(): Promise<Record<string, any>> {
        const tags = await this.tagsRepository.list();

        return classToPlain(tags);
    }
}
