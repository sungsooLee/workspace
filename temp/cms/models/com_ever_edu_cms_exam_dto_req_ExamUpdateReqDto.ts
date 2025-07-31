/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_tag_dto_req_TagReqDto } from './com_ever_edu_cms_tag_dto_req_TagReqDto';
export type com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto = {
    contentUuid: string;
    contentName?: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto.languageCountryCode;
    tenantId?: number;
    channelUuid?: string;
    description?: string;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    isUnlimited?: boolean;
    contentUseStartDate?: string;
    contentUseEndDate?: string;
    isVendored?: boolean;
    vendorCode?: number;
    vendorName?: string;
    vendorCoordinatorUuid?: string;
    vendorCoordinatorName?: string;
    vendorTelNo?: string;
    isCourseUsed?: boolean;
    isContentSecured?: boolean;
    isInspected?: boolean;
    isCopyrighted?: boolean;
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    contentAddInfoType?: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto.contentAddInfoType;
    /**
     * 콘텐츠 추가정보 코드 별 초/건수 값
     */
    contentAddInfo?: number;
    isSecured?: boolean;
    isDeleted?: boolean;
    isOpened?: boolean;
    tags?: Array<com_ever_edu_cms_tag_dto_req_TagReqDto>;
    /**
     * 시험지 유형
     */
    examTemplateType?: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto.examTemplateType | null;
    /**
     * 문항 수
     */
    questionCount: number;
    /**
     * 페이지별 문항 수
     */
    questionCountPerPage: number;
    /**
     * 시험 제한 시간(분)
     */
    examLimitTime: number;
    /**
     * 시험 최대 응시 가능 횟수
     */
    maxAttemptCount: number;
    /**
     * 시험 분류
     */
    examType?: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto.examType | null;
    /**
     * 문항 이동 제어 여부
     */
    isMoveQuestion?: boolean | null;
    /**
     * 시험 결과 공개 여부
     */
    isShowResult?: boolean | null;
    /**
     * 결과 공개 범위-총점
     */
    isShowTotalScore?: boolean | null;
    /**
     * 결과 공개 범위-시험문항
     */
    isShowQuestion?: boolean | null;
    /**
     * 결과 공개 범위-문항별채점
     */
    isShowScore?: boolean | null;
    /**
     * 결과 공개 범위-문항별정답
     */
    isShowCorrectAnswer?: boolean | null;
    /**
     * 결과 공개 범위-정답의해설
     */
    isShowAnswerExplain?: boolean | null;
    /**
     * 결과보기 가능 시점 분류 (시험 종료 후, 시험 제출 후)
     */
    resultVisibleTime?: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto.resultVisibleTime;
    /**
     * 재응시 시 오답 선택 비활성화 여부
     */
    isDisableWrongRetry?: boolean | null;
    /**
     * 제한시간 초과 시 자동제출 여부
     */
    isAutoSubmit?: boolean | null;
    /**
     * 시험 종료 안내 여부
     */
    isExamEndNotice?: boolean | null;
    /**
     * 시험 시간 종료 안내 기준 시간(분)
     */
    examEndNoticeOffsetMinutes?: number | null;
    /**
     * 시험 시간 종료 안내 메세지
     */
    examEndNoticeMessage?: string | null;
    /**
     * 문항 출제 유형 (선택적 문항, 랜덤형 문항)
     */
    questionGenType?: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto.questionGenType;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto {
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    export enum languageCountryCode {
        KO = 'KO',
        EN = 'EN',
        ES = 'ES',
        AR = 'AR',
        RU = 'RU',
        FR = 'FR',
        PT = 'PT',
        ID = 'ID',
        ZH = 'ZH',
        VI = 'VI',
        TR = 'TR',
        TH = 'TH',
        DE = 'DE',
        HE = 'HE',
        NE = 'NE',
        FA = 'FA',
        HI = 'HI',
        JA = 'JA',
        MS = 'MS',
        IT = 'IT',
        SK = 'SK',
        RO = 'RO',
        HR = 'HR',
        ET = 'ET',
    }
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
    }
    /**
     * 시험지 유형
     */
    export enum examTemplateType {
        EXAM = 'EXAM',
        OMR = 'OMR',
        QUIZ = 'QUIZ',
    }
    /**
     * 시험 분류
     */
    export enum examType {
        PRE_TEST = 'PRE_TEST',
        PROGRESS_TEST = 'PROGRESS_TEST',
        POST_TEST = 'POST_TEST',
    }
    /**
     * 결과보기 가능 시점 분류 (시험 종료 후, 시험 제출 후)
     */
    export enum resultVisibleTime {
        ON_SUBMIT = 'ON_SUBMIT',
        ON_EXAM_END = 'ON_EXAM_END',
    }
    /**
     * 문항 출제 유형 (선택적 문항, 랜덤형 문항)
     */
    export enum questionGenType {
        FIXED = 'FIXED',
        RANDOM = 'RANDOM',
    }
}

