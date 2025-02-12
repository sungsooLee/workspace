import { z, ZodIssueOptionalMessage } from 'zod';
/**
 *  Custom zod errorMap: invalid message를 i18n code로 변경 처리
 *  z.setErrorMap global적용하거나 schema별로 별도 적용 가능
 *  z.ZodIssueCode 참조: https://zod.dev/ERROR_HANDLING?id=zodissuecode
 *  https://zod.dev/?id=strings
 * @param error
 * @param ctx
 * @return { message: string }
 */
const customErrorMap: z.ZodErrorMap = (error: ZodIssueOptionalMessage, ctx: z.ErrorMapCtx) => {
  //console.log('customErrorMap', error?.path[0], error.code, error, ctx);
  let params;
  let validation: string | undefined;
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.expected === 'string') {
        return { message: `잘못된 문자열 입력` };
      }
      if (error.expected === 'number') {
        return { message: `잘못된 숫자 입력` };
      }
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

/**
 *  zod errorMap 전역 적용
 */
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
