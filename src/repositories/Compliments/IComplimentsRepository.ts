import { ICreateComplimentDTO } from '../../DTOs/Compliments/ICreateComplimentDTO';
import { Compliment } from '../../entities/Compliment';

export interface IComplimentsRepository {
    create(data: ICreateComplimentDTO): Promise<Compliment>;
    findByUserSender(user_sender: string): Promise<Compliment[]>;
    findByUserReceiver(user_receiver: string): Promise<Compliment[]>;
}
