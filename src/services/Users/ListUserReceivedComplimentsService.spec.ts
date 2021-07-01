import { Compliment } from "../../entities/Compliment";
import { IComplimentsRepository } from "../../repositories/Compliments/IComplimentsRepository";
import { ComplimentsRepositoryInMemory } from "../../repositories/Compliments/inMemory/ComplimentsRepositoryInMemory";
import { ListUserReceivedComplimentsService } from "./ListUserReceivedComplimentsService";

describe('ListUserReceivedCompliment', () => {
    let repositoryInMemory: IComplimentsRepository;
    let listUserReceivedCompliments: ListUserReceivedComplimentsService;

    beforeEach(() => {
        repositoryInMemory = new ComplimentsRepositoryInMemory();
        listUserReceivedCompliments = new ListUserReceivedComplimentsService(repositoryInMemory);
    });

    it('should call findByUserReceiver', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'findByUserReceiver');

        const id = 'e0238e42-18b6-5b6f-8b2f-d28315fe9e62';

        await listUserReceivedCompliments.execute(id);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(id);
    });

    it('should return an array with of Compliments', async () => {
        const data: Partial<Compliment>[] = [
            {
                id: 'f4b194b8-6c4c-5735-bb61-7f65e82b7f38',
                message: 'Alguma coisa',
                tag_id: '3b87f75e-17ea-5d5c-9155-cf5921a9aa53',
                user_receiver: '0202d965-8f11-505e-9ed9-ffa3ba54a6a7',
                user_sender: '5935f234-4056-5220-9ef9-989427820325',
                created_at: new Date()
            },
            {
                id: 'ea3d4eac-54ef-5895-adfb-d5b4b4a74d17',
                message: 'Alguma coisa 2',
                tag_id: '3b87f75e-17ea-5d5c-9155-cf5921a9aa53',
                user_receiver: '0202d965-8f11-505e-9ed9-ffa3ba54a6a7',
                user_sender: '5935f234-4056-5220-9ef9-989427820325',
                created_at: new Date(),
            }
        ];

        jest.spyOn(repositoryInMemory, 'findByUserReceiver')
            .mockImplementation(async (user_receiver: string) => {
                return data.filter(x => x.user_receiver === user_receiver) as Compliment[];
            });

        const id = '0202d965-8f11-505e-9ed9-ffa3ba54a6a7';

        const compliments = await listUserReceivedCompliments.execute(id);

        expect(compliments).toEqual(data);
        expect(compliments.length).toEqual(data.length);
        expect(compliments[0]).toMatchObject<Partial<Compliment>>({
            id: expect.any(String),
            message: expect.any(String),
            tag_id: expect.any(String),
            user_receiver: expect.any(String),
            user_sender: expect.any(String),
            created_at: expect.any(Date)
        });
    });
});