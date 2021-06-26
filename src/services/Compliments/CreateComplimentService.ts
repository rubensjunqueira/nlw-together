import { getCustomRepository } from "typeorm";
import { ICreateComplimentDTO } from "../../DTOs/Compliments/ICreateComplimentDTO";
import { Compliment } from "../../entities/Compliment";
import { AppError } from "../../errors/AppError";
import { ComplimentsRepository } from "../../repositories/Compliments/ComplimentsRepository";
import { UsersRepository } from "../../repositories/User/typeorm/UsersRepository";

export class CreateComplimentService {
    async execute({
        message,
        tag_id,
        user_receiver,
        user_sender
    }: ICreateComplimentDTO): Promise<Compliment> {
        const complimentRepository = getCustomRepository(ComplimentsRepository);
        const userRepository = getCustomRepository(UsersRepository);

        if (user_receiver === user_sender)
            throw new AppError('Receiver and Sender must be different!');

        const receiverExists = await userRepository.findOne(user_receiver);

        if (!receiverExists) throw new AppError('User receiver does not exists!');

        const newCompliment = complimentRepository.create({
            message,
            user_receiver,
            user_sender,
            tag_id
        });

        await complimentRepository.save(newCompliment);

        return newCompliment;
    }
}