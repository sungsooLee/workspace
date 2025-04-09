/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_terms_dto_res_TermsResDto$TranslationDto } from './com_ever_edu_pms_terms_dto_res_TermsResDto$TranslationDto';
export type com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin = {
    termsId?: number;
    termsName?: string;
    termsEffectiveDate?: string;
    termsTarget?: com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin.termsTarget;
    useYn?: boolean;
    deleteYn?: boolean;
    mandatoryYn?: boolean;
    termsTypeCode?: com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin.termsTypeCode;
    termsStatus?: com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin.termsStatus;
    termsOrder?: number;
    termsDesc?: string;
    termsVersion?: string;
    noticeStartDate?: string;
    noticeEndDate?: string;
    mailSendingDate?: string;
    snapshotYn?: boolean;
    snapshotDate?: string;
    timezone?: string;
    displayNationsYn?: boolean;
    noticeAutoSendingYn?: boolean;
    termsMappingTargetList?: Array<number>;
    termsTranslationLocaleList?: Array<string>;
    termsDisplayLocationCodeList?: Array<'LOGIN_PAGE' | 'SIGNUP_PAGE' | 'SITE'>;
    translations?: Array<com_ever_edu_pms_terms_dto_res_TermsResDto$TranslationDto>;
};
export namespace com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin {
    export enum termsTarget {
        ALL = 'ALL',
        TENANT = 'TENANT',
        USER_GROUP = 'USER_GROUP',
    }
    export enum termsTypeCode {
        TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
        PRIVACY_POLICY = 'PRIVACY_POLICY',
        SENSITIVE_PERSONAL_INFO = 'SENSITIVE_PERSONAL_INFO',
        PERSONAL_INFO_COLLECTION = 'PERSONAL_INFO_COLLECTION',
    }
    export enum termsStatus {
        PENDING = 'PENDING',
        PUBLISHED = 'PUBLISHED',
        EXPIRED = 'EXPIRED',
    }
}

