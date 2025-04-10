/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_notification_dto_req_SmsSendReqDto } from '../models/com_ever_edu_pms_notification_dto_req_SmsSendReqDto';
import type { com_ever_edu_pms_notification_dto_req_SmsTemplateReqDto } from '../models/com_ever_edu_pms_notification_dto_req_SmsTemplateReqDto';
import type { com_ever_edu_pms_notification_dto_req_SmsTemplateSearchReqDto } from '../models/com_ever_edu_pms_notification_dto_req_SmsTemplateSearchReqDto';
import type { com_ever_edu_pms_notification_dto_res_SmsResDto$MultipleSending } from '../models/com_ever_edu_pms_notification_dto_res_SmsResDto$MultipleSending';
import type { com_ever_edu_pms_notification_dto_res_SmsTemplateResDto } from '../models/com_ever_edu_pms_notification_dto_res_SmsTemplateResDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsRecordResDto$RecodeRes } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsRecordResDto$RecodeRes';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsTemplateResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsTemplateResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoSmsService {
    /**
     * SMS 템플릿 수정
     * SMS 템플릿을 수정한다.
     * @param templateId
     * @param requestBody
     * @returns com_ever_edu_pms_notification_dto_res_SmsTemplateResDto OK
     * @throws ApiError
     */
    public static updateSmsTemplate(
        templateId: string,
        requestBody: com_ever_edu_pms_notification_dto_req_SmsTemplateReqDto,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_SmsTemplateResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/sms/templates/{templateId}',
            path: {
                'templateId': templateId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * SMS 템플릿 등록
     * SMS 템플릿을 등록한다.
     * @param requestBody
     * @returns com_ever_edu_pms_notification_dto_res_SmsTemplateResDto OK
     * @throws ApiError
     */
    public static saveSmsTemplate(
        requestBody: com_ever_edu_pms_notification_dto_req_SmsTemplateReqDto,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_SmsTemplateResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/sms/template',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * SMS 발송(단건)
     * SMS을 단건 발송한다.
     * @param requestBody
     * @returns com_ever_edu_pms_notification_dto_res_SmsResDto$MultipleSending OK
     * @throws ApiError
     */
    public static sendOneTimeSms(
        requestBody: com_ever_edu_pms_notification_dto_req_SmsSendReqDto,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_SmsResDto$MultipleSending> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/sms/send',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * SMS 예약 발송 등록
     * SMS 예약 발송을 등록한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static saveReservedSms(
        requestBody: com_ever_edu_pms_notification_dto_req_SmsSendReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/sms/reserve',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * SMS 템플릿 목록 조회
     * SMS 템플릿을 목록을 조회한다.
     * @param pageable
     * @param dto
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsTemplateResDto OK
     * @throws ApiError
     */
    public static findTemplatesPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        dto: com_ever_edu_pms_notification_dto_req_SmsTemplateSearchReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsTemplateResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/sms/templates',
            query: {
                'pageable': pageable,
                'dto': dto,
            },
        });
    }
    /**
     * SMS 템플릿 조회
     * SMS 템플릿을 단건 조회한다.
     * @param smsTemplateId
     * @returns com_ever_edu_pms_notification_dto_res_SmsTemplateResDto OK
     * @throws ApiError
     */
    public static findSmsTemplate(
        smsTemplateId: string,
    ): CancelablePromise<com_ever_edu_pms_notification_dto_res_SmsTemplateResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/sms/templates/{smsTemplateId}',
            path: {
                'smsTemplateId': smsTemplateId,
            },
        });
    }
    /**
     * hmg-notification SMS 발송 기록 페이지 조회
     * SMS 발송 기록 페이지를 조회한다.
     * @param recordEntryId
     * @param page
     * @param size
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsRecordResDto$RecodeRes OK
     * @throws ApiError
     */
    public static findRecordPage(
        recordEntryId: string,
        page: number,
        size: number,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_notification_dto_res_SmsRecordResDto$RecodeRes> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/sms/records/{recordEntryId}',
            path: {
                'recordEntryId': recordEntryId,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
}
