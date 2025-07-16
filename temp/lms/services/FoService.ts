/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto } from '../models/com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto';
import type { com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser } from '../models/com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser';
import type { com_ever_edu_lms_course_dto_res_SequenceResDto$onUser } from '../models/com_ever_edu_lms_course_dto_res_SequenceResDto$onUser';
import type { com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByUser } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByUser';
import type { com_ever_edu_lms_enroll_dto_req_EnrollReqDto$ByUser } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollReqDto$ByUser';
import type { com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByUser } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByUser';
import type { com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue } from '../models/com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue';
import type { com_ever_edu_lms_enroll_dto_res_EnrollResDto$DeliveryAccessOnUser } from '../models/com_ever_edu_lms_enroll_dto_res_EnrollResDto$DeliveryAccessOnUser';
import type { com_ever_edu_lms_enroll_dto_res_EnrollResDto$DetailOnUser } from '../models/com_ever_edu_lms_enroll_dto_res_EnrollResDto$DetailOnUser';
import type { com_ever_edu_lms_search_course_dto_req_CourseSearchReqDto$OnUser } from '../models/com_ever_edu_lms_search_course_dto_req_CourseSearchReqDto$OnUser';
import type { com_ever_edu_lms_search_course_dto_res_CourseSearchResDto$OnUser } from '../models/com_ever_edu_lms_search_course_dto_res_CourseSearchResDto$OnUser';
import type { com_ever_edu_lms_search_keyword_dto_req_SearchKeywordRequestDto } from '../models/com_ever_edu_lms_search_keyword_dto_req_SearchKeywordRequestDto';
import type { com_ever_edu_lms_search_keyword_dto_res_SearchKeywordPopularResponseDto } from '../models/com_ever_edu_lms_search_keyword_dto_res_SearchKeywordPopularResponseDto';
import type { com_ever_edu_lms_search_keyword_dto_res_SearchKeywordResponseDto } from '../models/com_ever_edu_lms_search_keyword_dto_res_SearchKeywordResponseDto';
import type { com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByUser } from '../models/com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByUser';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnUser } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoService {
    /**
     * 한 사용자의 검색을 저장하는 행위이다. 각 사용자별로 저장한다.
     * 사용자가 검색어를 입력할때 마다 테넌트별 사용자의 검색어 정보를 저장한다..
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static saveSearchLogs(
        requestBody: com_ever_edu_lms_search_keyword_dto_req_SearchKeywordRequestDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/search-keyword',
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
     * 수강신청 내역 단건 확인
     * 로그인된 학습자만 실행 가능
     * @param sequenceUuid
     * @returns com_ever_edu_lms_enroll_dto_res_EnrollResDto$DetailOnUser OK
     * @throws ApiError
     */
    public static findEnrollBySeqUuid(
        sequenceUuid: string,
    ): CancelablePromise<com_ever_edu_lms_enroll_dto_res_EnrollResDto$DetailOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/enroll',
            query: {
                'sequenceUuid': sequenceUuid,
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
     * 단건 수강 신청 큐
     * 단건 수강 신청 큐를 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static enrollQueue(
        requestBody: com_ever_edu_lms_enroll_dto_req_EnrollReqDto$ByUser,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/enroll',
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
     * 수강신청을 취소한다.
     * 수강신청을 취소한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static cancel(
        requestBody: com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByUser,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/enroll',
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
     * 한 테넌트별 키워드의 자동완성 기능
     * 한 테넌트 내의 키워드 입력시 자동 완성을 제공해주는 기능이다.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static saveAutoCompleteKeyword(
        requestBody: com_ever_edu_lms_search_keyword_dto_req_SearchKeywordRequestDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/auto-complete',
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
     * tenant 카테고리 조회
     * 카테고리 트리를 조회한다.
     * @param tenantId
     * @returns com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto OK
     * @throws ApiError
     */
    public static findCategoryTree(
        tenantId: number,
    ): CancelablePromise<com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/tenant-category/tree/{tenantId}',
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
     * 수강이력
     * 수강이력
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnUser OK
     * @throws ApiError
     */
    public static findPage(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByUser,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/students',
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
     * 차수 단건 조회
     * 차수를 조회한다.
     * @param courseSequenceUuid
     * @returns com_ever_edu_lms_course_dto_res_SequenceResDto$onUser OK
     * @throws ApiError
     */
    public static findBySequenceNo(
        courseSequenceUuid: string,
    ): CancelablePromise<com_ever_edu_lms_course_dto_res_SequenceResDto$onUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/sequence/{courseSequenceUuid}',
            path: {
                'courseSequenceUuid': courseSequenceUuid,
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
     * 타이탄 테스트
     * 한 테넌트 내의 인기 검색어 10개를 보여준다.
     * @returns string OK
     * @throws ApiError
     */
    public static test(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/search-logs',
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
     * 한 테넌트별 한 사용자의 최근 검색어 조회
     * 한 테넌트별 한 사용자의 최근 10개 검색어를 조회합니다.
     * @param tenantId
     * @param userUuid
     * @returns com_ever_edu_lms_search_keyword_dto_res_SearchKeywordResponseDto OK
     * @throws ApiError
     */
    public static getRecentSearchLogs(
        tenantId: string,
        userUuid: string,
    ): CancelablePromise<Array<com_ever_edu_lms_search_keyword_dto_res_SearchKeywordResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/search-logs/{tenantId}/{userUuid}/recent',
            path: {
                'tenantId': tenantId,
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
     * 한 테넌트별 상위 인기 검색어 10개 조회
     * 한 테넌트 내의 인기 검색어 10개를 보여준다.
     * @param tenantId
     * @returns com_ever_edu_lms_search_keyword_dto_res_SearchKeywordPopularResponseDto OK
     * @throws ApiError
     */
    public static getPopularSearchLogs(
        tenantId: string,
    ): CancelablePromise<Array<com_ever_edu_lms_search_keyword_dto_res_SearchKeywordPopularResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/search-logs/{tenantId}/popular-logs',
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
     * 수강신청 현황?
     * 수강신청 현황
     * @param params
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList OK
     * @throws ApiError
     */
    public static findPage1(
        params: com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByUser,
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/enrollsss',
            query: {
                'params': params,
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
     * 수강신청 상태 조회
     * 과정 차수 ID로 수강 신청 상태를 조회한다
     * @param courseSequenceId
     * @returns com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue OK
     * @throws ApiError
     */
    public static findEnrollQueueState(
        courseSequenceId: number,
    ): CancelablePromise<com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/enroll/queue/state',
            query: {
                'courseSequenceId': courseSequenceId,
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
     * 수강신청 상태 조회
     * 수강 신청 대기 ID로 수강 신청 상태를 조회한다
     * @param enrollQueueId
     * @returns com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue OK
     * @throws ApiError
     */
    public static findEnrollQueueStateByQueueId(
        enrollQueueId: number,
    ): CancelablePromise<com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/enroll/queue/state/id',
            query: {
                'enrollQueueId': enrollQueueId,
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
     * 수강신청 최근 배송지 조회
     * 수강신청 최근 교재 배송지를 조회한다
     * @returns com_ever_edu_lms_enroll_dto_res_EnrollResDto$DeliveryAccessOnUser OK
     * @throws ApiError
     */
    public static findEnrollDeliveryByUserid(): CancelablePromise<com_ever_edu_lms_enroll_dto_res_EnrollResDto$DeliveryAccessOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/enroll/delivery/address',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 차수 목록 조회
     * 과정 id를 통해 차수 목록을 조회한다.
     * @param courseUuid
     * @returns com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser OK
     * @throws ApiError
     */
    public static findPage2(
        courseUuid: string,
    ): CancelablePromise<Array<com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/course/{courseUuid}/sequences',
            path: {
                'courseUuid': courseUuid,
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
     * @param request
     * @param pageable
     * @param courseType
     * @param enrollmentType
     * @returns com_ever_edu_lms_search_course_dto_res_CourseSearchResDto$OnUser OK
     * @throws ApiError
     */
    public static search(
        request: com_ever_edu_lms_search_course_dto_req_CourseSearchReqDto$OnUser,
        pageable: org_springdoc_core_converters_models_Pageable,
        courseType?: 'ELEARNING1' | 'ELEARNING2' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY',
        enrollmentType?: 'ENROLL_DONE' | 'ENROLL_REQUEST' | 'CANCEL_DONE',
    ): CancelablePromise<Array<com_ever_edu_lms_search_course_dto_res_CourseSearchResDto$OnUser>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/course-search',
            query: {
                'request': request,
                'courseType': courseType,
                'enrollmentType': enrollmentType,
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
     * 한 테넌트별 키워드의 자동완성 기능
     * 한 테넌트 내의 키워드 입력시 자동 완성을 제공해주는 기능이다.
     * @param tenantId
     * @param keyword
     * @returns com_ever_edu_lms_search_keyword_dto_res_SearchKeywordResponseDto OK
     * @throws ApiError
     */
    public static getKeywordAutoComplete(
        tenantId: string,
        keyword: string,
    ): CancelablePromise<Array<com_ever_edu_lms_search_keyword_dto_res_SearchKeywordResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/auto-complete/{tenantId}/{keyword}',
            path: {
                'tenantId': tenantId,
                'keyword': keyword,
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
     * 한 테넌트별 한 사용자가 검색한 검색어를 모두 삭제한다.
     * 한 테넌트별 한 사용자의 검색어를 모두 삭제 처리한다.
     * @param tenantId
     * @param userUuid
     * @returns string OK
     * @throws ApiError
     */
    public static deleteSearchLogs(
        tenantId: string,
        userUuid: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/search-logs/{tenantId}/{userUuid}',
            path: {
                'tenantId': tenantId,
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
     * 한 테넌트별 한 사용자의 하나의 검색어 삭제
     * 한 테넌트별 한 사용자의 하나의 검색어 삭제한다
     * @param tenantId
     * @param userUuid
     * @param keyword
     * @returns string OK
     * @throws ApiError
     */
    public static deleteSearchLog(
        tenantId: string,
        userUuid: string,
        keyword: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/search-logs/{tenantId}/{userUuid}/{keyword}',
            path: {
                'tenantId': tenantId,
                'userUuid': userUuid,
                'keyword': keyword,
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
