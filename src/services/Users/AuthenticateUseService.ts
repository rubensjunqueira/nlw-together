import { compare } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { IAuthenticateUserDTO } from "../../DTOs/Users/IAuthenticateUserDTO";
import { AppError } from "../../errors/AppError";
import { UsersRepository } from "../../repositories/UsersRepository";
import { sign } from 'jsonwebtoken';
import { IAuthenticateUserResponseDTO } from "../../DTOs/Users/IAuthenticateUserResponseDTO";
import { Auth } from "../../config/Auth";

export class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateUserDTO)
        : Promise<IAuthenticateUserResponseDTO> {
        const repository = getCustomRepository(UsersRepository);

        const user = await repository.findOne({ email });

        if (!user) throw new AppError('Email or password invalid!');


        const comparePassword = await compare(password, user.password);

        if (!comparePassword) throw new AppError('Email or password invalid!')


        const token = sign({ email: user.email }, Auth.secret, {
            expiresIn: Auth.expiresIn,
            subject: user.id
        });

        user.password = undefined;

        return {
            user,
            token
        };
    }
}