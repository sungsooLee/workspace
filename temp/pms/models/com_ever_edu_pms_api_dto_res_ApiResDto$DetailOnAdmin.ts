/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin = {
    apiId?: number;
    apiUuid?: string;
    apiName?: string;
    fullPath?: string;
    apiDesc?: string;
    apiUrl?: string;
    apiNodeType?: com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin.apiNodeType;
    apiMethodCode?: com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin.apiMethodCode;
    isUsed?: boolean;
    parentName?: string;
};
export namespace com_ever_edu_pms_api_dto_res_ApiResDto$DetailOnAdmin {
    export enum apiNodeType {
        FOLDER = 'FOLDER',
        API = 'API',
    }
    export enum apiMethodCode {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
    }
}

