import { z } from './zod';
import { ValidatorConfig } from '../types/zod';

// 필수 값 처리 함수 (분리)
const handleRequired = (
  config: ValidatorConfig[string],
  key: string,
  requiredSuperRefine: any[],
) => {
  if (typeof config.required === 'boolean') {
    requiredSuperRefine.push({
      key,
      config: {
        required: config.required,
        fn: () => true,
        path: key,
      },
    });
  } else if (typeof config.required === 'object') {
    requiredSuperRefine.push({
      key,
      config: {
        required: config.required || false,
        fn: config.required.fn,
        path: config.required.path || key,
        message: config.required.message,
      },
    });
  }
};

// 조건 처리 함수 (분리)
const handleConditions = (
  config: ValidatorConfig[string],
  key: string,
  conditionsSuperRefine: any[],
) => {
  config.conditions?.forEach((condition) => {
    if (typeof condition === 'function') {
      conditionsSuperRefine.push({
        key,
        config: {
          fn: condition,
          path: key,
        },
      });
    } else if (typeof condition === 'object') {
      conditionsSuperRefine.push({
        key,
        config: {
          ...condition,
          path: condition.path || key,
        },
      });
    }
  });
};

// 동적으로 Zod 스키마 생성 함수
export const buildJodObject = (validator: ValidatorConfig) => {
  if (validator === undefined) return z.object({});
  const schemaShape: Record<string, any> = {};
  const requiredSuperRefine: any[] = [];
  const conditionsSuperRefine: any[] = [];
  for (const key in validator) {
    const config = validator[key];

    let schema;

    // 타입 변환 처리
    switch (config.format) {
      case 'string':
        schema = z.string();
        break;
      case 'number':
        schema = z.number();
        break;
      case 'boolean':
        schema = z.boolean();
        break;
      case 'array':
        schema = z.array(z.any());
        break;
      case 'object':
        schema = z.object({});
        break;
      case 'email': {
        schema = z.string();
        const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        conditionsSuperRefine.push({
          key: key,
          config: {
            fn: (values: Record<string, any>) => values[key] !== '' && !emailRegx.test(values[key]),
            path: key,
            message: '이메일 형식이 잘못되었습니다.',
          },
        });
        break;
      }
      default:
        throw new Error(`Unsupported type: ${config.format}`);
    }
    // 필수 값 처리 함수
    if (config.required) {
      handleRequired(config, key, requiredSuperRefine);
    }
    // 추가 조건 처리 함수
    if (config.conditions && config.conditions.length > 0) {
      handleConditions(config, key, conditionsSuperRefine);
    }
    schemaShape[key] = schema;
  }
  // zod의 superRefine으로 커스텀 검증 처리
  return z.object(schemaShape).superRefine((data, ctx) => {
    if (requiredSuperRefine.length > 0) {
      requiredSuperRefine.forEach(({ key, config }) => {
        let isData = !data[key];
        if (Array.isArray(data[key])) {
          isData = data[key].length === 0;
        }
        if ((config.fn ? config.fn(data) : true) && isData) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [config.path],
            params: { validation: 'required' },
            ...(config.message && { message: config.message }),
          });
        }
      });
    }

    if (conditionsSuperRefine.length > 0) {
      conditionsSuperRefine.forEach(({ config }) => {
        if (config.fn ? config.fn(data) : false) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [config.path],
            params: { validation: 'conditions' },
            ...(config.message && { message: config.message }),
          });
        }
      });
    }
  });
};
