import { ICreateUserDTO } from "../../DTOs/Users/ICreateUserDTO";
import { User } from "../../entities/User";

export interface IUsersRepository {
    list(): Promise<User[]>
    create({ name, email, password, admin }: ICreateUserDTO): Promise<User>
    find(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
}