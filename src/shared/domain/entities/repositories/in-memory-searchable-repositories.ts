import { Entity } from "../entity";
import { InMemoryRepositories } from "./in-memory.repositories";
import { ISearchableRepositoryContracts } from "./searchable-repository-contracts";

 export abstract class InMemorySearchableRepositories<E extends Entity>
 extends InMemoryRepositories<E>
 implements ISearchableRepositoryContracts<E, any, any> {


 search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
 };

}
