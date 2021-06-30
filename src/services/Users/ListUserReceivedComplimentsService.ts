import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { Compliment } from "../../entities/Compliment";
import { IComplimentsRepository } from "../../repositories/Compliments/IComplimentsRepository";

@injectable()
export class ListUserReceivedComplimentsService {
    constructor(
        @inject("ComplimentsRepository")
        private complimentsRepository: IComplimentsRepository
    ) { }

    async execute(user_id: string): Promise<Compliment[]> {
        const complimentsReceived = await this.complimentsRepository.
            findByUserReceiver(user_id);

        return complimentsReceived;
    }
}