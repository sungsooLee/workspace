import { SearchBoxProvider } from '@learnway/hooks';

/**
 * SearchBoxConfig
 * useSearchBox 훅에 전달하는 설정 객체의 타입.
 */
export interface SearchBoxProps {
  provider: SearchBoxProvider;
  // validator 객체는 각 필드에 대한 유효성 스키마를 포함합니다.
  onSearch?: (data: Record<string, any>) => void;
}
