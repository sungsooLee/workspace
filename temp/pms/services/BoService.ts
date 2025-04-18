/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_enums_EnumValue } from '../models/com_ever_edu_enums_EnumValue';
import type { com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto } from '../models/com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelResDto } from '../models/com_ever_edu_pms_channel_dto_res_ChannelResDto';
import type { com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSaveReqDto } from '../models/com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSaveReqDto';
import type { com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_common_cd_dto_req_CommonCdSaveReqDto } from '../models/com_ever_edu_pms_common_cd_dto_req_CommonCdSaveReqDto';
import type { com_ever_edu_pms_common_cd_dto_req_CommonCdSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_common_cd_dto_req_CommonCdSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_common_cd_dto_req_CommonCdUpdateReqDto } from '../models/com_ever_edu_pms_common_cd_dto_req_CommonCdUpdateReqDto';
import type { com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin';
import type { com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin';
import type { com_ever_edu_pms_company_dto_req_CompanyCreateReqDto } from '../models/com_ever_edu_pms_company_dto_req_CompanyCreateReqDto';
import type { com_ever_edu_pms_company_dto_req_CompanyUpdateReqDto } from '../models/com_ever_edu_pms_company_dto_req_CompanyUpdateReqDto';
import type { com_ever_edu_pms_company_dto_res_CompanyResDto } from '../models/com_ever_edu_pms_company_dto_res_CompanyResDto';
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto } from '../models/com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto';
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceReqDto } from '../models/com_ever_edu_pms_educationplace_dto_req_EducationPlaceReqDto';
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceSaveReqDto } from '../models/com_ever_edu_pms_educationplace_dto_req_EducationPlaceSaveReqDto';
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto } from '../models/com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto';
import type { com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto } from '../models/com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto';
import type { com_ever_edu_pms_form_dto_req_FormReqDto$CustomForm } from '../models/com_ever_edu_pms_form_dto_req_FormReqDto$CustomForm';
import type { com_ever_edu_pms_form_dto_req_FormReqDto$OptionalForm } from '../models/com_ever_edu_pms_form_dto_req_FormReqDto$OptionalForm';
import type { com_ever_edu_pms_form_dto_res_FormResDto$Form } from '../models/com_ever_edu_pms_form_dto_res_FormResDto$Form';
import type { com_ever_edu_pms_form_dto_res_FormResDto$OptionalFormUsage } from '../models/com_ever_edu_pms_form_dto_res_FormResDto$OptionalFormUsage';
import type { com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto } from '../models/com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto';
import type { com_ever_edu_pms_labelmessage_dto_req_LabelMessageSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_labelmessage_dto_req_LabelMessageSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin';
import type { com_ever_edu_pms_menu_dto_req_FavoritesMenuSaveReqDto } from '../models/com_ever_edu_pms_menu_dto_req_FavoritesMenuSaveReqDto';
import type { com_ever_edu_pms_menu_dto_req_MenuDnDRequestDto } from '../models/com_ever_edu_pms_menu_dto_req_MenuDnDRequestDto';
import type { com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto } from '../models/com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto';
import type { com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto } from '../models/com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto';
import type { com_ever_edu_pms_menu_dto_req_TenantMenuDnDRequestDto } from '../models/com_ever_edu_pms_menu_dto_req_TenantMenuDnDRequestDto';
import type { com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$DetailOnAdmin';
import type { com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$ListOnAdmin } from '../models/com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$ListOnAdmin';
import type { com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin';
import type { com_ever_edu_pms_menu_dto_res_MenuResDto$ListOnAdmin } from '../models/com_ever_edu_pms_menu_dto_res_MenuResDto$ListOnAdmin';
import type { com_ever_edu_pms_menu_dto_res_MenuTreeDto } from '../models/com_ever_edu_pms_menu_dto_res_MenuTreeDto';
import type { com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$MultilingualDto } from '../models/com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$MultilingualDto';
import type { com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin';
import type { com_ever_edu_pms_notification_dto_req_EmailReceiverReqDto } from '../models/com_ever_edu_pms_notification_dto_req_EmailReceiverReqDto';
import type { com_ever_edu_pms_notification_dto_req_EmailSendReqDto } from '../models/com_ever_edu_pms_notification_dto_req_EmailSendReqDto';
import type { com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto } from '../models/com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto';
import type { com_ever_edu_pms_notification_dto_req_EmailTemplateSearchReqDto } from '../models/com_ever_edu_pms_notification_dto_req_EmailTemplateSearchReqDto';
import type { com_ever_edu_pms_notification_dto_req_MessageHistorySearchReqDto } from '../models/com_ever_edu_pms_notification_dto_req_MessageHistorySearchReqDto';
import type { com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto } from '../models/com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto';
import type { com_ever_edu_pms_notification_dto_req_PeriodicEmailSaveReqDto } from '../models/com_ever_edu_pms_notification_dto_req_PeriodicEmailSaveReqDto';
import type { com_ever_edu_pms_notification_dto_req_PeriodicEmailUpdateReqDto } from '../models/com_ever_edu_pms_notification_dto_req_PeriodicEmailUpdateReqDto';
import type { com_ever_edu_pms_notification_dto_res_EmailResDto$MultipleEmail } from '../models/com_ever_edu_pms_notification_dto_res_EmailResDto$MultipleEmail';
import type { com_ever_edu_pms_notification_dto_res_EmailTemplateResDto } from '../models/com_ever_edu_pms_notification_dto_res_EmailTemplateResDto';
import type { com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto } from '../models/com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto';
import type { com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin';
import type { com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto } from '../models/com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto';
import type { com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin';
import type { com_ever_edu_pms_user_dto_req_ChangeEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangeEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePasswordByEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePasswordByEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePasswordByPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePasswordByPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_IssueNewPasswordReqDto } from '../models/com_ever_edu_pms_user_dto_req_IssueNewPasswordReqDto';
import type { com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_req_UserRegisterReqDto } from '../models/com_ever_edu_pms_user_dto_req_UserRegisterReqDto';
import type { com_ever_edu_pms_user_dto_req_UserSaveReqDto$SaveByAdminDto } from '../models/com_ever_edu_pms_user_dto_req_UserSaveReqDto$SaveByAdminDto';
import type { com_ever_edu_pms_user_dto_req_UserUpdateReqDto$UpdateByAdminDto } from '../models/com_ever_edu_pms_user_dto_req_UserUpdateReqDto$UpdateByAdminDto';
import type { com_ever_edu_pms_user_dto_req_VerifyEmailReqDto } from '../models/com_ever_edu_pms_user_dto_req_VerifyEmailReqDto';
import type { com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto } from '../models/com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto';
import type { com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto } from '../models/com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto';
import type { com_ever_edu_pms_user_dto_res_FindMyIdResDto } from '../models/com_ever_edu_pms_user_dto_res_FindMyIdResDto';
import type { com_ever_edu_pms_user_dto_res_IsEmailExistsResDto } from '../models/com_ever_edu_pms_user_dto_res_IsEmailExistsResDto';
import type { com_ever_edu_pms_user_dto_res_UserGroupDto } from '../models/com_ever_edu_pms_user_dto_res_UserGroupDto';
import type { com_ever_edu_pms_user_dto_res_UserResDto } from '../models/com_ever_edu_pms_user_dto_res_UserResDto';
import type { com_ever_edu_pms_widget_dto_req_WidgetSearchReqDto$SearchByAdmin } from '../models/com_ever_edu_pms_widget_dto_req_WidgetSearchReqDto$SearchByAdmin';
import type { com_ever_edu_pms_widget_dto_res_WidgetResDto$DetailOnAdmin } from '../models/com_ever_edu_pms_widget_dto_res_WidgetResDto$DetailOnAdmin';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailRecordResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailRecordResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailTemplateResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailTemplateResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageHistoryResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageHistoryResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsAgreementResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsAgreementResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_widget_dto_res_WidgetResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_widget_dto_res_WidgetResDto$ListOnAdmin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoService {
    /**
     * 비밀번호 변경(비밀번호 인증)
     * 기존 비밀번호를 통해 사용자의 비밀번호를 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePassword1(
        requestBody: com_ever_edu_pms_user_dto_req_ChangePasswordReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/users/verifications/change-password',
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
     * 비밀번호 변경(휴대전화 번호 인증)
     * 휴대전화 번호 인증을 통해 사용자의 비밀번호를 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePasswordByPhoneNumber(
        requestBody: com_ever_edu_pms_user_dto_req_ChangePasswordByPhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/users/verifications/change-password-by-phone-number',
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
     * 비밀번호 변경(이메일 주소 인증)
     * 이메일 주소 인증을 통해 사용자의 비밀번호를 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePasswordByEmail(
        requestBody: com_ever_edu_pms_user_dto_req_ChangePasswordByEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/users/verifications/change-password-by-email',
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
     * 임시 비밀번호 발급
     * 특정 사용자의 비밀번호를 임시 비밀번호로 변경한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static issueNewPassword(
        requestBody: com_ever_edu_pms_user_dto_req_IssueNewPasswordReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/users/issue-new-password',
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
    public static changePhoneNumber1(
        requestBody: com_ever_edu_pms_user_dto_req_ChangePhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/users/change-phone-number',
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
    public static changeEmail1(
        requestBody: com_ever_edu_pms_user_dto_req_ChangeEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/users/change-email',
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
     * 이용약관 단건 조회
     * 이용약관 단건 조회
     * @param termsId
     * @returns com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById(
        termsId: number,
    ): CancelablePromise<com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/terms/{termsId}',
            path: {
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
     * 이용약관 수정
     * 이용약관 수정
     * @param termsId
     * @param requestBody
     * @returns com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static update(
        termsId: number,
        requestBody: com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto,
    ): CancelablePromise<com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/terms/{termsId}',
            path: {
                'termsId': termsId,
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
     * 이용약관 삭제
     * 이용약관를 삭제한다.
     * @param termsId
     * @returns any OK
     * @throws ApiError
     */
    public static delete1(
        termsId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/terms/{termsId}',
            path: {
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
     * 다국어 목록 조회
     * 다국어 목록 조회
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage4(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/multilingual',
            query: {
                'pageable': pageable,
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
     * 다국어 번역목록 수정
     * 다국어 번역목록 수정
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateMultilingualList(
        requestBody: com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$MultilingualDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/multilingual',
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
     * 메세지 큐 엔트리 삭제
     * 이메일 큐 엔트리를 삭제한다.
     * @param messageQueueEntryId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteQueue(
        messageQueueEntryId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/message/queue-entry/delete/{messageQueueEntryId}',
            path: {
                'messageQueueEntryId': messageQueueEntryId,
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
     * 메뉴 단건 조회
     * 메뉴 단건 조회
     * @param menuId
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById1(
        menuId: number,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus/{menuId}',
            path: {
                'menuId': menuId,
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
     * 메뉴 수정
     * 메뉴를 수정한다.
     * @param menuId
     * @param requestBody
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static update1(
        menuId: number,
        requestBody: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/menus/{menuId}',
            path: {
                'menuId': menuId,
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
     * 메뉴 삭제
     * 메뉴를 삭제한다.
     * @param menuId
     * @returns any OK
     * @throws ApiError
     */
    public static delete2(
        menuId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/menus/{menuId}',
            path: {
                'menuId': menuId,
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
     * 테넌트메뉴 수정
     * 테넌트메뉴 수정
     * @param tenantMappingMenuId
     * @param requestBody
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static updateMenu(
        tenantMappingMenuId: number,
        requestBody: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/menus/tenant/{tenantMappingMenuId}',
            path: {
                'tenantMappingMenuId': tenantMappingMenuId,
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
     * 테넌트메뉴 삭제
     * 테넌트메뉴를 삭제한다.
     * @param tenantMappingMenuId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteMenu(
        tenantMappingMenuId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/menus/tenant/{tenantMappingMenuId}',
            path: {
                'tenantMappingMenuId': tenantMappingMenuId,
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
     * 라벨/메세지 단건 조회
     * 라벨/메세지 단건 조회
     * @param labelMessageId
     * @returns com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById2(
        labelMessageId: number,
    ): CancelablePromise<com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/label-messages/{labelMessageId}',
            path: {
                'labelMessageId': labelMessageId,
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
     * 라벨/메세지 수정
     * 라벨/메세지 수정
     * @param labelMessageId
     * @param requestBody
     * @returns com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static update2(
        labelMessageId: number,
        requestBody: com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto,
    ): CancelablePromise<com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/label-messages/{labelMessageId}',
            path: {
                'labelMessageId': labelMessageId,
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
     * 라벨/메세지 삭제
     * 라벨/메세지를 삭제한다.
     * @param labelMessageId
     * @returns any OK
     * @throws ApiError
     */
    public static delete3(
        labelMessageId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/label-messages/{labelMessageId}',
            path: {
                'labelMessageId': labelMessageId,
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
     * 이메일 템플릿 단건 조회
     * hmg-notification 이메일 템플릿을 조회하는 api다.
     * @param emailTemplateId
     * @returns com_ever_edu_pms_notification_dto_res_EmailTemplateResDto OK
     * @throws ApiError
     */
    public static findEmailTemplate(
        emailTemplateId: string,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_EmailTemplateResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/email/templates/{emailTemplateId}',
            path: {
                'emailTemplateId': emailTemplateId,
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
     * 이메일 템플릿 수정
     * hmg-notification 이메일 템플릿을 수정하는 api다. 파일을 첨부할 경우 메일 본문이 파일의 html로 대체된다.
     * @param emailTemplateId
     * @param formData
     * @returns com_ever_edu_pms_notification_dto_res_EmailTemplateResDto OK
     * @throws ApiError
     */
    public static updateEmailTemplate(
        emailTemplateId: string,
        formData?: {
            dto: com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto;
            html?: Blob;
        },
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_EmailTemplateResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/email/templates/{emailTemplateId}',
            path: {
                'emailTemplateId': emailTemplateId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * 정기 메일 단건 조회
     * 정기 메일 단건을 조회한다.
     * @param periodicEmailId
     * @returns com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findPeriodicEmailById(
        periodicEmailId: number,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/email/periodic/{periodicEmailId}',
            path: {
                'periodicEmailId': periodicEmailId,
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
     * 정기 메일 수정
     * 정기 메일을 수정한다.
     * @param periodicEmailId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static savePeriodicEmail(
        periodicEmailId: number,
        requestBody: com_ever_edu_pms_notification_dto_req_PeriodicEmailUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/email/periodic/{periodicEmailId}',
            path: {
                'periodicEmailId': periodicEmailId,
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
     * 정기 메일 수신자 수정
     * 정기 메일 수신자를 수정한다.
     * @param periodicEmailId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updatePeriodicEmailReceiver(
        periodicEmailId: number,
        requestBody: Array<com_ever_edu_pms_notification_dto_req_EmailReceiverReqDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/email/periodic/{periodicEmailId}/receivers',
            path: {
                'periodicEmailId': periodicEmailId,
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
     * 정기 메일 삭제
     * 정기 메일을 삭제한다.
     * @param periodicEmailId
     * @returns any OK
     * @throws ApiError
     */
    public static deletePeriodicEmail(
        periodicEmailId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/email/periodic/delete/{periodicEmailId}',
            path: {
                'periodicEmailId': periodicEmailId,
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
    public static getEducationPlaceInfo1(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/education/place/{uuid}',
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
     * 교육장소 수정
     * 교육장소 정보를 수정한다.
     * @param uuid
     * @param requestBody
     * @returns com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto OK
     * @throws ApiError
     */
    public static modifyEducationPlace(
        uuid: string,
        requestBody: com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto,
    ): CancelablePromise<com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/education/place/{uuid}',
            path: {
                'uuid': uuid,
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
     * 교육장소 삭제
     * 교육장소 정보를 삭제한다.
     * @param uuid
     * @returns any OK
     * @throws ApiError
     */
    public static removeEducationPlace(
        uuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/education/place/{uuid}',
            path: {
                'uuid': uuid,
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
     * 회사 조회(단건)
     * 회사 정보를 조회한다.
     * @param uuid
     * @returns com_ever_edu_pms_company_dto_res_CompanyResDto OK
     * @throws ApiError
     */
    public static getCompanyByUuid(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_company_dto_res_CompanyResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/companies/{uuid}',
            path: {
                'uuid': uuid,
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
     * 회사 수정
     * 회사를 수정한다.
     * @param uuid
     * @param requestBody
     * @returns com_ever_edu_pms_company_dto_res_CompanyResDto OK
     * @throws ApiError
     */
    public static updateCompany(
        uuid: string,
        requestBody: com_ever_edu_pms_company_dto_req_CompanyUpdateReqDto,
    ): CancelablePromise<com_ever_edu_pms_company_dto_res_CompanyResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/companies/{uuid}',
            path: {
                'uuid': uuid,
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
     * 회사 삭제
     * 회사를 삭제한다.
     * @param uuid
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCompany(
        uuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/companies/{uuid}',
            path: {
                'uuid': uuid,
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
     * 공통코드 단일 조회
     * 공통코드 단일 조회
     * @param commonCdGroupId
     * @param commonCdId
     * @returns com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById3(
        commonCdGroupId: string,
        commonCdId: string,
    ): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes/{commonCdGroupId}/{commonCdId}',
            path: {
                'commonCdGroupId': commonCdGroupId,
                'commonCdId': commonCdId,
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
     * 공통코드 수정
     * 공통코드 수정
     * @param commonCdGroupId
     * @param commonCdId
     * @param requestBody
     * @returns com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static updateCommonCd(
        commonCdGroupId: string,
        commonCdId: string,
        requestBody: com_ever_edu_pms_common_cd_dto_req_CommonCdUpdateReqDto,
    ): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/codes/{commonCdGroupId}/{commonCdId}',
            path: {
                'commonCdGroupId': commonCdGroupId,
                'commonCdId': commonCdId,
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
     * 공통코드 삭제
     * 공통코드 삭제
     * @param commonCdGroupId
     * @param commonCdId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCommonCd(
        commonCdGroupId: string,
        commonCdId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/codes/{commonCdGroupId}/{commonCdId}',
            path: {
                'commonCdGroupId': commonCdGroupId,
                'commonCdId': commonCdId,
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
     * 공통코드그룹 단건 조회
     * 공통코드그룹 단건 조회
     * @param commonCdGroupId
     * @returns com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById4(
        commonCdGroupId: string,
    ): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/code-groups/{commonCdGroupId}',
            path: {
                'commonCdGroupId': commonCdGroupId,
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
     * 공통코드그룹 수정
     * 공통코드그룹 수정
     * @param commonCdGroupId
     * @param requestBody
     * @returns com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static update3(
        commonCdGroupId: string,
        requestBody: com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/code-groups/{commonCdGroupId}',
            path: {
                'commonCdGroupId': commonCdGroupId,
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
     * 공통코드그룹 삭제
     * 공통코드그룹를 삭제한다.
     * @param commonCdGroupId
     * @returns any OK
     * @throws ApiError
     */
    public static delete4(
        commonCdGroupId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/code-groups/{commonCdGroupId}',
            path: {
                'commonCdGroupId': commonCdGroupId,
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
     * 사용자 조회(목록)
     * 사용자를 목록을 조회한다.
     * @param pageable
     * @param userState
     * @param userName
     * @param companyCode
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findPage2(
        pageable: org_springdoc_core_converters_models_Pageable,
        userState?: 'WAIT' | 'NORMAL' | 'HALT' | 'LEAVE' | 'DELETE',
        userName?: string,
        companyCode?: string,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/users',
            query: {
                'userState': userState,
                'userName': userName,
                'companyCode': companyCode,
                'pageable': pageable,
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
     * 사용자 등록
     * 사용자를 등록한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static save(
        requestBody: com_ever_edu_pms_user_dto_req_UserSaveReqDto$SaveByAdminDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users',
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
     * 휴대전화번호 인증 요청
     * 휴대전화번호 인증을 요청한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static verifyPhoneNumber1(
        requestBody: com_ever_edu_pms_user_dto_req_VerifyPhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users/verifications/verify-phone-number',
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
    public static verifyEmail1(
        requestBody: com_ever_edu_pms_user_dto_req_VerifyEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users/verifications/verify-email',
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
    public static sendVerifyPhoneNumber1(
        requestBody: com_ever_edu_pms_user_dto_req_SendVerifyPhoneNumberReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users/verifications/send-verify-phone-number',
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
    public static sendVerifyEmail1(
        requestBody: com_ever_edu_pms_user_dto_req_SendVerifyEmailReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users/verifications/send-verify-email',
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
    public static register1(
        requestBody: com_ever_edu_pms_user_dto_req_UserRegisterReqDto,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users/register',
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
    public static confirmPassword1(
        requestBody: com_ever_edu_pms_user_dto_req_ConfirmPasswordReqDto,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_ConfirmPasswordResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/users/confirm-password',
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
     * 이용약관 목록 조회
     * 이용약관 목록 조회
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage3(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/terms',
            query: {
                'pageable': pageable,
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
     * 이용약관 등록
     * 신규 이용약관를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin Created
     * @throws ApiError
     */
    public static save1(
        requestBody: com_ever_edu_pms_terms_dto_req_TermsSaveReqDto$TermsDto,
    ): CancelablePromise<com_ever_edu_pms_terms_dto_res_TermsResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/terms',
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
     * 메뉴목록 조회
     * 메뉴목록을 조회한다.
     * @param depth
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getMenuDepthList(
        depth?: number,
    ): CancelablePromise<Array<com_ever_edu_pms_menu_dto_res_MenuResDto$ListOnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus',
            query: {
                'depth': depth,
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
     * 메뉴 등록
     * 메뉴를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static save2(
        requestBody: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/menus',
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
     * 메뉴 순서변경
     * 메뉴 순서변경
     * @param menuId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateMenuDnD(
        menuId: number,
        requestBody: com_ever_edu_pms_menu_dto_req_MenuDnDRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/menus/{menuId}/dnd',
            path: {
                'menuId': menuId,
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
     * 테넌트메뉴 등록
     * 테넌트메뉴를 등록한다.
     * @param tenantId
     * @param requestBody
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static saveMenu(
        tenantId: number,
        requestBody: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/menus/tenant/{tenantId}',
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
     * 테넌트메뉴 순서변경
     * 테넌트메뉴 순서변경
     * @param tenantId
     * @param menuId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateTenantMenuDnD(
        tenantId: number,
        menuId: number,
        requestBody: com_ever_edu_pms_menu_dto_req_TenantMenuDnDRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/menus/tenant/{tenantId}/menu/{menuId}/dnd',
            path: {
                'tenantId': tenantId,
                'menuId': menuId,
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
     * 즐겨찾기 메뉴 조회
     * 즐겨찾기 메뉴를 조회한다.
     * @param userNo
     * @param tenantId
     * @returns com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static getFavoritesMenuList1(
        userNo: number,
        tenantId?: number,
    ): CancelablePromise<Array<com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$ListOnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus/favorites',
            query: {
                'tenantId': tenantId,
                'userNo': userNo,
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
     * 즐겨찾기 메뉴 등록
     * 즐겨찾기 메뉴를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static saveFavoritesMenu1(
        requestBody: com_ever_edu_pms_menu_dto_req_FavoritesMenuSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_FavoritesMenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/menus/favorites',
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
     * 라벨/메세지 목록 조회
     * 라벨/메세지 목록 조회
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage5(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_labelmessage_dto_req_LabelMessageSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/label-messages',
            query: {
                'pageable': pageable,
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
     * 라벨/메세지 등록
     * 신규 라벨/메세지를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin Created
     * @throws ApiError
     */
    public static save3(
        requestBody: com_ever_edu_pms_labelmessage_dto_req_LabelMessageSaveReqDto$LabelMessageDto,
    ): CancelablePromise<com_ever_edu_pms_labelmessage_dto_res_LabelMessageResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/label-messages',
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
     * 테넌트의 선택 form 사용 정보 등록
     * 테넌트의 선택 form 사용 여부 정보를 저장한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static saveOptionalForm(
        requestBody: com_ever_edu_pms_form_dto_req_FormReqDto$OptionalForm,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/form/optional/usage',
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
     * 테넌트의 특화 form 등록
     * 테넌트의 특화 form 정보를 json 형태로 저장한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static saveCustomForm(
        requestBody: com_ever_edu_pms_form_dto_req_FormReqDto$CustomForm,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/form/custom',
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
     * 이메일 템플릿 등록
     * hmg-notification 이메일 템플릿을 등록하는 api다. 파일을 첨부할 경우 메일 본문이 파일의 html로 대체된다.
     * @param formData
     * @returns com_ever_edu_pms_notification_dto_res_EmailTemplateResDto OK
     * @throws ApiError
     */
    public static saveEmailTemplate(
        formData?: {
            dto: com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto;
            html?: Blob;
        },
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_EmailTemplateResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/email/template',
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * 이메일 발송(단건/다건)
     * 이메일을 즉시 발송한다.
     * @param requestBody
     * @returns com_ever_edu_pms_notification_dto_res_EmailResDto$MultipleEmail OK
     * @throws ApiError
     */
    public static sendOnetimeEmail(
        requestBody: com_ever_edu_pms_notification_dto_req_EmailSendReqDto,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_EmailResDto$MultipleEmail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/email/send',
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
     * 예약 메일 등록
     * 예약 메일을 등록한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static saveReservedEmail(
        requestBody: com_ever_edu_pms_notification_dto_req_EmailSendReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/email/reserve',
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
     * 정기 메일 페이지 조회
     * 정기 메일 페이지를 조회한다.
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPeriodicEmailPage(
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/email/periodic',
            query: {
                'pageable': pageable,
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
     * 정기 메일 등록
     * 정기 메일을 등록한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static savePeriodicEmail1(
        requestBody: com_ever_edu_pms_notification_dto_req_PeriodicEmailSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/email/periodic',
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
     * 교육장소 목록 조회
     * 교육장소 목록 정보를 조회한다.
     * @param paramDto
     * @param page
     * @param size
     * @param sort
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto OK
     * @throws ApiError
     */
    public static getEducationPlaceList1(
        paramDto: com_ever_edu_pms_educationplace_dto_req_EducationPlaceReqDto,
        page?: number,
        size: number = 10,
        sort: string = 'educationPlaceId,asc',
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/education/place',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
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
     * 교육장소 등록
     * 교육장소 정보를 저장한다.
     * @param requestBody
     * @returns com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto OK
     * @throws ApiError
     */
    public static registerEducationPlace(
        requestBody: com_ever_edu_pms_educationplace_dto_req_EducationPlaceSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/education/place',
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
     * 회사 목록 조회
     * 회사 목록 정보를 조회한다.
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyResDto OK
     * @throws ApiError
     */
    public static getCompanyList(
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_company_dto_res_CompanyResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/companies',
            query: {
                'pageable': pageable,
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
     * 회사 생성
     * 회사를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_company_dto_res_CompanyResDto OK
     * @throws ApiError
     */
    public static createCompany(
        requestBody: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto,
    ): CancelablePromise<com_ever_edu_pms_company_dto_res_CompanyResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/companies',
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
     * 공통코드 목록 조회
     * 공통코드 목록 조회
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage6(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_common_cd_dto_req_CommonCdSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/codes',
            query: {
                'pageable': pageable,
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
     * 공통코드 등록
     * 공통코드 등록
     * @param requestBody
     * @returns com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static createCommonCd(
        requestBody: com_ever_edu_pms_common_cd_dto_req_CommonCdSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_CommonCdResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/codes',
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
     * 공통코드그룹 목록 조회
     * 공통코드그룹 목록 조회
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage7(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/code-groups',
            query: {
                'pageable': pageable,
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
     * 공통코드그룹 등록
     * 신규 공통코드그룹를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin Created
     * @throws ApiError
     */
    public static save4(
        requestBody: com_ever_edu_pms_common_cd_dto_req_CommonCdGroupSaveReqDto,
    ): CancelablePromise<com_ever_edu_pms_common_cd_dto_res_CommonCdGroupResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/code-groups',
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
     * 사용자 조회(단건)
     * 사용자를 조회한다.
     * @param userId
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static findByUserId(
        userId: number,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/users/{userId}',
            path: {
                'userId': userId,
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
     * 사용자 삭제
     * 사용자를 삭제한다.
     * @param userId
     * @returns void
     * @throws ApiError
     */
    public static delete(
        userId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/users/{userId}',
            path: {
                'userId': userId,
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
     * 사용자 정보 수정
     * 사용자 정보를 수정한다.
     * @param userId
     * @param requestBody
     * @returns com_ever_edu_pms_user_dto_res_UserResDto OK
     * @throws ApiError
     */
    public static update5(
        userId: number,
        requestBody: com_ever_edu_pms_user_dto_req_UserUpdateReqDto$UpdateByAdminDto,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_UserResDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/api/v1/users/{userId}',
            path: {
                'userId': userId,
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
     * 위젯 전체 조회
     * 위젯 전체를 반환한다.
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_widget_dto_res_WidgetResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage1(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_widget_dto_req_WidgetSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_widget_dto_res_WidgetResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/widgets',
            query: {
                'pageable': pageable,
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
     * 위젯 조회
     * 위젯을 찾아 반환한다.
     * @param code
     * @returns com_ever_edu_pms_widget_dto_res_WidgetResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findWidget(
        code: string,
    ): CancelablePromise<com_ever_edu_pms_widget_dto_res_WidgetResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/widgets/{code}',
            path: {
                'code': code,
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
     * 가입된 휴대전화 번호 확인
     * 가입된 휴대전화 번호인지 확인한다.
     * @param name
     * @param birthday
     * @param phoneNumber
     * @returns any OK
     * @throws ApiError
     */
    public static isMemberPhoneNumber1(
        name: string,
        birthday: string,
        phoneNumber: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/users/verifications/is-member-phone-number',
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
    public static isMemberEmail1(
        name: string,
        birthday: string,
        email: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/users/verifications/is-member-email',
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
    public static findMyId1(
        name: string,
        birthday: string,
        phoneNumber: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_FindMyIdResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/users/verifications/find-my-id',
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
     * 사용중인 이메일인지 확인
     * 이메일 주소가 사용중인지 확인한다.
     * @param email
     * @returns com_ever_edu_pms_user_dto_res_IsEmailExistsResDto OK
     * @throws ApiError
     */
    public static isEmailExists1(
        email: string,
    ): CancelablePromise<com_ever_edu_pms_user_dto_res_IsEmailExistsResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/users/is-email-exists',
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
     * 사용자 조회(단건)
     * 사용자를 조회한다.
     * @returns com_ever_edu_pms_user_dto_res_UserGroupDto OK
     * @throws ApiError
     */
    public static findByUserId1(): CancelablePromise<Array<com_ever_edu_pms_user_dto_res_UserGroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/userGroup/userGroups',
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
     * 이용약관 동의내역 조회
     * 이용약관 동의내역을 조회한다.
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsAgreementResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findHistoryPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_pms_terms_dto_req_TermsSearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_terms_dto_res_TermsAgreementResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/terms/history',
            query: {
                'pageable': pageable,
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
     * 다국어 단건 조회
     * 다국어 단건 조회
     * @param multilingualKeyValue
     * @returns com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findMultilingualKeyValue(
        multilingualKeyValue: string,
    ): CancelablePromise<com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/multilingual/{multilingualKeyValue}',
            path: {
                'multilingualKeyValue': multilingualKeyValue,
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
     * 다국어코드 중복체크
     * 다국어코드를 중복체크한다.
     * @param keyType
     * @param messageCode
     * @returns boolean OK
     * @throws ApiError
     */
    public static existsMessageCode(
        keyType: 'COMMON_CODE' | 'MENU' | 'LABEL' | 'CATEGORY' | 'MESSAGE',
        messageCode: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/multilingual/exists',
            query: {
                'keyType': keyType,
                'messageCode': messageCode,
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
     * 메세지 발송 내역 페이지 조회
     * 메세지 발송 내역 페이지를 조회한다.
     * @param pageable
     * @param dto
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageHistoryResDto OK
     * @throws ApiError
     */
    public static findMessageHistoryPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        dto: com_ever_edu_pms_notification_dto_req_MessageHistorySearchReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageHistoryResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/message/records',
            query: {
                'pageable': pageable,
                'dto': dto,
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
     * 메세지 큐 엔트리 단건 조회
     * 메세지 큐 엔트리 단건을 조회한다.
     * @param messageQueueEntryId
     * @returns com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto OK
     * @throws ApiError
     */
    public static findMessageQueueEntryById(
        messageQueueEntryId: number,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/message/queue-entry/{messageQueueEntryId}',
            path: {
                'messageQueueEntryId': messageQueueEntryId,
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
     * 메세지 큐 페이지 조회
     * 메세지 큐 페이지를 조회한다.
     * @param pageable
     * @param messageQueueEntryId
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueResDto OK
     * @throws ApiError
     */
    public static findMessageQueuePage(
        pageable: org_springdoc_core_converters_models_Pageable,
        messageQueueEntryId: number,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/message/queue-entry/{messageQueueEntryId}/queue',
            path: {
                'messageQueueEntryId': messageQueueEntryId,
            },
            query: {
                'pageable': pageable,
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
     * 메세지 큐 엔트리 페이지 조회
     * 메세지 큐 엔트리 페이지를 조회한다.
     * @param pageable
     * @param dto
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto OK
     * @throws ApiError
     */
    public static findMessageQueueEntryPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        dto: com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/message/queue-entries',
            query: {
                'pageable': pageable,
                'dto': dto,
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
     * 메뉴 상세 조회
     * 메뉴 상세 조회
     * @param menuId
     * @returns com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findDetailById(
        menuId: number,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus/{menuId}/detail',
            path: {
                'menuId': menuId,
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
     * FO/BO 메뉴목록 트리 조회
     * 메뉴 목록을 트리구조로 조회한다.
     * @param menuScopeCode
     * @returns com_ever_edu_pms_menu_dto_res_MenuTreeDto OK
     * @throws ApiError
     */
    public static findMenu(
        menuScopeCode?: 'FO' | 'BO' | 'EX',
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus/tree',
            query: {
                'menuScopeCode': menuScopeCode,
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
    public static findTenantMenu1(
        tenantId: number,
        roleIds?: Array<string>,
        deviceType?: string,
    ): CancelablePromise<com_ever_edu_pms_menu_dto_res_MenuTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus/tenantTree',
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
     * 메뉴코드 중복체크
     * 메뉴코드를 중복체크한다.
     * @param menuCode
     * @param parentId
     * @returns boolean OK
     * @throws ApiError
     */
    public static existsMenuCode(
        menuCode: string,
        parentId: number,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/menus/exists',
            query: {
                'menuCode': menuCode,
                'parentId': parentId,
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
     * 전체 form 조회
     * 특정 Form의 고정/선택/특화 필드 값을 모두 조회한다.
     * @param formUuid Form UUID
     * @param tenantUuid Tenant UUID
     * @returns com_ever_edu_pms_form_dto_res_FormResDto$Form OK
     * @throws ApiError
     */
    public static findForm(
        formUuid: string,
        tenantUuid: string,
    ): CancelablePromise<com_ever_edu_pms_form_dto_res_FormResDto$Form> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/form/{formUUID}/tenant/{tenantUUID}',
            path: {
                'formUUID': formUuid,
                'tenantUUID': tenantUuid,
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
     * 선택 form 조회
     * 특정 Form의 선택 필드 값을 모두 조회한다.
     * @param formUuid Form UUID
     * @param tenantUuid Tenant UUID
     * @returns com_ever_edu_pms_form_dto_res_FormResDto$OptionalFormUsage OK
     * @throws ApiError
     */
    public static findOptionalForm(
        formUuid: string,
        tenantUuid: string,
    ): CancelablePromise<Array<com_ever_edu_pms_form_dto_res_FormResDto$OptionalFormUsage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/form/{formUUID}/tenant/{tenantUUID}/optional',
            path: {
                'formUUID': formUuid,
                'tenantUUID': tenantUuid,
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
     * 이메일 템플릿 페이지 조회
     * hmg-notification 전체 이메일 템플릿 목록을 조회하는 api다.
     * @param pageable
     * @param dto
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailTemplateResDto OK
     * @throws ApiError
     */
    public static findAllEmailTemplates(
        pageable: org_springdoc_core_converters_models_Pageable,
        dto: com_ever_edu_pms_notification_dto_req_EmailTemplateSearchReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailTemplateResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/email/templates',
            query: {
                'pageable': pageable,
                'dto': dto,
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
     * hmg-notification 메일 발송 기록 페이지 조회
     * 메일 발송 기록 페이지를 조회한다.
     * @param recordId
     * @param page
     * @param size
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailRecordResDto OK
     * @throws ApiError
     */
    public static findRecordPage1(
        recordId: string,
        page: number,
        size: number,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_EmailRecordResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/email/records/{recordId}',
            path: {
                'recordId': recordId,
            },
            query: {
                'page': page,
                'size': size,
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
     * 교육장소 이력 목록 조회
     * 교육장소 이력 목록 정보를 조회한다.
     * @param paramDto
     * @param page
     * @param size
     * @param sort
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto OK
     * @throws ApiError
     */
    public static getEducationPlaceHistoryList(
        paramDto: com_ever_edu_pms_educationplace_dto_req_EducationPlaceHistoryReqDto,
        page?: number,
        size: number = 10,
        sort: string = 'educationPlaceId,desc',
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/education/place/history',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
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
     * 사업자등록번호로 회사 조회(단건)
     * 사업자 등록번호로 회사 정보를 조회한다.
     * @param brn
     * @returns com_ever_edu_pms_company_dto_res_CompanyResDto OK
     * @throws ApiError
     */
    public static getCompanyByBrn1(
        brn: string,
    ): CancelablePromise<com_ever_edu_pms_company_dto_res_CompanyResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/companies/brn/{brn}',
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
     * 공통 코드(enum) 목록 조회
     * 등록된 모든 enum의 이름을 반환한다.
     * @returns string OK
     * @throws ApiError
     */
    public static findAllEnums(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/code-groups/enums',
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
     * 공통 코드(enum) 단건 조회
     * 존재하는 enum을 찾아 반환한다.
     * @param enumName
     * @returns com_ever_edu_enums_EnumValue OK
     * @throws ApiError
     */
    public static findEnum(
        enumName: string,
    ): CancelablePromise<Record<string, Array<com_ever_edu_enums_EnumValue>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/code-groups/enum/{enumName}',
            path: {
                'enumName': enumName,
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
     * 채널 조회
     * 테넌트의 채널목록을 조회한다.
     * @param channelSearchReqDto
     * @returns com_ever_edu_pms_channel_dto_res_ChannelResDto OK
     * @throws ApiError
     */
    public static findContents(
        channelSearchReqDto: com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto,
    ): CancelablePromise<Array<com_ever_edu_pms_channel_dto_res_ChannelResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/channel',
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
     * 회원 탈퇴
     * 회원 탈퇴를 요청한다.
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAccount1(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/users/delete-account',
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
     * 즐겨찾기 메뉴 삭제
     * 즐겨찾기 메뉴를 삭제한다.
     * @param favoritesMenuId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteFavoritesMenu1(
        favoritesMenuId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/menus/favorites/{favoritesMenuId}',
            path: {
                'favoritesMenuId': favoritesMenuId,
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
