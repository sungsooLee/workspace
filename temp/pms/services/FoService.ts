/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyResDto } from '../models/com_ever_edu_pms_company_dto_res_CompanyResDto';
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceReqDto } from '../models/com_ever_edu_pms_educationplace_dto_req_EducationPlaceReqDto';
import type { com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto } from '../models/com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto';
import type { com_ever_edu_pms_menu_dto_res_MenuTreeDto } from '../models/com_ever_edu_pms_menu_dto_res_MenuTreeDto';
import type { com_ever_edu_pms_notification_dto_req_AlarmSendReqDto } from '../models/com_ever_edu_pms_notification_dto_req_AlarmSendReqDto';
import type { com_ever_edu_pms_notification_dto_res_AlarmResDto } from '../models/com_ever_edu_pms_notification_dto_res_AlarmResDto';
import type { com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser } from '../models/com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByUser';
import type { com_ever_edu_pms_terms_dto_res_TermsAgreementResDto$DetailOnUser } from '../models/com_ever_edu_pms_terms_dto_res_TermsAgreementResDto$DetailOnUser';
import type { com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser } from '../models/com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnUser';
import type { com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnUser } from '../models/com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnUser';
import type { com_ever_edu_pms_user_dto_req_ChangeEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangeEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_UserRegisterReqDto } from '../models/com_ever_edu_pms_user_dto_req_UserRegisterReqDto';
import type { com_ever_edu_pms_user_dto_req_VerifyEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_VerifyEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto } from '../models/com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto';
import type { com_ever_edu_pms_user_dto_res_FindMyIdResDto } from '../models/com_ever_edu_pms_user_dto_res_FindMyIdResDto';
import type { com_ever_edu_pms_user_dto_res_IsEmailExistsResDto } from '../models/com_ever_edu_pms_user_dto_res_IsEmailExistsResDto';
import type { com_ever_edu_pms_user_dto_res_UserResDto } from '../models/com_ever_edu_pms_user_dto_res_UserResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto';
import type { org_springframework_web_servlet_mvc_method_annotation_SseEmitter } from '../models/org_springframework_web_servlet_mvc_method_annotation_SseEmitter';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoService {
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
     * @param userUuid
     * @param alarmId
     * @returns any OK
     * @throws ApiError
     */
    public static alarmRead(
        userUuid: string,
        alarmId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/alarm/read/{userUUID}/{alarmId}',
            path: {
                'userUUID': userUuid,
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
     * @param userUuid
     * @returns any OK
     * @throws ApiError
     */
    public static alarmCheck(
        userUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/alarm/check/{userUUID}',
            path: {
                'userUUID': userUuid,
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
     * @param userUuid
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sendAlarm(
        userUuid: string,
        requestBody: com_ever_edu_pms_notification_dto_req_AlarmSendReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/alarm/send/{userUUID}',
            path: {
                'userUUID': userUuid,
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
     * FO/BO 테넌트메뉴목록 트리 조회
     * 메뉴 목록을 트리구조로 조회한다.
     * @param tenantId
     * @param roleIds
     * @param deviceType
     * @returns com_ever_edu_pms_menu_dto_res_MenuTreeDto OK
     * @throws ApiError
     */
    public static findTenantMenu(
        tenantId: number,
        roleIds?: Array<string>,
        deviceType?: string,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/menus/tenantTree',
            query: {
                'roleIds': roleIds,
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
     * 교육장소 목록 조회
     * 교육장소 목록 정보를 조회한다.
     * @param paramDto
     * @param page
     * @param size
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto OK
     * @throws ApiError
     */
    public static getEducationPlaceList(
        paramDto: com_ever_edu_pms_educationplace_dto_req_EducationPlaceReqDto,
        page?: number,
        size: number = 10,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/education/place',
            query: {
                'page': page,
                'size': size,
                'paramDto': paramDto,
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
     * 교육장소 정보 조회
     * 교육장소 상세 정보를 조회한다.
     * @param uuid
     * @returns com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto OK
     * @throws ApiError
     */
    public static getEducationPlaceInfo(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/education/place/{uuid}',
            path: {
                'uuid': uuid,
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
     * @param userUuid
     * @returns com_ever_edu_pms_notification_dto_res_AlarmResDto OK
     * @throws ApiError
     */
    public static findAlarm(
        userUuid: string,
    ): CancelablePromise<Array<com_ever_edu_pms_notification_dto_res_AlarmResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/{userUUID}',
            path: {
                'userUUID': userUuid,
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
     * @param userUuid
     * @returns number OK
     * @throws ApiError
     */
    public static findAlarmUnCheckCount(
        userUuid: string,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/uncheck-count/{userUUID}',
            path: {
                'userUUID': userUuid,
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
     * @param userUuid
     * @returns org_springframework_web_servlet_mvc_method_annotation_SseEmitter OK
     * @throws ApiError
     */
    public static subscribe(
        userUuid: string,
    ): CancelablePromise<org_springframework_web_servlet_mvc_method_annotation_SseEmitter> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/subscribe/{userUUID}',
            path: {
                'userUUID': userUuid,
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
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static close(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/alarm/close/{id}',
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
}
