import { Entity } from "../entity";

export interface IRepositoriesContracts<E extends Entity> {
  findById(id: string): Promise<E | null>;
  findAll(): Promise<E[]>;
  create(entity: E): Promise<E>;
  update(id: string, entity: E): Promise<E | null>;
  delete(id: string): Promise<boolean>;
}
