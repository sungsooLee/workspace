/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_badge_dto_req_BadgeGroupUpdateReqDto = {
    /**
     * 뱃지 그룹 ID
     */
    badgeGroupId?: number;
    /**
     * 뱃지 타입
     */
    badgeType?: com_ever_edu_lms_badge_dto_req_BadgeGroupUpdateReqDto.badgeType;
    /**
     * 뱃지 그룹 명
     */
    badgeGroupName?: string;
    /**
     * 테넌트 아이디
     */
    tenantId?: number;
    /**
     * 삭제 여부
     */
    isDeleted?: boolean;
};
export namespace com_ever_edu_lms_badge_dto_req_BadgeGroupUpdateReqDto {
    /**
     * 뱃지 타입
     */
    export enum badgeType {
        PATH = 'PATH',
        POOL = 'POOL',
    }
}

