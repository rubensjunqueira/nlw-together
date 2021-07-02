import { Tag } from "../../entities/Tag";
import { InvalidTagNameError } from "../../errors/InvalidTagNameError";
import { TagAlreadyExistsError } from "../../errors/TagAlreadyExistsError";
import { TagsRepositoryInMemory } from "../../repositories/Tags/inMemory/TagsRepositoryInMemory";
import { ITagsRepository } from "../../repositories/Tags/ITagsRepository";
import { CreateTagService } from "./CreateTagService";

describe('CreateTagService', () => {
    let repositoryInMemory: ITagsRepository;
    let createTagService: CreateTagService;

    beforeEach(() => {
        repositoryInMemory = new TagsRepositoryInMemory();
        createTagService = new CreateTagService(repositoryInMemory);
    });

    it('should not be able to create a new tag if name is undefined', async () => {
        await expect(createTagService.execute(undefined))
            .rejects.toBeInstanceOf(InvalidTagNameError);
    });

    it('should not be able to create a new tag if name is empty', async () => {
        await expect(createTagService.execute(''))
            .rejects.toBeInstanceOf(InvalidTagNameError);
    });

    it('should call findByName', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'findByName');

        const name = 'Comprometimento';
        await createTagService.execute(name);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(name);
        expect(spy.mock.results[0].value).resolves.toEqual(undefined);
    });

    it('should not be able to create a new tag if tag already exists', async () => {
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

        jest.spyOn(repositoryInMemory, 'findByName')
            .mockImplementation(async (name: string) => {
                return data.find(x => x.name === name) as Tag;
            });

        await expect(createTagService.execute(data[0].name))
            .rejects.toBeInstanceOf(TagAlreadyExistsError);
    });

    it('should call create', async () => {
        const spy = jest.spyOn(repositoryInMemory, 'create');

        const name = 'Comprometimento';
        await createTagService.execute(name);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(name);
        expect(spy.mock.results[0].value).resolves.toMatchObject<Partial<Tag>>({
            id: expect.any(String),
            name,
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
        });
    });

    it('should be able to create an new tag', async () => {
        const name = 'Comprometimento';
        const tag = await createTagService.execute(name);

        expect(tag).toMatchObject<Partial<Tag>>({
            id: expect.any(String),
            name,
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
        });
    });
});