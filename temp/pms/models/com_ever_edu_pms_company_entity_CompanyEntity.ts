/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_company_entity_CompanyEntity = {
    firstRegTmstamp?: string;
    finalUpdateTmstamp?: string;
    firstRgstrId?: string;
    finalUpdaterId?: string;
    companyId?: number;
    uuid?: string;
    companyCode?: string;
    companyTypeCode?: com_ever_edu_pms_company_entity_CompanyEntity.companyTypeCode;
    name?: string;
    engName?: string;
    useYn?: boolean;
    brn?: string;
    rpsntrName?: string;
    basicAddress?: string;
    detailAddress?: string;
    postNo?: string;
};
export namespace com_ever_edu_pms_company_entity_CompanyEntity {
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

