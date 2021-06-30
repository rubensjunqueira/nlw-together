import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateTagService } from "../../services/Tags/CreateTagService";

export class CreateTagController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const createTagService = container.resolve(CreateTagService);

        const createdTag = await createTagService.execute(name);

        return res.status(201).json(createdTag);
    }
}