import { useForm } from 'react-hook-form';
import { createZodSchema } from './create-jod-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
const useSearchBox = (config: any) => {
  // 초기값 세팅
  const defaultValues = config.builders.reduce((acc: any, prop: any) => {
    // prop.key에 값이 존재할 경우 설정, 그렇지 않으면 빈 값으로
    switch (prop.type) {
      case 'date-range':
        acc[prop.name] = (prop.value.from || new Date()) + '|' + (prop.value.to || new Date());
        break;
      case 'multi-dropdown':
        acc[prop.name] = prop.value || [];
        break;
      default:
        acc[prop.name] = prop.value || '';
        break;
    }
    return acc;
  }, {}); // 초기값 {}로 빈 객체를 전달
  const schema = createZodSchema(config); // 유효성 검사 스키마 생성
  const methods = useForm<any>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { control, handleSubmit, setFocus, getValues, reset, watch } = methods;

  // formSubmit 함수 : 폼 데이터를 제출하고 검증 오류를 처리
  const formSubmit = (onValid: any) => {
    handleSubmit(
      (data) => {
        const objectParams: any = {};
        config.builders.forEach((prop: any) => {
          const value = data[prop.name];
          if (prop.type === 'date-range') {
            objectParams['startDate'] = value.split('|')[0];
            objectParams['endDate'] = value.split('|')[1];
            delete value[prop.name];
          } else {
            objectParams[prop.name] = value;
          }
        });
        /*const queryParams = new URLSearchParams({
          ...objectParams,
        });*/
        onValid(objectParams); // 가공한 데이터를 onValid로 전달
      }, // 폼 데이터가 유효한 경우 실행할 콜백
      (errors) => {
        // 폼 데이터가 유효하지 않은 경우 처리
        console.error('Validation Errors:', errors); // 검증 오류를 콘솔에 출력
        // 첫 번째 에러 필드 가져오기
        const firstErrorKey = Object.keys(errors)[0]; // 첫 번째 에러 필드의 키
        if (firstErrorKey) {
          // 에러 메시지를 가져와 표시
          const errorMessage = errors[firstErrorKey]?.message || 'Validation error'; // 기본 에러 메시지를 설정
          //alert(errorMessage); // 에러 메시지를 alert로 표시
          // 에러가 있는 필드에 focus 처리
          setFocus(firstErrorKey);
        }
      },
    )(); // handleSubmit이 반환하는 함수를 즉시 실행
  };

  // control에 validator 정보를 추가한 객체 반환
  const extendedControl = {
    ...control, // 기본 control
    isFieldRequired: (fieldName: string) => !!(config.validator && config.validator[fieldName]), // 필수 여부 확인
  };

  const resetForm = (values?: any) => {
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
      watch,
      reset: resetForm,
      formSubmit,
    },
    getValues,
  };
};

export default useSearchBox;
