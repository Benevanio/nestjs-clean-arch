export type FieldsErrors={
  [field: string]: string[];
}

export interface ValidatorFieldsInterface<Props = any> {
  validate(data: Props): boolean;
  getErrors(): FieldsErrors;
  hasErrors(): boolean;
}
