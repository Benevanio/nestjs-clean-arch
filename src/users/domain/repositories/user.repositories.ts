import { ISearchableRepositoryContracts } from "@/shared/domain/entities/repositories/searchable-repository-contracts";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends ISearchableRepositoryContracts<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExists(email: string): Promise<void>;
}
