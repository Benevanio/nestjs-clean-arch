export type FieldsErrors={
  [field: string]: string[];
}

export interface ValidatorFieldsInterface<PropsValidated> {
  validate(data: PropsValidated): boolean;
  getErrors(): FieldsErrors;
  hasErrors(): boolean;
}
