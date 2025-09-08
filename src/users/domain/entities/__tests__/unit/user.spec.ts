import { UserValidator, UserValidatorFactory } from "@/users/validator/user.validator";



let sut: UserValidator;
describe('UserEntity', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  describe('UserValidator Unit Tests', () => {
    describe('validate method', () => {
      it('Invalidation cases for name field', () => {
        const isValid = sut.validate({
          name: null as any,
          email: 'invalid-email',
          password: "",
          createAt: undefined
        });
        expect(isValid).toBeFalsy();
        console.log(sut.getErrors(['name']));
        expect(sut.getErrors(['name'])['name']).toStrictEqual([
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]);
      });
    });
  });
});
