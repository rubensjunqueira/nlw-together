import { User } from '../../entities/User';

export interface IAuthenticateUserResponseDTO {
    user: User;
    token: string;
}
