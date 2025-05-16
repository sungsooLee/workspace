import { CodeApiOption } from './types';
import { CODE_GROUP } from './constants';

/**
 * 기본 코드 조회 API 가 아닌 케이스만 작성 해준다.
 */
export const codeOptions: CodeApiOption = {
  [CODE_GROUP.MULTILINGUAL_KEY_TYPE_CODE]: {
    name: '다국어 키타입 코드',
    description: '다국어 키타입 코드',
    options: [
      {
        value: 'en',
        label: 'English',
      },
    ],
  },
};
