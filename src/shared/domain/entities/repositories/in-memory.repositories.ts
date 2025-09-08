import { ValidatorFieldsInterface } from "@/shared/validators/validators-fields.interface";
import { NotFoundError } from "../../error/not-found-error";
import { Entity } from "../entity";
import { IRepositoriesContracts } from "./Irepositories-contracts";

export abstract class InMemoryRepositories<E extends Entity> implements IRepositoriesContracts<E> {
    private items: E[] = [];

    insert(entity: E): Promise<void> {
      this.items.push(entity);
      return Promise.resolve();
    }
    async findById(id: string): Promise<E | null> {
      const entity = this.items.find(item => item.id === id) || null;
      if (!entity) {
        throw new NotFoundError({ errors: ["Entity not found"] } as unknown as ValidatorFieldsInterface<any>);
      }
      return entity;
    }
    async findAll(): Promise<E[]> {
      if (this.items.length === 0) {
        throw new NotFoundError({ errors: ["No entities found"] } as unknown as ValidatorFieldsInterface<any>);
      }
      return this.items;
    }
    async update(entity: E): Promise<void> {
      const index = this.items.findIndex(item => item.id === entity.id);
      if (index === -1) {
        throw new NotFoundError({ errors: ["Entity not found"] } as unknown as ValidatorFieldsInterface<any>);
      }
      this.items[index] = entity;
    }
    async delete(id: string): Promise<void> {
      const entity = this.items.find(item => item.id === id);
      if (!entity) {
        throw new NotFoundError({ errors: ["Entity not found"] } as unknown as ValidatorFieldsInterface<any>);
      }
      this.items = this.items.filter(item => item.id !== id);
    }
    async _get(id: string): Promise<E | null> {
      const _id = `${id}`;

const entity = this.items.find(item => item.id === _id) || null;
   if (!entity) {
    throw new NotFoundError({ errors: ["Entity not found"] } as unknown as ValidatorFieldsInterface<any>);
    }
    return entity;
    }
}
