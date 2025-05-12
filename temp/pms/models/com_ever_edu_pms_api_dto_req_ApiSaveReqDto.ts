/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_api_dto_req_ApiSaveReqDto = {
    /**
     * api 명
     */
    apiName: string | null;
    /**
     * api 설명
     */
    apiDesc?: string | null;
    /**
     * api url
     */
    apiUrl?: string | null;
    /**
     * api scope
     */
    apiScope?: com_ever_edu_pms_api_dto_req_ApiSaveReqDto.apiScope | null;
    /**
     * api 유형
     */
    apiNodeType?: com_ever_edu_pms_api_dto_req_ApiSaveReqDto.apiNodeType | null;
    /**
     * api 메소드 구분
     */
    apiMethodCode?: com_ever_edu_pms_api_dto_req_ApiSaveReqDto.apiMethodCode;
    /**
     * api 뎁스
     */
    depth?: number;
    /**
     * api 정렬순서
     */
    sortOrder?: number;
    /**
     * 사용여부
     */
    isUsed?: boolean | null;
    /**
     * 삭제여부
     */
    isDeleted?: boolean | null;
    /**
     * 부모 ID
     */
    parentId?: number | null;
};
export namespace com_ever_edu_pms_api_dto_req_ApiSaveReqDto {
    /**
     * api scope
     */
    export enum apiScope {
        FO = 'FO',
        BO = 'BO',
    }
    /**
     * api 유형
     */
    export enum apiNodeType {
        FOLDER = 'FOLDER',
        API = 'API',
    }
    /**
     * api 메소드 구분
     */
    export enum apiMethodCode {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
    }
}

