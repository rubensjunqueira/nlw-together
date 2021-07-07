import { ICreateComplimentDTO } from '../../../DTOs/Compliments/ICreateComplimentDTO';
import { Compliment } from '../../../entities/Compliment';
import { IComplimentsRepository } from '../IComplimentsRepository';

export class ComplimentsRepositoryInMemory implements IComplimentsRepository {
    private repository: Compliment[] = [];

    async create(data: ICreateComplimentDTO): Promise<Compliment> {
        const newCompliment = new Compliment();

        Object.assign(newCompliment, {
            user_receiver: data.user_receiver,
            user_sender: data.user_sender,
            tag_id: data.tag_id,
            message: data.message,
            created_at: new Date(),
        });

        this.repository.push(newCompliment);

        return newCompliment;
    }

    async findByUserSender(user_sender: string): Promise<Compliment[]> {
        return this.repository.filter((x) => x.user_sender === user_sender);
    }

    async findByUserReceiver(user_receiver: string): Promise<Compliment[]> {
        return this.repository.filter((x) => x.user_receiver === user_receiver);
    }
}
