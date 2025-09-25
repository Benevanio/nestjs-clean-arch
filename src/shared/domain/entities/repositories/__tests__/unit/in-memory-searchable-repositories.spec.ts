import { Entity } from '@/shared/domain/entities/entity';
import { InMemorySearchableRepositories } from '../../in-memory-searchable-repositories';
import { SearchParams } from '../../searchable-repository-contracts';

type TestProps = { name: string; age: number };
class TestEntity extends Entity<TestProps> {
  constructor(props: TestProps, id?: string) {
    super(props, id);
  }
}

class TestRepo extends InMemorySearchableRepositories<TestEntity> {
  sortableFields = ['name', 'age'];
  protected async applyFilter(items: TestEntity[], filter: string | null): Promise<TestEntity[]> {
    if (!filter) return items;
    return items.filter(i => i.props.name.includes(filter));
  }
  public _applySort = this.applySort;
  public _applyPaginate = this.applyPaginate;
}

describe('InMemorySearchableRepositories', () => {
  let repo: TestRepo;
  let entities: TestEntity[];

  beforeEach(() => {
    repo = new TestRepo();
    entities = [
      new TestEntity({ name: 'Alice', age: 30 }),
      new TestEntity({ name: 'Bob', age: 25 }),
      new TestEntity({ name: 'Carol', age: 35 }),
    ];
    repo.items = entities;
  });

  it('should search and paginate results', async () => {
    const params = new SearchParams({ page: 1, perPage: 2, sort: 'name', sortDir: 'asc', filter: '' });
    const result = await repo.search(params);
    expect(result.items.length).toBe(2);
    expect(result.total).toBe(3);
    expect(result.lastPage).toBe(2);
    expect(result.items[0].props.name).toBe('Alice');
    expect(result.items[1].props.name).toBe('Bob');
  });

  it('should filter results', async () => {
    const params = new SearchParams({ page: 1, perPage: 10, sort: 'name', sortDir: 'asc', filter: 'Bob' });
    const result = await repo.search(params);
    expect(result.items.length).toBe(1);
    expect(result.items[0].props.name).toBe('Bob');
  });

  it('should sort descending', async () => {
    const params = new SearchParams({ page: 1, perPage: 10, sort: 'age', sortDir: 'desc', filter: '' });
    const result = await repo.search(params);
    expect(result.items[0].props.age).toBe(35);
    expect(result.items[2].props.age).toBe(25);
  });

  it('should not sort if sort field is not sortable', async () => {
    const params = new SearchParams({ page: 1, perPage: 10, sort: 'invalid', sortDir: 'asc', filter: '' });
    const result = await repo.search(params);
    expect(result.items).toEqual(entities);
  });

  it('should paginate correctly', async () => {
    const paginated = await repo._applyPaginate(entities, 2, 2);
    expect(paginated.length).toBe(1);
    expect(paginated[0].props.name).toBe('Carol');
  });

  it('should sort correctly with applySort', async () => {
    const sorted = await repo._applySort(entities, 'age', 'asc');
    expect(sorted[0].props.age).toBe(25);
    expect(sorted[2].props.age).toBe(35);
  });

  it('should return unsorted if sort is undefined', async () => {
    const sorted = await repo._applySort(entities, undefined, null);
    expect(sorted).toEqual(entities);
  });
});


describe("ApplyPaginate method", () => {
  let repo: TestRepo;
  let items: TestEntity[];

  beforeEach(() => {
    repo = new TestRepo();
    items = [
      new TestEntity({ name: 'Alice', age: 30 }),
      new TestEntity({ name: 'Bob', age: 25 }),
      new TestEntity({ name: 'Carol', age: 35 }),
      new TestEntity({ name: 'David', age: 28 }),
      new TestEntity({ name: 'Eve', age: 22 }),
    ];
  });

  it("should return the correct items for the first page", async () => {
    const page = 1;
    const perPage = 2;
    const result = await repo._applyPaginate(items, page, perPage);
    expect(result).toEqual([items[0], items[1]]);
  });

  it("should return the correct items for the second page", async () => {
    const page = 2;
    const perPage = 2;
    const result = await repo._applyPaginate(items, page, perPage);
    expect(result).toEqual([items[2], items[3]]);
  });
});
