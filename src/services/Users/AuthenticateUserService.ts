import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { Auth } from '../../config/Auth';
import { IAuthenticateUserDTO } from '../../DTOs/Users/IAuthenticateUserDTO';
import { IAuthenticateUserResponseDTO } from '../../DTOs/Users/IAuthenticateUserResponseDTO';
import { InvalidEmailOrPasswordError } from '../../errors/InvalidEmailrOrPasswordError';
import { IUsersRepository } from '../../repositories/User/IUsersRepository';

@injectable()
export class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        email,
        password,
    }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new InvalidEmailOrPasswordError();

        const comparePassword = await compare(password, user.password);

        if (!comparePassword) throw new InvalidEmailOrPasswordError();

        const token = sign({ email: user.email }, Auth.secret, {
            expiresIn: Auth.expiresIn,
            subject: user.id,
        });

        user.password = undefined;

        return {
            user,
            token,
        };
    }
}
