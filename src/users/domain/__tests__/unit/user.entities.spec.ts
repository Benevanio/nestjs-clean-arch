import { faker } from '@faker-js/faker';
import { UserEntity } from "../../entities/user.entity";
describe('UserEntity', () => {
  it('should create a user with the given properties', () => {
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const password = faker.internet.password();
    const createdAt = new Date();

    const user = new UserEntity({
      email,
      name,
      password,
      createdAt,
    });

    expect(user.props).toEqual({
      email,
      name,
      password,
      createdAt,
    });
    expect(user.props.createdAt).toBeInstanceOf(Date);
  });
});
