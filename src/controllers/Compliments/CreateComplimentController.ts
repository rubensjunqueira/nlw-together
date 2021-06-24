import { Request, Response } from "express";
import { CreateComplimentService } from "../../services/Compliments/CreateComplimentService";

export class CreateComplimentController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { user_sender, user_receiver, message, tag_id } = req.body;

        const createComplimentService = new CreateComplimentService();

        const createdCompliment = await createComplimentService.execute({
            user_sender,
            user_receiver,
            message,
            tag_id
        });

        return res.status(201).json(createdCompliment);
    }
}