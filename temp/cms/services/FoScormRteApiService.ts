/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_scorm_dto_rte_ScoContenCommitReqDto } from '../models/com_ever_edu_cms_scorm_dto_rte_ScoContenCommitReqDto';
import type { com_ever_edu_cms_scorm_dto_rte_ScoContentReqDto } from '../models/com_ever_edu_cms_scorm_dto_rte_ScoContentReqDto';
import type { com_ever_edu_cms_scorm_dto_rte_ScoContentSettingResDto } from '../models/com_ever_edu_cms_scorm_dto_rte_ScoContentSettingResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoScormRteApiService {
    /**
     * SCORM RTE Commit API
     * SCORM RTE Commit API, 호출 시 현재 상태를 서버에 데이터를 저장한다.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static commit(
        requestBody: com_ever_edu_cms_scorm_dto_rte_ScoContenCommitReqDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/scorm/rte/commit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * SCORM RTE Initialize API
     * SCORM RTE 초기화 API, SCO가 Launch될 때 호출한다.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static initialize(
        requestBody: com_ever_edu_cms_scorm_dto_rte_ScoContentReqDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/scorm/rte/initialize',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * SCORM RTE InitializeAPIEM API
     * SCORM RTE 초기화 API, SCO가 Launch될 때 호출한다.
     * @returns any OK
     * @throws ApiError
     */
    public static initializeApiem(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/scorm/rte/initialize/apiem',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 학습자원 정보와 페이지의 URL 조회 API
     * 학습자원 정보와 페이지의 URL을 조회한다.<br>SCORM 학습창을 호출하기 전에 호출해야한다.
     * @param sequenceId 과정차수Id
     * @param courseId 과정Id
     * @param curriculumId 커리큘럼Id
     * @param contentUuid 스콤콘텐츠UUID
     * @param orgnId 스콤 Organization Id
     * @param scoId item element id(SCOID)
     * @returns com_ever_edu_cms_scorm_dto_rte_ScoContentSettingResDto OK
     * @throws ApiError
     */
    public static getScoContentInfo(
        sequenceId: any,
        courseId: any,
        curriculumId: any,
        contentUuid: any,
        orgnId: any,
        scoId: any,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_rte_ScoContentSettingResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/scorm/rte/sco/info',
            query: {
                'sequenceId': sequenceId,
                'courseId': courseId,
                'curriculumId': curriculumId,
                'contentUuid': contentUuid,
                'orgnId': orgnId,
                'scoId': scoId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * SCORM RTE Terminate API
     * SCORM RTE 종료 API, SCO가 종료될 때 호출되며 서버에 데이터를 저장한다.
     * @param sequenceId 과정차수Id
     * @param courseId 과정Id
     * @param curriculumId 커리큘럼Id
     * @param contentUuid 스콤콘텐츠UUID
     * @param orgnId 스콤 Organization Id
     * @param scoId item element id(SCOID)
     * @returns string OK
     * @throws ApiError
     */
    public static terminate(
        sequenceId: any,
        courseId: any,
        curriculumId: any,
        contentUuid: any,
        orgnId: any,
        scoId: any,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/scorm/rte/terminate',
            query: {
                'sequenceId': sequenceId,
                'courseId': courseId,
                'curriculumId': curriculumId,
                'contentUuid': contentUuid,
                'orgnId': orgnId,
                'scoId': scoId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
