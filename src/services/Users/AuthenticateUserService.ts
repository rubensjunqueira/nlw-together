import { compare } from "bcrypt";
import { IAuthenticateUserDTO } from "../../DTOs/Users/IAuthenticateUserDTO";
import { sign } from 'jsonwebtoken';
import { IAuthenticateUserResponseDTO } from "../../DTOs/Users/IAuthenticateUserResponseDTO";
import { Auth } from "../../config/Auth";
import { IUsersRepository } from "../../repositories/User/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { InvalidEmailOrPassword } from "../../errors/InvalidEmailrOrPassword";

@injectable()
export class AuthenticateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IAuthenticateUserDTO)
        : Promise<IAuthenticateUserResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new InvalidEmailOrPassword();

        const comparePassword = await compare(password, user.password);

        if (!comparePassword) throw new InvalidEmailOrPassword();


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