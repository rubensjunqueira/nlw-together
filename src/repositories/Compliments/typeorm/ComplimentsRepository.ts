import { EntityRepository, Repository } from "typeorm";
import { ICreateComplimentDTO } from "../../../DTOs/Compliments/ICreateComplimentDTO";
import { Compliment } from "../../../entities/Compliment";
import { IComplimentsRepository } from "../IComplimentsRepository";

export class ComplimentsRepository implements IComplimentsRepository {
    private repository: Repository<Compliment>;

    async create(data: ICreateComplimentDTO): Promise<Compliment> {
        const newCompliment = this.repository.create(data);

        await this.repository.save(newCompliment);

        return newCompliment;
    }

    async findByUserSender(user_sender: string): Promise<Compliment[]> {
        return this.repository.find({ where: { user_sender } });
    }

    async findByUserReceiver(user_receiver: string): Promise<Compliment[]> {
        return this.repository.find({ where: { user_receiver } });
    }
}