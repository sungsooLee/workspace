import { TFunction } from 'i18next';
import dayjs from 'dayjs';
import {
  ContentAddInfoType,
  ExamQuestionGenType,
  ExamTemplateType,
  Tag,
  TestPaperBasicInfoDetail,
  TestPaperBasicInfoSaveReq,
} from '@types';
import { PageMode, TestPaperBasicInfoFormData } from './type';

export const getExamSaveRequestDataFromFormData = (options: {
  values: TestPaperBasicInfoFormData;
  contentUuid?: string;
}): TestPaperBasicInfoSaveReq => {
  const payload = {
    ...options.values,
    contentUseStartDate: options.values.contentUseDate?.from,
    contentUseEndDate: options.values.contentUseDate?.to,
    tags: options.values.tags.map((tag: Tag | string) => ({
      tagName: typeof tag === 'string' ? tag : tag.tagName,
    })),
    examTemplateType: options.values.examTemplateType,
    questionCount: Number(options.values.questionCount ?? '0'),
    questionCountPerPage: Number(options.values.questionCountPerPage ?? '0'),
    examLimitTime: Number(options.values.examLimitTime ?? '0'),
    maxAttemptCount: Number(options.values.maxAttemptCount ?? '0'),
    isMoveQuestion: options.values.isMoveQuestion,
    isShowResult: options.values.isShowResult,
    isShowTotalScore: options.values.isShowTotalScore,
    isShowQuestion: options.values.isShowQuestion,
    isShowScore: options.values.isShowScore,
    isShowCorrectAnswer: options.values.isShowCorrectAnswer,
    isShowAnswerExplain: options.values.isShowAnswerExplain,
    resultVisibleTime: options.values.resultVisibleTime,
    isDisableWrongRetry: options.values.isDisableWrongRetry,
    isAutoSubmit: options.values.isAutoSubmit,
    isExamEndNotice: options.values.isExamEndNotice,
    examEndNoticeOffsetMinutes: Number(options.values.examEndNoticeOffsetMinutes ?? '0'),
    examEndNoticeMessage: options.values.examEndNoticeMessage,
    contentAddInfoType: ContentAddInfoType.EXAM_ADD_INFO,
    contentAddInfo: Number(options.values.questionCount ?? '0'),
    questionGenType: ExamQuestionGenType.FIXED,
  };

  if (options.contentUuid) {
    Object.assign(payload, {
      contentUuid: options.contentUuid,
      questionGenType: options.values.questionGenType,
    });
  }

  delete payload.contentUseDate;

  return payload;
};

export const convertDetailInfoToFormData = (
  data: Partial<TestPaperBasicInfoDetail> = {},
  // values: FieldValues,
  onFormChange: (data?: Record<string, any>) => void,
) => {
  onFormChange({
    ...data,
    contentUseDate: {
      from: data.contentUseStartDate ? dayjs(data.contentUseStartDate).toDate() : undefined,
      to: data.contentUseEndDate ? dayjs(data.contentUseEndDate).toDate() : undefined,
    },
    questionGenType: data.questionGenType ?? ExamQuestionGenType.FIXED,
    tags: data.tags,
  });
};

export const EXAM_TEMPLATE_TYPES = (t: TFunction<'translation', undefined>) =>
  Object.freeze({
    [ExamTemplateType.EXAM]: t('일반 시험지'),
    [ExamTemplateType.OMR]: t('OMR 시험지'),
    [ExamTemplateType.QUIZ]: t('OX 퀴즈'),
  });

export const getExamTemplateTextByType = (
  type: ExamTemplateType,
  t: TFunction<'translation', undefined>,
): string => EXAM_TEMPLATE_TYPES(t)[type];

export const EXAM_GEN_TYPES = (t: TFunction<'translation', undefined>) =>
  Object.freeze({
    [ExamQuestionGenType.FIXED]: t('일반형'),
    [ExamQuestionGenType.RANDOM]: t('랜덤형'),
  });

export const getQuestionGenTypeText = (
  type: ExamQuestionGenType,
  t: TFunction<'translation', undefined>,
): string => EXAM_GEN_TYPES(t)[type];

export const getDropdownOptions = (types: object) =>
  Object.entries(types).map(([value, label]) => ({
    value,
    label,
  }));
