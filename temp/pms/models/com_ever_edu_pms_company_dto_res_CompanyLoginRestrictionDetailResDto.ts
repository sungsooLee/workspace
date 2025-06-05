/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { java_time_LocalTime } from './java_time_LocalTime';
/**
 * 회사로그인제한 설정정보
 */
export type com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionDetailResDto = {
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
    dayOfWeekType?: com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionDetailResDto.dayOfWeekType;
    startTime?: java_time_LocalTime;
    endTime?: java_time_LocalTime;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 등록자ID
     */
    createdBy?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
    /**
     * 최종수정자ID
     */
    lastModifiedBy?: string;
    /**
     * 최종수정일시
     */
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionDetailResDto {
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

