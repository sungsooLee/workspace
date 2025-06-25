/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto } from '../models/com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto';
import type { com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto } from '../models/com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto } from '../models/com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelResDto } from '../models/com_ever_edu_pms_channel_dto_res_ChannelResDto';
import type { com_ever_edu_pms_channel_entity_ChannelRequestEntity } from '../models/com_ever_edu_pms_channel_entity_ChannelRequestEntity';
import type { com_ever_edu_pms_company_dto_res_CompanyResDto } from '../models/com_ever_edu_pms_company_dto_res_CompanyResDto';
import type { com_ever_edu_pms_menu_dto_res_GnbTenantMenuTreeDto } from '../models/com_ever_edu_pms_menu_dto_res_GnbTenantMenuTreeDto';
import type { com_ever_edu_pms_notification_dto_req_AlarmSaveReqDto } from '../models/com_ever_edu_pms_notification_dto_req_AlarmSaveReqDto';
import type { com_ever_edu_pms_notification_dto_req_AlarmSendReqDto } from '../models/com_ever_edu_pms_notification_dto_req_AlarmSendReqDto';
import type { com_ever_edu_pms_notification_dto_res_AlarmResDto } from '../models/com_ever_edu_pms_notification_dto_res_AlarmResDto';
import type { com_ever_edu_pms_role_dto_req_RoleApplicationReqDto } from '../models/com_ever_edu_pms_role_dto_req_RoleApplicationReqDto';
import type { com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto } from '../models/com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto';
import type { com_ever_edu_pms_role_dto_res_RoleApplicationResDto } from '../models/com_ever_edu_pms_role_dto_res_RoleApplicationResDto';
import type { com_ever_edu_pms_role_dto_res_RoleResDto } from '../models/com_ever_edu_pms_role_dto_res_RoleResDto';
import type { com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto } from '../models/com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto';
import type { com_ever_edu_pms_tenant_dto_req_TenantPropertiesUpdateReqDto } from '../models/com_ever_edu_pms_tenant_dto_req_TenantPropertiesUpdateReqDto';
import type { com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto } from '../models/com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto } from '../models/com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$SimpleList } from '../models/com_ever_edu_pms_tenant_dto_res_TenantResDto$SimpleList';
import type { com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser } from '../models/com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser';
import type { com_ever_edu_pms_terms_dto_res_TermsAgreementResDto$DetailOnUser } from '../models/com_ever_edu_pms_terms_dto_res_TermsAgreementResDto$DetailOnUser';
import type { com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser } from '../models/com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser';
import type { com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnUser } from '../models/com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnUser';
import type { com_ever_edu_pms_user_dto_req_ChangeEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangeEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_ExtendPasswordChangeDateReqDto } from '../models/com_ever_edu_pms_user_dto_req_ExtendPasswordChangeDateReqDto';
import type { com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_UserRegisterReqDto } from '../models/com_ever_edu_pms_user_dto_req_UserRegisterReqDto';
import type { com_ever_edu_pms_user_dto_req_VerifyEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_VerifyEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_VisitTenantAndRoleReqDto } from '../models/com_ever_edu_pms_user_dto_req_VisitTenantAndRoleReqDto';
import type { com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto } from '../models/com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto';
import type { com_ever_edu_pms_user_dto_res_FindMyIdResDto } from '../models/com_ever_edu_pms_user_dto_res_FindMyIdResDto';
import type { com_ever_edu_pms_user_dto_res_IsEmailExistsResDto } from '../models/com_ever_edu_pms_user_dto_res_IsEmailExistsResDto';
import type { com_ever_edu_pms_user_dto_res_UserResDto } from '../models/com_ever_edu_pms_user_dto_res_UserResDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_role_dto_res_RoleApplicationResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_role_dto_res_RoleApplicationResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin';
import type { org_springframework_web_servlet_mvc_method_annotation_SseEmitter } from '../models/org_springframework_web_servlet_mvc_method_annotation_SseEmitter';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoService {
    /**
     * 최근 접속 테넌트/역할 저장
     * 최근 접속 테넌트/역할을 저장한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static visitTenantAndRole(
        requestBody: com_ever_edu_pms_user_dto_req_VisitTenantAndRoleReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/users/visit-tenant-role',
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
     * 비밀번호 변경(비밀번호 인증)
     * 기존 비밀번호를 통해 사용자의 비밀번호를 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePassword(
        requestBody: com_ever_edu_pms_user_dto_req_ChangePasswordReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/users/verifications/change-password',
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
     * 휴대전화번호 변경
     * 사용자의 휴대전화번호를 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePhoneNumber(
        requestBody: com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/users/change-phone-number',
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
     * 이메일 변경
     * 사용자의 이메일 주소를 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changeEmail(
        requestBody: com_ever_edu_pms_user_dto_req_ChangeEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/users/change-email',
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
     * 테넌트 상세 조회(플랫폼담당자)
     * 테넌트 상세 조회(플랫폼담당자)
     * @param tenantId
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static getTenant(
        tenantId: number,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * 테넌트 수정(플랫폼담당자)
     * 테넌트 수정(플랫폼담당자)
     * @param tenantId
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static updateTenant(
        tenantId: number,
        requestBody: com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * 테넌트 삭제
     * 테넌트 삭제
     * @param tenantId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTenant(
        tenantId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/tenants/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * 테넌트 상세 > 속성 조회(테넌트담당자)
     * 테넌트 상세 > 속성 조회(테넌트담당자)
     * @param tenantId
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto OK
     * @throws ApiError
     */
    public static getTenantProperties(
        tenantId: number,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenants/{tenantId}/properties',
            path: {
                'tenantId': tenantId,
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
     * 테넌트 상세 > 속성 수정(테넌트담당자)
     * 테넌트 상세 > 속성 수정(테넌트담당자)
     * @param tenantId
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto OK
     * @throws ApiError
     */
    public static updateTenantProperties(
        tenantId: number,
        requestBody: com_ever_edu_pms_tenant_dto_req_TenantPropertiesUpdateReqDto,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/tenants/{tenantId}/properties',
            path: {
                'tenantId': tenantId,
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
     * 알람 단건 읽음 처리
     * 알람 단건 읽음 처리
     * @param alarmId
     * @returns any OK
     * @throws ApiError
     */
    public static alarmRead(
        alarmId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/alarm/read/{alarmId}',
            path: {
                'alarmId': alarmId,
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
     * 알람 전체 읽음
     * 알람 전체 읽음
     * @returns any OK
     * @throws ApiError
     */
    public static alarmCheck(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/alarm/read-all',
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
     * 휴대전화번호 인증 요청
     * 휴대전화번호 인증을 요청한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static verifyPhoneNumber(
        requestBody: com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/verifications/verify-phone-number',
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
     * 이메일 인증 요청
     * 이메일 인증을 요청한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static verifyEmail(
        requestBody: com_ever_edu_pms_user_dto_req_VerifyEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/verifications/verify-email',
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
     * 휴대전화번호 인증 전송 요청
     * 휴대전화번호 인증 문자 전송을 요청한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sendVerifyPhoneNumber(
        requestBody: com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/verifications/send-verify-phone-number',
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
     * 이메일 인증 전송 요청
     * 이메일 인증 메일 전송을 요청한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sendVerifyEmail(
        requestBody: com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/verifications/send-verify-email',
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
     * 회원가입
     * 신규 사용자를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static register(
        requestBody: com_ever_edu_pms_user_dto_req_UserRegisterReqDto,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/register',
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
     * 비밀번호 변경 기간 연장
     * 비밀번호 변경 기간을 연장한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePasswordByPhoneNumber1(
        requestBody: com_ever_edu_pms_user_dto_req_ExtendPasswordChangeDateReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/extend-password-change-date',
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
     * 비밀번호 확인
     * 비밀번호가 일치하는지 확인한다.
     * @param requestBody
     * @returns com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto OK
     * @throws ApiError
     */
    public static confirmPassword(
        requestBody: com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/users/confirm-password',
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
     * 이용약관 동의내역 등록
     * 이용약관 동의내역을 등록한다.
     * @param termsId
     * @returns com_ever_edu_pms_terms_dto_res_TermsAgreementResDto$DetailOnUser Created
     * @throws ApiError
     */
    public static saveAgreement(
        termsId: number,
    ): CancelablePromise<com_ever_edu_pms_terms_dto_res_TermsAgreementResDto$DetailOnUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/terms/agree',
            query: {
                'termsId': termsId,
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
     * 테넌트 목록 조회
     * 테넌트 목록 조회
     * @param searchReqDto
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getTenantList(
        searchReqDto: com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin,
        page?: number,
        size: number = 10,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenants',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'searchReqDto': searchReqDto,
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
     * 테넌트 등록(플랫폼담당자)
     * 테넌트 등록(플랫폼담당자)
     * @param requestBody
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static createTenant(
        requestBody: com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto,
    ): CancelablePromise<com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/tenants',
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
     * 권한 신청
     * 권한을 신청한다.
     * @param requestBody
     * @returns com_ever_edu_pms_role_dto_res_RoleApplicationResDto Created
     * @throws ApiError
     */
    public static createRoleApplication(
        requestBody: com_ever_edu_pms_role_dto_req_RoleApplicationReqDto,
    ): CancelablePromise<com_ever_edu_pms_role_dto_res_RoleApplicationResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/role-applications',
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
     * 채널 신청목록 조회
     * 신청한 채널을 조회한다.
     * @param channelSearchReqDto
     * @returns com_ever_edu_pms_channel_dto_res_ChannelResDto OK
     * @throws ApiError
     */
    public static findContent(
        channelSearchReqDto: com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto,
    ): CancelablePromise<Array<com_ever_edu_pms_channel_dto_res_ChannelResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/request/channel',
            query: {
                'channelSearchReqDto': channelSearchReqDto,
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
     * 채널 신청 등록
     * 신청한 채널을 신규 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_channel_entity_ChannelRequestEntity OK
     * @throws ApiError
     */
    public static registerChannelRequest(
        requestBody: com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_channel_entity_ChannelRequestEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/request/channel',
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
     * 알람 목록 조회
     * 알람 목록 조회
     * @returns com_ever_edu_pms_notification_dto_res_AlarmResDto OK
     * @throws ApiError
     */
    public static findAlarm(): CancelablePromise<Array<com_ever_edu_pms_notification_dto_res_AlarmResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm',
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
     * 알람 등록(테스트용)
     * 알람을 등록한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static save(
        requestBody: com_ever_edu_pms_notification_dto_req_AlarmSaveReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/alarm',
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
     * 알람 보내기
     * 알람 보내기
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sendAlarm(
        requestBody: com_ever_edu_pms_notification_dto_req_AlarmSendReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/alarm/send',
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
     * 가입된 휴대전화 번호 확인
     * 가입된 휴대전화 번호인지 확인한다.
     * @param name
     * @param birthday
     * @param phoneNumber
     * @returns any OK
     * @throws ApiError
     */
    public static isMemberPhoneNumber(
        name: string,
        birthday: string,
        phoneNumber: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/users/verifications/is-member-phone-number',
            query: {
                'name': name,
                'birthday': birthday,
                'phoneNumber': phoneNumber,
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
     * 가입된 이메일 주소 확인
     * 가입된 이메일 주소인지 확인한다.
     * @param name
     * @param birthday
     * @param email
     * @returns any OK
     * @throws ApiError
     */
    public static isMemberEmail(
        name: string,
        birthday: string,
        email: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/users/verifications/is-member-email',
            query: {
                'name': name,
                'birthday': birthday,
                'email': email,
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
     * 아이디 찾기
     * 입력된 사용자 정보와 일치하는 ID를 찾는다.
     * @param name
     * @param birthday
     * @param phoneNumber
     * @returns com_ever_edu_pms_user_dto_res_FindMyIdResDto OK
     * @throws ApiError
     */
    public static findMyId(
        name: string,
        birthday: string,
        phoneNumber: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_FindMyIdResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/users/verifications/find-my-id',
            query: {
                'name': name,
                'birthday': birthday,
                'phoneNumber': phoneNumber,
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
     * 내 정보 조회
     * 내 정보를 조회한다.
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static me(): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/users/me',
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
     * 사용중인 이메일인지 확인
     * 이메일 주소가 사용중인지 확인한다.
     * @param email
     * @returns com_ever_edu_pms_user_dto_res_IsEmailExistsResDto OK
     * @throws ApiError
     */
    public static isEmailExists(
        email: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_IsEmailExistsResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/users/is-email-exists',
            query: {
                'email': email,
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
     * 특정 버전 이용약관 조회
     * 특정 버전 이용약관 조회
     * @param termsId
     * @param params
     * @returns com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser OK
     * @throws ApiError
     */
    public static getTermsById(
        termsId: number,
        params: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser,
    ): CancelablePromise<com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/terms/{termsId}',
            path: {
                'termsId': termsId,
            },
            query: {
                'params': params,
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
     * 이용약관 버전 목록 조회
     * 이용약관 버전 목록 조회
     * @param params
     * @returns com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnUser OK
     * @throws ApiError
     */
    public static getTermsVersions(
        params: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser,
    ): CancelablePromise<Array<com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnUser>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/terms/versions',
            query: {
                'params': params,
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
     * 최신 이용약관 조회
     * 최신 이용약관 조회
     * @param params
     * @returns com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser OK
     * @throws ApiError
     */
    public static getLatestTerms(
        params: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser,
    ): CancelablePromise<com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/terms/latest',
            query: {
                'params': params,
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
     * 최신약관 동의 여부 조회
     * 최신약관 동의 여부 조회
     * @param params
     * @returns boolean OK
     * @throws ApiError
     */
    public static getUserAgreementStatus(
        params: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/terms/agreement-status',
            query: {
                'params': params,
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
     * 테넌트 목록 조회(공통팝업용)
     * 테넌트 목록 조회(공통팝업용)
     * @param searchReqDto
     * @returns com_ever_edu_pms_tenant_dto_res_TenantResDto$SimpleList OK
     * @throws ApiError
     */
    public static getTenantSimpleList(
        searchReqDto: com_ever_edu_pms_tenant_dto_req_TenantSearchReqDto$SearchByAdmin,
    ): CancelablePromise<Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$SimpleList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenants/simple-list',
            query: {
                'searchReqDto': searchReqDto,
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
     * 테넌트 목록 조회 (공통팝업용)
     * 테넌트 목록 조회 (공통팝업용)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param tenantId 테넌트Id
     * @param tenantName 테넌트명
     * @param companyName 회사명
     * @param companyCode 회사코드
     * @param tenantManagerName 테넌트담당자
     * @param companyManagerName 회사담당자
     * @param isUsed 사용여부
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getTenantListPopup(
        page?: number,
        size: number = 2147483647,
        sort?: Array<string>,
        tenantId?: string,
        tenantName?: string,
        companyName?: string,
        companyCode?: string,
        tenantManagerName?: string,
        companyManagerName?: string,
        isUsed?: 'true' | 'false',
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenants/popup',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'tenantId': tenantId,
                'tenantName': tenantName,
                'companyName': companyName,
                'companyCode': companyCode,
                'tenantManagerName': tenantManagerName,
                'companyManagerName': companyManagerName,
                'isUsed': isUsed,
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
     * 테넌트명 중복 확인 API
     * 테넌트명 중복 확인 API
     * @param tenantName
     * @param tenantId
     * @returns boolean OK
     * @throws ApiError
     */
    public static checkDuplicateTenantName(
        tenantName: string,
        tenantId?: number,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenants/exists',
            query: {
                'tenantName': tenantName,
                'tenantId': tenantId,
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
     * 내 역할 목록 조회
     * 현재 로그인한 사용자의 역할 목록을 조회한다.
     * @returns com_ever_edu_pms_role_dto_res_RoleResDto OK
     * @throws ApiError
     */
    public static getMyRoles(): CancelablePromise<Array<com_ever_edu_pms_role_dto_res_RoleResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/roles/me',
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
     * 역할 신청 조회(단건)
     * 역할 신청을 조회한다.
     * @param id
     * @returns com_ever_edu_pms_role_dto_res_RoleApplicationResDto OK
     * @throws ApiError
     */
    public static getRoleApplication(
        id: number,
    ): CancelablePromise<com_ever_edu_pms_role_dto_res_RoleApplicationResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/role-applications/{id}',
            path: {
                'id': id,
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
     * 내 역할 신청 목록 조회
     * 현재 로그인한 사용자의 역할 신청 목록을 조회한다.
     * @param pageable
     * @param roleId
     * @param tenantId
     * @param channelUuid
     * @param isExpired
     * @param status
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_role_dto_res_RoleApplicationResDto OK
     * @throws ApiError
     */
    public static getRoleApplications(
        pageable: org_springdoc_core_converters_models_Pageable,
        roleId?: number,
        tenantId?: number,
        channelUuid?: string,
        isExpired?: boolean,
        status?: 'NEW' | 'EXTEND' | 'APPROVED' | 'REJECTED',
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_role_dto_res_RoleApplicationResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/role-applications/me',
            query: {
                'pageable': pageable,
                'roleId': roleId,
                'tenantId': tenantId,
                'channelUuid': channelUuid,
                'isExpired': isExpired,
                'status': status,
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
     * 역할 신청 이력 조회
     * 역할 신청 이력을 조회한다.
     * @param userUuid
     * @param createdDate
     * @returns com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto OK
     * @throws ApiError
     */
    public static getRoleApplicationHistories(
        userUuid: string,
        createdDate: string,
    ): CancelablePromise<Array<com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/role-applications/histories',
            query: {
                'userUuid': userUuid,
                'createdDate': createdDate,
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
     * 채널신청 상세 정보 조회
     * 채널신청 상세 정보를 조회한다.
     * @param channelRequestUuid
     * @returns com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto OK
     * @throws ApiError
     */
    public static selectChannelReqeustInfo(
        channelRequestUuid: string,
    ): CancelablePromise<com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/request/channel/{channelRequestUuid}',
            path: {
                'channelRequestUuid': channelRequestUuid,
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
     * FO GNB 테넌트메뉴목록 트리 조회
     * GNB 테넌트 메뉴 목록을 트리구조로 조회한다.
     * @param tenantId
     * @param roleId
     * @param deviceType
     * @returns com_ever_edu_pms_menu_dto_res_GnbTenantMenuTreeDto OK
     * @throws ApiError
     */
    public static findTenantMenu(
        tenantId: number,
        roleId?: number,
        deviceType?: string,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_GnbTenantMenuTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/menus/tenantTree',
            query: {
                'roleId': roleId,
                'tenantId': tenantId,
                'deviceType': deviceType,
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
     * 사업자등록번호로 회사 조회(단건)
     * 사업자 등록번호로 회사 정보를 조회한다.
     * @param brn
     * @returns com_ever_edu_pms_company_dto_res_CompanyResDto OK
     * @throws ApiError
     */
    public static getCompanyByBrn(
        brn: string,
    ): CancelablePromise<com_ever_edu_pms_company_dto_res_CompanyResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/companies/brn/{brn}',
            path: {
                'brn': brn,
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
     * 미확인 알람갯수 조회
     * 미확인 알람갯수 조회
     * @returns number OK
     * @throws ApiError
     */
    public static findAlarmUnCheckCount(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/uncheck-count',
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
     * 알람 신청
     * 알람 신청
     * @returns org_springframework_web_servlet_mvc_method_annotation_SseEmitter OK
     * @throws ApiError
     */
    public static subscribe(): CancelablePromise<org_springframework_web_servlet_mvc_method_annotation_SseEmitter> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/subscribe',
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
     * 알람 해지
     * 알람 해지
     * @returns any OK
     * @throws ApiError
     */
    public static close(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/close',
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
     * 회원 탈퇴
     * 회원 탈퇴를 요청한다.
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAccount(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/users/delete-account',
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
     * 알람 전체삭제
     * 알람을 전체삭제한다.
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/alarms',
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
     * 알람 단건 삭제
     * 알람을 삭제한다.
     * @param alarmId
     * @returns any OK
     * @throws ApiError
     */
    public static delete(
        alarmId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/alarm/{alarmId}',
            path: {
                'alarmId': alarmId,
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
