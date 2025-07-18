import { FieldValues } from 'react-hook-form';
import { t } from 'i18next';
import dayjs from 'dayjs';
import { formatPlainPhoneNumber } from '@learnway/shared';
import {
  ContentAddInfoType,
  ExamQuestionGenType,
  ExamTemplateType,
  TestPaperBasicInfoDetail,
  TestPaperBasicInfoSaveReq,
} from '@types';
import { PageMode, TestPaperBasicInfoFormData } from './type';

export const getExamSaveRequestDataFromFormData = (options: {
  values: TestPaperBasicInfoFormData;
  mode: PageMode;
  contentUuid?: string;
}): TestPaperBasicInfoSaveReq => {
  const payload = {
    ...options.values,
    contentUseStartDate: options.values.contentUseDate?.from,
    contentUseEndDate: options.values.contentUseDate?.to,
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

  if (options.mode === PageMode.UPDATE) {
    Object.assign(payload, {
      contentUuid: options.contentUuid,
      questionGenType: options.values.questionGenType,
    });
  }

  delete payload.contentUseDate;

  console.log('payload ===>', payload);

  return payload;
};

export const convertDetailInfoToFormData = (
  data: Partial<TestPaperBasicInfoDetail> = {},
  values: FieldValues,
  updateFormData: (data?: Record<string, any>) => void,
) => {
  updateFormData({
    ...values,
    contentUuid: data.contentUuid,
    contentName: data.contentName,
    channelUuid: data.channelUuid,
    channelName: data.channelName,
    languageCountryCode: data.languageCountryCode,
    description: data.description,
    coordinatorUuid: data.coordinatorUuid,
    coordinatorName: data.coordinatorName,
    coordinatorTelNo: formatPlainPhoneNumber(data.coordinatorTelNo),
    contentUseDate: {
      from: data.contentUseStartDate ? dayjs(data.contentUseStartDate).toDate() : undefined,
      to: data.contentUseEndDate ? dayjs(data.contentUseEndDate).toDate() : undefined,
    },
    isUnlimited: data.isUnlimited,
    isVendored: data.isVendored,
    vendorName: data.vendorName ?? '',
    vendorCoordinatorName: data.vendorCoordinatorName ?? '',
    vendorTelNo: formatPlainPhoneNumber(data.vendorTelNo) ?? '',
    isCourseUsed: data.isCourseUsed,
    isContentSecured: data.isSecured,
    isInspected: data.isInspected,
    isCopyrighted: data.isCopyrighted,
    tags: data.tags,
    examTemplateType: data.examTemplateType,
    questionCount: data.questionCount,
    questionCountPerPage: data.questionCountPerPage,
    examLimitTime: data.examLimitTime,
    maxAttemptCount: data.maxAttemptCount,
    isMoveQuestion: data.isMoveQuestion,
    isShowResult: data.isShowResult,
    isShowTotalScore: data.isShowTotalScore,
    isShowQuestion: data.isShowQuestion,
    isShowScore: data.isShowScore,
    isShowCorrectAnswer: data.isShowCorrectAnswer,
    isShowAnswerExplain: data.isShowAnswerExplain,
    resultVisibleTime: data.resultVisibleTime,
    isDisableWrongRetry: data.isDisableWrongRetry,
    isAutoSubmit: data.isAutoSubmit,
    isExamEndNotice: data.isExamEndNotice,
    examEndNoticeOffsetMinutes: data.examEndNoticeOffsetMinutes,
    examEndNoticeMessage: data.examEndNoticeMessage,
    questionGenType: data.questionGenType ?? ExamQuestionGenType.FIXED,
  });
};

export const EXAM_TEMPLATE_TYPES = Object.freeze({
  [ExamTemplateType.EXAM]: t('일반 시험지'),
  [ExamTemplateType.OMR]: t('OMR 시험지'),
  [ExamTemplateType.QUIZ]: t('OX 퀴즈'),
});

export const getExamTemplateTextByType = (type?: ExamTemplateType): string => {
  if (!type) {
    return '';
  }

  return EXAM_TEMPLATE_TYPES[type];
};
