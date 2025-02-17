import { z } from '@learnway/shared';

export const createZodSchema = (config: Record<string, any>) => {
  // global validator 추가
  const globalValidators = config.validator ? { ...config.validator } : {};
  return z.object({ ...globalValidators });
};
