import { ICreateUserDTO } from "../../DTOs/Users/ICreateUserDTO";
import { hash } from "bcrypt";
import { AppError } from "../../errors/AppError";
import { IService } from "../IService";
import { IUsersRepository } from "../../repositories/User/IUsersRepository";
import { classToPlain } from "class-transformer";
import { EmailInvalidError } from "../../errors/EmailInvalidError";
import { UserAlreadyExists } from "../../errors/UserAlreadyExists";

export class CreateUserService implements IService<ICreateUserDTO, Record<string, any>> {
    constructor(private usersRepository: IUsersRepository) { }

    async execute({ name, email, password, admin = false }: ICreateUserDTO): Promise<Record<string, any>> {
        if (!email) {
            throw new EmailInvalidError('Email Incorrect!');
        }

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new UserAlreadyExists(`User ${email} already exists!`);
        }

        const hashedPassword = await hash(password, 8);

        const newUser = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            admin
        });

        return classToPlain(newUser);
    }
}