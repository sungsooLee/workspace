/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_html5_dto_req_Html5DraftReqDto } from '../models/com_ever_edu_cms_html5_dto_req_Html5DraftReqDto';
import type { com_ever_edu_cms_html5_dto_req_Html5FileChangeReqDto } from '../models/com_ever_edu_cms_html5_dto_req_Html5FileChangeReqDto';
import type { com_ever_edu_cms_html5_dto_req_Html5UpdateReqDto } from '../models/com_ever_edu_cms_html5_dto_req_Html5UpdateReqDto';
import type { com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto } from '../models/com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto';
import type { com_ever_edu_cms_html5_dto_res_Html5ResDto } from '../models/com_ever_edu_cms_html5_dto_res_Html5ResDto';
import type { com_ever_edu_cms_html5_dto_res_Html5ResourceResDto } from '../models/com_ever_edu_cms_html5_dto_res_Html5ResourceResDto';
import type { com_ever_edu_cms_html5_dto_res_Html5StatusResDto } from '../models/com_ever_edu_cms_html5_dto_res_Html5StatusResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoHtml5Service {
    /**
     * HTML5 동영상 콘텐츠 메타 정보 저장
     * 콘텐츠 메타 정보를 수정하고 SCORM 콘텐츠를 저장한다.<br>등록은 임시저장이므로 콘텐츠 메타 정보 저장은 수정 API를 이용한다.
     * @param requestBody
     * @returns com_ever_edu_cms_html5_dto_res_Html5ResDto OK
     * @throws ApiError
     */
    public static updateContent3(
        requestBody: com_ever_edu_cms_html5_dto_req_Html5UpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5ResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/html5/update',
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
     * HTML5 동영상 파일변경
     * 등록한 HTML5 동영상 콘텐츠의 파일을 변경한다.<br>파일변경 상태 조회 API를 이용하여 변경 작업 상태를 확인할 수 있다.
     * @param requestBody
     * @returns com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto OK
     * @throws ApiError
     */
    public static changeContentFile2(
        requestBody: com_ever_edu_cms_html5_dto_req_Html5FileChangeReqDto,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/html5/file/change',
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
     * 단건 HTML5 임시 콘텐츠 생성
     * 단건 HTML5 동영상 임시 콘텐츠를 생성(contentId 생성)한다.
     * @param requestBody
     * @returns com_ever_edu_cms_html5_dto_res_Html5StatusResDto OK
     * @throws ApiError
     */
    public static draftSaveContent1(
        requestBody: com_ever_edu_cms_html5_dto_req_Html5DraftReqDto,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5StatusResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/html5/draft',
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
     * HTML5 동영상 콘텐츠 상태 조회
     * HTML5 동영상 콘텐츠 상태를 조회한다.
     * @param contentUuid HTML5 콘텐츠 UUID
     * @returns com_ever_edu_cms_html5_dto_res_Html5StatusResDto OK
     * @throws ApiError
     */
    public static getContentStatus2(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5StatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/html5/{contentUuid}/status',
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
     * HTML5 동영상 콘텐츠 리소스 조회
     * HTML5 동영상 콘텐츠 리소스를 조회한다.
     * @param contentUuid HTML5 콘텐츠 UUID
     * @returns com_ever_edu_cms_html5_dto_res_Html5ResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource10(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5ResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/html5/{contentUuid}/resource',
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
     * HTML5 동영상 파일변경 상태 조회
     * HTML5 동영상 파일을 변경 상태를 조회한다.
     * @param changeId
     * @returns com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto OK
     * @throws ApiError
     */
    public static getContentChangeStatus2(
        changeId: number,
    ): CancelablePromise<com_ever_edu_cms_html5_dto_res_Html5ChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/html5/file/change/{changeId}',
            path: {
                'changeId': changeId,
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
}
