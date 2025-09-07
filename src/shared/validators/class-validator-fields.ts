import { validateSync } from "class-validator";
import { FieldsErrors, ValidatorFieldsInterface } from "./validators-fields.interface";

export abstract  class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {


errors: FieldsErrors = {};
validateData: PropsValidated | null = null;
validate(data: any): boolean {
  const errors = validateSync(data)
  if (errors.length) {
    this.validateData = null;
    this.errors = {};
    errors.forEach((error) => {
      const field = error.property;
      const constraints = error.constraints;
      if (constraints) {
        this.errors[field] = Object.values(constraints);
      }
    });
    return false;
  }
  this.validateData = data;
  this.errors = {};
  return true;
}

getErrors(): FieldsErrors {
  return this.errors;
}
hasErrors(): boolean {
  return Object.keys(this.errors).length > 0;
}


}
