import { ValidatorFieldsInterface } from "@/shared/validators/validators-fields.interface";

export class NotFoundError extends Error {
  constructor(public entityId: ValidatorFieldsInterface<any>) {
    super(`Entity with ID ${entityId} not found`);
    this.name = "NotFoundError";
  }
}
