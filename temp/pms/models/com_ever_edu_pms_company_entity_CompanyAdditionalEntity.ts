/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_entity_CompanyEntity } from './com_ever_edu_pms_company_entity_CompanyEntity';
export type com_ever_edu_pms_company_entity_CompanyAdditionalEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    id?: number;
    companyEntity?: com_ever_edu_pms_company_entity_CompanyEntity;
    serviceType?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.serviceType;
    paymentCompanyCode?: string;
    useEditableDept?: boolean;
    useLinkageSystem?: boolean;
    linkageType?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.linkageType;
    linkageSystem?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.linkageSystem;
};
export namespace com_ever_edu_pms_company_entity_CompanyAdditionalEntity {
    export enum serviceType {
        CONSIGNMENT = 'CONSIGNMENT',
        BASIC = 'BASIC',
        CORE = 'CORE',
        ENTERPRISE = 'ENTERPRISE',
    }
    export enum linkageType {
        INTERFACE = 'INTERFACE',
        FTP = 'FTP',
    }
    export enum linkageSystem {
        GIM = 'GIM',
        HSW = 'HSW',
        KSW = 'KSW',
        DMSSH = 'DMSSH',
        DMSSK = 'DMSSK',
        DDMSH = 'DDMSH',
        DDMSK = 'DDMSK',
        VAATZ = 'VAATZ',
    }
}

