import { Entity } from "../entity";
import { InMemoryRepositories } from "./in-memory.repositories";
import { ISearchableRepositoryContracts, SearchParams, SearchResult, SortDirection } from "./searchable-repository-contracts";

export abstract class InMemorySearchableRepositories<E extends Entity>
  extends InMemoryRepositories<E>
  implements ISearchableRepositoryContracts<E, any, any> {
  [x: string]: any;


  async search(props: SearchParams<any>): Promise<SearchResult<E, any>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter ?? null);
    const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sortDir ?? null);
    const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.perPage);
    const total = itemsFiltered.length;
    const lastPage = Math.ceil(total / props.perPage);
    return new SearchResult({
      items: itemsPaginated,
      total,
      currentPage: props.page,
      perPage: props.perPage,
      lastPage,
      sort: props.sort,
      sortDir: props.sortDir ?? null,
      filter: props.filter,
    });
  };

  protected abstract applyFilter(
    items: E[],
    filter: string
      | null):
    Promise<E[]>;

  protected applySort(
    items: E[],
    sort: string | undefined,
    sortDir: SortDirection | null
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return Promise.resolve(items);
    }
    const sortedItems = [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDir === 'asc' ? -1 : 1;
      }
      if (a.props[sort] > b.props[sort]) {
        return sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return Promise.resolve(sortedItems);
  }

  protected applyPaginate(
    items: E[],
    page: SearchParams<any>['page'],
    perPage: SearchParams<any>['perPage'],
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return Promise.resolve(items.slice(start, end));
  }
}
