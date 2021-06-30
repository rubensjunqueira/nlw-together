import { container, delay } from 'tsyringe';
import { IComplimentsRepository } from '../repositories/Compliments/IComplimentsRepository';
import { ComplimentsRepository } from '../repositories/Compliments/typeorm/ComplimentsRepository';
import { ITagsRepository } from '../repositories/Tags/ITagsRepository';
import { TagsRepository } from '../repositories/Tags/typeorm/TagsRepository';
import { IUsersRepository } from '../repositories/User/IUsersRepository';
import { UsersRepository } from '../repositories/User/typeorm/UsersRepository';

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ITagsRepository>(
    "TagsRepository",
    TagsRepository
);

container.registerSingleton<IComplimentsRepository>(
    "ComplimentsRepository",
    ComplimentsRepository
);
