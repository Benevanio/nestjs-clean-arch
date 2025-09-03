import { faker } from '@faker-js/faker';
import { UserEntity, UserProps } from "../../entities/user.entity";
describe('UserEntity', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      createdAt: new Date(),
    };
    sut = new UserEntity(props);
  });

  it('should initialize props correctly', () => {
    expect(sut.props).toEqual({
      email: props.email,
      name: props.name,
      password: props.password,
      createdAt: props.createdAt,
    });
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
  it('should set createdAt to current date if not provided', () => {
    sut = new UserEntity({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    });
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});
