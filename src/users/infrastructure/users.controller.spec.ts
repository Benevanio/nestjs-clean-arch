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
            create: jest.fn() as jest.Mock<Promise<any>, any>, // <-- Add explicit type here
            remove: jest.fn().mockImplementation((id: string) => `This action removes a #${id} user`),
            update: jest.fn().mockImplementation((id: string) => `This action updates a #${id} user`),
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
  it('should call create with empty body', async () => {
    const service = module.get<UsersService>(UsersService);
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue('created');
    const result = await controller.create({});
    expect(createSpy).toHaveBeenCalledWith({});
    expect(result).toBe('created');
  });

  it('should call update with empty body', async () => {
    const service = module.get<UsersService>(UsersService);
    const updateSpy = jest.spyOn(service, 'update').mockResolvedValue('updated');
    const result = await controller.update('1', {});
    expect(updateSpy).toHaveBeenCalledWith(1, {});
    expect(result).toBe('updated');
  });


  it('should call remove with non-numeric id', async () => {
    const service = module.get<UsersService>(UsersService);
    const removeSpy = jest.spyOn(service, 'remove').mockReturnValue('removed');
    const result = await controller.remove('abc');
    expect(removeSpy).toHaveBeenCalledWith(NaN);
    expect(result).toBe('removed');
  });
});
