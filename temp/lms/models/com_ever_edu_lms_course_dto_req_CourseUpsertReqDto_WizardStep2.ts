/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2 = {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.wizardStep;
    /**
     * 수강신청 사용 여부
     */
    isEnrollRequired: boolean;
    /**
     * 수강신청 결재 라인 (pms.course.ApprovalLineType)
     */
    approvalLineType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.approvalLineType;
    /**
     * 수강 신청 정원 제한 여부
     */
    isMaxEnrollQuotaRestricted?: boolean;
    /**
     * 수강 신청 정원
     */
    maxEnrollQuota?: number;
    /**
     * 수강 신청 대기자 선정 방식 (lms.course.WaitListPickMethodType)
     */
    waitListPickMethodType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.waitListPickMethodType;
    /**
     * 최대 대기 인원
     */
    maxWaitlistQuota?: number;
    /**
     * 중복 수강신청 제한 여부
     */
    isDuplicateEnrollAllowed?: boolean;
    /**
     * 위탁 소유 회사 ID
     */
    outsourcingCompanyId?: number;
    /**
     * 위탁 소유 회사 이름
     */
    outsourcingCompanyName?: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2 {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    /**
     * 수강신청 결재 라인 (pms.course.ApprovalLineType)
     */
    export enum approvalLineType {
        NONE = 'NONE',
        LEADER = 'LEADER',
        OPERATOR = 'OPERATOR',
        LEADER_OPERATOR = 'LEADER_OPERATOR',
        DEPEND_COMPANY = 'DEPEND_COMPANY',
    }
    /**
     * 수강 신청 대기자 선정 방식 (lms.course.WaitListPickMethodType)
     */
    export enum waitListPickMethodType {
        NONE = 'NONE',
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

