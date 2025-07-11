/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_security_JsonUsernamePasswordAuthenticationFilter$LoginRequest } from '../models/com_ever_edu_pms_security_JsonUsernamePasswordAuthenticationFilter$LoginRequest';
import type { com_ever_edu_pms_user_dto_res_UserResDto } from '../models/com_ever_edu_pms_user_dto_res_UserResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoginSpecService {
    /**
     * 토큰 재발급
     * refresh-token을 통해 JWT토큰을 재발급한다.
     * @param refreshToken
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static tokenReissue(
        refreshToken: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/token-reissue',
            headers: {
                'refresh-token': refreshToken,
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
     * 로그아웃
     * 로그아웃하고 access-token과 refresh-token을 만료시킨다.
     * @param accessToken
     * @returns any OK
     * @throws ApiError
     */
    public static logout(
        accessToken: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/logout',
            headers: {
                'access-token': accessToken,
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
     * 로그인
     * IP/PW 로그인
     * @param requestBody
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static login(
        requestBody: com_ever_edu_pms_security_JsonUsernamePasswordAuthenticationFilter$LoginRequest,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/login',
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
     * @returns any OK
     * @throws ApiError
     */
    public static testCompression(): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/spec/api/v1/test-compression',
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
