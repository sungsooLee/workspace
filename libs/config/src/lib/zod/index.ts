import { z, ZodInvalidStringIssue } from 'zod';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  /*
    This is where you override the various error codes
    */
  console.log('customErrorMap', error.code, 'validation', error, ctx);
  let params;
  let validation: string | undefined;
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.expected === 'string') {
        return { message: `This ain't a string!` };
      }
      /*
        if (error.expected === 'number') {
          return { message: `This ain't a string!` };
        }
          */
      break;
    case z.ZodIssueCode.invalid_string:
      validation = (error as any)?.validation;
      if (validation === 'email') {
        return { message: '${label}은 잘못된 이메일' };
      }
      break;
    case z.ZodIssueCode.too_small:
      if (error.type === 'number') {
        // gte
        return { message: `Number must be greater than or equal to ${error.minimum}` };
      } else {
        // min
        return { message: `String must contain at least ${error.minimum} character(s)` };
      }
      break;
    case z.ZodIssueCode.custom:
      // produce a custom message using error.params
      // error.params won't be set unless you passed
      // a `params` arguments into a custom validator
      params = error.params;
      if (params && params?.['myField']) {
        return { message: `Bad input: ${params.myField}` };
      }
      break;
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};

export function initZod() {
  z.setErrorMap(customErrorMap);
}

const numberRequied = z.number({
  required_error: '${label} 필수 입력 값',
  invalid_type_error: '${label} 타입 오류',
});
const stringRequied = z.string().nonempty('${label} 필수 입력 값');
const stringsRequired = z.string().array().nonempty('${label} 필수 입력 값');

export const zodValidator = {
  numberRequied,
  stringRequied,
  stringsRequired,
};
