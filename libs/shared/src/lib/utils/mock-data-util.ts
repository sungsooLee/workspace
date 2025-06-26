import { t } from 'i18next';


export const getMockCourseType = (key?: string) => {
  return [
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'ELEARNING1',
      cdName: '이러닝(상시)',
      cdContent: 'ELEARNING1 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.ELEARNING1',
      key,
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'ELEARNING2',
      cdName: '이러닝(정규)',
      cdContent: 'ELEARNING2 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.ELEARNING2',
      key,
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'CLASS',
      cdName: '클래스',
      cdContent: 'CLASS 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.CLASS',
      key,
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'LIVE',
      cdName: 'LIVE',
      cdContent: 'LIVE 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.LIVE',
      key,
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'EXAM',
      cdName: '시험',
      cdContent: 'EXAM 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.EXAM',
      key,
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'SURVEY',
      cdName: '설문',
      cdContent: 'SURVEY 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.SURVEY',
      key,
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
  //
  return [];
};
