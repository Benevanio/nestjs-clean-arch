import { InMemoryRepositories } from "@/shared/domain/entities/repositories/in-memory.repositories";
import { ConflictError } from "@/shared/domain/error/conflict-error";
import { NotFoundError } from "@/shared/domain/error/not-found-error";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepositories } from "@/users/domain/repositories/user.repositories";


export class UserInMemoryRepository extends InMemoryRepositories<UserEntity>
  implements UserRepositories.Repository {
  search(input: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email);
    if (!entity) {
      throw new NotFoundError({ errors: { email: ["entity not found"] } } as any);
    }
    return Promise.resolve(entity);
  }
  emailExists(email: string): Promise<void> {
    const exists = this.items.some(item => item.email === email);
    if (exists) {
      throw new ConflictError({ errors: { email: ["Email already exists."] } } as any);
    }
    return Promise.resolve();
  }

}
