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
    isUseEditableDept?: boolean;
    isUseLinkageSystem?: boolean;
    linkageType?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.linkageType;
    linkageSystem?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.linkageSystem;
    isUseSso?: boolean;
    ssoType?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.ssoType;
    isUseTwoFactorAuth?: boolean;
    twoFactorAuthType?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.twoFactorAuthType;
    isUsePhoneAuth?: boolean;
    isUseLoginLimitTime?: boolean;
    isUseWatermark?: boolean;
    watermarkText?: string;
    watermarkPosition?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.watermarkPosition;
    isUsePlayerControlLimit?: boolean;
    isUseFocusMode?: boolean;
    isUseCaptureBlock?: boolean;
    isUseApproval?: boolean;
    enrollApprovalMatrix?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.enrollApprovalMatrix;
    externalEnrollApprovalMatrix?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.externalEnrollApprovalMatrix;
    externalEnrollApplicationProcess?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.externalEnrollApplicationProcess;
    channelApprovalMatrix?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.channelApprovalMatrix;
    languageApprovalMatrix?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.languageApprovalMatrix;
    certificationApprovalMatrix?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.certificationApprovalMatrix;
    isUseExamFeeSupport?: boolean;
    examFeeApplicationProcess?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.examFeeApplicationProcess;
    isUseCompanyInfo?: boolean;
    hrDataSource?: com_ever_edu_pms_company_entity_CompanyAdditionalEntity.hrDataSource;
    managerDept?: string;
    managerPosition?: string;
    managerName?: string;
    managerPhone?: string;
    managerEmail?: string;
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
    export enum ssoType {
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
        AES = 'AES',
    }
    export enum twoFactorAuthType {
        MPASS = 'MPASS',
        MPASS_OTP = 'MPASS_OTP',
        MPASS_FIDO = 'MPASS_FIDO',
        GOOGLE_OTP = 'GOOGLE_OTP',
    }
    export enum watermarkPosition {
        TOP_LEFT = 'TOP_LEFT',
        TOP_CENTER = 'TOP_CENTER',
        TOP_RIGHT = 'TOP_RIGHT',
        MIDDLE_LEFT = 'MIDDLE_LEFT',
        MIDDLE_CENTER = 'MIDDLE_CENTER',
        MIDDLE_RIGHT = 'MIDDLE_RIGHT',
        BOTTOM_LEFT = 'BOTTOM_LEFT',
        BOTTOM_CENTER = 'BOTTOM_CENTER',
        BOTTOM_RIGHT = 'BOTTOM_RIGHT',
    }
    export enum enrollApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    export enum externalEnrollApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    export enum externalEnrollApplicationProcess {
        APPLICATION_REGISTER = 'APPLICATION_REGISTER',
        REGISTER = 'REGISTER',
    }
    export enum channelApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    export enum languageApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    export enum certificationApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    export enum examFeeApplicationProcess {
        APPLICATION_REGISTER = 'APPLICATION_REGISTER',
        REGISTER = 'REGISTER',
    }
    export enum hrDataSource {
        SAP = 'SAP',
        DMSS = 'DMSS',
        MANUAL = 'MANUAL',
        REGISTER = 'REGISTER',
        ETC = 'ETC',
    }
}

