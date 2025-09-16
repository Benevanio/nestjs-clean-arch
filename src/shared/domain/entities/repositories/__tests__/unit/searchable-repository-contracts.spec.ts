import { SearchParams } from '../../searchable-repository-contracts';

describe('SearchParams', () => {
  it('should set all properties from constructor', () => {
    const params = new SearchParams({
      page: 2,
      perPage: 20,
      sort: 'name',
      sortDir: 'desc',
      filter: 'test',
    });
    expect(params.page).toBe(2);
    expect(params.perPage).toBe(20);
    expect(params.sort).toBe('name');
    expect(params.sortDir).toBe('desc');
    expect(params.filter).toBe('test');
  });

  it('should trim and handle empty sort and filter', () => {
    const params = new SearchParams({
      page: 1,
      perPage: 10,
      sort: '   ',
      sortDir: null,
      filter: '   ',
    });
    expect(params.sort).toBeUndefined();
    expect(params.filter).toBeUndefined();
  });


  it('should set sortDir to null if sort is not present', () => {
    const params = new SearchParams({
      page: 1,
      perPage: 10,
      sort: undefined,
      sortDir: 'desc',
      filter: undefined,
    });
    // @ts-ignore
    params.sort = undefined;
    // @ts-ignore
    params.sortDir = 'desc';
    expect(params.sortDir).toBeNull();
  });

  it('should set page and perPage using private setters', () => {
    const params = new SearchParams({
      page: 1,
      perPage: 10,
      sort: undefined,
      sortDir: null,
      filter: undefined,
    });
    // @ts-ignore
    params.page = 0;
    expect(params.page).toBe(1);
    // @ts-ignore
    params.page = 3;
    expect(params.page).toBe(3);
    // @ts-ignore
    params.perPage = -5;
    expect(params.perPage).toBe(15);
    // @ts-ignore
    params.perPage = 7;
    expect(params.perPage).toBe(7);
  });

  it('should set filter using private setter', () => {
    const params = new SearchParams({
      page: 1,
      perPage: 10,
      sort: undefined,
      sortDir: null,
      filter: undefined,
    });
    // @ts-ignore
    params.filter = '   ';
    expect(params.filter).toBeUndefined();
    // @ts-ignore
    params.filter = 'abc';
    expect(params.filter).toBe('abc');
  });
});
