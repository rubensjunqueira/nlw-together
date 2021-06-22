import { ICreateUserDTO } from "../../DTOs/Users/ICreateUserDTO";
import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/UsersRepository";
import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";

export class CreateUserService {
    async execute({ name, email, password, admin }: ICreateUserDTO): Promise<User> {
        if (!email) {
            throw new Error('Email Incorrect!');
        }

        const repository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await repository.findOne({ where: { email } });

        if (userAlreadyExists) {
            throw new Error(`User ${email} already exists!`);
        }

        const hashedPassword = await hash(password, 8);

        const newUser = repository.create({
            name,
            email,
            password: hashedPassword,
            admin
        });

        await repository.save(newUser);

        return newUser;
    }
}