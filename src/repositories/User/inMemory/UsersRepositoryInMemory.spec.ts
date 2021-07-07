import { ICreateUserDTO } from '../../../DTOs/Users/ICreateUserDTO';
import { User } from '../../../entities/User';
import { UsersRepositoryInMemory } from './UsersRepositoryInMemory';

describe('UsersRepositoryInMemory', () => {
    let repository: UsersRepositoryInMemory;

    beforeEach(() => {
        repository = new UsersRepositoryInMemory();
    });

    it('should be to return an array of users', async () => {
        const users = await repository.list();

        expect(users).toBeInstanceOf(Array);
    });

    it('should be to return an array of users with length 0', async () => {
        const users = await repository.list();

        expect(users.length).toBe(0);
    });

    it('should be to return an array of users with objects of type User', async () => {
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

        jest.spyOn(repository, 'list').mockImplementation(async () => {
            return data;
        });

        const users = await repository.list();

        expect(users.length).toBe(data.length);
        expect(users[0]).toMatchObject(data[0]);
    });

    it('should be able to create a new user', async () => {
        const userData: ICreateUserDTO = {
            name: 'Anthony Andrews',
            email: 'mup@luum.mx',
            password: 'CR3MVm',
            admin: true,
        };

        const user = await repository.create(userData);

        expect(user).toBeInstanceOf(User);
        expect(user).toMatchObject(userData);
        expect(user).toHaveProperty('id', expect.any(String));
        expect(user).toHaveProperty('created_at', expect.any(Date));
        expect(user).toHaveProperty('updated_at', expect.any(Date));
    });

    it('should be create a new user with admin property with default value false', async () => {
        const userData: Partial<ICreateUserDTO> = {
            name: 'Anthony Andrews',
            email: 'mup@luum.mx',
            password: 'CR3MVm',
        };

        const user = await repository.create(userData as ICreateUserDTO);

        expect(user).toHaveProperty('admin', false);
    });

    it('should be find an user by Id', async () => {
        const userData: ICreateUserDTO = {
            name: 'Anthony Andrews',
            email: 'mup@luum.mx',
            password: 'CR3MVm',
            admin: true,
        };

        const createdUser = await repository.create(userData);

        const user = await repository.find(createdUser.id);

        expect(user).toEqual(createdUser);
    });

    it('should not be able to find an user by Id if id does not exists', async () => {
        const user = await repository.find(
            'f5358fd2-1796-57c2-a75d-78a580221fef'
        );

        expect(user).toBe(undefined);
    });

    it('should be find an user by email', async () => {
        const userData: ICreateUserDTO = {
            name: 'Bill Roberts',
            email: 'cezwa@geotiece.ci',
            password: 'CR3MVm',
            admin: true,
        };

        const createdUser = await repository.create(userData);

        const user = await repository.findByEmail(createdUser.email);

        expect(user).toEqual(createdUser);
    });
});
