import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  ISearchableRepositoryContracts
} from "@/shared/domain/entities/repositories/searchable-repository-contracts";
import { UserEntity } from "../entities/user.entity";

export namespace UserRepositories {
  export type Filter = string;
  export class SearchParams extends DefaultSearchParams<Filter> { }
  export class SearchResult extends DefaultSearchResult<UserEntity, Filter> { }
  export interface Repository
    extends ISearchableRepositoryContracts<
      UserEntity,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>;
    emailExists(email: string): Promise<void>;
  }
}
