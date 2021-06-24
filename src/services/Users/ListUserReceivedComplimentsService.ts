import { getCustomRepository } from "typeorm";
import { Compliment } from "../../entities/Compliment";
import { ComplimentsRepository } from "../../repositories/ComplimentsRepository";

export class ListUserReceivedComplimentsService {
    async execute(user_id: string): Promise<Compliment[]> {
        const repository = getCustomRepository(ComplimentsRepository);

        const complimentsReceived = await repository.find({
            where: { user_receiver: user_id }
        });

        return complimentsReceived;
    }
}