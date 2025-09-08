import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data.builder";
import { UserEntity } from "../../user.entity";

describe('UserEntity with UserDataBuilder', () => {
  it('should create a user with random data', () => {
    const props = UserDataBuilder({});
    const user = new UserEntity(props);
    expect(user.name).toBe(props.name);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.createAt).toBeInstanceOf(Date);
  });

  it('should create a user with custom name', () => {
    const props = UserDataBuilder({ name: 'Custom Name' });
    const user = new UserEntity(props);
    expect(user.name).toBe('Custom Name');
  });

  it('should create a user with custom email', () => {
    const props = UserDataBuilder({ email: 'ben@example.com' });
    const user = new UserEntity(props);
    expect(user.email).toBe('ben@example.com');
  });
  it('should create a user with custom password', () => {
    const props = UserDataBuilder({ password: 'myPassword123' });
    const user = new UserEntity(props);
    expect(user.password).toBe('myPassword123');
  });


});
