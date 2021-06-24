import { ICreateUserDTO } from "../../DTOs/Users/ICreateUserDTO";
import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/UsersRepository";
import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/AppError";

export class CreateUserService {
    async execute({ name, email, password, admin = false }: ICreateUserDTO): Promise<User> {
        if (!email) {
            throw new AppError('Email Incorrect!');
        }

        const repository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await repository.findOne({ email });

        if (userAlreadyExists) {
            throw new AppError(`User ${email} already exists!`);
        }

        const hashedPassword = await hash(password, 8);

        const newUser = repository.create({
            name,
            email,
            password: hashedPassword,
            admin
        });

        await repository.save(newUser);

        newUser.password = undefined;

        return newUser;
    }
}