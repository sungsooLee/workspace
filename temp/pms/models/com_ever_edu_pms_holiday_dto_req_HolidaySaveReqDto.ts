/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_holiday_dto_req_HolidaySaveReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 회사코드
     */
    companyCode: string;
    /**
     * 휴일 유형
     */
    holidayType: com_ever_edu_pms_holiday_dto_req_HolidaySaveReqDto.holidayType;
    /**
     * 휴일명
     */
    holidayName: string;
    /**
     * 휴일기간 시작일(yyyy-MM-dd)
     */
    startDate: string;
    /**
     * 휴일기간 종료일(yyyyMMdd)
     */
    endDate: string;
    /**
     * 휴일 내용
     */
    holidayDesc?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_holiday_dto_req_HolidaySaveReqDto {
    /**
     * 휴일 유형
     */
    export enum holidayType {
        LEGAL_HOLIDAY = 'LEGAL_HOLIDAY',
        REPLACED_HOLIDAY = 'REPLACED_HOLIDAY',
        TEMPORARY_HOLIDAY = 'TEMPORARY_HOLIDAY',
        COMPANY_HOLIDAY = 'COMPANY_HOLIDAY',
        ETC_HOLIDAY = 'ETC_HOLIDAY',
    }
}

