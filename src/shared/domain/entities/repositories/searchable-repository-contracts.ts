import { Entity } from "../entity";
import { IRepositoriesContracts } from "./Irepositories-contracts";

export type SortDirection = "asc" | "desc";

export  type SearchProps <Filter = string> = {
  page: number;
  perPage: number;
  sort?: string;
  sortDir?: SortDirection |  null;
  filter?: Filter | undefined;
};

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort?: string;
  readonly sortDir?: SortDirection | null;
  readonly filter?: Filter;

  constructor(props: {
    items: E[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    sort?: string;
    sortDir?: SortDirection | null;
    filter?: Filter;
  }) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = props.lastPage;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  toJSON(): Required<{
    items: E[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    sort: string | undefined;
    sortDir: SortDirection | null;
    filter: Filter | undefined;
  }> {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir ?? null,
      filter: this.filter,
    };
  }
}

export class SearchParams{
  protected _page: number;
  protected _perPage: number;
  protected _sort: string | undefined;
  protected _sortDir: SortDirection | null;
  protected _filter: string | undefined;

  constructor(props: SearchProps){
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort ?? undefined;
    this.sortDir = props.sortDir ?? null;
    this.filter = props.filter ?? undefined;
  }
  get page(){
    return this._page;
  }

  private set page(value: number){
   let _page = + value;
   if(isNaN(_page) || _page <= 0 || !Number.isInteger(_page)){
    _page = 1;
   }
   this._page = _page;
  }

  get perPage(){
    return this._perPage;
  }

  private set perPage(value: number){
    let _perPage = + value;
    if(isNaN(_perPage) || _perPage <= 0 || !Number.isInteger(_perPage)){
      _perPage = 15;
    }
    this._perPage = _perPage;
  }

  get sort(){
    return this._sort;
  }

  private set sort(value: string | undefined){
   let _sort = value?.trim();
    if(_sort === ""){
      _sort = undefined;
    }
    this._sort = _sort;
    this.sortDir = this._sortDir;
  }

  get sortDir(){
    return this._sortDir;
  }
  private set sortDir(value: SortDirection | null){
    if(this.sort){
      this._sortDir = value ?? "asc";
    }else{
      this._sortDir = null;
    }
  }

  get filter(){
    return this._filter;
  }
  private set filter(value: string | undefined){
    let _filter = value?.trim();
    if(_filter === ""){
      _filter = undefined;
    }
    this._filter = _filter;
  }
}
export interface ISearchableRepositoryContracts <
E extends Entity,
SearchInput = SearchParams,
SearchOutput = SearchResult<E>>
extends IRepositoriesContracts<E> {
  search(input: SearchInput): Promise<SearchOutput>;
}
