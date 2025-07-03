/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_api_dto_res_ApiTreeDto = {
    apiId?: number;
    apiUuid?: string;
    apiName?: string;
    apiUrl?: string;
    depth?: number;
    sortOrder?: number;
    isUsed?: boolean;
    apiScope?: com_ever_edu_pms_api_dto_res_ApiTreeDto.apiScope;
    apiNodeType?: com_ever_edu_pms_api_dto_res_ApiTreeDto.apiNodeType;
    apiMethod?: com_ever_edu_pms_api_dto_res_ApiTreeDto.apiMethod;
    apiDesc?: string;
    parentId?: number;
    fullPath?: string;
    children?: Array<com_ever_edu_pms_api_dto_res_ApiTreeDto>;
};
export namespace com_ever_edu_pms_api_dto_res_ApiTreeDto {
    export enum apiScope {
        FO = 'FO',
        BO = 'BO',
    }
    export enum apiNodeType {
        FOLDER = 'FOLDER',
        API = 'API',
    }
    export enum apiMethod {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
    }
}

