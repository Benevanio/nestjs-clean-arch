import { UserEntity, UserProps } from '../../user.entity';

// Mock do UserValidatorFactory
const validateMock = jest.fn();
jest.mock('@/users/validator/user.validator', () => ({
  UserValidatorFactory: {
    create: () => ({
      validate: validateMock,
    }),
  },
}));

describe('UserEntity', () => {
  const baseProps: UserProps = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securePass123',
  };

  beforeEach(() => {
    validateMock.mockClear();
  });

  it('should create a user with default createAt', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps });
    expect(user.name).toBe(baseProps.name);
    expect(user.email).toBe(baseProps.email);
    expect(user.password).toBe(baseProps.password);
    expect(user.createAt).toBeInstanceOf(Date);
    expect(validateMock).toHaveBeenCalled();
  });

  it('should call static validate with createAt default', () => {
    validateMock.mockImplementation(() => {});
    UserEntity.validate({ ...baseProps });
    expect(validateMock).toHaveBeenCalledWith({ ...baseProps, createAt: expect.any(Date) });
  });

  describe('UserValidator Unit Tests', () => {
    it('Invalidation cases for name field', () => {
      validateMock.mockImplementation(() => { throw new Error('Invalid name'); });
      expect(() => new UserEntity({ ...baseProps, name: '' })).toThrow('Invalid name');
    });
    it('should invalidate when email is empty', () => {
      validateMock.mockImplementation(() => { throw new Error('Invalid email'); });
      expect(() => new UserEntity({ ...baseProps, email: '' })).toThrow('Invalid email');
    });
    it('should invalidate when password is empty', () => {
      validateMock.mockImplementation(() => { throw new Error('Invalid password'); });
      expect(() => new UserEntity({ ...baseProps, password: '' })).toThrow('Invalid password');
    });
    it('should invalidate when createAt is empty', () => {
      validateMock.mockImplementation(() => { throw new Error('Invalid createAt'); });
      expect(() => new UserEntity({ ...baseProps, createAt: undefined as any })).toThrow('Invalid createAt');
    });
  });

  it('should update name successfully', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps });
    user.update('Jane Doe');
    expect(user.name).toBe('Jane Doe');
    expect(validateMock).toHaveBeenCalledTimes(2); // once in constructor, once in update
  });

  it('should update password successfully', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps });
    user.updatePassword('newSecurePass456');
    expect(user.password).toBe('newSecurePass456');
    expect(validateMock).toHaveBeenCalledTimes(2); // once in constructor, once in updatePassword
  });

  it('should throw error on invalid name update', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps });
    validateMock.mockImplementation(() => { throw new Error('Invalid name'); });
    expect(() => user.update('')).
toThrow('Invalid name');
  });

  it('should throw error on invalid password update', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps });
    validateMock.mockImplementation(() => { throw new Error('Invalid password'); });
    expect(() => user.updatePassword('')).
toThrow('Invalid password');
  });
  it('toJSON should return correct structure', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps });
    const json = user.toJSON();
    expect(json).toEqual({
      _id: user.id,
      props: {
        ...baseProps,
        createAt: expect.any(Date),
      },
    });
  });

  it('should create user with provided id', () => {
    validateMock.mockImplementation(() => {});
    const customId = 'custom-id-123';
    const user = new UserEntity({ ...baseProps }, customId);
    expect(user.id).toBe(customId);
  });

  it('should generate unique ids for different users', () => {
    validateMock.mockImplementation(() => {});
    const user1 = new UserEntity({ ...baseProps });
    const user2 = new UserEntity({ ...baseProps, email: 'user2@example.com' });
    expect(user1.id).not.toBe(user2.id);
  });
  it('Should be valid name with min length', () => {
    validateMock.mockImplementation(() => {});
    const user = new UserEntity({ ...baseProps, name: 'Jo' });
    expect(user.name).toBe('Jo');
  });
  it('Should be valid name with max length', () => {
    validateMock.mockImplementation(() => {});
    const longName = 'J'.repeat(100);
    const user = new UserEntity({ ...baseProps, name: longName });
    expect(user.name).toBe(longName);
  });
it('should set name using private setter', () => {
  validateMock.mockImplementation(() => {});
  const user = new UserEntity({ ...baseProps });
  // @ts-ignore
  user.name = 'Private Name';
  expect(user.name).toBe('Private Name');
});

it('should set password using private setter', () => {
  validateMock.mockImplementation(() => {});
  const user = new UserEntity({ ...baseProps });
  // @ts-ignore
  user.password = 'PrivatePassword';
  expect(user.password).toBe('PrivatePassword');
});
});
