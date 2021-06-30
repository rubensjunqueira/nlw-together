import { inject, injectable } from "tsyringe";
import { Compliment } from "../../entities/Compliment";
import { IComplimentsRepository } from "../../repositories/Compliments/IComplimentsRepository";

@injectable()
export class ListUserSendedComplimentsService {
    constructor(
        @inject("ComplimentsRepository")
        private complimentsRepository: IComplimentsRepository
    ) { }

    async execute(user_id: string): Promise<Compliment[]> {
        const complimentsReceived = await this.complimentsRepository.
            findByUserSender(user_id);

        return complimentsReceived;
    }
}