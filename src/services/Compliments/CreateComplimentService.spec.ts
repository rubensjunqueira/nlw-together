import { ICreateComplimentDTO } from "../../DTOs/Compliments/ICreateComplimentDTO";
import { Tag } from "../../entities/Tag";
import { User } from "../../entities/User";
import { ReceiverAndSenderAreEqualError } from "../../errors/ReceiverAndSenderAreEqualError";
import { ReceiverNotExists } from "../../errors/ReceiverNotExists";
import { TagNotExists } from "../../errors/TagNotExists";
import { IComplimentsRepository } from "../../repositories/Compliments/IComplimentsRepository";
import { ComplimentsRepositoryInMemory } from "../../repositories/Compliments/inMemory/ComplimentsRepositoryInMemory";
import { TagsRepositoryInMemory } from "../../repositories/Tags/inMemory/TagsRepositoryInMemory";
import { ITagsRepository } from "../../repositories/Tags/ITagsRepository";
import { UsersRepositoryInMemory } from "../../repositories/User/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/User/IUsersRepository";
import { CreateComplimentService } from "./CreateComplimentService";

describe('CreateComplimentService', () => {
    let usersRepositoryInMemory: IUsersRepository
    let complimentsRepositoryInMemory: IComplimentsRepository
    let tagsRepositoryInMemory: ITagsRepository
    let createComplimentService: CreateComplimentService

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        complimentsRepositoryInMemory = new ComplimentsRepositoryInMemory();
        tagsRepositoryInMemory = new TagsRepositoryInMemory();
        createComplimentService = new CreateComplimentService(
            complimentsRepositoryInMemory,
            usersRepositoryInMemory,
            tagsRepositoryInMemory
        );
    });

    it('should not be able to create a new compliment if users_sender is equal user_receiver', async () => {
        await expect(createComplimentService.execute({
            message: 'Alguma mensagem',
            tag_id: 'dca36068-e9c5-549d-aba2-6b6c742a07ae',
            user_receiver: '64521262-5a99-5b54-a3f2-5956557d5977',
            user_sender: '64521262-5a99-5b54-a3f2-5956557d5977'
        })).rejects.toBeInstanceOf(ReceiverAndSenderAreEqualError);
    });

    it('should not be able to create a new compliment if tag does not exists', async () => {
        await expect(createComplimentService.execute({
            message: 'Alguma mensagem',
            tag_id: 'dca36068-e9c5-549d-aba2-6b6c742a07ae',
            user_receiver: '64521262-5a99-5b54-a3f2-5956557d5977',
            user_sender: '0d92f057-9235-592a-b335-054f704c5290'
        })).rejects.toBeInstanceOf(TagNotExists);
    });

    it('should not be able to create a new compliment if user_receiver does not exists', async () => {
        const tags: Partial<Tag>[] = [
            {
                id: '983d487f-d4a3-532f-bd53-a1f16b5b3014',
                name: 'Ajuda',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '4f0307b2-2108-5ca6-8a8b-5cbd56538df1',
                name: 'Motivação',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];

        jest.spyOn(tagsRepositoryInMemory, 'find').mockImplementation(async (id: string) => {
            return tags.find(x => x.id === id) as Tag;
        });

        await expect(createComplimentService.execute({
            message: 'Alguma mensagem',
            tag_id: '983d487f-d4a3-532f-bd53-a1f16b5b3014',
            user_receiver: '64521262-5a99-5b54-a3f2-5956557d5977',
            user_sender: '0d92f057-9235-592a-b335-054f704c5290'
        })).rejects.toBeInstanceOf(ReceiverNotExists);
    });

    it('should be able to create an new compliment', async () => {
        const tags: Partial<Tag>[] = [
            {
                id: '983d487f-d4a3-532f-bd53-a1f16b5b3014',
                name: 'Ajuda',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '4f0307b2-2108-5ca6-8a8b-5cbd56538df1',
                name: 'Motivação',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];

        jest.spyOn(tagsRepositoryInMemory, 'find').mockImplementation(async (id: string) => {
            return tags.find(x => x.id === id) as Tag;
        });

        const users: Partial<User>[] = [
            {
                id: '983d487f-d4a3-532f-bd53-a1f16b5b3014',
                name: 'Ora Keller',
                email: 'wiku@fudwucvu.mv',
                password: 'TXMLx8',
                admin: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '8e821956-3e05-5eb0-9d35-a8e9d9227ba2',
                name: 'Adelaide Williamson',
                email: 'tuldo@agada.bb',
                password: 'JgHtdX',
                admin: true,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];

        jest.spyOn(usersRepositoryInMemory, 'find').mockImplementation(async (id: string) => {
            return users.find(x => x.id === id) as User;
        });

        const data: ICreateComplimentDTO = {
            message: 'Me ajudou muito',
            tag_id: tags[0].id,
            user_receiver: users[0].id,
            user_sender: users[1].id
        };

        const compliment = await createComplimentService.execute(data);

        expect(compliment).toMatchObject({
            id: expect.any(String),
            message: data.message,
            tag_id: data.tag_id,
            user_receiver: data.user_receiver,
            user_sender: data.user_sender,
            created_at: expect.any(Date),
        });
    });
});