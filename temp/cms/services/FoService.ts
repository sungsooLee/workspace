/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitSaveReqDto$onUser } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitSaveReqDto$onUser';
import type { com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$onUser } from '../models/com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$onUser';
import type { com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser } from '../models/com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser';
import type { com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser } from '../models/com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser';
import type { com_ever_edu_cms_blog_dto_req_BlogLearningSaveReqDto } from '../models/com_ever_edu_cms_blog_dto_req_BlogLearningSaveReqDto';
import type { com_ever_edu_cms_blog_dto_res_BlogResourceResDto } from '../models/com_ever_edu_cms_blog_dto_res_BlogResourceResDto';
import type { com_ever_edu_cms_content_dto_req_ContentProgressListReqDto } from '../models/com_ever_edu_cms_content_dto_req_ContentProgressListReqDto';
import type { com_ever_edu_cms_content_dto_res_ContentProgressListResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentProgressListResDto';
import type { com_ever_edu_cms_content_dto_res_ContentProgressResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentProgressResDto';
import type { com_ever_edu_cms_content_dto_res_ContentResDto } from '../models/com_ever_edu_cms_content_dto_res_ContentResDto';
import type { com_ever_edu_cms_curriculum_dto_res_CurriculumResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_CurriculumResDto';
import type { com_ever_edu_cms_curriculum_dto_res_LessonResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_LessonResDto';
import type { com_ever_edu_cms_curriculum_dto_res_ModuleResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_ModuleResDto';
import type { com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto } from '../models/com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto';
import type { com_ever_edu_cms_video_dto_req_WatchLogSaveReqDto } from '../models/com_ever_edu_cms_video_dto_req_WatchLogSaveReqDto';
import type { com_ever_edu_cms_video_dto_req_WatchLogSearchDto } from '../models/com_ever_edu_cms_video_dto_req_WatchLogSearchDto';
import type { com_ever_edu_cms_video_dto_res_VideoContentInfoResDto } from '../models/com_ever_edu_cms_video_dto_res_VideoContentInfoResDto';
import type { com_ever_edu_cms_video_dto_res_WatchSummaryResDto } from '../models/com_ever_edu_cms_video_dto_res_WatchSummaryResDto';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser';
import type { org_springframework_data_domain_PageCom_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoService {
    /**
     * 기타 콘텐츠 파일 다운로드
     * 기타 콘텐츠 파일 다운로드 한다.
     * @param courseSequenceId 차수 ID
     * @param courseId 코스 ID
     * @param curriculumId 커리큘럼 ID
     * @param moduleId 모듈 ID
     * @param lessonId 레슨 ID
     * @param contentUuid 콘텐츠 UUID
     * @returns any OK
     * @throws ApiError
     */
    public static contentFileDownload(
        courseSequenceId?: string,
        courseId?: string,
        curriculumId?: string,
        moduleId?: string,
        lessonId?: string,
        contentUuid?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/etc/content/download',
            query: {
                'courseSequenceId': courseSequenceId,
                'courseId': courseId,
                'curriculumId': curriculumId,
                'moduleId': moduleId,
                'lessonId': lessonId,
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
     * 과제 재제출
     * 과제를 재제출한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static resubmit(
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitUpdateReqDto$onUser,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/api/v1/asgmt/submit/resubmit',
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
     * 비디오 이력을 쌓는다
     * 로우데이터 비디오 이력을 쌓는다
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static watchLogging(
        requestBody: com_ever_edu_cms_video_dto_req_WatchLogSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/video/watch-log',
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
     * 비디오 이력을 정제 처리한다
     * 로우데이터 비디오 이력을 정제 처리한다
     * @param requestBody
     * @returns com_ever_edu_cms_video_dto_res_WatchSummaryResDto OK
     * @throws ApiError
     */
    public static aggregateWatchLog(
        requestBody: com_ever_edu_cms_video_dto_req_WatchLogSearchDto,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_WatchSummaryResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/video/watch-log/statistics',
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
    public static getMultiContentProgress(
        requestBody: com_ever_edu_cms_content_dto_req_ContentProgressListReqDto,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentProgressListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/content/progress/multi',
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
     * 블로그 이력을 쌓는다
     * 블로그 이력을 쌓는다
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveLearningLog1(
        requestBody: com_ever_edu_cms_blog_dto_req_BlogLearningSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/blog/learning',
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
     * 과제 제출
     * 과제를 제출한다.
     * @param requestBody
     * @returns number Created
     * @throws ApiError
     */
    public static submit(
        requestBody: com_ever_edu_cms_asgmt_dto_req_AsgmtSubmitSaveReqDto$onUser,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/asgmt/submit/submit',
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
     * 비디오 학습자원 리소스 및 시청이력 조회
     * 비디오 학습자원 리소스 및 시청이력을 조회한다.<br>비디오 학습창을 호출하기 전에 호출해야한다.
     * @param contentUuid SCORM 콘텐츠 UUID
     * @param sequenceId 과정차수Id
     * @param courseId 과정Id
     * @param curriculumId 커리큘럼Id
     * @param moduleId 모듈 ID
     * @param lessonId 레슨 ID
     * @returns com_ever_edu_cms_video_dto_res_VideoContentInfoResDto OK
     * @throws ApiError
     */
    public static getVideoContentInfo(
        contentUuid: string,
        sequenceId: any,
        courseId: any,
        curriculumId: any,
        moduleId: any,
        lessonId: any,
    ): CancelablePromise<com_ever_edu_cms_video_dto_res_VideoContentInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/video/{contentUuid}/watch/initialize',
            path: {
                'contentUuid': contentUuid,
            },
            query: {
                'sequenceId': sequenceId,
                'courseId': courseId,
                'curriculumId': curriculumId,
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
     * 기타 콘텐츠 리소스 조회
     * 기타 콘텐츠 리소스를 조회한다.
     * @param contentUuid 기타 콘텐츠 UUID
     * @returns com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto OK
     * @throws ApiError
     */
    public static getContentResource3(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/etc/{contentUuid}/resource',
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
    public static getCurriculumList(
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
            url: '/user/api/v1/curriculums',
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
    public static getCurriculum(
        curriculumId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/curriculum/{curriculumId}',
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
    public static getModuleDetail(
        moduleId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_ModuleResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/curriculum/module/{moduleId}',
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
    public static getLessonInfo(
        moduleId: number,
        lessonId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_LessonResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/curriculum/module/{moduleId}/lesson/{lessonId}',
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
     * 학습자원 상세 조회
     * 콘텐츠 단건을 상세 페이지를 UUID를 통해 상세 조회한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_content_dto_res_ContentResDto OK
     * @throws ApiError
     */
    public static findByContentUuid(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_content_dto_res_ContentResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/content/{contentUuid}',
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
    public static getContentProgress(
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
            url: '/user/api/v1/content/progress',
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
     * 블로그 콘텐츠 리소스 조회
     * 블로그 콘텐츠 리소스를 조회한다.
     * @param contentUuid 콘텐츠 UUID
     * @returns com_ever_edu_cms_blog_dto_res_BlogResourceResDto OK
     * @throws ApiError
     */
    public static getBlogResource(
        contentUuid: string,
    ): CancelablePromise<com_ever_edu_cms_blog_dto_res_BlogResourceResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/blog/{contentUuid}/resource',
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
     * 과제 목록 조회
     * 할당된 과제 목록을 조회한다.
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser OK
     * @throws ApiError
     */
    public static findAllByUser(
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/asgmts',
            query: {
                'pageable': pageable,
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
     * 과정 차수의 할당 과제 목록 조회
     * 차수 안에서 할당된 과제 목록을 조회한다.
     * @param courseSequenceId 과정 차수 ID
     * @returns com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser OK
     * @throws ApiError
     */
    public static findByCourseSequenceIdOnUser(
        courseSequenceId: number,
    ): CancelablePromise<Array<com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/asgmts/sequence/{courseSequenceId}',
            path: {
                'courseSequenceId': courseSequenceId,
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
     * 과제 상세 조회
     * 과제의 상세 정보를 조회한다.
     * @param asgmtId 과제 ID
     * @returns com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser OK
     * @throws ApiError
     */
    public static findDetailByUser(
        asgmtId: number,
    ): CancelablePromise<com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/asgmt/{asgmtId}',
            path: {
                'asgmtId': asgmtId,
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
}
