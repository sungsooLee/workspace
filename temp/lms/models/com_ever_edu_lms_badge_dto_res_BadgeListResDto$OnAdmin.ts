/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin = {
    badgeId?: number;
    badgeUuid?: string;
    badgeType?: com_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin.badgeType;
    badgeName?: string;
    isExpired?: boolean;
};
export namespace com_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin {
    export enum badgeType {
        PATH = 'PATH',
        POOL = 'POOL',
    }
}

