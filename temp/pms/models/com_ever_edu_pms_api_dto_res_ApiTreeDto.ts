/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_api_dto_res_ApiTreeDto = {
    apiId?: number;
    apiName?: string;
    apiUrl?: string;
    depth?: number;
    sortOrder?: number;
    useYn?: boolean;
    apiScope?: com_ever_edu_pms_api_dto_res_ApiTreeDto.apiScope;
    apiMethod?: com_ever_edu_pms_api_dto_res_ApiTreeDto.apiMethod;
    apiDesc?: string;
    parentId?: number;
    children?: Array<com_ever_edu_pms_api_dto_res_ApiTreeDto>;
};
export namespace com_ever_edu_pms_api_dto_res_ApiTreeDto {
    export enum apiScope {
        FO = 'FO',
        BO = 'BO',
    }
    export enum apiMethod {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
    }
}

