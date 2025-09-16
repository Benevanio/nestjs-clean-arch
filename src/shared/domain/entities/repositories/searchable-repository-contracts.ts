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
export interface ISearchableRepositoryContracts <E extends Entity, SearchInput, SearchOutput>
extends IRepositoriesContracts<E> {
  search(input: SearchInput): Promise<SearchOutput>;
}
