import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserReceivedComplimentsService } from "../../services/Users/ListUserReceivedComplimentsService";

export class ListUserReceivedComplimentsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req;

        const listUserReceivedComplimentsService =
            container.resolve(ListUserReceivedComplimentsService);

        const compliments = await listUserReceivedComplimentsService.execute(user_id);

        return res.status(compliments.length > 0 ? 200 : 204).json(compliments);
    }
}