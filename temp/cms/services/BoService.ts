/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtGroupSaveReqDto } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtGroupSaveReqDto';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtGroupSaveReqDto$Copy } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtGroupSaveReqDto$Copy';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtGroupUpdateReqDto } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtGroupUpdateReqDto';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtGroupUpdateReqDto$IsPublishedReqDto } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtGroupUpdateReqDto$IsPublishedReqDto';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtMappingUserSaveReqDto } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtMappingUserSaveReqDto';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtSaveReqDto } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtSaveReqDto';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitSaveReqDto$onAdmin } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitSaveReqDto$onAdmin';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$AsgmtResult } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$AsgmtResult';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtUpdateReqDto } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtUpdateReqDto';
import type { com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin } from '../models/com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin';
import type { com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnAdmin } from '../models/com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnAdmin';
import type { com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin } from '../models/com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin';
import type { com_ever_edu_cms_blog_dto_req_BlogSaveReqDto } from '../models/com_ever_edu_cms_blog_dto_req_BlogSaveReqDto';
import type { com_ever_edu_cms_blog_dto_req_BlogUpdateReqDto } from '../models/com_ever_edu_cms_blog_dto_req_BlogUpdateReqDto';
import type { com_ever_edu_cms_blog_dto_res_BlogContentResDto } from '../models/com_ever_edu_cms_blog_dto_res_BlogContentResDto';
import type { com_ever_edu_cms_blog_dto_res_BlogResourceResDto } from '../models/com_ever_edu_cms_blog_dto_res_BlogResourceResDto';
import type { com_ever_edu_cms_content_dto_req_BatchSettingsReqDto } from '../models/com_ever_edu_cms_content_dto_req_BatchSettingsReqDto';
import type { com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto } from '../models/com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto';
import type { com_ever_edu_cms_content_dto_req_ContentExportReqDto } from '../models/com_ever_edu_cms_content_dto_req_ContentExportReqDto';
import type { com_ever_edu_cms_content_dto_req_ContentProgressListReqDto } from '../models/com_ever_edu_cms_content_dto_req_ContentProgressListReqDto';
import type { com_ever_edu_cms_content_dto_req_ContentSaveReqDto } from '../models/com_ever_edu_cms_content_dto_req_ContentSaveReqDto';
import type { com_ever_edu_cms_content_dto_req_ContentUpdateReqDto } from '../models/com_ever_edu_cms_content_dto_req_ContentUpdateReqDto';
import type { com_ever_edu_cms_content_dto_req_SharedBoxContentReqDto } from '../models/com_ever_edu_cms_content_dto_req_SharedBoxContentReqDto';
import type { com_ever_edu_cms_content_dto_res_BatchSettingsResDto } from '../models/com_ever_edu_cms_content_dto_res_BatchSettingsResDto';
import type { com_ever_edu_cms_content_dto_res_ContentProgressListResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentProgressListResDto';
import type { com_ever_edu_cms_content_dto_res_ContentProgressResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentProgressResDto';
import type { com_ever_edu_cms_content_dto_res_ContentResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentResDto';
import type { com_ever_edu_cms_content_dto_res_ContentTranslationResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentTranslationResDto';
import type { com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto } from '../models/com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto';
import type { com_ever_edu_cms_content_dto_res_ShareChannelCodeResDto } from '../models/com_ever_edu_cms_content_dto_res_ShareChannelCodeResDto';
import type { com_ever_edu_cms_content_dto_res_ShareContentResDto } from '../models/com_ever_edu_cms_content_dto_res_ShareContentResDto';
import type { com_ever_edu_cms_content_dto_res_SharedBoxContentResDto } from '../models/com_ever_edu_cms_content_dto_res_SharedBoxContentResDto';
import type { com_ever_edu_cms_content_dto_res_ShareTenantChannelCodeResDto } from '../models/com_ever_edu_cms_content_dto_res_ShareTenantChannelCodeResDto';
import type { com_ever_edu_cms_content_dto_res_ShareTenantCodeResDto } from '../models/com_ever_edu_cms_content_dto_res_ShareTenantCodeResDto';
import type { com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_CurriculumUpdateReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_CurriculumUpdateReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_FixedLessonUpdateReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_FixedLessonUpdateReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_FixedModuleSaveReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_FixedModuleSaveReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_FixedModuleUpdateReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_FixedModuleUpdateReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonModuleSave } from '../models/com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonModuleSave';
import type { com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonSave } from '../models/com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonSave';
import type { com_ever_edu_cms_curriculum_dto_req_GeneralLessonUpdateReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_GeneralLessonUpdateReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_GeneralModuleSaveReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_GeneralModuleSaveReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_ModuleUpdateReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_ModuleUpdateReqDto';
import type { com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto } from '../models/com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto';
import type { com_ever_edu_cms_curriculum_dto_res_CurriculumResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_CurriculumResDto';
import type { com_ever_edu_cms_curriculum_dto_res_LessonResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_LessonResDto';
import type { com_ever_edu_cms_curriculum_dto_res_ModuleResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_ModuleResDto';
import type { com_ever_edu_cms_etc_dto_req_EtcContentDraftReqDto } from '../models/com_ever_edu_cms_etc_dto_req_EtcContentDraftReqDto';
import type { com_ever_edu_cms_etc_dto_req_EtcContentFileChangeReqDto } from '../models/com_ever_edu_cms_etc_dto_req_EtcContentFileChangeReqDto';
import type { com_ever_edu_cms_etc_dto_req_EtcContentUpdateReqDto } from '../models/com_ever_edu_cms_etc_dto_req_EtcContentUpdateReqDto';
import type { com_ever_edu_cms_etc_dto_res_EtcContentResDto } from '../models/com_ever_edu_cms_etc_dto_res_EtcContentResDto';
import type { com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto } from '../models/com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto';
import type { com_ever_edu_cms_etc_dto_res_EtcContentStatusResDto } from '../models/com_ever_edu_cms_etc_dto_res_EtcContentStatusResDto';
import type { com_ever_edu_cms_exam_dto_req_ExamPoolStepUpdateReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamPoolStepUpdateReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionDeleteReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionDeleteReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionSaveCopiedReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionSaveCopiedReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionUseStatusUpdateReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamQuestionUseStatusUpdateReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamSaveReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamSaveReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto';
import type { com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto } from '../models/com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto';
import type { com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto } from '../models/com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto';
import type { com_ever_edu_cms_exam_dto_res_ExamQuestionResDto } from '../models/com_ever_edu_cms_exam_dto_res_ExamQuestionResDto';
import type { com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto } from '../models/com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto';
import type { com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto } from '../models/com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto';
import type { com_ever_edu_cms_exam_dto_res_ExamSaveResDto } from '../models/com_ever_edu_cms_exam_dto_res_ExamSaveResDto';
import type { com_ever_edu_cms_external_link_dto_req_ExternalLinkSaveReqDto } from '../models/com_ever_edu_cms_external_link_dto_req_ExternalLinkSaveReqDto';
import type { com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto } from '../models/com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto';
import type { com_ever_edu_cms_image_dto_req_ImageContentUpdateReqDto } from '../models/com_ever_edu_cms_image_dto_req_ImageContentUpdateReqDto';
import type { com_ever_edu_cms_image_dto_req_ImageOrderSaveReqDto } from '../models/com_ever_edu_cms_image_dto_req_ImageOrderSaveReqDto';
import type { com_ever_edu_cms_image_dto_req_ImagesDraftReqDto } from '../models/com_ever_edu_cms_image_dto_req_ImagesDraftReqDto';
import type { com_ever_edu_cms_image_dto_res_ImageContentResDto } from '../models/com_ever_edu_cms_image_dto_res_ImageContentResDto';
import type { com_ever_edu_cms_image_dto_res_ImageResourceListResDto } from '../models/com_ever_edu_cms_image_dto_res_ImageResourceListResDto';
import type { com_ever_edu_cms_image_dto_res_ImageStatusResDto } from '../models/com_ever_edu_cms_image_dto_res_ImageStatusResDto';
import type { com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto } from '../models/com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto';
import type { com_ever_edu_cms_survey_dto_req_SurveyQuestionSortReqDto } from '../models/com_ever_edu_cms_survey_dto_req_SurveyQuestionSortReqDto';
import type { com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto } from '../models/com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto';
import type { com_ever_edu_cms_survey_dto_req_SurveySaveReqDto } from '../models/com_ever_edu_cms_survey_dto_req_SurveySaveReqDto';
import type { com_ever_edu_cms_survey_dto_req_SurveySearchReqDto$SearchByAdmin } from '../models/com_ever_edu_cms_survey_dto_req_SurveySearchReqDto$SearchByAdmin';
import type { com_ever_edu_cms_survey_dto_req_SurveyUpdateReqDto } from '../models/com_ever_edu_cms_survey_dto_req_SurveyUpdateReqDto';
import type { com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin } from '../models/com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin';
import type { com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin } from '../models/com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin';
import type { com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin } from '../models/com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin';
import type { com_ever_edu_cms_video_dto_req_VideoFileChangeReqDto } from '../models/com_ever_edu_cms_video_dto_req_VideoFileChangeReqDto';
import type { com_ever_edu_cms_video_dto_req_VideoSaveReqDto_DraftMultipleSave } from '../models/com_ever_edu_cms_video_dto_req_VideoSaveReqDto_DraftMultipleSave';
import type { com_ever_edu_cms_video_dto_req_VideoUpdateReqDto } from '../models/com_ever_edu_cms_video_dto_req_VideoUpdateReqDto';
import type { com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto } from '../models/com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto';
import type { com_ever_edu_cms_video_dto_res_VideoDraftListResDto } from '../models/com_ever_edu_cms_video_dto_res_VideoDraftListResDto';
import type { com_ever_edu_cms_video_dto_res_VideoResDto } from '../models/com_ever_edu_cms_video_dto_res_VideoResDto';
import type { com_ever_edu_cms_video_dto_res_VideoResourceResDto } from '../models/com_ever_edu_cms_video_dto_res_VideoResourceResDto';
import type { com_ever_edu_cms_video_dto_res_VideoStatusResDto } from '../models/com_ever_edu_cms_video_dto_res_VideoStatusResDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentExportResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentExportResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_SharedBoxResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_SharedBoxResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_survey_dto_res_SurveyResDto$ListOnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_survey_dto_res_SurveyResDto$ListOnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_external_course_dto_CourseResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_external_course_dto_CourseResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoService {
    /**
     * 비디오(콘텐츠) 메타 정보 저장
     * 콘텐츠 메타 정보를 수정하고 비디오 콘텐츠를 저장한다. 등록은 모두 임시저장 으로 시작하므로 이는 수정 api다.
     * @param requestBody
     * @returns com_ever_edu_cms_video_dto_res_VideoResDto OK
     * @throws ApiError
     */
    public static updateVideo(
        requestBody: com_ever_edu_cms_video_dto_req_VideoUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/video/update',
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
     * 비디오 파일 변경
     * 콘텐츠 내부 비디오 파일을 수정하는 api다.
     * @param requestBody
     * @returns com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto OK
     * @throws ApiError
     */
    public static changeVideoFile(
        requestBody: com_ever_edu_cms_video_dto_req_VideoFileChangeReqDto,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/video/file/change',
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
     * 설문지 단건 조회
     * 설문지 단건을 조회한다.
     * @param contentId Content ID
     * @returns com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findById(
        contentId: number,
    ): CancelablePromise<com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/survey/{contentId}',
            path: {
                'contentId': contentId,
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
     * 설문지 단건 수정
     * 설문지 단건을 수정한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static update(
        requestBody: com_ever_edu_cms_survey_dto_req_SurveyUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/survey/{contentId}',
            body: requestBody,
            mediaType: 'application/json',
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
     * 설문 문제 순서 변경
     * 설문 문제 순서를 변경한다.
     * @param contentId Content ID
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sort(
        contentId: number,
        requestBody: com_ever_edu_cms_survey_dto_req_SurveyQuestionSortReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/survey/{contentId}/question/sort',
            path: {
                'contentId': contentId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * Image 리소스 추가
     * Image 리소스 추가한다.
     * @param contentUuid
     * @param fileUuid
     * @returns com_ever_edu_cms_image_dto_res_ImageResourceListResDto OK
     * @throws ApiError
     */
    public static appendImageResource(
        contentUuid: string,
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageResourceListResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/image/{contentUuid}/resource/{fileUuid}',
            path: {
                'contentUuid': contentUuid,
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
     * Image 콘텐츠 메타 정보 저장
     * Image 콘텐츠 메타 정보를 수정한다.<br>등록은 임시저장이므로 콘텐츠 메타 정보 저장은 수정 API를 이용한다.
     * @param requestBody
     * @returns com_ever_edu_cms_image_dto_res_ImageContentResDto OK
     * @throws ApiError
     */
    public static updateImageContent(
        requestBody: com_ever_edu_cms_image_dto_req_ImageContentUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageContentResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/image/update',
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
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateExternalLink(
        requestBody: com_ever_edu_cms_external_link_dto_req_ExternalLinkUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/external-link/update',
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
     * 시험지 콘텐츠 단건 수정
     * 시험지 콘텐츠를 단건 수정한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static update1(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험지 콘텐츠 단건 등록
     * 시험지 콘텐츠를 단건 등록한다.
     * @param requestBody
     * @returns com_ever_edu_cms_exam_dto_res_ExamSaveResDto Created
     * @throws ApiError
     */
    public static save1(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_exam_dto_res_ExamSaveResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/exam',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험 문항 수정
     * 시험 문항과 선택지 목록을 수정한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static update2(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam/question',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험 문항 등록
     * 시험 문항과 선택지 목록을 등록한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static save2(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/exam/question',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험 문항 삭제
     * 시험 문항 목록을 삭제한다.
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static delete1(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionDeleteReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/exam/question',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험문항 사용/미사용 변경
     * 문항추가 화면에서 문항의 사용/미사용 상태를 변경한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static updateQuestionUseStatus(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionUseStatusUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam/question/status',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험 문항 순서변경
     * 시험 문항의 순서를 변경한다.
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionSortSeq(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionSortSeqUpdateReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam/question/sort',
            body: requestBody,
            mediaType: 'application/json',
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
     * 문제은행 정보 수정
     * 문제은행 정보를 수정한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static update3(
        requestBody: com_ever_edu_cms_content_dto_req_ContentUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam/pool',
            body: requestBody,
            mediaType: 'application/json',
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
     * 문제은행 정보 등록
     * 문제은행 정보를 등록한다.
     * @param requestBody
     * @returns com_ever_edu_cms_exam_dto_res_ExamSaveResDto Created
     * @throws ApiError
     */
    public static save3(
        requestBody: com_ever_edu_cms_content_dto_req_ContentSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_exam_dto_res_ExamSaveResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/exam/pool',
            body: requestBody,
            mediaType: 'application/json',
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
     * 문제은행 콘텐츠 문항추가 페이지 수정
     * 문제은행 > 문항추가 페이지의 저장 버튼 기능
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static updateAddQuestionStep(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamPoolStepUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam/pool/add',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험지 콘텐츠 문항추가 페이지 수정
     * 시험지 > 문항추가 페이지의 저장 버튼 기능
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static updateExamAddQuestionStep(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/exam/add',
            body: requestBody,
            mediaType: 'application/json',
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
     * 기타 콘텐츠 메타 정보 저장
     * 콘텐츠 메타 정보를 수정한다.<br>등록은 임시저장이므로 콘텐츠 메타 정보 저장은 수정 API를 이용한다.
     * @param requestBody
     * @returns com_ever_edu_cms_etc_dto_res_EtcContentResDto OK
     * @throws ApiError
     */
    public static updateEtcContent(
        requestBody: com_ever_edu_cms_etc_dto_req_EtcContentUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_etc_dto_res_EtcContentResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/etc/update',
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
     * 기타 콘텐츠 파일변경
     * 등록한 기타 콘텐츠의 파일을 변경한다.<br>파일변경 상태 조회 API를 이용하여 변경 작업 상태를 확인할 수 있다.
     * @param requestBody
     * @returns com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto OK
     * @throws ApiError
     */
    public static changeEtcContentFile(
        requestBody: com_ever_edu_cms_etc_dto_req_EtcContentFileChangeReqDto,
    ): CancelablePromise<com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/etc/file/change',
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
     * 커리큘럼 수정
     * 커리큘럼 정보를 수정 한다.
     * @param requestBody
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static updateCurriculum(
        requestBody: com_ever_edu_cms_curriculum_dto_req_CurriculumUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/curriculum',
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
     * 커리큘럼 생성
     * 커리큘럼을 생성한다.
     * @param requestBody
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static saveCurriculum(
        requestBody: com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum',
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
     * General(목차) 모듈 수정
     * 커리큘럼 내 General(목차)모듈을 수정한다.
     * @param requestBody
     * @returns com_ever_edu_cms_curriculum_dto_res_ModuleResDto OK
     * @throws ApiError
     */
    public static updateGeneralModule(
        requestBody: com_ever_edu_cms_curriculum_dto_req_ModuleUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_ModuleResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/curriculum/general-module',
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
     * General(목차) 모듈 생성
     * 커리큘럼 내 목차 모듈을 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveGeneralModule(
        requestBody: com_ever_edu_cms_curriculum_dto_req_GeneralModuleSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum/general-module',
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
     * General(목차) 모듈의 레슨 수정
     * General(목차) 모듈의 레슨을 수정한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateGeneralLesson(
        requestBody: com_ever_edu_cms_curriculum_dto_req_GeneralLessonUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/curriculum/general-module/lesson',
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
     * General(목차) 모듈의 레슨 생성
     * General(목차) 모듈에 레슨을 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveGeneralLesson(
        requestBody: com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonSave,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum/general-module/lesson',
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
     * Fixed 모듈 수정
     * 커리큘럼 내 Fixed 모듈을 수정한다.
     * @param requestBody
     * @returns com_ever_edu_cms_curriculum_dto_res_ModuleResDto OK
     * @throws ApiError
     */
    public static updateFixedModule(
        requestBody: com_ever_edu_cms_curriculum_dto_req_FixedModuleUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_ModuleResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/curriculum/fixed-module',
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
     * Fixed 모듈 생성
     * 커리큘럼 내 Fixed 모듈을 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveFixedModule(
        requestBody: com_ever_edu_cms_curriculum_dto_req_FixedModuleSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum/fixed-module',
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
     * Fixed 모듈의 레슨 수정
     * Fixed 모듈의  레슨을 수정한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateGeneralLesson1(
        requestBody: com_ever_edu_cms_curriculum_dto_req_FixedLessonUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/curriculum/fixed-module/lesson',
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
     * 단건 블로그 콘텐츠 수정
     * 단건 블로그 콘텐츠를 수정한다.
     * @param requestBody
     * @returns com_ever_edu_cms_blog_dto_res_BlogContentResDto OK
     * @throws ApiError
     */
    public static updateBlog(
        requestBody: com_ever_edu_cms_blog_dto_req_BlogUpdateReqDto,
    ): CancelablePromise<com_ever_edu_cms_blog_dto_res_BlogContentResDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/blog/update',
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
     * 과제 단건 조회
     * 과제 단건을 조회한다.
     * @param asgmtUuid 과제 ID
     * @returns com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findAsgmtById(
        asgmtUuid: string,
    ): CancelablePromise<com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/asgmt/{asgmtUUID}',
            path: {
                'asgmtUUID': asgmtUuid,
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
     * 과제 단건 수정
     * 과제 단건을 수정한다.
     * @param asgmtUuid 과제 ID
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static updateAsgmt(
        asgmtUuid: string,
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtUpdateReqDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/asgmt/{asgmtUUID}',
            path: {
                'asgmtUUID': asgmtUuid,
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
     * 과제 채점
     * 과제를 채점한다.
     * @param asgmtSubmitId 과제 제출 ID
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static scoring(
        asgmtSubmitId: number,
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$AsgmtResult,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/asgmt/submit/{asgmtSubmitId}/scoring',
            path: {
                'asgmtSubmitId': asgmtSubmitId,
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
     * 과제 그룹 단건 조회
     * 과제 단건을 조회한다.
     * @param contentId 과제 ID
     * @returns com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findGroupByNo(
        contentId: number,
    ): CancelablePromise<com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/asgmt/group/{contentId}',
            path: {
                'contentId': contentId,
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
     * 과제 그룹 단건 수정
     * 과제 그룹 단건을 수정한다.
     * @param contentId 과제 그룹 ID
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateGroup(
        contentId: number,
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtGroupUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/asgmt/group/{contentId}',
            path: {
                'contentId': contentId,
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
     * 과제 그룹 사용 여부 변경
     * 과제 그룹의 사용 여부를 변경한다.
     * @param isPublished
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateIsPublished(
        isPublished: boolean,
        requestBody: Array<com_ever_edu_cms_asgmt_dto_req_AsgmtGroupUpdateReqDto$IsPublishedReqDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/asgmt/group/publish',
            query: {
                'isPublished': isPublished,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * 과제 배포
     * 과제를 배포한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static assignAsgmt(
        requestBody: Array<com_ever_edu_cms_asgmt_dto_req_AsgmtMappingUserSaveReqDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/asgmt/assign',
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
     * 다건 비디오 파일 임시저장
     * 비디오 다건 콘텐츠를 임시 저장한다. 이 작업은 S3에 파일 업로드 이루어진다. 다건 임시 저장은 다건 콘텐츠 정보 저장을 뜻한다.
     * @param requestBody
     * @returns com_ever_edu_cms_video_dto_res_VideoDraftListResDto OK
     * @throws ApiError
     */
    public static draftVideosSave(
        requestBody: com_ever_edu_cms_video_dto_req_VideoSaveReqDto_DraftMultipleSave,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoDraftListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/videos/draft',
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
     * 설문지 단건 등록
     * 설문지 단건을 등록한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static save(
        requestBody: com_ever_edu_cms_survey_dto_req_SurveySaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/survey',
            body: requestBody,
            mediaType: 'application/json',
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
     * 설문 문제 목록 조회
     * 설문 문제 목록을 조회한다.
     * @returns com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findList(): CancelablePromise<Array<com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/survey/{contentId}/questions',
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
     * 설문 문제 다건 등록
     * 설문 문제 다건을 등록한다. 연관 문제의 경우 parentQuestionId를 기재해 단건으로 호출한다.
     * @param contentId Content ID
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static saveAll(
        contentId: number,
        requestBody: Array<com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/survey/{contentId}/questions',
            path: {
                'contentId': contentId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * 설문 문제 다건 저장/수정/삭제
     * 설문 문제 다건을 수정한다.
     * @param contentId Content ID
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateAll(
        contentId: number,
        requestBody: Array<com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/survey/{contentId}/questions/all',
            path: {
                'contentId': contentId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * Image 리소스 순서 수정
     * Image 리소스 순서를 수정한다.
     * @param contentUuid
     * @param requestBody
     * @returns com_ever_edu_cms_image_dto_res_ImageResourceListResDto OK
     * @throws ApiError
     */
    public static updateImageOrder(
        contentUuid: string,
        requestBody: com_ever_edu_cms_image_dto_req_ImageOrderSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageResourceListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/image/{contentUuid}/resource/order',
            path: {
                'contentUuid': contentUuid,
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
     * Image 임시 콘텐츠 생성
     * Image 임시 콘텐츠를 생성(contentId 생성)한다.
     * @param requestBody
     * @returns com_ever_edu_cms_image_dto_res_ImageStatusResDto OK
     * @throws ApiError
     */
    public static draftSaveImage(
        requestBody: com_ever_edu_cms_image_dto_req_ImagesDraftReqDto,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageStatusResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/image/draft',
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
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveExternalLink(
        requestBody: com_ever_edu_cms_external_link_dto_req_ExternalLinkSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/external-link/save',
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
     * 문항가져오기 목록 조회
     * 문항가져오기 팝업용 목록을 조회한다.
     * @param reqDto
     * @returns com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto OK
     * @throws ApiError
     */
    public static findAllForCopy(
        reqDto: com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto,
    ): CancelablePromise<Array<com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/exam/questions/pool',
            query: {
                'reqDto': reqDto,
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
     * 문항가져오기 문항 등록
     * 문항가져오기 팝업에서 선택한 문항을 등록한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static saveQuestionFromQuestionPoolList(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionSaveCopiedReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/exam/questions/pool',
            body: requestBody,
            mediaType: 'application/json',
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
     * 시험 문항 복사
     * 문항추가 화면에서 기등록된 시험 문항 단건 또는 다건을 복사한다.
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static saveCopiedList(
        requestBody: com_ever_edu_cms_exam_dto_req_ExamQuestionSaveCopiedReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/exam/questions/copy',
            body: requestBody,
            mediaType: 'application/json',
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
     * 문제은행 정보 복사
     * 문제은행 정보를 복사한다.
     * @param contentUuid
     * @returns string Created
     * @throws ApiError
     */
    public static copyExamPool(
        contentUuid: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/exam/pool/{contentUuid}/copy',
            path: {
                'contentUuid': contentUuid,
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
     * 단건 기타 콘텐츠 임시 생성
     * 단건 기타 콘텐츠를 임시 생성(contentId 생성)한다.
     * @param requestBody
     * @returns com_ever_edu_cms_etc_dto_res_EtcContentStatusResDto OK
     * @throws ApiError
     */
    public static draftSaveEtcContent(
        requestBody: com_ever_edu_cms_etc_dto_req_EtcContentDraftReqDto,
    ): CancelablePromise<com_ever_edu_cms_etc_dto_res_EtcContentStatusResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/etc/draft',
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
     * 커리큘럼 복사
     * 커리큘럼을 생성한다.
     * @param curriculumId
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static copyCurriculum(
        curriculumId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum/{curriculumId}/copy',
            path: {
                'curriculumId': curriculumId,
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
     * 더미 모듈(General)과 레슨 생성
     * 커리큘럼내에 더미 모듈(General)과 레슨을 신규 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveDummyModuleLesson(
        requestBody: com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonModuleSave,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum/module/auto-lesson-module',
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
     * 커리큘럼 내 dnd하는 행위이다
     * 커리큘럼 내 dnd 기능을 제공한다.<br>- 레슨간의 dnd <br>- 모듈간의 dnd <br>- 레슨->모듈(더미)화 되는 dnd <br>- 레슨->모듈안으로 가는 dnd : Fixed 모듈로는 이동 불가
     * @param requestBody
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static updateDnD(
        requestBody: com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/curriculum/dnd',
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
     * 공유 팝업 콘텐츠 공유 조회
     * 공유 팝업에서 타채널에 공유한 목록을 조회한다.
     * @param tenantId 출발지 테넌트 ID
     * @param channelUuid 출발지 채널 UUID
     * @returns com_ever_edu_cms_content_dto_res_ShareContentResDto OK
     * @throws ApiError
     */
    public static findShareContent(
        tenantId: number,
        channelUuid: string,
    ): CancelablePromise<Array<com_ever_edu_cms_content_dto_res_ShareContentResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share',
            query: {
                'tenantId': tenantId,
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
     * 공유 팝업 콘텐츠 선택 목록 저장
     * 공유 팝업에서 선택한 콘텐츠 목록을 저장한다.<br>저장 시 기존 목록 삭재 후 리스트 신규 등록한다.
     * @param requestBody
     * @returns com_ever_edu_cms_content_dto_res_SharedBoxContentResDto OK
     * @throws ApiError
     */
    public static saveSharedBoxContent(
        requestBody: com_ever_edu_cms_content_dto_req_SharedBoxContentReqDto,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_SharedBoxContentResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/contents/share',
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
     * 다건 학습자원 학습 진행률 조회
     * 다건의 학습자원 학습 진행률을 조회한다.
     * @param requestBody
     * @returns com_ever_edu_cms_content_dto_res_ContentProgressListResDto OK
     * @throws ApiError
     */
    public static getMultiContentProgress1(
        requestBody: com_ever_edu_cms_content_dto_req_ContentProgressListReqDto,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentProgressListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/contents/progress',
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
     * 학습 자원 엑셀다운로드
     * 내 채널에 속한 학습자원을 엑셀다운로드한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static contentExcelDownload(
        requestBody: com_ever_edu_cms_content_dto_req_ContentExcelExportReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/contents/excel',
            body: requestBody,
            mediaType: 'application/json',
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
     * 콘텐츠 내보내기(번역/공유)
     * 콘텐츠를 내보내기(번역/공유)한다.<br>콘텐츠 내보내기 시 리소스 메타 데이터까지 복사하고 리소스 파일은 복사하지 않는다.
     * @param contentUuid 콘텐츠 UUID
     * @param requestBody
     * @returns com_ever_edu_cms_content_dto_res_ContentResDto OK
     * @throws ApiError
     */
    public static export(
        contentUuid: string,
        requestBody: com_ever_edu_cms_content_dto_req_ContentExportReqDto,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/content/{contentUuid}/export',
            path: {
                'contentUuid': contentUuid,
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
     * 콘텐츠 복사
     * 콘텐츠를 복사한다.<br>콘텐츠 복사 시 메타 데이터만 복사 하고 리소스 파일은 복사하지 않는다.
     * @param contentUuid 콘텐츠 Uuid
     * @returns com_ever_edu_cms_content_dto_res_ContentResDto OK
     * @throws ApiError
     */
    public static copy(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/content/{contentUuid}/copy',
            path: {
                'contentUuid': contentUuid,
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
     * 콘텐츠 일괄 설정
     * 콘텐츠 일괄 설정하는 api입니다.
     * @param requestBody
     * @returns com_ever_edu_cms_content_dto_res_BatchSettingsResDto OK
     * @throws ApiError
     */
    public static multiContentSettings(
        requestBody: com_ever_edu_cms_content_dto_req_BatchSettingsReqDto,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_BatchSettingsResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/content/settings',
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
     * 단건 블로그 콘텐츠 생성
     * 단건 블로그 콘텐츠를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_cms_blog_dto_res_BlogContentResDto OK
     * @throws ApiError
     */
    public static saveBlog(
        requestBody: com_ever_edu_cms_blog_dto_req_BlogSaveReqDto,
    ): CancelablePromise<com_ever_edu_cms_blog_dto_res_BlogContentResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/blog/save',
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
     * 과제 단건 등록
     * 과제 단건을 등록한다.
     * @param requestBody
     * @returns string Created
     * @throws ApiError
     */
    public static saveAsgmt(
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtSaveReqDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/asgmt',
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
     * 과제 관리자 제출
     * 사용자의 과제를 관리자가 제출한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static submitByAdmin(
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitSaveReqDto$onAdmin,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/asgmt/submit/submit',
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
     * 과제 랜덤 배포
     * 차수의 과제를 랜덤으로 배포한다.
     * @param courseSequenceId 과정 차수 ID
     * @param userId 사용자 ID
     * @returns any Created
     * @throws ApiError
     */
    public static assignRandomAsgmt(
        courseSequenceId: number,
        userId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/asgmt/sequence/{courseSequenceId}/assign/{userId}/random',
            path: {
                'courseSequenceId': courseSequenceId,
                'userId': userId,
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
     * 과제 그룹 단건 등록
     * 과제 그룹 단건을 등록한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static saveGroup(
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtGroupSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/asgmt/group',
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
     * 과제 이전 차수 복사
     * 선택한 차수의 과제를 현재 차수에 복사한다.
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static copy1(
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtGroupSaveReqDto$Copy,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/asgmt/copy',
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
     * 동영상 학습자원 상세 조회
     * 동영상 학습자원 상세 조회한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_video_dto_res_VideoResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource4(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/video/{contentUuid}',
            path: {
                'contentUuid': contentUuid,
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
     * 비디오 콘텐츠 상태 조회
     * 비디오 콘텐츠 상태를 조회한다.
     * @param contentUuid SCORM 콘텐츠 UUID
     * @returns com_ever_edu_cms_video_dto_res_VideoStatusResDto OK
     * @throws ApiError
     */
    public static getVideoStatus(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/video/{contentUuid}/status',
            path: {
                'contentUuid': contentUuid,
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
     * 비디오 파일변경 상태 조회
     * SCORM 파일을 변경 상태를 조회한다.
     * @param resourceId 리소스 ID
     * @returns com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto OK
     * @throws ApiError
     */
    public static getVideoChangeStatus(
        resourceId: number,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoChangeStatusResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/video/file/change/{resourceId}',
            path: {
                'resourceId': resourceId,
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
     * 설문지 목록 조회
     * 설문지 목록을 조회한다.
     * @param pageable
     * @param surveySearchReqDto
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_survey_dto_res_SurveyResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        surveySearchReqDto: com_ever_edu_cms_survey_dto_req_SurveySearchReqDto$SearchByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_survey_dto_res_SurveyResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/surveys',
            query: {
                'pageable': pageable,
                'surveySearchReqDto': surveySearchReqDto,
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
     * 설문 문제 및 보기문항 목록 조회
     * 설문 문제 및 보기문항 목록을 조회한다.
     * @returns com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<Array<com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/survey/{contentId}/questions/detail',
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
     * Image 콘텐츠 리소스 조회
     * Image 콘텐츠 리소스를 조회한다.
     * @param contentUuid Image 콘텐츠 UUID
     * @returns com_ever_edu_cms_image_dto_res_ImageResourceListResDto OK
     * @throws ApiError
     */
    public static getContentResource6(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageResourceListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/image/{contentUuid}/resource',
            path: {
                'contentUuid': contentUuid,
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
     * 랜덤형 문항 정보
     * 랜덤형 문항의 유형별 출제 문제수를 조회한다.
     * @param examUuid
     * @returns com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto OK
     * @throws ApiError
     */
    public static getExamQuestionOverview(
        examUuid: string,
    ): CancelablePromise<Array<com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/exam/random/{examUuid}',
            path: {
                'examUuid': examUuid,
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
     * 시험 문항 목록 조회
     * 시험지 상세 화면의 시험 문항 목록을 조회한다.
     * @param examPoolUuid
     * @returns com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto OK
     * @throws ApiError
     */
    public static findAll1(
        examPoolUuid: string,
    ): CancelablePromise<Array<com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/exam/questions/{examPoolUuid}',
            path: {
                'examPoolUuid': examPoolUuid,
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
     * 시험 문항 단건 조회
     * 시험 문항 상세정보를 조회한다.
     * @param questionUuid
     * @returns com_ever_edu_cms_exam_dto_res_ExamQuestionResDto OK
     * @throws ApiError
     */
    public static findByQuestionUuid(
        questionUuid: string,
    ): CancelablePromise<com_ever_edu_cms_exam_dto_res_ExamQuestionResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/exam/question/{questionUuid}',
            path: {
                'questionUuid': questionUuid,
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
     * 기타 콘텐츠 리소스 조회
     * 기타 콘텐츠 리소스를 조회한다.
     * @param contentUuid 기타 콘텐츠 UUID
     * @returns com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource8(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/etc/{contentUuid}/resource',
            path: {
                'contentUuid': contentUuid,
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
     * 커리큘럼(키트) 목록 조회
     * 커리큘럼(키트) 목록을 조회한다.
     * @param tenantId
     * @param channelUuid
     * @param isPublished
     * @param isUsed
     * @param languageCountryCode
     * @param curriculumName
     * @param coordinatorName
     * @param openingYear
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto OK
     * @throws ApiError
     */
    public static getCurriculumList1(
        tenantId: string,
        channelUuid: string,
        isPublished?: string,
        isUsed?: string,
        languageCountryCode?: string,
        curriculumName?: string,
        coordinatorName?: string,
        openingYear?: string,
        page?: number,
        size: number = 10,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/curriculums',
            query: {
                'tenantId': tenantId,
                'channelUuid': channelUuid,
                'isPublished': isPublished,
                'isUsed': isUsed,
                'languageCountryCode': languageCountryCode,
                'curriculumName': curriculumName,
                'coordinatorName': coordinatorName,
                'openingYear': openingYear,
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
     * 커리큘럼 상세정보 조회
     * 커리큘럼 상세 정보와 모듈(레슨 목록 포함) 상세 목록을 조회한다.<br><br>매핑 콘텐츠 분류에 따른 구성 데이터 구분 : <br><GENERAL 모듈인 경우> <br>- 레슨 정보: contentUuid(String), learningTime(Long) <br><br><FIXED 모듈인 경우>  <br>- 모듈 정보: contentUuid(String), orgnId(Long) <br>- 레슨 정보: orgnId(Long), itemId(Long), scoId(itemElementId, String)
     * @param curriculumId
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static getCurriculum2(
        curriculumId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/curriculum/{curriculumId}',
            path: {
                'curriculumId': curriculumId,
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
     * 커리큘럼 모듈정보 조회
     * 커리큘럼 모듈과 레슨 목록을 조회한다.<br><br>매핑 콘텐츠 분류에 따른 구성 데이터 구분 : <br><GENERAL 모듈인 경우> <br>- 레슨 정보: contentUuid(String), learningTime(Long) <br><br><FIXED 모듈인 경우>  <br>- 모듈 정보: contentUuid(String), orgnId(Long) <br>- 레슨 정보: orgnId(Long), itemId(Long), scoId(itemElementId, String)
     * @param moduleId
     * @returns com_ever_edu_cms_curriculum_dto_res_ModuleResDto OK
     * @throws ApiError
     */
    public static getModuleDetail1(
        moduleId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_ModuleResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/curriculum/module/{moduleId}',
            path: {
                'moduleId': moduleId,
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
     * 레슨 상세 정보 조회
     * 레슨 상세 정보를 조회한다.<br><br>매핑 콘텐츠 분류에 따른 구성 데이터 구분 : <br>- lessonId(Long), lessonName(String), description(String), lessonType(LessonType), sortOrder(Long), contentUuid(String), contentType(ContentType) <br><br><GENERAL 레슨인 경우> <br>- learningTime(Long) <br><br><FIXED 레슨인 경우>  <br>- orgnId(Long), itemId(Long), scoId(itemElementId, String)
     * @param moduleId 모듈 ID
     * @param lessonId 레슨 ID
     * @returns com_ever_edu_cms_curriculum_dto_res_LessonResDto OK
     * @throws ApiError
     */
    public static getLessonInfo1(
        moduleId: number,
        lessonId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_LessonResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/curriculum/module/{moduleId}/lesson/{lessonId}',
            path: {
                'moduleId': moduleId,
                'lessonId': lessonId,
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
     * 학습자원 목록 조회
     * 학습자원 목록을 검색 조회한다.<br>검색 조건에 일치하는 콘텐츠의 그룹콘텐츠 아이디로 콘텐츠 목록(원본 + 공유/번역 콘텐츠)을 조회하여 반환한다.<br><br>콘텐츠 유형 목록은 다건 유형을 ","로 연결하여 전달한다.<br><br><b>페이징 정보</b>: 정렬 컬럼은 groupContentId 내림차순 고정 사용<br> - totalElements: 쿼리 결과물의 전체 데이터 갯수 <br> - totalPages: 페이징하였을 때 나오는 총 페이지의 갯수 <br> - size: 페이지 당 데이터 수 설정 값(rows per page) <br> - numberOfElements: 페이지에 존재하는 요소의 갯수(최대 size와 동일) <br> - number: 요소를 가져온 페이지의 번호. 0 ~
     * @param tenantId
     * @param channelUuid
     * @param contentTypes
     * @param contentName
     * @param isVendored
     * @param isContentEnabled
     * @param isCourseUsed
     * @param coordinatorName
     * @param langCountryCode
     * @param isMockUp
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentResDto OK
     * @throws ApiError
     */
    public static findAllContent(
        tenantId: string,
        channelUuid: string,
        contentTypes?: string,
        contentName?: string,
        isVendored?: string,
        isContentEnabled?: string,
        isCourseUsed?: string,
        coordinatorName?: string,
        langCountryCode?: string,
        isMockUp?: boolean,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents',
            query: {
                'tenantId': tenantId,
                'channelUuid': channelUuid,
                'contentTypes': contentTypes,
                'contentName': contentName,
                'isVendored': isVendored,
                'isContentEnabled': isContentEnabled,
                'isCourseUsed': isCourseUsed,
                'coordinatorName': coordinatorName,
                'langCountryCode': langCountryCode,
                'isMockUp': isMockUp,
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
     * 공유 팝업 좌측 테넌트-채널 코드 목록
     * 공유 팝업의 좌측 테넌트-채널 목록을 조회한다.
     * @param contentUuid Content uuid
     * @param tenantId Tenant Id
     * @param channelName Channel Name, Like 검색
     * @returns com_ever_edu_cms_content_dto_res_ShareTenantChannelCodeResDto OK
     * @throws ApiError
     */
    public static getShareTenantChannelList(
        contentUuid: string,
        tenantId: number,
        channelName: string,
    ): CancelablePromise<Array<com_ever_edu_cms_content_dto_res_ShareTenantChannelCodeResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share/{contentUuid}/tenants/{tenantId}/channels',
            path: {
                'contentUuid': contentUuid,
                'tenantId': tenantId,
            },
            query: {
                'channelName': channelName,
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
     * 공유 팝업 테넌트 코드 목록
     * 공유 팝업 상담 테넌트 검색 조건 코드 목록을 조회한다.<br>- 학습자원 소속 채널이 유니버셜 채널인 경우 모든 테넌트 목록<br>- 학습자원 소속 채널이 일반 채널인 경우 학습자원 소속 채널의 테넌트만 노출
     * @param contentUuid Content uuid
     * @returns com_ever_edu_cms_content_dto_res_ShareTenantCodeResDto OK
     * @throws ApiError
     */
    public static getShareTenantCodes(
        contentUuid: string,
    ): CancelablePromise<Array<com_ever_edu_cms_content_dto_res_ShareTenantCodeResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share/{contentUuid}/tenant/codes',
            path: {
                'contentUuid': contentUuid,
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
     * 공유함에 있는 학습자원 조회
     * 공유함에 있는 학습자원을 조회한다.<br>검색 조건에 일치하는 공유받은 콘텐츠의 그룹콘텐츠 아이디로 콘텐츠 목록(원본 + 번역 콘텐츠)을 조회하여 반환한다.<br><br>콘텐츠 유형 목록과 도착지 채널 UUID 목록은 ","로 다건을 연결하여 전달한다.<br><br><b>페이징 정보</b>: 정렬 컬럼은 groupContentId 고정 고정<br> - totalElements: 쿼리 결과물의 전체 데이터 갯수 <br> - totalPages: 페이징하였을 때 나오는 총 페이지의 갯수 <br> - size: 페이지 당 데이터 수 설정 값(rows per page) <br> - numberOfElements: 페이지에 존재하는 요소의 갯수(최대 size와 동일) <br> - number: 요소를 가져온 페이지의 번호. 0 ~
     * @param lastVisitedBoRoleId 사용자가 선택한 롤 ID
     * @param sourceTenantId 출발지 테넌트 Id
     * @param sourceChannelUuid 출발지 채널 UUID
     * @param contentTypes 콘텐츠 유형 목록, ","로 다건 유형 전달
     * @param contentName 콘텐츠 명, Like 검색
     * @param isContentEnabled 콘텐츠 사용가능 여부
     * @param sharedDateStart 공유일 검색 시작
     * @param sharedDateEnd 공유일 검색 종료
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_SharedBoxResDto OK
     * @throws ApiError
     */
    public static findSharedBoxContent(
        lastVisitedBoRoleId?: string,
        sourceTenantId?: string,
        sourceChannelUuid?: string,
        contentTypes?: string,
        contentName?: string,
        isContentEnabled?: string,
        sharedDateStart?: string,
        sharedDateEnd?: string,
        page?: number,
        size: number = 10,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_SharedBoxResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share/sharedBox',
            query: {
                'lastVisitedBoRoleId': lastVisitedBoRoleId,
                'sourceTenantId': sourceTenantId,
                'sourceChannelUuid': sourceChannelUuid,
                'contentTypes': contentTypes,
                'contentName': contentName,
                'isContentEnabled': isContentEnabled,
                'sharedDateStart': sharedDateStart,
                'sharedDateEnd': sharedDateEnd,
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
     * 공유함에 있는 학습자원 공유받기 이력 조회
     * 공유함에 있는 학습자원 공유받기 이력 조회
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto OK
     * @throws ApiError
     */
    public static findSharedBoxHistory(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share/sharedBox/{contentUuid}/history',
            path: {
                'contentUuid': contentUuid,
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
     * 공유함 출발지 테넌트 코드 목록 조회
     * 공유함 출발지 테넌트 코드 목록을 조회한다.<br>- 채널구성원, 채널소유자,채널게스트인 경우 : 공유 받은 채널(1개만 존재)의 출발지 채널이 소속된 테넌트 목록<br>- 테넌트 답당자, 플랫폼 담당자인 경우 : 공유 받은 채널들(여러개 가능)의 출발지 채널이 소속된 테넌트 목록
     * @param lastVisitedBoRoleId 사용자가 선택한 롤 ID
     * @returns com_ever_edu_cms_content_dto_res_ShareTenantCodeResDto OK
     * @throws ApiError
     */
    public static getShareBoxSrcTenantCodes(
        lastVisitedBoRoleId: number,
    ): CancelablePromise<Array<com_ever_edu_cms_content_dto_res_ShareTenantCodeResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share/sharedBox/tenant/codes',
            query: {
                'lastVisitedBoRoleId': lastVisitedBoRoleId,
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
     * 공유함 출발지 채널 코드 목록 조회
     * 공유함 출발지 채널 목록을 조회한다.
     * @param srcTenantId 출발지 테넌트 ID
     * @returns com_ever_edu_cms_content_dto_res_ShareChannelCodeResDto OK
     * @throws ApiError
     */
    public static getShareBoxSrcChannelCodes(
        srcTenantId: number,
    ): CancelablePromise<Array<com_ever_edu_cms_content_dto_res_ShareChannelCodeResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/share/sharedBox/tenant/channel/codes',
            query: {
                'srcTenantId': srcTenantId,
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
     * 학습 자원 현지화(내보내기) 목록 조회
     * 학습 자원 현지화(내보내기) 목록을 조회한다.<br><br><b>페이징 정보</b>: <br> - totalElements: 쿼리 결과물의 전체 데이터 갯수 <br> - totalPages: 페이징하였을 때 나오는 총 페이지의 갯수 <br> - size: 페이지 당 데이터 수 설정 값(rows per page) <br> - numberOfElements: 페이지에 존재하는 요소의 갯수(최대 size와 동일) <br> - number: 요소를 가져온 페이지의 번호. 0 ~
     * @param tenantId
     * @param channelName
     * @param langCountryCode
     * @param isMockUp
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentExportResDto OK
     * @throws ApiError
     */
    public static findContentExportList(
        tenantId?: string,
        channelName?: string,
        langCountryCode?: string,
        isMockUp?: boolean,
        page?: number,
        size: number = 10,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_content_dto_res_FindContentExportResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/contents/export',
            query: {
                'tenantId': tenantId,
                'channelName': channelName,
                'langCountryCode': langCountryCode,
                'isMockUp': isMockUp,
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
     * 학습자원 상세 조회
     * 콘텐츠 단건을 상세 페이지를 UUID를 통해 상세 조회한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_content_dto_res_ContentResDto OK
     * @throws ApiError
     */
    public static findByContentUuid2(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/content/{contentUuid}',
            path: {
                'contentUuid': contentUuid,
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
     * 학습자원 논리 삭제
     * 콘텐츠를 논리삭제 한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns number OK
     * @throws ApiError
     */
    public static deleteContent(
        contentUuid: string,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/content/{contentUuid}',
            path: {
                'contentUuid': contentUuid,
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
     * 학습 자원 번역 현황 목록
     * 학습 자원 번역 현황 목록을 조회한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_content_dto_res_ContentTranslationResDto OK
     * @throws ApiError
     */
    public static getTranslationList(
        contentUuid: string,
    ): CancelablePromise<Array<com_ever_edu_cms_content_dto_res_ContentTranslationResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/content/{contentUuid}/translation/list',
            path: {
                'contentUuid': contentUuid,
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
     * 콘텐츠 타 채널 공유 가능여부
     * 콘텐츠 타 채널 공유 가능여부를 반환 api입니다.
     * @param contentUuid 출발지 콘텐츠 UUID
     * @param tenantId 도착지 콘텐츠의 테넌트 ID
     * @param channelUUid 도착지 콘텐츠의 채널 UUID
     * @returns boolean OK
     * @throws ApiError
     */
    public static isChannelSharingPossible(
        contentUuid: string,
        tenantId: number,
        channelUUid: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/content/{contentUuid}/channel/sharing',
            path: {
                'contentUuid': contentUuid,
            },
            query: {
                'tenantId': tenantId,
                'channelUUid': channelUUid,
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
     * 학습자원 학습 진행률 조회
     * 학습자원 학습 진행률을 조회한다.
     * @param courseSequenceId 과정차수Id
     * @param courseId 과정Id
     * @param curriculumId 커리큘럼Id
     * @param moduleId 콘텐츠 모듈/스콤-Orgn Id
     * @param lessonId 레슨/스콤-Item ID
     * @param contentUuid 콘텐츠 UUID
     * @param userUuid 사용자 UUID
     * @returns com_ever_edu_cms_content_dto_res_ContentProgressResDto OK
     * @throws ApiError
     */
    public static getContentProgress1(
        courseSequenceId?: string,
        courseId?: string,
        curriculumId?: string,
        moduleId?: string,
        lessonId?: string,
        contentUuid?: string,
        userUuid?: string,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentProgressResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/content/progress',
            query: {
                'courseSequenceId': courseSequenceId,
                'courseId': courseId,
                'curriculumId': curriculumId,
                'moduleId': moduleId,
                'lessonId': lessonId,
                'contentUuid': contentUuid,
                'userUuid': userUuid,
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
     * 커리큘럼 매핑 여부 조회
     * 커리큘럼 매핑 여부를 조회하는 api입니다.
     * @param contentUuid Content uuid
     * @returns boolean OK
     * @throws ApiError
     */
    public static hasCurriculumMappingByContentUuid(
        contentUuid: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/content/curriculum-mapping/{contentUuid}',
            path: {
                'contentUuid': contentUuid,
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
     * 과정 매핑 콘텐츠 목록 조회
     * 과정에 매핑된 콘텐츠 목록 조회하는 api입니다.
     * @param contentUuid 콘텐츠 UUID
     * @param courseType 과정유형
     * @param courseName 과정명(Like 검색)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_external_course_dto_CourseResDto OK
     * @throws ApiError
     */
    public static getsCourseMappingByContentUuid(
        contentUuid: string,
        courseType?: 'ELEARNING1' | 'ELEARNING2' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY',
        courseName?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_external_course_dto_CourseResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/content/course-mapping/{contentUuid}',
            path: {
                'contentUuid': contentUuid,
            },
            query: {
                'courseType': courseType,
                'courseName': courseName,
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
     * 블로그 콘텐츠 리소스 조회
     * 블로그 콘텐츠 리소스를 조회한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_blog_dto_res_BlogResourceResDto OK
     * @throws ApiError
     */
    public static getBlogResource1(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_blog_dto_res_BlogResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/blog/{contentUuid}/resource',
            path: {
                'contentUuid': contentUuid,
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
     * 과제 그룹 목록 및 과제 목록 조회
     * 과정 차수에 속한 과제 그룹 목록을 조회한다.
     * @param pageable
     * @param courseSequenceId 과정 차수 ID
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin OK
     * @throws ApiError
     */
    public static findAllPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        courseSequenceId: number,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/asgmt/sequence/{courseSequenceId}',
            path: {
                'courseSequenceId': courseSequenceId,
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
     * 과제 그룹 목록 조회
     * 과정 차수에 속한 과제 그룹 목록을 조회한다.
     * @param pageable
     * @param courseSequenceId 과정 차수 ID
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findGroupPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        courseSequenceId: number,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/asgmt/sequence/{courseSequenceId}/groups',
            path: {
                'courseSequenceId': courseSequenceId,
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
     * 과제 목록 조회
     * 과정 그룹에 속한 과제 목록을 조회한다.
     * @param contentId 과정 그룹 ID
     * @returns com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin OK
     * @throws ApiError
     */
    public static findAsgmtList(
        contentId: number,
    ): CancelablePromise<Array<com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/asgmt/group/{contentId}/asgmts',
            path: {
                'contentId': contentId,
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
     * 설문 문제 단건 삭제
     * 설문 문제를 단건 논리 삭제한다.
     * @param surveyQuestionUuid 시험 문제 ID
     * @returns any OK
     * @throws ApiError
     */
    public static delete(
        surveyQuestionUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/survey/question/{surveyQuestionUUID}',
            path: {
                'surveyQuestionUUID': surveyQuestionUuid,
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
     * Image 리소스 삭제
     * Image 리소스 삭제한다.
     * @param contentUuid
     * @param resourceId
     * @returns com_ever_edu_cms_image_dto_res_ImageResourceListResDto OK
     * @throws ApiError
     */
    public static deleteImageResource(
        contentUuid: string,
        resourceId: number,
    ): CancelablePromise<com_ever_edu_cms_image_dto_res_ImageResourceListResDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/image/{contentUuid}/resource/{resourceId}',
            path: {
                'contentUuid': contentUuid,
                'resourceId': resourceId,
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
     * 모듈 삭제
     * 커리큘럼 내 모듈을 삭제한다.
     * @param curriculumId 커리큘럼 Id
     * @param moduleId 모듈 Id
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static deleteModule(
        curriculumId: number,
        moduleId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/curriculum/{curriculumId}/module/{moduleId}',
            path: {
                'curriculumId': curriculumId,
                'moduleId': moduleId,
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
     * General(목차) 모듈의 레슨 삭제
     * General(목차) 모듈의 레슨을 삭제한다.
     * @param moduleId 모듈 Id
     * @param lessonId 레슨 Id
     * @returns com_ever_edu_cms_curriculum_dto_res_LessonResDto OK
     * @throws ApiError
     */
    public static deleteGeneralLesson(
        moduleId: number,
        lessonId: number,
    ): CancelablePromise<Array<com_ever_edu_cms_curriculum_dto_res_LessonResDto>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/curriculum/general-module/{moduleId}/lesson/{lessonId}',
            path: {
                'moduleId': moduleId,
                'lessonId': lessonId,
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
