import { container, delay } from 'tsyringe';
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
