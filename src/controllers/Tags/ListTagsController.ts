import { Request, Response } from "express";
import { ListTagService } from "../../services/Tags/ListTagsService";

export class ListTagsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listTagsService = new ListTagService();

        const tags = await listTagsService.execute();

        return res.status(tags.length > 0 ? 200 : 204).json(tags);
    }
}