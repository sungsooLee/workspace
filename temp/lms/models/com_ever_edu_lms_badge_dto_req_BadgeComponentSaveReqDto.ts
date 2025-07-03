/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 *  뱃지컴포넌트 리스트
 */
export type com_ever_edu_lms_badge_dto_req_BadgeComponentSaveReqDto = {
    /**
     * 뱃지 내 과정 or 시험정보
     */
    badgeComponentType?: com_ever_edu_lms_badge_dto_req_BadgeComponentSaveReqDto.badgeComponentType;
    /**
     * 뱃지 내 순서
     */
    sortOrder?: number;
    /**
     * 뱃지 내 과정 or 시험 mapping Id
     */
    mappingId?: number;
};
export namespace com_ever_edu_lms_badge_dto_req_BadgeComponentSaveReqDto {
    /**
     * 뱃지 내 과정 or 시험정보
     */
    export enum badgeComponentType {
        COURSE = 'COURSE',
        EXAM = 'EXAM',
    }
}

