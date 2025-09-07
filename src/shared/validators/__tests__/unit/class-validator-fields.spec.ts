import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../../class-validator-fields";



class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price : number;
  constructor(name: string, price: number) {
    Object.assign(this, {name, price});
  }
}
class StubClassValidatorFields extends ClassValidatorFields<{field: string}> {
  validate(data: any): boolean {
    return super.validate(data);
  }
}

describe("ClassValidatorFieldsUnitTest integration tests", () => {
  it("should with errors", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.validate(new StubRules("", 1))).toBeFalsy();
    console.log(validator.getErrors());
    expect(validator.getErrors()).toStrictEqual({
      name: [
        "name should not be empty",
      ],
    });
    expect(validator.hasErrors()).toBeTruthy();
  });
});


