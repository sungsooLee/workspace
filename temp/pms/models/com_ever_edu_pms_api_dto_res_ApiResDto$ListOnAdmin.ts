/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_api_dto_res_ApiResDto$ListOnAdmin = {
    /**
     * api ID
     */
    apiId?: number;
    /**
     * api UUID
     */
    apiUuid?: string;
    /**
     * api 명
     */
    apiName?: string;
    /**
     * api 설명
     */
    apiDesc?: string;
    /**
     * api url
     */
    apiUrl?: string;
    /**
     * api 유형
     */
    apiNodeType?: com_ever_edu_pms_api_dto_res_ApiResDto$ListOnAdmin.apiNodeType;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_api_dto_res_ApiResDto$ListOnAdmin {
    /**
     * api 유형
     */
    export enum apiNodeType {
        FOLDER = 'FOLDER',
        API = 'API',
    }
}

