import { DynamicFormConfig, FormConfig, GroupConfig, SearchBoxConfig } from './type';

/**
 * 기본값 추출 함수
 *
 * @param config - SearchConfig 객체
 * @returns name과 value를 기반으로 한 기본값 객체 반환
 */
export const extractSearchBoxDefaultValues = (config: SearchBoxConfig): Record<string, any> => {
  const defaultValues: Record<string, any> = {};

  /**
   * 재귀적으로 필드에서 name과 value 추출
   *
   * @param builders - FormConfig 또는 GroupConfig 배열
   */
  const extractValues = (builders: (FormConfig | GroupConfig)[]) => {
    builders.forEach((builder) => {
      if (builder.type === 'group') {
        // group 타입일 경우 하위 builder에서 재귀 처리
        if (builder.builders) {
          extractValues(builder.builders);
        }
      } else {
        // name이 존재할 경우 값 추출
        if (builder.name) {
          defaultValues[builder.name] = builder.value;
        }
      }
    });
  };

  config.builders.forEach((builderGroup) => extractValues(builderGroup));

  return defaultValues;
};

export const extractDynamicFormDefaultValues = (builders: FormConfig[]) => {
  const defaultValues: Record<string, any> = {};
  builders.forEach((builder) => {
    if (builder.name) {
      defaultValues[builder.name] = builder.value;
    }
  });
  return defaultValues;
};
