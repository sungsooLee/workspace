/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto';
import type { com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto';
import type { com_ever_edu_pms_file_dto_req_FileInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileInfoReqDto';
import type { com_ever_edu_pms_file_dto_res_FileGroupInfoResDto } from '../models/com_ever_edu_pms_file_dto_res_FileGroupInfoResDto';
import type { com_ever_edu_pms_file_dto_res_FileGroupListResDto } from '../models/com_ever_edu_pms_file_dto_res_FileGroupListResDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoDetailResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoDetailResDto';
import type { com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto } from '../models/com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileService {
    /**
     * 파일정보 생성
     * 파일 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static createFileInfo(
        requestBody: com_ever_edu_pms_file_dto_req_FileInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 파일그룹 정보 생성
     * 파일그룹 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileGroupInfoResDto OK
     * @throws ApiError
     */
    public static createtFileGroup1(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 파일그룹 및 1개 이상의 파일 정보 생성
     * 파일그룹 및 1개 이상의 파일 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto OK
     * @throws ApiError
     */
    public static createtFileGroupAndFiles1(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group/files',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 파일정보 조회
     * 파일정보를 조회한다.
     * @param uuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static getFileInfo1(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * 파일정보 삭제
     * 파일 정보를 삭제한다. isDeleletd 값 false 업데이트
     * @param uuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto OK
     * @throws ApiError
     */
    public static deleteFileInfo1(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/file/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * 파일 다운로드
     * 파일을 다운로드한다.
     * @param uuid 파일 UUID
     * @returns any OK
     * @throws ApiError
     */
    public static fileDownload1(
        uuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{uuid}/download',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * 파일그룹 목록 조회
     * 파일그룹 목록을 조회한다.
     * @param uploadType 파일업로드유형, ATTATCH|CONTENTS
     * @param affairsType 파일업무유형, LMS|PMS|CMS
     * @param reposType 저정소유형, S3(기본)|HMG
     * @param isDeleted 삭제여부
     * @param isUsed 사용여부
     * @returns com_ever_edu_pms_file_dto_res_FileGroupListResDto OK
     * @throws ApiError
     */
    public static getFileGroupList1(
        uploadType?: string,
        affairsType?: string,
        reposType?: string,
        isDeleted?: boolean,
        isUsed?: boolean,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/groups',
            query: {
                'uploadType': uploadType,
                'affairsType': affairsType,
                'reposType': reposType,
                'isDeleted': isDeleted,
                'isUsed': isUsed,
            },
        });
    }
    /**
     * 파일그룹 정보 조회
     * 파일그룹 정보를 조회한다.
     * @param uuid 파일 그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileGroupInfoResDto OK
     * @throws ApiError
     */
    public static getFileGroup1(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/group/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * 파일그룹 파일 목록 조회
     * 파일그룹 파일 목록을 조회한다.
     * @param uuid 파일그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto OK
     * @throws ApiError
     */
    public static getGroupFileInfoList1(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/group/{uuid}/files',
            path: {
                'uuid': uuid,
            },
        });
    }
}
