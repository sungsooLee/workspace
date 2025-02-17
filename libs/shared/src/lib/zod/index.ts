import {
  z as baseZ,
  ZodType,
  ZodTypeDef,
  ZodOptional,
  ZodNullable,
  ZodUnion,
  ZodNull,
  ZodNumber,
} from 'zod';

// baseZ를 그대로 복사하는 대신 프로토타입 체인을 유지하기 위해
// 단순히 새로운 객체에 스프레드를 사용.
const z = { ...baseZ };

// ------------------------------------------------------------
// Module augmentation: ZodType에 required()와 label() 메서드를 추가.
declare module 'zod' {
  interface ZodType<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    required(message?: string): ZodType<NonNullable<Output>, Def, Input>;
    label(label: string): this;
  }
}

// ------------------------------------------------------------
// _getErrorProps 패치
// 이 함수는 Zod 내부에서 에러 객체를 생성할 때 사용
// 여기서 customLabel을 error.params에 강제로 병합.
const originalGetErrorProps = (z.ZodType.prototype as any)._getErrorProps;
(z.ZodType.prototype as any)._getErrorProps = function (...args: any[]) {
  const props = originalGetErrorProps.apply(this, args);
  const customLabel = (this._def as any).customLabel;
  console.log('[_getErrorProps] customLabel:', customLabel); // 디버깅용 로그
  return {
    ...props,
    params: {
      ...props.params,
      ...(customLabel ? { customLabel } : {}),
    },
  };
};

// ------------------------------------------------------------
// unwrapSchema 함수
// optional, nullable, union 스키마의 내부 타입을 재귀적으로 풀어내어
// 기본 스키마를 반환.
function unwrapSchema<T extends ZodType<any, any, any>>(schema: T): ZodType<any, any, any> {
  if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
    return unwrapSchema(schema._def.innerType);
  }
  if (schema instanceof ZodUnion) {
    const nonNullOptions = schema._def.options.filter(
      (opt: ZodType<any, any, any>) => !(opt instanceof ZodNullable || opt instanceof ZodNull),
    );
    if (nonNullOptions.length === 1) {
      return unwrapSchema(nonNullOptions[0]);
    } else if (nonNullOptions.length > 1) {
      return z.union(nonNullOptions.map(unwrapSchema));
    }
  }
  return schema;
}

// ------------------------------------------------------------
// .required() 확장
// 값이 undefined, null, 빈 문자열(트림 후), 또는 빈 배열이면 false를 반환하도록 하는 커스텀 검증을 추가.
z.ZodType.prototype.required = function (this: ZodType<any, any, any>, message?: string) {
  const unwrapped = unwrapSchema(this);
  return unwrapped.refine(
    (value: unknown) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    },
    {
      message,
      // 'required' 검증임을 식별할 수 있도록 params에 추가.
      params: { validation: 'required' },
    },
  );
};

// ------------------------------------------------------------
// .optional() 확장
// 값이 undefined, null, 빈 문자열이면 내부 검증을 건너뛰도록 preprocess를 적용.
const originalOptional = z.ZodType.prototype.optional;
z.ZodType.prototype.optional = function <Output, Def extends ZodTypeDef, Input>(
  this: ZodType<Output, Def, Input>,
) {
  const originalSchema = originalOptional.call(this);
  const processedSchema = z.preprocess((val: unknown) => {
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === ''))
      return undefined;
    return val;
  }, originalSchema);
  // preprocess는 ZodEffects를 반환하므로, unwrap 프로퍼티를 수동으로 할당.
  (processedSchema as any).unwrap = originalSchema.unwrap;
  return processedSchema as unknown as typeof originalSchema;
};

// ------------------------------------------------------------
// .number() 확장
// 값이 문자열이면 숫자로 변환하도록 preprocess를 적용.
const originalNumber = z.number;
z.number = function (...args: Parameters<typeof originalNumber>) {
  const numberSchema = originalNumber(...args);
  const coercedSchema = z.preprocess((val: unknown) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? val : num;
    }
    return val;
  }, numberSchema);
  return coercedSchema as unknown as ZodNumber;
} as typeof z.number;

// ------------------------------------------------------------
// .label() 확장
// 스키마 인스턴스에 customLabel 값을 저장.
// 주의: 이 확장은 스키마 생성 시점에 호출되어야 하며, 이후에는 자동 반영 불가.
baseZ.ZodType.prototype.label = function (label: string) {
  (this._def as any).customLabel = label;
  return this;
};

// ------------------------------------------------------------
// .refine() 확장
// refine() 호출 시 _def에 저장된 customLabel을 options.params에 병합.
const originalRefine = z.ZodType.prototype.refine;
z.ZodType.prototype.refine = function <Output, Def extends ZodTypeDef, Input>(
  check: (data: unknown) => data is Output,
  refinementOptions?: unknown,
) {
  const customLabel = (this._def as any).customLabel;
  const optionsObj: Record<string, any> =
    typeof refinementOptions === 'object' && refinementOptions !== null ? refinementOptions : {};
  const existingParams: Record<string, any> =
    typeof optionsObj['params'] === 'object' && optionsObj['params'] !== null
      ? optionsObj['params']
      : {};
  const newOptions = {
    ...optionsObj,
    params: {
      ...existingParams,
      ...(customLabel ? { customLabel } : {}),
    },
  };
  return originalRefine.call(this, check, newOptions);
};

export { z };
