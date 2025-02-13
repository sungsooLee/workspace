import { z } from 'zod';

export const createZodSchema = (config: Record<string, any>) => {
  const builderSchemas = config.builders.reduce(
    (acc: any, builder: any) => {
      switch (builder.type) {
        case 'dropdown':
          acc[builder.name] = z.string().optional(); // 드롭다운은 string 값이며 optional 처리
          break;
        case 'text':
          acc[builder.name] = z.string().optional(); // 텍스트 필드는 문자열로 처리
          break;
        default:
          acc[builder.name] = z.any().optional(); // 기타 필드는 모든 값을 허용
      }
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>,
  );
  console.log('config.validator => ', config.validator);
  // global validator 추가
  const globalValidators = config.validator ?? {};

  return z.object({
    ...builderSchemas, // 빌더에서 생성된 유효성 검사기 추가
    ...globalValidators, // 전역 validator 추가
  });
};
