import { useForm, UseFormReturn } from 'react-hook-form';
import { OnValidCallback, SearchBoxConfig, UseSearchBoxReturn } from './type';
import { createZodSchema } from './create-jod-schema';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * useSearchBox
 * - config를 기반으로 초기값과 유효성 검사 스키마를 생성하여 react-hook-form을 초기화합니다.
 * - 폼 제출 시 데이터를 가공하여 onValid 콜백으로 전달합니다.
 *
 * @param config - SearchBoxConfig 객체
 * @returns 검색 폼 관련 설정 및 메서드를 포함한 객체
 */
const useSearchBox = (config: SearchBoxConfig): UseSearchBoxReturn => {
  // 초기값 생성: 각 빌더의 기본 값을 설정합니다.
  const defaultValues = config.builders.reduce<Record<string, any>>((acc, prop) => {
    switch (prop.type) {
      case 'date-range':
        // date-range: from과 to를 '|'로 구분하여 연결합니다.
        acc[prop.name] = `${prop.value?.from || new Date()}|${prop.value?.to || new Date()}`;
        break;
      case 'multi-dropdown':
        // multi-dropdown: 배열 값 또는 빈 배열로 초기화
        acc[prop.name] = prop.value || [];
        break;
      default:
        // 기본: prop.value가 있으면 사용, 없으면 빈 문자열
        acc[prop.name] = prop.value ?? '';
        break;
    }
    return acc;
  }, {});

  // Zod 스키마 생성 (createZodSchema 함수가 config를 기반으로 스키마를 생성)
  const schema = createZodSchema(config);

  // react-hook-form 초기화
  const methods: UseFormReturn<any> = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit, setFocus, getValues, reset, watch } = methods;

  /**
   * formSubmit
   * - 폼 데이터를 제출하고, 유효성 검사에 통과하면 가공한 데이터를 onValid 콜백으로 전달합니다.
   * - 유효하지 않은 경우 첫 번째 에러 필드에 focus를 맞춥니다.
   *
   * @param onValid - 폼 데이터가 유효할 때 호출되는 콜백 함수
   */
  const formSubmit = (onValid: OnValidCallback) => {
    handleSubmit(
      (data) => {
        const objectParams: Record<string, any> = {};
        // 각 빌더별로 데이터를 가공
        config.builders.forEach((prop) => {
          const value = data[prop.name];
          if (prop.type === 'date-range') {
            // date-range: '|'로 연결된 문자열을 분리하여 startDate와 endDate로 설정
            objectParams['startDate'] = value.split('|')[0];
            objectParams['endDate'] = value.split('|')[1];
          } else {
            objectParams[prop.name] = value;
          }
        });
        onValid(objectParams);
      },
      (errors) => {
        console.error('Validation Errors:', errors);
        // 첫 번째 에러 필드 키를 가져와 focus를 맞춤
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          setFocus(firstErrorKey);
        }
      },
    )(); // 즉시 실행
  };

  // 확장된 control: 기존 control에 isFieldRequired 메서드를 추가합니다.
  const extendedControl = {
    ...control,
    isFieldRequired: (fieldName: string) => !!(config.validator && config.validator[fieldName]),
  };

  /**
   * resetForm
   * - 전달된 값 또는 defaultValues로 폼을 초기화합니다.
   *
   * @param values - (선택) 새로운 초기값 객체
   */
  const resetForm = (values?: Record<string, any>) => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValues);
    }
  };

  return {
    config: {
      ...config,
      control: extendedControl,
      reset: resetForm,
      formSubmit,
    },
    getData: getValues,
  };
};

export default useSearchBox;
