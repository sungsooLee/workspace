import { CODE_GROUP_TYPE } from './constants';

export type CodeOption = {
  label: string;
  value: string;
  [key: string]: any;
};
export type Code = {
  [K in CODE_GROUP_TYPE]: CodeOption[]; // 예시: 각 그룹의 코드 리스트
};

export interface CodeStore {
  code: Partial<Code>; // 초기엔 일부만 들어올 수 있으므로 Partial
  setCode: <K extends CODE_GROUP_TYPE>(group: K, data: Code[K]) => void;
  getCode: <K extends CODE_GROUP_TYPE>(group: K) => Promise<Code[K]>;
  reset: () => void;
}

export type CodeApiConfig = {
  [K in CODE_GROUP_TYPE]: {
    api?: () => Promise<CodeOption[]>;
    options?: CodeOption[];
    name?: string;
    description?: string;
  };
};
