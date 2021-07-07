import { Tag } from '../../../entities/Tag';
import { TagsRepositoryInMemory } from './TagsRepositoryInMemory';

describe('TagsRepositoryInMemory', () => {
    let repository: TagsRepositoryInMemory;

    beforeEach(() => {
        repository = new TagsRepositoryInMemory();
    });

    it('should be to return an array of tags', async () => {
        const tags = await repository.list();

        expect(tags).toBeInstanceOf(Array);
    });

    it('should be to return an array of tags with length 0', async () => {
        const tags = await repository.list();

        expect(tags.length).toBe(0);
    });

    it('should be to return an array of tags with objects of type Tag', async () => {
        const resolveData: Partial<Tag>[] = [
            {
                id: '8a30c2b4-6267-5106-9377-f1f71bb0f09d',
                name: 'Ajuda',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '03260c6c-b4c5-5dca-8573-13d8769f2ee0',
                name: 'Motivação',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        jest.spyOn(repository, 'list').mockImplementation(async () => {
            return resolveData as Tag[];
        });

        const tags = await repository.list();

        expect(tags.length).toBe(resolveData.length);
        expect(tags[0]).toMatchObject(resolveData[0]);
    });

    it('should be able to create a new tag', async () => {
        const name = 'Ajuda';

        const tag = await repository.create(name);

        expect(tag).toBeInstanceOf(Tag);
        expect(tag).toMatchObject({ name });
        expect(tag).toHaveProperty('id', expect.any(String));
        expect(tag).toHaveProperty('created_at', expect.any(Date));
        expect(tag).toHaveProperty('updated_at', expect.any(Date));
    });

    it('should be find an tag by Id', async () => {
        const name = 'Ajuda';

        const createdTag = await repository.create(name);

        const tag = await repository.find(createdTag.id);

        expect(tag).toEqual(createdTag);
    });

    it('should not be able to find an tag by Id if id does not exists', async () => {
        const tag = await repository.find(
            'f5358fd2-1796-57c2-a75d-78a580221fef'
        );

        expect(tag).toBe(undefined);
    });

    it('should be find an tag by name', async () => {
        const name = 'Ajuda';

        const createdTag = await repository.create(name);

        const tag = await repository.findByName(createdTag.name);

        expect(tag).toEqual(createdTag);
    });
});
