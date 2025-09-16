import { Entity } from "../entity";
import { InMemoryRepositories } from "./in-memory.repositories";
import { ISearchableRepositoryContracts, SearchParams, SearchResult, SortDirection } from "./searchable-repository-contracts";

 export abstract class InMemorySearchableRepositories<E extends Entity>
 extends InMemoryRepositories<E>
 implements ISearchableRepositoryContracts<E, any, any> {


 async  search(props: SearchParams): Promise<SearchResult<E>> {
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
  |  null):
  Promise<E[]>;

  protected abstract applySort(
  items: E[],
  sort: string | undefined,
  sortDir: SortDirection | null
): Promise<E[]>;

  protected abstract applyPaginate(
  items: E[],
  page: number,
  perPage: number
): Promise<E[]>;


}
