/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 회사로그인제한 설정정보
 */
export type com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionDetailReqDto = {
    /**
     * 회사로그인제한정보 ID
     */
    companyLoginRestrictionId?: number;
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 회사로그인제한 설정정보 ID
     */
    companyLoginRestrictionDetailId?: number;
    /**
     * 요일
     */
    dayOfWeekType?: com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionDetailReqDto.dayOfWeekType;
    /**
     * 제한시간(HH:mm)
     */
    startTime?: string;
    /**
     * 제한시간(HH:mm)
     */
    endTime?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionDetailReqDto {
    /**
     * 요일
     */
    export enum dayOfWeekType {
        MONDAY = 'MONDAY',
        TUESDAY = 'TUESDAY',
        WEDNESDAY = 'WEDNESDAY',
        THURSDAY = 'THURSDAY',
        FRIDAY = 'FRIDAY',
        SATURDAY = 'SATURDAY',
        SUNDAY = 'SUNDAY',
    }
}

