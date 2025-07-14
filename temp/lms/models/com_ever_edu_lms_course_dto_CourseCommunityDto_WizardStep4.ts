/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 커뮤니티[공지/자료실/커뮤니티/공유] 설정 내용
 */
export type com_ever_edu_lms_course_dto_CourseCommunityDto_WizardStep4 = {
    /**
     * 커뮤니티 타입
     */
    communityType?: com_ever_edu_lms_course_dto_CourseCommunityDto_WizardStep4.communityType;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_lms_course_dto_CourseCommunityDto_WizardStep4 {
    /**
     * 커뮤니티 타입
     */
    export enum communityType {
        NOTICE = 'NOTICE',
        QNA = 'QNA',
        MARTIAL = 'MARTIAL',
        COMMUNITY = 'COMMUNITY',
    }
}

