import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsDateStringFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateStringFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const re = /^\d{4}-\d{2}-\d{2}$/;
          return typeof value === 'string' && re.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Date should be in yyyy-mm-dd format';
        },
      },
    });
  };
}
