import { z } from '@learnway/shared';
import {
  ZodErrorMap,
  ZodIssueOptionalMessage,
  ErrorMapCtx,
  ZodIssueCode,
  ZodCustomIssue,
} from 'zod';

/**
 *  Custom zod errorMap: invalid message를 i18n code로 변경 처리
 *  z.setErrorMap global적용하거나 schema별로 별도 적용 가능
 *  z.ZodIssueCode 참조: https://zod.dev/ERROR_HANDLING?id=zodissuecode
 *  https://zod.dev/?id=strings
 * @param error
 * @param ctx
 * @return { message: string }
 */
const customErrorMap: ZodErrorMap = (error: ZodIssueOptionalMessage, ctx: ErrorMapCtx) => {
  //console.log('customErrorMap', error?.path[0], error.code, error, ctx);
  let validation: string | undefined;
  // customLabel이 있으면 사용, {{label}} 사용
  const customError = error as ZodCustomIssue;
  const label = (customError.params as any)?.customLabel || '{{label}}';

  switch (error.code) {
    case ZodIssueCode.invalid_type:
      if (error.expected === 'string') {
        return { message: `잘못된 문자열 입력` };
      }
      if (error.expected === 'number') {
        return { message: `잘못된 숫자 입력` };
      }
      break;
    case ZodIssueCode.invalid_string:
      validation = (error as any)?.validation;
      if (validation === 'email') {
        return { message: `${label}은 잘못된 이메일` };
      }
      break;
    case ZodIssueCode.too_small:
      if (error.type === 'number') {
        // gte
        return { message: `Number must be greater than or equal to ${error.minimum}` };
      } else {
        // min
        return { message: `String must contain at least ${error.minimum} character(s)` };
      }
      break;
    case ZodIssueCode.custom:
      // produce a custom message using error.params
      // error.params won't be set unless you passed
      // a `params` arguments into a custom validator
      if ((error.params as any)?.validation === 'required') {
        return { message: `${label}은(는) 필수 항목입니다.` };
      }

      /*params = error.params;
      if (params && params?.['myField']) {
        return { message: `Bad input: ${params.myField}` };
      }*/
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
