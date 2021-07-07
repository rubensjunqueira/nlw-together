import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/User/IUsersRepository';

@injectable()
export class ListUsersService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository
    ) {}

    async execute(): Promise<Record<string, any>> {
        const users = await this.usersRepository.list();

        return classToPlain(users);
    }
}
