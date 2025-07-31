/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_external_agency_dto_res_ExternalAgencyParamResDto = {
    parameterId?: number;
    /**
     * Enum(cms.external_agency.ExtAgcyUrlParamType)<br>- COMP_COURSE_CODE: 업체과정코드<br>- ID: 아이디<br>- CLERK_NO: 사번<br>- NAME: 이름<br>- COMP_CODE: 회사코드<br>- COURSE_CODE: 과정코드<br>- LEARN_START_DATE:학습시작일<br>- EDU_GROUP: 교육그룹<br>- CUSTOM: 추가입력코드
     */
    parameterType?: com_ever_edu_cms_external_agency_dto_res_ExternalAgencyParamResDto.parameterType;
    parameterCodeValue?: string;
};
export namespace com_ever_edu_cms_external_agency_dto_res_ExternalAgencyParamResDto {
    /**
     * Enum(cms.external_agency.ExtAgcyUrlParamType)<br>- COMP_COURSE_CODE: 업체과정코드<br>- ID: 아이디<br>- CLERK_NO: 사번<br>- NAME: 이름<br>- COMP_CODE: 회사코드<br>- COURSE_CODE: 과정코드<br>- LEARN_START_DATE:학습시작일<br>- EDU_GROUP: 교육그룹<br>- CUSTOM: 추가입력코드
     */
    export enum parameterType {
        COMP_COURSE_CODE = 'COMP_COURSE_CODE',
        ID = 'ID',
        CLERK_NO = 'CLERK_NO',
        NAME = 'NAME',
        COMP_CODE = 'COMP_CODE',
        COURSE_CODE = 'COURSE_CODE',
        LEARN_START_DATE = 'LEARN_START_DATE',
        EDU_GROUP = 'EDU_GROUP',
        CUSTOM = 'CUSTOM',
    }
}

