
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
    createAt: Date;
  };


  export class UseCase {
    async execute(input: Input): Promise<Output> {

    }
  }
}
