export type ValidatorConfig = {
  [key: string]: {
    format: 'string' | 'number' | 'date' | 'datetime' | 'email' | 'array' | 'object' | 'boolean';
    default?: any;
    required?:
      | boolean
      | {
          /**
           * 필수 값 검증 함수
           * - 값이 유효한 경우 true 반환
           * - 값이 유효하지 않은 경우 false 반환
           * @param values - 전체 값 객체
           */
          required?: boolean;
          fn?: (values: Record<string, any>) => boolean;
          // 필수 값 오류 발생 시 표시할 메시지 (옵션)
          message?: string;
          // 필수 값 오류 발생 위치
          path?: string;
        };
    /**
     * 값의 유효성 조건 설정 (다중 조건 가능)
     * - 여러 개의 조건을 배열로 설정 가능
     */
    conditions?: {
      /**
       * 값 검증 함수
       * - 값이 유효한 경우 true 반환
       * - 값이 유효하지 않은 경우 false 반환
       * @param values - 전체 값 객체
       */
      fn: (values: Record<string, any>) => boolean;

      /**
       * 오류 발생 시 표시할 메시지 (옵션)
       */
      message?: string;

      /**
       * 오류가 발생한 값의 위치 설정 (옵션)
       * - 값이 속한 필드 이름 설정 가능
       */
      path?: string;
    }[];
  };
};
