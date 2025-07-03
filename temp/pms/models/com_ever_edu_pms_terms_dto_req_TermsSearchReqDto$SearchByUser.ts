/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser = {
    /**
     * 약관 NO
     */
    termsId?: number | null;
    /**
     * 약관유형
     */
    termsTypeCode?: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser.termsTypeCode | null;
    /**
     * 언어코드
     */
    locale?: string | null;
};
export namespace com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser {
    /**
     * 약관유형
     */
    export enum termsTypeCode {
        TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
        PRIVACY_POLICY = 'PRIVACY_POLICY',
        SENSITIVE_PERSONAL_INFO = 'SENSITIVE_PERSONAL_INFO',
        PERSONAL_INFO_COLLECTION = 'PERSONAL_INFO_COLLECTION',
    }
}

