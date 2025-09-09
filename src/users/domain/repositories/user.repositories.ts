import { IRepositoriesContracts } from "@/shared/domain/entities/repositories/Irepositories-contracts";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends IRepositoriesContracts<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExists(email: string): Promise<void>;
}
