import { UserEntity } from "../../user.entity";

describe("UserEntity", () => {
  it("should create a user entity", () => {
    const user = new UserEntity({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });
    expect(user).toBeInstanceOf(UserEntity);
  });
});
