/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_TutorRegisterReqDto = {
    /**
     * 성명
     */
    name: string;
    /**
     * 생년월일
     */
    birthday: string;
    /**
     * 이메일
     */
    email: string;
    /**
     * 비밀번호
     */
    password: string;
    /**
     * 휴대폰 국가번호
     */
    phoneNationNumber: string;
    /**
     * 휴대폰 번호
     */
    phoneNumber: string;
    /**
     * 국가코드
     */
    nationCd: {
        language?: string;
        script?: string;
        variant?: string;
        displayName?: string;
        country?: string;
        unicodeLocaleAttributes?: Array<string>;
        unicodeLocaleKeys?: Array<string>;
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: Array<string>;
        iso3Language?: string;
        iso3Country?: string;
    };
};

