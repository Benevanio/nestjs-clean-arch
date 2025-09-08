import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
      module = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: {
              findAll: jest.fn(),
              create: jest.fn(),
              remove: jest.fn(),
              update: jest.fn(),
            },
          },
        ],
      }).compile();

      controller = module.get<UsersController>(UsersController);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have UsersService defined', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });

  it('should call UsersService methods', async () => {
    const service = module.get<UsersService>(UsersService);
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue([]);
    const result = await controller.findAll();
    expect(findAllSpy).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
  it('should create a user', async () => {
    const service = module.get<UsersService>(UsersService);
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'bene@gmail.com',
      password: 'securePass123',
      createAt: new Date(),
    });
    const result = await controller.create({
      name: 'John Doe',
      email: 'bene@gmail.com',
      password: 'securePass123',
    });
    expect(createSpy).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'bene@gmail.com',
      password: 'securePass123',
      createAt: expect.any(Date),
    });

  });

  //delete
  it('should delete a user', async () => {
    const result = await controller.remove('1');
    expect(result).toBe('This action removes a #1 user');
  });

  //update
  it('should update a user', async () => {
    const result = await controller.update('1', { name: 'Jane Doe' });
    expect(result).toBe('This action updates a #1 user');
  });
});
