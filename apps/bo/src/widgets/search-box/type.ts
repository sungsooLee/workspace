import { UseFormReturn } from 'react-hook-form';
import { OnValidCallback, SearchBoxConfig } from '@learnway/hooks';

/**
 * SearchBoxConfig
 * useSearchBox 훅에 전달하는 설정 객체의 타입.
 */
export interface SearchBoxProps {
  provider: SearchBoxConfig & {
    control: UseFormReturn<any>['control'] & {
      isFieldRequired: (fieldName: string) => boolean;
    };
    reset: (values?: Record<string, any>) => void;
    formSubmit: (onValid: OnValidCallback) => void;
  };
  // validator 객체는 각 필드에 대한 유효성 스키마를 포함합니다.
  onSearch?: (data: Record<string, any>) => void;
}
