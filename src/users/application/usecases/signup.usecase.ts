import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepositories } from "@/users/domain/repositories/user.repositories";
import { BadRequestError } from "../errors/bad-request-error";

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    createAt?: Date;
  };


  export class UseCase {
    constructor(
      private userReporsitory: UserRepositories.Repository
    ) { }
    async execute(input: Input): Promise<Output> {

      const { email, password, name } = input;

      if (!email || !password || !name) {
        throw new BadRequestError('Name, email and password are required');
      }

      const user = new UserEntity({ name, email, password });
      await this.userReporsitory.insert(user);
      const props = user.toJSON().props;
      return {
        id: user.id,
        name: props.name,
        email: props.email,
        password: props.password,
        createAt: props.createAt,
      };

    }
  }
}
