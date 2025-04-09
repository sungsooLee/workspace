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
export class FoFileService {
    /**
     * 파일정보 생성
     * 파일 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static createtFileInfo(
        requestBody: com_ever_edu_pms_file_dto_req_FileInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file',
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
    public static createtFileGroup(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file/group',
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
    public static createtFileGroupAndFiles(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file/group/files',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 파일정보 조회
     * 파일정보를 조회한다.
     * @param fileId 파일Id
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static getFileInfo(
        fileId: number,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/{fileId}',
            path: {
                'fileId': fileId,
            },
        });
    }
    /**
     * 파일정보 삭제
     * 파일 정보를 삭제한다. delYn값 false 업데이트
     * @param fileId 파일Id
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto OK
     * @throws ApiError
     */
    public static deleteFileInfo(
        fileId: number,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/file/{fileId}',
            path: {
                'fileId': fileId,
            },
        });
    }
    /**
     * 파일 다운로드
     * 파일을 다운로드한다.
     * @param fileId 파일Id
     * @returns any OK
     * @throws ApiError
     */
    public static fileDownload(
        fileId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/{fileId}/download',
            path: {
                'fileId': fileId,
            },
        });
    }
    /**
     * 파일그룹 목록 조회
     * 파일그룹 목록을 조회한다.
     * @returns com_ever_edu_pms_file_dto_res_FileGroupListResDto OK
     * @throws ApiError
     */
    public static getFileGroupList(): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/groups',
        });
    }
    /**
     * 파일그룹 정보 조회
     * 파일그룹 정보를 조회한다.
     * @param groupId 파일그룹Id
     * @returns com_ever_edu_pms_file_dto_res_FileGroupInfoResDto OK
     * @throws ApiError
     */
    public static getFileGroup(
        groupId: number,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/group/{groupId}',
            path: {
                'groupId': groupId,
            },
        });
    }
    /**
     * 파일그룹 파일 목록 조회
     * 파일그룹 파일 목록을 조회한다.
     * @param groupId 파일그룹Id
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto OK
     * @throws ApiError
     */
    public static getGroupFileInfoList(
        groupId: number,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/group/{groupId}/files',
            path: {
                'groupId': groupId,
            },
        });
    }
}
