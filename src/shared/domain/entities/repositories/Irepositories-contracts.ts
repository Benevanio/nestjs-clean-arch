import { Entity } from "../entity";

export interface IRepositoriesContracts<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E | null>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}
