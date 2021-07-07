import { inject, injectable } from 'tsyringe';

import { ICreateComplimentDTO } from '../../DTOs/Compliments/ICreateComplimentDTO';
import { Compliment } from '../../entities/Compliment';
import { ReceiverAndSenderAreEqualError } from '../../errors/ReceiverAndSenderAreEqualError';
import { ReceiverNotExistsError } from '../../errors/ReceiverNotExistsError';
import { TagNotExistsError } from '../../errors/TagNotExistsError';
import { IComplimentsRepository } from '../../repositories/Compliments/IComplimentsRepository';
import { ITagsRepository } from '../../repositories/Tags/ITagsRepository';
import { IUsersRepository } from '../../repositories/User/IUsersRepository';

@injectable()
export class CreateComplimentService {
    constructor(
        @inject('ComplimentsRepository')
        private complimentsRepository: IComplimentsRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('TagsRepository')
        private tagsRepository: ITagsRepository
    ) {}

    async execute({
        message,
        tag_id,
        user_receiver,
        user_sender,
    }: ICreateComplimentDTO): Promise<Compliment> {
        if (user_receiver === user_sender)
            throw new ReceiverAndSenderAreEqualError();

        const tagExists = await this.tagsRepository.find(tag_id);

        if (!tagExists) throw new TagNotExistsError();

        const receiverExists = await this.usersRepository.find(user_receiver);

        if (!receiverExists) throw new ReceiverNotExistsError();

        const newCompliment = await this.complimentsRepository.create({
            message,
            user_receiver,
            user_sender,
            tag_id,
        });

        return newCompliment;
    }
}
