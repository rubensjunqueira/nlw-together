import { Response, Request } from "express";
import { CreateTagService } from "../../services/Tags/CreateTagService";

export class CreateTagController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const createTagService = new CreateTagService();

        const createdTag = await createTagService.execute(name);

        return res.status(201).json(createdTag);
    }
}