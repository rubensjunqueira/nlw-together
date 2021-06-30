import { IAuthenticateUserDTO } from "../../DTOs/Users/IAuthenticateUserDTO";
import { ICreateUserDTO } from "../../DTOs/Users/ICreateUserDTO";
import { User } from "../../entities/User";
import { InvalidEmailOrPassword } from "../../errors/InvalidEmailrOrPassword";
import { UsersRepositoryInMemory } from "../../repositories/User/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/User/IUsersRepository";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { CreateUserService } from "./CreateUserService";

describe('ListUserService', () => {
    let repositoryInMemory: IUsersRepository;
    let authenticateUserService: AuthenticateUserService;
    let createUserService: CreateUserService;

    beforeEach(() => {
        repositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserService = new AuthenticateUserService(repositoryInMemory);
        createUserService = new CreateUserService(repositoryInMemory);
    });

    it('should not be able to authenticate an user if user is not found', async () => {
        const data: IAuthenticateUserDTO = {
            email: 'hefekwip@ma.ae',
            password: '1234'
        };

        await expect(authenticateUserService.execute(data))
            .rejects.toBeInstanceOf(InvalidEmailOrPassword);
    });

    it('should not be able to authenticate an user if password not compare', async () => {
        const dataCreatedUser: ICreateUserDTO = {
            email: 'hefekwip@ma.ae',
            password: '1234',
            name: 'Antonio Hodges',
            admin: false
        };

        await createUserService.execute(dataCreatedUser);

        await expect(authenticateUserService.execute({
            email: dataCreatedUser.email,
            password: '4321'
        })).rejects.toBeInstanceOf(InvalidEmailOrPassword);
    });

    it('should be able to authenticate an user if credentials are right', async () => {
        const dataCreatedUser: ICreateUserDTO = {
            email: 'hefekwip@ma.ae',
            password: '1234',
            name: 'Antonio Hodges',
            admin: false
        };

        await createUserService.execute(dataCreatedUser);

        const result = await authenticateUserService.execute({
            email: dataCreatedUser.email,
            password: dataCreatedUser.password
        });

        expect(result).toMatchObject({
            user: expect.objectContaining<Partial<User>>({
                id: expect.any(String),
                name: dataCreatedUser.name,
                email: dataCreatedUser.email,
                admin: dataCreatedUser.admin,
                created_at: expect.any(Date),
                updated_at: expect.any(Date)
            }),
            token: expect.any(String)
        })
    });
});