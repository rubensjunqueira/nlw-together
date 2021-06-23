import { Response, Request } from "express";
import { CreateTagService } from "../../services/Tags/CreateTagService";

export class CreateTagController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const createUserService = new CreateTagService();

        const createdTag = await createUserService.execute(name);

        return res.status(201).json(createdTag);
    }
}