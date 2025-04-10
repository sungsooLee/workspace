/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_company_dto_req_CompanyCreateReqDto = {
    /**
     * 회사코드
     */
    companyCode: string;
    /**
     * 회사유형코드
     */
    companyTypeCode?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.companyTypeCode;
    /**
     * 회사명
     */
    name: string;
    /**
     * 회사영문명
     */
    engName?: string;
    /**
     * 사업자등록번호
     */
    brn?: string;
    /**
     * 대표자명
     */
    rpsntrName?: string;
    /**
     * 기본주소
     */
    basicAddress?: string;
    /**
     * 상세주소
     */
    detailAddress?: string;
    /**
     * 우편번호
     */
    postNo?: string;
};
export namespace com_ever_edu_pms_company_dto_req_CompanyCreateReqDto {
    /**
     * 회사유형코드
     */
    export enum companyTypeCode {
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
        ETC = 'ETC',
    }
}

