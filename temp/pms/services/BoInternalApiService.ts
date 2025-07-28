/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto } from '../models/com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto';
import type { com_ever_edu_pms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto } from '../models/com_ever_edu_pms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto';
import type { com_ever_edu_pms_blackwhite_dto_res_InternalBlackAndWhiteResDto } from '../models/com_ever_edu_pms_blackwhite_dto_res_InternalBlackAndWhiteResDto';
import type { com_ever_edu_pms_channel_dto_res_InternalChannelDetailResDto } from '../models/com_ever_edu_pms_channel_dto_res_InternalChannelDetailResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoInternalApiService {
    /**
     * 블랙/화이트 목록을 mapping한다.
     * 블랙/화이트 목록을 mapping한다.
     * @param requestBody
     * @returns com_ever_edu_pms_blackwhite_dto_res_InternalBlackAndWhiteResDto OK
     * @throws ApiError
     */
    public static mappingBlackAndWhite(
        requestBody: com_ever_edu_pms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto,
    ): CancelablePromise<com_ever_edu_pms_blackwhite_dto_res_InternalBlackAndWhiteResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/black-and-white/mapping',
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
     * 블랙/화이트 복사
     * 블랙/화이트 데이터를 복사한다.(과정복사 시 사용)
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static copyBlackAndWhite(
        requestBody: com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/black-and-white/copy',
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
     * 채널 기본 상세 조회
     * 채널 기본 상세정보를 조회한다.
     * @param channelUuid
     * @returns com_ever_edu_pms_channel_dto_res_InternalChannelDetailResDto OK
     * @throws ApiError
     */
    public static selectChannelBaseInfo1(
        channelUuid: string,
    ): CancelablePromise<com_ever_edu_pms_channel_dto_res_InternalChannelDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/channel/{channelUuid}',
            path: {
                'channelUuid': channelUuid,
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
     * 블랙/화이트 그룹 상세 정보를 조회
     * 블랙/화이트 그룹 상세 정보를 조회한다.
     * @param blackAndWhiteGroupMappingType
     * @param mappingId
     * @returns com_ever_edu_pms_blackwhite_dto_res_InternalBlackAndWhiteResDto OK
     * @throws ApiError
     */
    public static selectBlackAndWhite(
        blackAndWhiteGroupMappingType: 'COURSE' | 'SEQUENCE' | 'CATEGORY' | 'CHANNEL' | 'ROLE' | 'COMPANY_RESTRICTION',
        mappingId: number,
    ): CancelablePromise<com_ever_edu_pms_blackwhite_dto_res_InternalBlackAndWhiteResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/black-and-white/{blackAndWhiteGroupMappingType}/{mappingId}',
            path: {
                'blackAndWhiteGroupMappingType': blackAndWhiteGroupMappingType,
                'mappingId': mappingId,
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
