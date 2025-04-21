/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_api_entity_ApiEntity } from './com_ever_edu_pms_api_entity_ApiEntity';
import type { com_ever_edu_pms_company_entity_CompanyAdditionalEntity } from './com_ever_edu_pms_company_entity_CompanyAdditionalEntity';
export type com_ever_edu_pms_company_entity_CompanyEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    companyId?: number;
    companyUuid?: string;
    companyCode?: string;
    companyType?: com_ever_edu_pms_company_entity_CompanyEntity.companyType;
    name?: string;
    engName?: string;
    isUsed?: boolean;
    brn?: string;
    rpsntrName?: string;
    basicAddress?: string;
    detailAddress?: string;
    postNo?: string;
    parentCompanyId?: com_ever_edu_pms_api_entity_ApiEntity;
    faxNo?: string;
    abbreviationName?: string;
    companyAdditionalEntity?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity;
};
export namespace com_ever_edu_pms_company_entity_CompanyEntity {
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
        ETC = 'ETC',
    }
}

