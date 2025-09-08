import { Entity } from "@/shared/domain/entities/entity";
import { UserValidatorFactory } from "@/users/validator/user.validator";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createAt?: Date;
}


export class UserEntity extends Entity<UserProps> {
  constructor(public readonly props: UserProps, id?: string) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createAt = props.createAt ?? new Date();
  }
  update(value: string): void{
    UserEntity.validate({...this.props, name: value});
    this.props.name = value;
  }
  updatePassword(value: string): void{
    UserEntity.validate({...this.props, password: value});
    this.props.password = value;
  }

get name() {
    return this.props.name;
}

private set name(value: string) {
    this.props.name = value;
}

get email() {
  return this.props.email;
}
get password() {
  return this.props.password;
}
get createAt() {
  return this.props.createAt;
}

private set password(value: string) {
  this.props.password = value;
}
static validate(props: UserProps) {
  const validate = UserValidatorFactory.create();
  validate.validate({
    ...props,
    createAt: props.createAt ?? new Date()
  });
}
}
