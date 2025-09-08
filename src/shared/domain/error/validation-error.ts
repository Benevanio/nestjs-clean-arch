import { ValidatorFieldsInterface } from "@/shared/validators/validators-fields.interface";


export class ValidationError extends Error {
  constructor(public errors:ValidatorFieldsInterface<any>) {
    super("Entity validation failed");
    this.name = "ValidationError";
  }
}
