/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto';
import type { com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto';
import type { com_ever_edu_pms_file_dto_req_FileInfoListReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileInfoListReqDto';
import type { com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoDetailResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoDetailResDto';
import type { com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto } from '../models/com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto';
import type { com_ever_edu_pms_file_dto_res_GroupInfoResDto } from '../models/com_ever_edu_pms_file_dto_res_GroupInfoResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_GroupInfoResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_GroupInfoResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileService {
    /**
     * 파일 업로드(S3멀티파트 여부) 완료 요청
     * 파일 업로드 완료를 요청한다.<br>S3 멀티파트 업로드 대상인 경우 FileUploadCompleteReqDto 필수 입력항목 이며,<br>내부적으로 S3PartUploadService.completeUpload 서비스를 호출한다<br>
     * @param fileUuid 파일 UUID
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto OK
     * @throws ApiError
     */
    public static completeUpload2(
        fileUuid: string,
        requestBody?: com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/{fileUuid}/complete',
            path: {
                'fileUuid': fileUuid,
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
     * 파일그룹 정보 생성
     * 파일그룹 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static createFileGroup(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group',
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
     * 다건의 파일 정보 생성
     * 기존 파일그룹에 다건의 파일 정보를 생성한다.<br>S3 멀티파트 업로드 대상인 경우 내부적으로 S3PartUploadService.initiateUpload 서비스를 호출한 후 파일 응답데이터에 uploadId를 넣는다.
     * @param groupUuid 파일그룹 UUID
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static createFileInfoList1(
        groupUuid: string,
        requestBody: com_ever_edu_pms_file_dto_req_FileInfoListReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group/{groupUuid}/files',
            path: {
                'groupUuid': groupUuid,
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
     * 신규그룹 및 다건의 파일 정보 생성
     * 파일그룹 및 다건의 파일 정보를 생성한다.<br>S3 멀티파트 업로드 대상인 경우 내부적으로 S3PartUploadService.initiateUpload 서비스를 호출한 후 파일 응답데이터에 uploadId를 넣는다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static createFileGroupAndFiles1(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group/files',
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
     * 파일정보 조회
     * 파일정보를 조회한다.
     * @param fileUuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static getFileInfo1(
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{fileUuid}',
            path: {
                'fileUuid': fileUuid,
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
     * 파일정보 삭제
     * 파일 정보를 삭제한다. isDeleletd 값 false 업데이트
     * @param fileUuid 파일 UUID
     * @returns boolean OK
     * @throws ApiError
     */
    public static deleteFileInfo1(
        fileUuid: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/file/{fileUuid}',
            path: {
                'fileUuid': fileUuid,
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
     * 파일 다운로드
     * 파일을 다운로드한다.
     * @param fileUuid 파일 UUID
     * @returns any OK
     * @throws ApiError
     */
    public static fileDownload1(
        fileUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{fileUuid}/download',
            path: {
                'fileUuid': fileUuid,
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
     * 파일그룹 목록 조회
     * 파일그룹 목록을 조회한다.<br><br><b>페이징 정보</b>: <br> - totalElements: 쿼리 결과물의 전체 데이터 갯수 <br> - totalPages: 페이징하였을 때 나오는 총 페이지의 갯수 <br> - size: 페이지 당 데이터 수 설정 값(rows per page) <br> - numberOfElements: 페이지에 존재하는 요소의 갯수(최대 size와 동일) <br> - number: 요소를 가져온 페이지의 번호. 0 ~
     * @param page 페이징 처리를 위한 페이지 번호. 0 ~
     * @param size 페이징 처리를 위한 페이지 size. 10(최소값) ~
     * @param sort 페이징 처리를 위한 sort
     * @param affairsType 파일업무유형, 코드그룹(pms.file.FileAffairsType) - LMS|PMS|CMS
     * @param reposType 저정소유형, 코드그룹(pms.file.RepositoryType) - S3(기본)|HMG
     * @param isDeleted 삭제여부
     * @param isUsed 사용여부
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static getFileGroupList1(
        page: any,
        size: any,
        sort: any,
        affairsType?: any,
        reposType?: any,
        isDeleted?: any,
        isUsed?: any,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/groups',
            query: {
                'affairsType': affairsType,
                'reposType': reposType,
                'isDeleted': isDeleted,
                'isUsed': isUsed,
                'page': page,
                'size': size,
                'sort': sort,
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
     * 파일그룹 정보조회
     * 파일그룹 및 파일 정보 목록을 조회한다.
     * @param groupUuid 파일그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static getGroupFileInfoList1(
        groupUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/group/{groupUuid}',
            path: {
                'groupUuid': groupUuid,
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
