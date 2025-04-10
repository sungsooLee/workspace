/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_security_AuthUser } from '../models/com_ever_edu_global_security_AuthUser';
import type { com_ever_edu_pms_security_api_LoginSpecApiController$SsoLoginRequest } from '../models/com_ever_edu_pms_security_api_LoginSpecApiController$SsoLoginRequest';
import type { com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckRequest } from '../models/com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckRequest';
import type { com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckResponse } from '../models/com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckResponse';
import type { com_ever_edu_pms_security_JsonUsernamePasswordAuthenticationFilter$LoginRequest } from '../models/com_ever_edu_pms_security_JsonUsernamePasswordAuthenticationFilter$LoginRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoginSpecService {
    /**
     * 토큰 재발급
     * refresh-token을 통해 JWT토큰을 재발급한다.
     * @param refreshToken
     * @returns com_ever_edu_global_security_AuthUser OK
     * @throws ApiError
     */
    public static tokenReissue(
        refreshToken: string,
    ): CancelablePromise<com_ever_edu_global_security_AuthUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/token-reissue',
            headers: {
                'refresh-token': refreshToken,
            },
        });
    }
    /**
     * HMG SSO 로그인
     * IP/PW 로그인
     * @param requestBody
     * @returns com_ever_edu_global_security_AuthUser OK
     * @throws ApiError
     */
    public static hmgSsoLogin(
        requestBody: com_ever_edu_pms_security_api_LoginSpecApiController$SsoLoginRequest,
    ): CancelablePromise<com_ever_edu_global_security_AuthUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/sso/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * HMG SSO Healthcheck
     * HMG SSO 로그인을 호출하기 전 Healthcheck API를 호출한다.
     * @param requestBody
     * @returns com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckResponse OK
     * @throws ApiError
     */
    public static hmgSsoHealthcheck(
        requestBody: com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckRequest,
    ): CancelablePromise<com_ever_edu_pms_security_HmgHealthcheckAuthenticationFilter$HealthcheckResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/sso/healthcheck',
            body: requestBody,
            mediaType: 'application/json',
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
        });
    }
    /**
     * 로그인
     * IP/PW 로그인
     * @param requestBody
     * @returns com_ever_edu_global_security_AuthUser OK
     * @throws ApiError
     */
    public static login(
        requestBody: com_ever_edu_pms_security_JsonUsernamePasswordAuthenticationFilter$LoginRequest,
    ): CancelablePromise<com_ever_edu_global_security_AuthUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spec/api/v1/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
