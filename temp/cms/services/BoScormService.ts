/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_scorm_dto_req_ScormDraftReqDto } from '../models/com_ever_edu_cms_scorm_dto_req_ScormDraftReqDto';
import type { com_ever_edu_cms_scorm_dto_req_ScormFileChangeReqDto } from '../models/com_ever_edu_cms_scorm_dto_req_ScormFileChangeReqDto';
import type { com_ever_edu_cms_scorm_dto_req_ScormUpdateReqDto } from '../models/com_ever_edu_cms_scorm_dto_req_ScormUpdateReqDto';
import type { com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto';
import type { com_ever_edu_cms_scorm_dto_res_ScormDraftListResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormDraftListResDto';
import type { com_ever_edu_cms_scorm_dto_res_ScormResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormResDto';
import type { com_ever_edu_cms_scorm_dto_res_ScormResourceResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormResourceResDto';
import type { com_ever_edu_cms_scorm_dto_res_ScormStatusResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormStatusResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoScormService {
    /**
     * SCORM 콘텐츠 메타 정보 저장
     * 콘텐츠 메타 정보를 수정하고 SCORM 콘텐츠를 저장한다.<br>등록은 모두 임시저장이므로 콘텐츠 메타 정보 저장은 수정 API를 이용한다.<br>커리큘럼 ID와 모듈ID를 전달받으면 콘텐츠 메타 정보 저장 직후 커리큘럼의 모듈에 힉습시간을 업데이트 한다.
     * @param requestBody
     * @param curriculumId 커리큘럼ID
     * @param moduleIds
     * @param moduleId 다건의 모듈ID를 ","로 연결
     * @returns com_ever_edu_cms_scorm_dto_res_ScormResDto OK
     * @throws ApiError
     */
    public static updateScorm(
        requestBody: com_ever_edu_cms_scorm_dto_req_ScormUpdateReqDto,
        curriculumId?: number,
        moduleIds?: string,
        moduleId?: any,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/scorm/update',
            query: {
                'curriculumId': curriculumId,
                'moduleIds': moduleIds,
                'moduleId': moduleId,
            },
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
     * SCORM 파일변경
     * 등록한 SCORM 콘텐츠의 SCORM 파일을 변경한다.
     * @param requestBody
     * @returns com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto OK
     * @throws ApiError
     */
    public static changeScormFile(
        requestBody: com_ever_edu_cms_scorm_dto_req_ScormFileChangeReqDto,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/scorm/file/change',
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
     * 1건 이상 SCORM 임시 콘텐츠 생성
     * 1건 이상 SCORM 임시 콘텐츠를 생성(contentId 생성)한다.<br>파일UUID는 1개의 콘텐츠를 생성한다.이 작업은 업로드한 SCORM ZIP 파일을 다운로드 후 압축을 풀어 파싱한 후 메타데이터를 저장하고 S3에 Unzip 파일을 업로드를 수행한다.<br>커리큘럼 ID를 전달받으면 스콤 매니페스트 메타데이터 저장 직후 커리큘럼에 모듈과 레슨을 생성한다.<br>커리큘럼 ID와 모듈ID를 전달받으면 메타데이터 저장 직후 커리큘럼의 모듈에 레슨을 생성한다.
     * @param requestBody
     * @param curriculumId 커리큘럼ID
     * @param moduleIds
     * @param moduleId 다건의 모듈ID를 ","로 연결
     * @returns com_ever_edu_cms_scorm_dto_res_ScormDraftListResDto OK
     * @throws ApiError
     */
    public static draftSaveScorm(
        requestBody: com_ever_edu_cms_scorm_dto_req_ScormDraftReqDto,
        curriculumId?: number,
        moduleIds?: string,
        moduleId?: any,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormDraftListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/scorm/draft',
            query: {
                'curriculumId': curriculumId,
                'moduleIds': moduleIds,
                'moduleId': moduleId,
            },
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
     * SCORM 콘텐츠 상태 조회
     * SCORM 콘텐츠 상태를 조회한다.
     * @param contentUuid SCORM 콘텐츠 UUID
     * @returns com_ever_edu_cms_scorm_dto_res_ScormStatusResDto OK
     * @throws ApiError
     */
    public static getScormStatus(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/scorm/{contentUuid}/status',
            path: {
                'contentUuid': contentUuid,
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
     * SCORM 콘텐츠 리소스 조회
     * SCORM 콘텐츠 리소스를 조회한다.
     * @param contentUuid SCORM 콘텐츠 UUID
     * @returns com_ever_edu_cms_scorm_dto_res_ScormResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource5(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/scorm/{contentUuid}/resource',
            path: {
                'contentUuid': contentUuid,
            },
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
     * SCORM 파일변경 상태 조회
     * SCORM 파일을 변경 상태를 조회한다.
     * @param changeId SCORM 파일변경 ID
     * @returns com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto OK
     * @throws ApiError
     */
    public static getScormChangeStatus(
        changeId: number,
    ): CancelablePromise<com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/scorm/file/change/{changeId}',
            path: {
                'changeId': changeId,
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
