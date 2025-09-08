import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new user', () => {
    const dto: CreateUserDto = {};
    expect(service.create(dto)).toBe('This action adds a new user');
  });

  it('should return all users', () => {
    expect(service.findAll()).toBe('This action returns all users');
  });

  it('should return one user', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 user');
    expect(service.findOne(99)).toBe('This action returns a #99 user');
  });

  it('should update a user', () => {
    const dto: UpdateUserDto = {};
    expect(service.update(1, dto)).toBe('This action updates a #1 user');
    expect(service.update(99, dto)).toBe('This action updates a #99 user');
  });

  it('should remove a user', () => {
    expect(service.remove(1)).toBe('This action removes a #1 user');
    expect(service.remove(99)).toBe('This action removes a #99 user');
  });
});
