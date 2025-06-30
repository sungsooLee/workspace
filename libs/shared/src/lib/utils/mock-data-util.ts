import { t } from 'i18next';
import { SelectOption } from '../types/select-option';

/**
 * 년도 옵션을 만들어준다.
 * 올해 기준으로 이전 년도.....
 */
export const generateYears = (count: number): SelectOption[] => {
  const currentYear = new Date().getFullYear();
  return Array
    .from({ length: count + 1 }, (d, i) => currentYear - i)
    .map((d, i) => ({
      value: String(d),
      label: String(d),
    }) as SelectOption);
}

export const getMockCourseType = (key?: string) => {
  return [
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'ELEARNING1',
      cdName: '이러닝(상시)' + (key ? ' - ' + key : ''),
      cdContent: 'ELEARNING1 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.ELEARNING1',
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'ELEARNING2',
      cdName: '이러닝(정규)' + (key ? ' - ' + key : ''),
      cdContent: 'ELEARNING2 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.ELEARNING2',
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'CLASS',
      cdName: '클래스' + (key ? ' - ' + key : ''),
      cdContent: 'CLASS 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.CLASS',
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'LIVE',
      cdName: 'LIVE' + (key ? ' - ' + key : ''),
      cdContent: 'LIVE 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.LIVE',
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'EXAM',
      cdName: '시험' + (key ? ' - ' + key : ''),
      cdContent: 'EXAM 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.EXAM',
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'SURVEY',
      cdName: '설문' + (key ? ' - ' + key : ''),
      cdContent: 'SURVEY 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.SURVEY',
    },
  ];
};

export const getMockOption = (codeGroup: string) => {
  // 테스트
  if (codeGroup === 'test') {
    return [
      { label: 'test1', value: 'test1' },
      { label: 'test2', value: 'test2' },
      { label: 'test3', value: 'test3' },
    ];
  }
  // 미사용/사용
  if (codeGroup === 'mock.options.use') {
    return [
      {
        value: 'N',
        label: t('LABEL.mock.unuse'),
      },
      {
        value: 'Y',
        label: t('LABEL.mock.use'),
      },
    ];
  }
  // 불가능/가능
  if (codeGroup === 'mock.options.possible') {
    return [
      {
        value: 'N',
        label: t('LABEL.mock.impossible'),
      },
      {
        value: 'Y',
        label: t('LABEL.mock.possible'),
      },
    ];
  }
  // testCourseType
  if (codeGroup === 'testCourseType') {
    return getMockCourseType();
  }
  // default
  return [];
};
