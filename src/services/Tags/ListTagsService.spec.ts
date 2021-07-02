import { Tag } from "../../entities/Tag";
import { TagsRepositoryInMemory } from "../../repositories/Tags/inMemory/TagsRepositoryInMemory";
import { ITagsRepository } from "../../repositories/Tags/ITagsRepository";
import { ListTagService } from "./ListTagsService";

describe('ListTagsService', () => {
    let repositoryInMemory: ITagsRepository;
    let listTagsService: ListTagService;

    beforeEach(() => {
        repositoryInMemory = new TagsRepositoryInMemory();
        listTagsService = new ListTagService(repositoryInMemory);
    });

    it('should call list', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'list');

        await listTagsService.execute();

        expect(spy).toHaveBeenCalled();
    });

    it('should list return an array', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'list');

        await listTagsService.execute();

        expect(spy.mock.results[0].value).resolves.toBeInstanceOf(Array);
    });

    it('should return an array', async () => {
        const tags = await listTagsService.execute();

        expect(tags).toBeInstanceOf(Array);
    });

    it('should return an array of users', async () => {
        const data: Partial<Tag>[] = [
            {
                id: '2f4f278a-7366-5a28-b93f-477dadde7271',
                name: 'Motivação',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: '89ebc81f-c7ca-56b6-8a5d-9791c3363c3e',
                name: 'Ajuda',
                created_at: new Date(),
                updated_at: new Date()
            }
        ];

        jest.spyOn(repositoryInMemory, 'list')
            .mockImplementation(async () => {
                return data as Tag[];
            });

        const tags = await listTagsService.execute();

        expect(tags.length).toEqual(data.length);
        expect(tags).toEqual(data);
    });
});