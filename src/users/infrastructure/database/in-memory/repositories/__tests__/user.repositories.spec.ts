import { NotFoundError } from '@/shared/domain/error/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserInMemoryRepository } from '../user-in-memory.repositories';

describe('UserInMemoryRepository', () => {
  let repository: UserInMemoryRepository;
  let userProps: any;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    userProps = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createAt: new Date(),
    };
  });

  describe('insert', () => {
    it('should insert a user entity', async () => {
      const user = new UserEntity(userProps);
      await repository.insert(user);
      // @ts-ignore - accessing private property for testing
      expect(repository.items).toHaveLength(1);
      // @ts-ignore
      expect(repository.items[0]).toBe(user);
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const user = new UserEntity(userProps);
      await repository.insert(user);
      const found = await repository.findById(user.id);
      expect(found).toBe(user);
    });

    it('should throw NotFoundError when user not found', async () => {
      await expect(repository.findById('invalid-id')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const user = new UserEntity(userProps);
      await repository.insert(user);
      const found = await repository.findByEmail('john@example.com');
      expect(found).toBe(user);
    });

    describe('emailExists', () => {
      it('should not throw error when email does not exist', async () => {
        await expect(
          repository.emailExists('nonexistent@example.com')
        ).resolves.not.toThrow();
      });


      describe('update', () => {
        it('should update user entity', async () => {
          const user = new UserEntity(userProps);
          await repository.insert(user);

          user.update('Jane Doe');
          await repository.update(user);

          const found = await repository.findById(user.id);
          expect(found).toBeDefined();
          expect(found!.name).toBe('Jane Doe');
        });

        it('should throw NotFoundError when trying to update non-existent user', async () => {
          const user = new UserEntity(userProps, 'invalid-id');
          await expect(repository.update(user)).rejects.toThrow(NotFoundError);
        });
      });

      describe('delete', () => {
        it('should delete user by id', async () => {
          const user = new UserEntity(userProps);
          await repository.insert(user);

          await repository.delete(user.id);

          await expect(repository.findById(user.id)).rejects.toThrow(
            NotFoundError
          );
        });

        it('should throw NotFoundError when trying to delete non-existent user', async () => {
          await expect(repository.delete('invalid-id')).rejects.toThrow(
            NotFoundError
          );
        });
      });

      describe('findAll', () => {
        it('should return all users', async () => {
          const user1 = new UserEntity(userProps);
          const user2 = new UserEntity({
            ...userProps,
            email: 'jane@example.com',
            name: 'Jane Doe',
          });

          await repository.insert(user1);
          await repository.insert(user2);

          const users = await repository.findAll();
          expect(users).toHaveLength(2);
          expect(users).toContain(user1);
          expect(users).toContain(user2);
        });

        it('should throw NotFoundError when no users exist', async () => {
          await expect(repository.findAll()).rejects.toThrow(NotFoundError);
        });
      });

      describe('search', () => {
        it('should throw error for unimplemented method', async () => {
          expect(() => repository.search({})).toThrow('Method not implemented.');
        });
      });
    });
  });
})

