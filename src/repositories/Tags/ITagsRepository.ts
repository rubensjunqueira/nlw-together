import { Tag } from "../../entities/Tag";

export interface ITagsRepository {
    list(): Promise<Tag[]>
    create(name: string): Promise<Tag>
    find(id: string): Promise<Tag>
    findByName(name: string): Promise<Tag>
}