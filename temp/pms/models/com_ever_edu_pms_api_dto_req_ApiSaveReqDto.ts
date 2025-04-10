/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_api_dto_req_ApiSaveReqDto = {
    /**
     * api ID
     */
    apiId?: number | null;
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
     * api 메소드 구분
     */
    apiMethod?: com_ever_edu_pms_api_dto_req_ApiSaveReqDto.apiMethod;
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
    useYn?: boolean | null;
    /**
     * 삭제여부
     */
    deleteYn?: boolean | null;
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
     * api 메소드 구분
     */
    export enum apiMethod {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
    }
}

