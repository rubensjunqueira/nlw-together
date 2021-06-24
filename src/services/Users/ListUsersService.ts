import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/UsersRepository";
import { classToPlain } from 'class-transformer';

export class ListUsersService {
    async execute(): Promise<Record<string, any>> {
        const repository = getCustomRepository(UsersRepository);

        const users = await repository.find();

        return classToPlain(users);
    }
}