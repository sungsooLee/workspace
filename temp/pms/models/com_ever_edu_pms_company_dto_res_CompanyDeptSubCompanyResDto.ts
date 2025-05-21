/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 회사정보
 */
export type com_ever_edu_pms_company_dto_res_CompanyDeptSubCompanyResDto = {
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 회사코드
     */
    companyCode?: string;
    /**
     * 회사유형코드
     */
    companyType?: com_ever_edu_pms_company_dto_res_CompanyDeptSubCompanyResDto.companyType;
    /**
     * 회사명
     */
    name?: string;
    /**
     * 회사영문명
     */
    engName?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_company_dto_res_CompanyDeptSubCompanyResDto {
    /**
     * 회사유형코드
     */
    export enum companyType {
        CAR = 'CAR',
        GROUP = 'GROUP',
        HYUNDAI_GLOBAL = 'HYUNDAI_GLOBAL',
        HYUNDAI_GLOBAL_DEALER = 'HYUNDAI_GLOBAL_DEALER',
        HYUNDAI_SALES = 'HYUNDAI_SALES',
        HYUNDAI_SERVICE = 'HYUNDAI_SERVICE',
        HYUNDAI_PRODUCTION = 'HYUNDAI_PRODUCTION',
        KIA_GLOBAL = 'KIA_GLOBAL',
        KIA_GLOBAL_DEALER = 'KIA_GLOBAL_DEALER',
        KIA_SALES = 'KIA_SALES',
        KIA_SERVICE = 'KIA_SERVICE',
        KIA_PRODUCTION = 'KIA_PRODUCTION',
        CP = 'CP',
        ETC = 'ETC',
    }
}

