/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_holiday_dto_res_HolidayResDto = {
    /**
     * 휴일관리 ID
     */
    holidayId?: number;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 테넌트 명
     */
    tenantName?: string;
    /**
     * 회사코드
     */
    companyCode?: string;
    /**
     * 회사 명
     */
    companyName?: string;
    /**
     * 휴일 유형 enum : HolidayType
     */
    holidayType?: com_ever_edu_pms_holiday_dto_res_HolidayResDto.holidayType;
    /**
     * 휴일명
     */
    holidayName?: string;
    /**
     * 휴일기간 시작일(yyyyMMdd)
     */
    startDate?: string;
    /**
     * 휴일기간 종료일(yyyyMMdd)
     */
    endDate?: string;
    /**
     * 휴일 내용
     */
    holidayDesc?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_holiday_dto_res_HolidayResDto {
    /**
     * 휴일 유형 enum : HolidayType
     */
    export enum holidayType {
        LEGAL_HOLIDAY = 'LEGAL_HOLIDAY',
        REPLACED_HOLIDAY = 'REPLACED_HOLIDAY',
        TEMPORARY_HOLIDAY = 'TEMPORARY_HOLIDAY',
        COMPANY_HOLIDAY = 'COMPANY_HOLIDAY',
        ETC_HOLIDAY = 'ETC_HOLIDAY',
    }
}

