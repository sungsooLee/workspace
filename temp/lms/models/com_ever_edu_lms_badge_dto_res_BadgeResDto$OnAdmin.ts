/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_badge_dto_res_BadgeComponentResDto$OnAdmin } from './com_ever_edu_lms_badge_dto_res_BadgeComponentResDto$OnAdmin';
export type com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin = {
    badgeId?: number;
    badgeUuid?: string;
    badgeType?: com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin.badgeType;
    badgeName?: string;
    badgeCompletionCourseCount?: number;
    isExpired?: boolean;
    badgeComponentList?: Array<com_ever_edu_lms_badge_dto_res_BadgeComponentResDto$OnAdmin>;
};
export namespace com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin {
    export enum badgeType {
        PATH = 'PATH',
        POOL = 'POOL',
    }
}

