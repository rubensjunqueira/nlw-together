import { hash } from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../DTOs/Users/ICreateUserDTO';
import { EmailInvalidError } from '../../errors/EmailInvalidError';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { IUsersRepository } from '../../repositories/User/IUsersRepository';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        admin = false,
    }: ICreateUserDTO): Promise<Record<string, any>> {
        if (!email) {
            throw new EmailInvalidError();
        }

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError(`User ${email} already exists!`);
        }

        const hashedPassword = await hash(password, 8);

        const newUser = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            admin,
        });

        return classToPlain(newUser);
    }
}
