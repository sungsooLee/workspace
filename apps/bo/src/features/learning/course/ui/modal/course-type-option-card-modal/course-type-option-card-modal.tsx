import { IcoVideo01 } from '@learnway/icons';
import {
  CommonReactElementProps,
  ModalBody,
  ModalContainer,
  ModalTitle,
  OptionCard,
  useModal,
} from '@learnway/ui';
import { IcoVideo01, IcoVideo02, IcoClass, IcoLive, IcoSurvey, IcoEntrust } from '@learnway/icons';
import styles from './course-type-option-card-modal.module.css';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { mergeEnumDataWithKeys } from '@learnway/shared';
import { useCodeGroup } from '@learnway/hooks';

export interface CourseTypeOptionCardModalProps extends CommonReactElementProps {
  dummy?: boolean;
}

/**
 * 과정 유형 모달
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const CourseTypeOptionCardModalComponent = forwardRef<
  HTMLDivElement,
  CourseTypeOptionCardModalProps
>(({ ...props }, ref) => {
  const { t } = useTranslation();
  const { close: closeModal } = useModal();
  const { data: courseTypeData } = useCodeGroup('lms.course.CourseType', {}, getMockCourseType());

  const handleCardSelect = (option: any) => {
    closeModal?.(option);
  };

  // 로딩 상태일 때는 mock 데이터 사용, 실제 데이터가 있으면 그것을 사용
  const optionsData = getLocalOptions(courseTypeData || []).data;

  return (
    <ModalContainer>
      <ModalTitle>{t('과정 유형 선택')}</ModalTitle>
      <ModalBody>
        <div className={styles.wrap}>
          <OptionCard
            cols={3}
            size="lg"
            className={styles.select_wrap}
            options={optionsData}
            onOptionSelect={handleCardSelect}
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
});
export const CourseTypeOptionCardModal = CourseTypeOptionCardModalComponent;

const getMockCourseType = () => {
  return [
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'ELEARNING1',
      cdName: '이러닝(상시)',
      cdContent: 'ELEARNING1 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.ELEARNING1',
      referenceVal1: {
        allowedContentTypes: [
          'cms.content.ContentType.VIDEO',
          'cms.content.ContentType.EXAM',
          'cms.content.ContentType.ASSIGNMENT',
        ],
        enrollOption: 'IMPOSSIBLE',
        learningControlOption: 'OPTIONAL',
        communicationOption: 'OPTIONAL',
        passOption: 'MANDATORY',
        textBookOption: 'OPTIONAL',
        curriculumOption: 'OPTIONAL',
        adminDataOption: 'OPTIONAL',
        instructorOption: 'OPTIONAL',
        learningEnvOption: 'OPTIONAL',
        relatedCourseOption: 'OPTIONAL',
      },
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'ELEARNING2',
      cdName: '이러닝(정규)',
      cdContent: 'ELEARNING2 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.ELEARNING2',
      referenceVal1: {
        allowedContentTypes: [
          'cms.content.ContentType.VIDEO',
          'cms.content.ContentType.EXAM',
          'cms.content.ContentType.ASSIGNMENT',
        ],
        enrollOption: 'MANDATORY',
        learningControlOption: 'OPTIONAL',
        communicationOption: 'OPTIONAL',
        passOption: 'MANDATORY',
        textBookOption: 'OPTIONAL',
        curriculumOption: 'OPTIONAL',
        adminDataOption: 'OPTIONAL',
        instructorOption: 'OPTIONAL',
        learningEnvOption: 'OPTIONAL',
        relatedCourseOption: 'OPTIONAL',
      },
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'CLASS',
      cdName: '클래스',
      cdContent: 'CLASS 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.CLASS',
      referenceVal1: {
        allowedContentTypes: [
          'cms.content.ContentType.VIDEO',
          'cms.content.ContentType.EXAM',
          'cms.content.ContentType.SURVEY',
        ],
        enrollOption: 'MANDATORY',
        learningControlOption: 'OPTIONAL',
        communicationOption: 'OPTIONAL',
        passOption: 'MANDATORY',
        textBookOption: 'OPTIONAL',
        curriculumOption: 'OPTIONAL',
        adminDataOption: 'OPTIONAL',
        instructorOption: 'OPTIONAL',
        learningEnvOption: 'OPTIONAL',
        relatedCourseOption: 'OPTIONAL',
      },
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'LIVE',
      cdName: 'LIVE',
      cdContent: 'LIVE 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.LIVE',
      referenceVal1: {
        allowedContentTypes: ['cms.content.ContentType.SURVEY'],
        enrollOption: 'IMPOSSIBLE',
        learningControlOption: 'OPTIONAL',
        communicationOption: 'OPTIONAL',
        passOption: 'MANDATORY',
        textBookOption: 'OPTIONAL',
        curriculumOption: 'OPTIONAL',
        adminDataOption: 'OPTIONAL',
        instructorOption: 'OPTIONAL',
        learningEnvOption: 'IMPOSSIBLE',
        relatedCourseOption: 'OPTIONAL',
      },
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'EXAM',
      cdName: '시험',
      cdContent: 'EXAM 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.EXAM',
      referenceVal1: {
        allowedContentTypes: ['cms.content.ContentType.EXAM'],
        enrollOption: 'OPTIONAL',
        learningControlOption: 'OPTIONAL',
        communicationOption: 'OPTIONAL',
        passOption: 'OPTIONAL',
        textBookOption: 'OPTIONAL',
        curriculumOption: 'OPTIONAL',
        adminDataOption: 'OPTIONAL',
        instructorOption: 'OPTIONAL',
        learningEnvOption: 'IMPOSSIBLE',
        relatedCourseOption: 'OPTIONAL',
      },
    },
    {
      cdGroupId: 'lms.course.CourseType',
      cdId: 'SURVEY',
      cdName: '설문',
      cdContent: 'SURVEY 에 대한 설명입니다.(enum에서 정의해주세요.)',
      multilingualKey: 'lms.course.CourseType.SURVEY',
      referenceVal1: {
        allowedContentTypes: ['cms.content.ContentType.SURVEY'],
        enrollOption: 'IMPOSSIBLE',
        learningControlOption: 'OPTIONAL',
        communicationOption: 'OPTIONAL',
        passOption: 'IMPOSSIBLE',
        textBookOption: 'IMPOSSIBLE',
        curriculumOption: 'OPTIONAL',
        adminDataOption: 'OPTIONAL',
        instructorOption: 'IMPOSSIBLE',
        learningEnvOption: 'IMPOSSIBLE',
        relatedCourseOption: 'IMPOSSIBLE',
      },
    },
  ];
};

const getLocalOptions = (codeData?: any[]) => {
  const localData = [
    {
      label: '이러닝 I',
      value: 'ELEARNING1',
      icon: <IcoVideo01 />,
      description: '동영상(mp4)/이러닝(scorm) 온라인 학습 유형 (상시)',
    },
    {
      label: '이러닝 II',
      value: 'ELEARNING2',
      icon: <IcoVideo01 />,
      description: '동영상(mp4)/이러닝(scorm) 수강신청 후 온라인 학습 유형 (정규)',
    },
    {
      label: '클래스',
      value: 'CLASS',
      icon: <IcoVideo01 />,
      description: '집합/워크샵/포럼·컨퍼런스로 교수자/운영자가 존재하는 유형',
    },
    {
      label: '라이브',
      value: 'LIVE',
      icon: <IcoVideo01 />,
      description: 'Hive/WebEX 등 실시간 스트리밍을 수강신청 없이 개설 가능한 유형',
    },
    {
      label: '평가',
      value: 'EXAM',
      icon: <IcoVideo01 />,
      description: '시험지/퀴즈 등을 단독으로 진행할 때수강신청 여부는 선택이 가능한 유형',
    },
    {
      label: '설문',
      value: 'SURVEY',
      icon: <IcoVideo01 />,
      description: '설문을 단독 수행하려고 할 때수강신청 없이 개설이 가능한 유형',
    },
  ];
  return {
    data: mergeEnumDataWithKeys(codeData, localData),
const getLocalOptions = () => {
  return {
    data: [
      {
        label: '이러닝 I',
        value: '이러닝 I',
        icon: <IcoVideo01 />,
        description: '동영상(mp4)/이러닝(scorm) 온라인 학습 유형 (상시)',
      },
      {
        label: '이러닝 II',
        value: '이러닝 II',
        icon: <IcoVideo02 />,
        description: '동영상(mp4)/이러닝(scorm) 수강신청 후 온라인 학습 유형 (정규)',
      },
      {
        label: '클래스',
        value: '클래스',
        icon: <IcoClass />,
        description: '집합/워크샵/포럼·컨퍼런스로 교수자/운영자가 존재하는 유형',
      },
      {
        label: '라이브',
        value: '라이브',
        icon: <IcoLive />,
        description: 'Hive/WebEX 등 실시간 스트리밍을 수강신청 없이 개설 가능한 유형',
      },
      {
        label: '평가',
        value: '평가',
        icon: <IcoSurvey />,
        description: '시험지/퀴즈 등을 단독으로 진행할 때수강신청 여부는 선택이 가능한 유형',
      },
      {
        label: '설문',
        value: '설문',
        icon: <IcoEntrust />,
        description: '설문을 단독 수행하려고 할 때수강신청 없이 개설이 가능한 유형',
      },
    ],
  };
};
