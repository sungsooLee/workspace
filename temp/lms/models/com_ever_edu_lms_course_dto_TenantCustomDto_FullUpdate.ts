/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 테넌트 전용 항목
 */
export type com_ever_edu_lms_course_dto_TenantCustomDto_FullUpdate = {
    tenantCustomType?: com_ever_edu_lms_course_dto_TenantCustomDto_FullUpdate.tenantCustomType;
    /**
     * 수강신청 단계에서 레벨테스트 수집 여부
     */
    isPreLevelTestRequired?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집 여부
     */
    isBookDeliveryInfoRequired?: boolean;
    /**
     * 튜터id
     */
    tutorId?: number;
    /**
     * 튜터 이름
     */
    tutorName?: string;
    /**
     * 위탁 소유 회사 ID
     */
    outsourcingCompanyId?: number;
    /**
     * 위탁 소유 회사 이름
     */
    outsourcingCompanyName?: string;
};
export namespace com_ever_edu_lms_course_dto_TenantCustomDto_FullUpdate {
    export enum tenantCustomType {
        CAR = 'CAR',
        ROTEM = 'ROTEM',
        OUTSOURCING = 'OUTSOURCING',
        WIA = 'WIA',
        AUTOEVER = 'AUTOEVER',
    }
}

