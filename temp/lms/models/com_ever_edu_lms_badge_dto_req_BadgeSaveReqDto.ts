/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_badge_dto_req_BadgeComponentSaveReqDto } from './com_ever_edu_lms_badge_dto_req_BadgeComponentSaveReqDto';
export type com_ever_edu_lms_badge_dto_req_BadgeSaveReqDto = {
    /**
     * 뱃지 그룹 ID
     */
    badgeGroupId?: number;
    /**
     *  뱃지컴포넌트 리스트
     */
    badgeComponentList?: Array<com_ever_edu_lms_badge_dto_req_BadgeComponentSaveReqDto>;
    /**
     * 배지명
     */
    badgeName?: string;
    /**
     * 승급조건 갯수
     */
    badgeCompletionCourseCount?: number;
    badgeType?: com_ever_edu_lms_badge_dto_req_BadgeSaveReqDto.badgeType;
};
export namespace com_ever_edu_lms_badge_dto_req_BadgeSaveReqDto {
    export enum badgeType {
        PATH = 'PATH',
        POOL = 'POOL',
    }
}

