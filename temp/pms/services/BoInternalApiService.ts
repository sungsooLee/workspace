/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelDetailResDto } from '../models/com_ever_edu_pms_channel_dto_res_ChannelDetailResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoInternalApiService {
    /**
     * 채널 기본 상세 조회
     * 채널 기본 상세정보를 조회한다.
     * @param channelUuid
     * @returns com_ever_edu_pms_channel_dto_res_ChannelDetailResDto OK
     * @throws ApiError
     */
    public static selectChannelBaseInfo(
        channelUuid: string,
    ): CancelablePromise<com_ever_edu_pms_channel_dto_res_ChannelDetailResDto> {
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
}
