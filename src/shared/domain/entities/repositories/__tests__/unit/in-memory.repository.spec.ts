import { NotFoundError } from "@/shared/domain/error/not-found-error";
import { Entity } from "../../../entity";
import { InMemoryRepositories } from "../../in-memory.repositories";


type TestProps = { name: string };
class TestEntity extends Entity<TestProps> {
  constructor(props: TestProps, id?: string) {
    super(props, id);
  }
}

class TestRepo extends InMemoryRepositories<TestEntity> {}

describe('InMemoryRepositories', () => {
  let repo: TestRepo;
  let entity: TestEntity;

  beforeEach(() => {
    repo = new TestRepo();
    entity = new TestEntity({ name: 'Test' });
  });

  it('should insert and find entity by id', async () => {
    await repo.insert(entity);
    const found = await repo.findById(entity.id);
    expect(found).toBe(entity);
  });

  it('should throw NotFoundError on findById if not found', async () => {
    await expect(repo.findById('invalid')).rejects.toThrow(NotFoundError);
  });

  it('should return all entities', async () => {
    await repo.insert(entity);
    const all = await repo.findAll();
    expect(all).toEqual([entity]);
  });

  it('should throw NotFoundError on findAll if empty', async () => {
    await expect(repo.findAll()).rejects.toThrow(NotFoundError);
  });

  it('should update entity', async () => {
    await repo.insert(entity);
    const updated = new TestEntity({ name: 'Updated' }, entity.id);
    await repo.update(updated);
    const found = await repo.findById(entity.id);
    expect(found).toBe(updated);
  });

  it('should throw NotFoundError on update if not found', async () => {
    const updated = new TestEntity({ name: 'Updated' }, 'invalid');
    await expect(repo.update(updated)).rejects.toThrow(NotFoundError);
  });

  it('should delete entity', async () => {
    await repo.insert(entity);
    await repo.delete(entity.id);
    await expect(repo.findById(entity.id)).rejects.toThrow(NotFoundError);
  });

  it('should throw NotFoundError on delete if not found', async () => {
    await expect(repo.delete('invalid')).rejects.toThrow(NotFoundError);
  });

  it('should _get entity by id', async () => {
    await repo.insert(entity);
    const found = await repo._get(entity.id);
    expect(found).toBe(entity);
  });

  it('should throw NotFoundError on _get if not found', async () => {
    await expect(repo._get('invalid')).rejects.toThrow(NotFoundError);
  });
});
