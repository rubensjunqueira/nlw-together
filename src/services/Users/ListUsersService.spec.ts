import { User } from '../../entities/User';
import { UsersRepositoryInMemory } from '../../repositories/User/inMemory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/User/IUsersRepository';
import { ListUsersService } from './ListUsersService';

describe('ListUserService', () => {
    let repositoryInMemory: IUsersRepository;
    let listUsersService: ListUsersService;

    beforeEach(() => {
        repositoryInMemory = new UsersRepositoryInMemory();
        listUsersService = new ListUsersService(repositoryInMemory);
    });

    it('should call list', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'list');

        await listUsersService.execute();

        expect(spy).toHaveBeenCalled();
    });

    it('should list return an array', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'list');

        await listUsersService.execute();

        expect(spy.mock.results[0].value).resolves.toBeInstanceOf(Array);
    });

    it('should return an array', async () => {
        const users = await listUsersService.execute();

        expect(users).toBeInstanceOf(Array);
    });

    it('should return an array of users', async () => {
        const data: User[] = [
            {
                name: 'Eula Larson',
                email: 'pebsacvob@kihjo.cw',
                password: 'LFYza4',
                admin: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Nell Blair',
                email: 'if@goemho.gi',
                password: '0S4clW',
                admin: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        jest.spyOn(repositoryInMemory, 'list').mockImplementation(async () => {
            return data;
        });

        const users = await listUsersService.execute();

        expect(users.length).toEqual(data.length);
        expect(users).toEqual(data);
    });
});
