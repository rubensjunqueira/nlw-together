import { ICreateComplimentDTO } from '../../../DTOs/Compliments/ICreateComplimentDTO';
import { Compliment } from '../../../entities/Compliment';
import { ComplimentsRepositoryInMemory } from './ComplimentsRepositoryInMemory';

describe('ComplimentsRepositoryInMemory', () => {
    let repository: ComplimentsRepositoryInMemory;

    beforeAll(() => {
        repository = new ComplimentsRepositoryInMemory();
    });

    it('should be able to create a new user', async () => {
        const complimentData: ICreateComplimentDTO = {
            message: 'Alguma coisa',
            tag_id: 'd222e73f-7a46-5883-9f59-b5ac2b9fe7ef',
            user_receiver: '5181a79c-5ef4-5261-b281-77de6b6516e2',
            user_sender: '0f6f9f1c-201a-5109-80d6-282825fdefed',
        };

        const compliment = await repository.create(complimentData);

        expect(compliment).toBeInstanceOf(Compliment);
        expect(compliment).toMatchObject(complimentData);
        expect(compliment).toHaveProperty('id', expect.any(String));
        expect(compliment).toHaveProperty('created_at', expect.any(Date));
    });

    it('should be able to find compliments by user_receiver', async () => {
        const commonUserReceiver = 'c47a15b1-657a-5164-bb6e-2039ff1e578a';

        const resolveData: Partial<Compliment>[] = [
            {
                id: '5d8ddebf-81a6-5005-b0e2-2c56a0427da5',
                tag_id: 'c920d992-1262-5f00-8e8f-7e9a8fe8ee0f',
                user_receiver: commonUserReceiver,
                user_sender: '99c110d9-e932-52ca-87e4-e8771be5352d',
                message: 'Alguma coisa',
                created_at: new Date(),
            },
            {
                id: 'fa93ff34-30cc-5266-8eee-5b7dfa249df2',
                tag_id: '31056ea9-eda3-5f80-9b7c-80f287f2cce9',
                user_receiver: commonUserReceiver,
                user_sender: '6cba8ff3-d692-5211-ae8c-e559012632ef',
                message: 'Alguma coisa 1',
                created_at: new Date(),
            },
            {
                id: 'fa93ff34-30cc-5266-8eee-5b7dfa249df2',
                tag_id: '31056ea9-eda3-5f80-9b7c-80f287f2cce9',
                user_receiver: '093ea4b9-6086-53dc-b8bc-227591bcf351',
                user_sender: '6cba8ff3-d692-5211-ae8c-e559012632ef',
                message: 'Alguma coisa 2',
                created_at: new Date(),
            },
        ];

        jest.spyOn(repository, 'findByUserReceiver').mockImplementation(
            async (user_receiver: string) => {
                return resolveData.filter(
                    (x) => x.user_receiver === user_receiver
                ) as Compliment[];
            }
        );

        const compliments = await repository.findByUserReceiver(
            commonUserReceiver
        );

        expect(compliments.length).toBe(2);
        compliments.forEach((x) => {
            expect(x.user_receiver).toEqual(commonUserReceiver);
        });
    });

    it('should be able to find compliments by user_sender', async () => {
        const commonUserSender = '6cba8ff3-d692-5211-ae8c-e559012632ef';

        const resolveData: Partial<Compliment>[] = [
            {
                id: '5d8ddebf-81a6-5005-b0e2-2c56a0427da5',
                tag_id: 'c920d992-1262-5f00-8e8f-7e9a8fe8ee0f',
                user_receiver: '1fe5fec5-8203-54a5-90f6-893d03b41328',
                user_sender: '99c110d9-e932-52ca-87e4-e8771be5352d',
                message: 'Alguma coisa',
                created_at: new Date(),
            },
            {
                id: 'fa93ff34-30cc-5266-8eee-5b7dfa249df2',
                tag_id: '31056ea9-eda3-5f80-9b7c-80f287f2cce9',
                user_receiver: '6c55fb15-85ff-5709-b69b-c6e69b24b05a',
                user_sender: commonUserSender,
                message: 'Alguma coisa 1',
                created_at: new Date(),
            },
            {
                id: 'fa93ff34-30cc-5266-8eee-5b7dfa249df2',
                tag_id: '31056ea9-eda3-5f80-9b7c-80f287f2cce9',
                user_receiver: '093ea4b9-6086-53dc-b8bc-227591bcf351',
                user_sender: commonUserSender,
                message: 'Alguma coisa 2',
                created_at: new Date(),
            },
        ];

        jest.spyOn(repository, 'findByUserSender').mockImplementation(
            async (user_sender: string) => {
                return resolveData.filter(
                    (x) => x.user_sender === user_sender
                ) as Compliment[];
            }
        );

        const compliments = await repository.findByUserSender(commonUserSender);

        expect(compliments.length).toBe(2);
        compliments.forEach((x) => {
            expect(x.user_sender).toEqual(commonUserSender);
        });
    });
});
