import { Entity } from "../entity";
import { IRepositoriesContracts } from "./Irepositories-contracts";

export interface ISearchableRepositoryContracts <E extends Entity, SearchInput, SearchOutput> extends IRepositoriesContracts<E> {
  search(input: SearchInput): Promise<SearchOutput>;
}
