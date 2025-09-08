import { Entity } from "../entity";
import { IRepositoriesContracts } from "./Irepositories-contracts";

export abstract class InMemoryRepositories<E extends Entity> implements IRepositoriesContracts<E> {
    private items: E[] = [];

    insert(entity: E): Promise<void> {
      this.items.push(entity);
      return Promise.resolve();
    }
    findById(id: string): Promise<E | null> {
      this.items.find(item => item.id === id) || null;
      return Promise.resolve(null);
    }
    findAll(): Promise<E[]> {
      this.items;
      return Promise.resolve(this.items);
    }
    update(entity: E): Promise<void> {
      async function updateEntity() {
        const index = this.items.findIndex(item => item.id === entity.id);
        if (index !== -1) {
          this.items[index] = entity;
        }
      }
      return updateEntity();
    }
    delete(id: string): Promise<void> {
      async function deleteEntity() {
        this.items = this.items.filter(item => item.id !== id);
      }
      return deleteEntity();

    }

}
