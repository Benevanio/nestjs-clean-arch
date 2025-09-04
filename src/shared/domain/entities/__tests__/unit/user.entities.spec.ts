import { Entity } from "../../entity";

describe("Entity", () => {
  it("should create an entity with a generated id", () => {
    class TestEntity extends Entity<{ foo: string }> {}
    const entity = new TestEntity({ foo: "bar" });
    expect(entity).toBeInstanceOf(TestEntity);
    expect(entity._id).toBeDefined();
    expect(entity.props).toEqual({ foo: "bar" });
  });
  it("should create an entity with a props and a given id", () => {
    class TestEntity extends Entity<{ foo: string }> {}
    const entity = new TestEntity({ foo: "bar" }, "custom-id");
    expect(entity).toBeInstanceOf(TestEntity);
    expect(entity._id).toBe("custom-id");
    expect(entity.props).toEqual({ foo: "bar" });
  });
  it("should convert entity to JSON", () => {
    class TestEntity extends Entity<{ foo: string }> {}
    const entity = new TestEntity({ foo: "bar" }, "custom-id");
    const json = entity.toJSON();
    expect(json).toEqual({
      _id: "custom-id",
      props: { foo: "bar" },
    });
  });
  it("should have a working id getter", () => {
    class TestEntity extends Entity<{ foo: string }> {}
    const entity = new TestEntity({ foo: "bar" }, "custom-id");
    expect(entity.id).toBe("custom-id");
  });
  it("Should convert a entity to javascript object", () => {
    class TestEntity extends Entity<{ foo: string }> {}
    const entity = new TestEntity({ foo: "bar" }, "custom-id");
    expect(entity).toEqual({
      _id: "custom-id",
      props: { foo: "bar" },
    });
  });
  it("Should be a valid uuid", () => {
    class TestEntity extends Entity<{ foo: string }> {}
    const entity = new TestEntity({ foo: "bar" });
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(entity._id)).toBe(true);
  });
});
