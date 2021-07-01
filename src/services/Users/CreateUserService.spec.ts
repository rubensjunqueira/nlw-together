import { ICreateUserDTO } from "../../DTOs/Users/ICreateUserDTO";
import { User } from "../../entities/User";
import { EmailInvalidError } from "../../errors/EmailInvalidError";
import { UserAlreadyExists } from "../../errors/UserAlreadyExists";
import { UsersRepositoryInMemory } from "../../repositories/User/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/User/IUsersRepository";
import { CreateUserService } from "./CreateUserService";

describe('CreateUserService', () => {
    let repositoryInMemory: IUsersRepository;
    let createUserService: CreateUserService;

    beforeEach(() => {
        repositoryInMemory = new UsersRepositoryInMemory();
        createUserService = new CreateUserService(repositoryInMemory);
    });

    it('should not be able to create an new user if email is undefined', async () => {
        const userData: Partial<ICreateUserDTO> = {
            name: 'Alexander Rose',
            password: 'Uqs3NR',
        };

        await expect(createUserService.execute(userData as ICreateUserDTO))
            .rejects.toBeInstanceOf(EmailInvalidError);
    });

    it('should call repository findByEmail with already exists email', async () => {
        const resolveData: User[] = [
            {
                name: 'Alexander Rose',
                email: 'nusdelmoc@utiefa.gp',
                password: 'Uqs3NR',
                admin: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Howard Gray',
                email: 'su@kag.la',
                password: 'DxKETO',
                admin: true,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]

        const spy = jest.spyOn(repositoryInMemory, 'findByEmail')
            .mockImplementation((email: string) => {
                return Promise.resolve(resolveData.find(x => x.email === email));
            });

        await expect(createUserService.execute(resolveData[0]))
            .rejects.toBeInstanceOf(UserAlreadyExists);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(resolveData[0].email);
        expect(spy.mock.results[0].value).resolves.toEqual(resolveData[0]);

        spy.mockRestore();
    });

    it('should call repository findByEmail', async () => {
        const userData: ICreateUserDTO = {
            name: 'Alexander Rose',
            password: 'Uqs3NR',
            email: 'viruweli@wa.dj',
            admin: true
        };

        const resolveData: User[] = [
            {
                name: 'Alexander Rose',
                email: 'nusdelmoc@utiefa.gp',
                password: 'Uqs3NR',
                admin: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Howard Gray',
                email: 'su@kag.la',
                password: 'DxKETO',
                admin: true,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]

        const spy = jest.spyOn(repositoryInMemory, 'findByEmail')
            .mockImplementation((email: string) => {
                return Promise.resolve(resolveData.find(x => x.email === email));
            });

        await createUserService.execute(userData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userData.email);

        spy.mockRestore();
    });

    it('should call create', async () => {
        const userData: ICreateUserDTO = {
            name: 'Richard Patterson',
            password: '123456',
            email: 'cuf@doko.uy',
            admin: false
        };

        const spy = jest.spyOn(repositoryInMemory, 'create');

        await createUserService.execute(userData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
            ...userData,
            password: expect.not.stringMatching(userData.password)
        });
        expect(spy.mock.results[0].value).resolves.toMatchObject({
            ...userData,
            password: expect.not.stringMatching(userData.password)
        });
        expect(spy.mock.results[0].value).resolves.toHaveProperty("id", expect.any(String));
        expect(spy.mock.results[0].value).resolves.toHaveProperty("created_at", expect.any(Date));
        expect(spy.mock.results[0].value).resolves.toHaveProperty("updated_at", expect.any(Date));
    });

    it('should be able to create a new user', async () => {
        const userData: ICreateUserDTO = {
            name: 'Lola Gibson',
            email: 'islodih@galuwu.au',
            password: '123456',
            admin: false
        };

        const user = await createUserService.execute(userData);

        expect(user).toMatchObject<Partial<User>>({
            id: expect.any(String),
            name: userData.name,
            email: userData.email,
            admin: userData.admin,
            created_at: expect.any(Date),
            updated_at: expect.any(Date)
        });
    });
});