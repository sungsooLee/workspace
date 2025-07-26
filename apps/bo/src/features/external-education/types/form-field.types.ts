// 기본 필드 타입 정의
export type FieldType =
  | 'input'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'date'
  | 'dateRange'
  | 'time'
  | 'number'
  | 'phone'
  | 'email'
  | 'file'
  | 'address'
  | 'experience'
  | 'custom';

// 기본 필드 설정 인터페이스
export interface BaseFieldConfig {
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  description?: string;
  validation?: {
    pattern?: string;
    message?: string;
  };
}

// 옵션이 있는 필드를 위한 인터페이스
export interface FieldOption {
  label: string;
  value: string | number;
}

// 각 타입별 필드 설정
export interface InputFieldConfig extends BaseFieldConfig {
  type: 'input' | 'textarea' | 'email' | 'phone' | 'number';
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'radio' | 'checkbox' | 'select';
  options: FieldOption[];
  multiple?: boolean;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: 'date' | 'dateRange' | 'time';
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: 'file';
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

export interface CustomFieldConfig extends BaseFieldConfig {
  type: 'custom';
  componentName: string;
  props?: Record<string, unknown>;
}

// 통합 필드 설정 타입
export type FieldConfig =
  | InputFieldConfig
  | SelectFieldConfig
  | DateFieldConfig
  | FileFieldConfig
  | CustomFieldConfig;

// 전체 필드 설정 (커스텀 외의 모든 항목 정의)
export const DEFAULT_FIELD_CONFIG: Record<string, FieldConfig> = {
  // 기본 정보 필드들
  부서명: {
    type: 'input',
    label: '부서명',
    placeholder: '부서명을 입력하세요',
    maxLength: 50,
    required: true,
  },
  COURSE_DESCRIPTION: {
    type: 'input',
    label: '교육내용',
    placeholder: '교육내용을 입력하세요',
    maxLength: 50,
    required: true,
  },
  COURSE_INSTITUTION: {
    type: 'input',
    label: '교육기관명',
    placeholder: '교육기관명을 입력하세요',
    maxLength: 50,
    required: true,
  },
  COURSE_SATISFACTION: {
    type: 'input',
    label: '교육 만족도',
    maxLength: 50,
    required: true,
  },
  JOB_SATISFACTION: {
    type: 'input',
    label: '직무관련성 만족도',
    maxLength: 50,
    required: true,
  },

  SCORE: {
    type: 'input',
    label: '점수',
    placeholder: '점수를 입력하세요',
    maxLength: 50,
    required: true,
  },
  IS_COMPLETED: {
    type: 'radio',
    label: '수료여부',
    placeholder: '교육 만족도를 입력하세요',
    maxLength: 50,
    options: [
      { label: '수료', value: 'true' },
      { label: '미수료', value: 'false' },
    ],
  },

  COURSE_NAME: {
    type: 'input',
    label: '교육명',
    placeholder: '교육명을 입력하세요',
    maxLength: 100,
    required: true,
  },
  COURSE_TYPE: {
    type: 'radio',
    label: '교육형태',
    required: true,
    options: [
      { label: '온라인', value: 'online' },
      { label: '오프라인', value: 'offline' },
      { label: '하이브리드', value: 'hybrid' },
    ],
  },
  성별: {
    type: 'radio',
    label: '성별',
    options: [
      { label: '남성', value: 'male' },
      { label: '여성', value: 'female' },
      { label: '선택 안함', value: 'none' },
    ],
  },
  학력: {
    type: 'select',
    label: '최종학력',
    placeholder: '학력을 선택하세요',
    options: [
      { label: '고등학교', value: 'highschool' },
      { label: '전문대학', value: 'college' },
      { label: '대학교', value: 'university' },
      { label: '대학원', value: 'graduate' },
    ],
  },
  보유기술: {
    type: 'checkbox',
    label: '보유기술',
    description: '보유하고 있는 기술을 모두 선택하세요',
    multiple: true,
    options: [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'React', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Node.js', value: 'nodejs' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
      { label: 'C#', value: 'csharp' },
    ],
  },
  외국어: {
    type: 'checkbox',
    label: '가능한 외국어',
    description: '업무에 활용 가능한 외국어를 선택하세요',
    multiple: true,
    options: [
      { label: '영어', value: 'english' },
      { label: '중국어', value: 'chinese' },
      { label: '일본어', value: 'japanese' },
      { label: '독일어', value: 'german' },
      { label: '프랑스어', value: 'french' },
      { label: '스페인어', value: 'spanish' },
    ],
  },

  // 날짜/시간 필드들
  COURSE_START_DATE: {
    type: 'date',
    label: '교육시작일',
    required: true,
    minDate: new Date().toISOString().split('T')[0], // 오늘 날짜까지
  },
  COURSE_END_DATE: {
    type: 'date',
    label: '교육종료일',
    required: true,
    minDate: new Date().toISOString().split('T')[0], // 오늘 날짜까지
  },
  교육희망일: {
    type: 'dateRange',
    label: '교육 희망 기간',
    description: '교육을 희망하는 시작일과 종료일을 선택하세요',
    minDate: new Date().toISOString().split('T')[0], // 오늘부터
  },
  수강가능시간: {
    type: 'radio',
    label: '수강 가능 시간대',
    options: [
      { label: '오전 (09:00-12:00)', value: 'morning' },
      { label: '오후 (13:00-18:00)', value: 'afternoon' },
      { label: '저녁 (19:00-22:00)', value: 'evening' },
      { label: '주말', value: 'weekend' },
    ],
  },

  // 텍스트 영역 필드들
  경력사항: {
    type: 'textarea',
    label: '경력사항',
    placeholder: '관련 경력사항을 상세히 입력하세요',
    maxLength: 1000,
    description: '최대 1000자까지 입력 가능합니다',
  },
  지원동기: {
    type: 'textarea',
    label: '지원동기',
    placeholder: '교육 참여 동기와 목표를 입력하세요',
    maxLength: 500,
    required: true,
  },
  특이사항: {
    type: 'textarea',
    label: '특이사항',
    placeholder: '교육 진행 시 고려사항이나 요청사항을 입력하세요',
    maxLength: 300,
  },

  // 파일 업로드 필드들
  증명서류: {
    type: 'file',
    label: '증명서류',
    description: '학위증명서, 자격증 등 관련 서류를 첨부하세요',
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: 10485760, // 10MB
    multiple: true,
  },
  포트폴리오: {
    type: 'file',
    label: '포트폴리오',
    description: '작업물이나 프로젝트 자료를 첨부하세요 (선택사항)',
    accept: '.pdf,.ppt,.pptx,.doc,.docx',
    maxSize: 20971520, // 20MB
  },

  // 숫자 입력 필드들
  경력년수: {
    type: 'number',
    label: '총 경력년수',
    placeholder: '숫자만 입력하세요',
    validation: {
      pattern: '^[0-9]+$',
      message: '숫자만 입력 가능합니다',
    },
  },

  // 복합 필드들 (커스텀 컴포넌트 사용)
  //   주소: {
  //     type: 'custom',
  //     label: '주소',
  //     componentName: 'AddressField',
  //     description: '우편번호 검색을 통해 주소를 입력하세요',
  //     required: true,
  //   },
  //   경험상세: {
  //     type: 'custom',
  //     label: '상세 경험',
  //     componentName: 'ExperienceField',
  //     description: '프로젝트별 상세 경험을 입력하세요',
  //     props: {
  //       maxEntries: 5,
  //       showDuration: true,
  //     },
  //   },
  //   기술평가: {
  //     type: 'custom',
  //     label: '기술 수준 평가',
  //     componentName: 'SkillRatingField',
  //     description: '각 기술에 대한 본인의 숙련도를 평가하세요',
  //     props: {
  //       ratingScale: 5,
  //       categories: ['프론트엔드', '백엔드', '데이터베이스', '클라우드'],
  //     },
  //   },
};
