import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../DTOs/Users/ICreateUserDTO';
import { User } from '../../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async list(): Promise<User[]> {
        return this.repository.find();
    }

    async create({
        name,
        email,
        password,
        admin = false,
    }: ICreateUserDTO): Promise<User> {
        const newUser = this.repository.create({
            name,
            email,
            password,
            admin,
        });

        await this.repository.save(newUser);

        return newUser;
    }

    async find(id: string): Promise<User> {
        return this.repository.findOne(id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ email });
    }
}
