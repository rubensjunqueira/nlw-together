import { ICreateUserDTO } from "../../../DTOs/Users/ICreateUserDTO";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    private repository: User[] = []

    async list(): Promise<User[]> {
        return this.repository;
    }

    async create({ name, email, password, admin = false }: ICreateUserDTO): Promise<User> {
        const newUser = new User();

        Object.assign<User, User>(newUser, {
            name,
            email,
            password,
            admin,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.repository.push(newUser);

        return newUser;
    }

    async find(id: string): Promise<User> {
        return this.repository.find(x => x.id === id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.find(x => x.email === email);
    }
}