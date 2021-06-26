import { getCustomRepository } from "typeorm";
import { Compliment } from "../../entities/Compliment";
import { ComplimentsRepository } from "../../repositories/Compliments/ComplimentsRepository";

export class ListUserSendedComplimentsService {
    async execute(user_id: string): Promise<Compliment[]> {
        const repository = getCustomRepository(ComplimentsRepository);

        const complimentsSended = await repository.find({
            where: { user_sender: user_id }
        });

        return complimentsSended;
    }
}