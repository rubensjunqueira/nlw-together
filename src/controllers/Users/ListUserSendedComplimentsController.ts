import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserSendedComplimentsService } from "../../services/Users/ListUserSendedComplimentsService";

export class ListUserSendedComplimentsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req;

        const listUserSendedComplimentsService =
            container.resolve(ListUserSendedComplimentsService);

        const compliments = await listUserSendedComplimentsService.execute(user_id);

        return res.status(compliments.length > 0 ? 200 : 204).json(compliments);
    }
}