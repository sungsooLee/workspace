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

// baseZ를 복사해서 새로운 z 객체를 만듭니다.
const z = { ...baseZ };

// TypeScript 선언 확장: 모든 Zod 스키마에 required() 추가
declare module 'zod' {
  interface ZodType<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    required(message?: string): ZodType<NonNullable<Output>, Def, Input>;
    label(label: string): this;
  }
}

// optional(), nullable(), union()을 unwrap하는 재귀 함수
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

// .required() 구현: unwrap한 스키마에 대해 undefined, null, 그리고 빈 문자열(공백 제거 후)도 허용하지 않음
z.ZodType.prototype.required = function (
  this: ZodType<any, any, any>,
  message = '필수 항목입니다.',
) {
  const unwrapped = unwrapSchema(this);
  return unwrapped.refine(
    (value: unknown) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    },
    { message },
  );
};

// 원래 optional 메서드를 보관합니다.
const originalOptional = z.ZodType.prototype.optional;

// 재정의된 optional 메서드:
// - 값이 undefined, null, 또는 빈 문자열이면 undefined를 반환해 내부 검증을 건너뜁니다.
// - 값이 있을 경우에는 원래의 optional 스키마(내부 타입 검증)를 사용합니다.
// - 반환되는 스키마는 원래의 ZodOptional과 동일한 타입(즉, unwrap 프로퍼티 포함)으로 강제합니다.
z.ZodType.prototype.optional = function <Output, Def extends ZodTypeDef, Input>(
  this: ZodType<Output, Def, Input>,
) {
  // 원래 optional() 호출로 ZodOptional 스키마 생성
  const originalSchema = originalOptional.call(this);

  // preprocess를 사용하여 값이 없거나 빈값이면 undefined를 반환하고, 값이 있을 때만 검증하도록 함
  const processedSchema = z.preprocess((val: unknown) => {
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === ''))
      return undefined;
    return val;
  }, originalSchema);

  // ZodEffects로 반환되므로, 원래 ZodOptional에서 필요한 unwrap 프로퍼티를 수동으로 할당합니다.
  (processedSchema as any).unwrap = originalSchema.unwrap;

  // 타입 강제를 통해 반환 타입을 원래의 ZodOptional과 동일하게 맞춥니다.
  return processedSchema as unknown as typeof originalSchema;
};

// 원래 number 함수를 보관합니다.
const originalNumber = z.number;

// 재정의된 number 함수:
// 1. 원래 스키마를 생성합니다.
// 2. preprocess를 통해 값이 문자열이면 숫자로 변환 시도합니다.
//    - 변환 후 NaN이면 그대로 전달(내부 검증에서 에러 발생)
//    - 정상 숫자면 변환된 숫자를 반환합니다.
z.number = function (...args: Parameters<typeof originalNumber>) {
  const numberSchema = originalNumber(...args);
  const coercedSchema = z.preprocess((val: unknown) => {
    if (typeof val === 'string') {
      const num = Number(val);
      return isNaN(num) ? val : num;
    }
    return val;
  }, numberSchema);

  // 두 단계 캐스팅: ZodEffects<ZodNumber, number, unknown> → unknown → ZodNumber
  return coercedSchema as unknown as ZodNumber;
} as typeof z.number;

// 기존 .label()을 확장하여 _def.customLabel에 값을 저장
const originalLabel = baseZ.ZodType.prototype.label;
baseZ.ZodType.prototype.label = function (label: string) {
  // 커스텀 라벨 필드를 추가합니다.
  (this._def as any).customLabel = label;
  return originalLabel.call(this, label);
};

export { z };
