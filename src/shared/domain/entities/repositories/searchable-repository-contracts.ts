
import { Entity } from "../entity";
import { IRepositoriesContracts } from "./Irepositories-contracts";

export type SortDirection = "asc" | "desc";

export  type SearchProps <Filter = string> = {
  page: number;
  perPage: number;
  sort?: string;
  sortDir?: SortDirection |  null;
  filter?: Filter | null;
};

export class SearchParams{
  protected _page: number;
  protected _perPage: number;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: string | null;

  constructor( props: SearchProps){
    this._page = props.page;
    this._perPage = props.perPage;
    this._sort = props.sort ?? null;
    this._sortDir = props.sortDir ?? null;
    this._filter = props.filter ?? null;
  }
  get page(){
    return this._page;
  }

  private set page(value: number){
    this._page = value;
  }

  get perPage(){
    return this._perPage;
  }

  private set perPage(value: number){
    this._perPage = value;
  }

  get sort(){
    return this._sort;
  }

  private set sort(value: string | null){
    this._sort = value;
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
  private set filter(value: string | null){
    this._filter = value;
  }
}
export interface ISearchableRepositoryContracts <E extends Entity, SearchInput, SearchOutput>
extends IRepositoriesContracts<E> {
  search(input: SearchInput): Promise<SearchOutput>;
}
