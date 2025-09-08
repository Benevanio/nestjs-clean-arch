import { ClassValidatorFields } from "@/shared/validators/class-validator-fields";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  createAt: Date;

  constructor(name: string, email: string, password: string, createAt: Date) {
    Object.assign(this, {name, email, password, createAt});
  }
}


export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserRules): boolean {
    return super.validate(new UserRules(data.name, data.email, data.password, data.createAt));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
