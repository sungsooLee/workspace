/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto } from '../models/com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto';
import type { com_ever_edu_lms_course_dto_res_CourseLikesResDto } from '../models/com_ever_edu_lms_course_dto_res_CourseLikesResDto';
import type { com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser } from '../models/com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser';
import type { com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser } from '../models/com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser';
import type { com_ever_edu_lms_course_dto_res_SequenceResDto$onUser } from '../models/com_ever_edu_lms_course_dto_res_SequenceResDto$onUser';
import type { com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByUser } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByUser';
import type { com_ever_edu_lms_enroll_dto_req_EnrollReqDto$ByUser } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollReqDto$ByUser';
import type { com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByUser } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByUser';
import type { com_ever_edu_lms_enroll_dto_res_EnrollResDto$DetailOnUser } from '../models/com_ever_edu_lms_enroll_dto_res_EnrollResDto$DetailOnUser';
import type { com_ever_edu_lms_search_course_dto_req_CourseSearchReqDto$OnUser } from '../models/com_ever_edu_lms_search_course_dto_req_CourseSearchReqDto$OnUser';
import type { com_ever_edu_lms_search_course_dto_res_CourseSearchResDto$OnUser } from '../models/com_ever_edu_lms_search_course_dto_res_CourseSearchResDto$OnUser';
import type { com_ever_edu_lms_search_logs_dto_req_SearchLogRequestDto } from '../models/com_ever_edu_lms_search_logs_dto_req_SearchLogRequestDto';
import type { com_ever_edu_lms_search_logs_dto_res_SearchLogPopularResponseDto } from '../models/com_ever_edu_lms_search_logs_dto_res_SearchLogPopularResponseDto';
import type { com_ever_edu_lms_search_logs_dto_res_SearchLogResponseDto } from '../models/com_ever_edu_lms_search_logs_dto_res_SearchLogResponseDto';
import type { com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByUser } from '../models/com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByUser';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnUser } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoService {
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
     * 한 사용자의 검색을 저장하는 행위이다. 각 사용자별로 저장한다.
     * 사용자가 검색어를 입력할때 마다 테넌트별 사용자의 검색어 정보를 저장한다..
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static saveSearchLogs(
        requestBody: com_ever_edu_lms_search_logs_dto_req_SearchLogRequestDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/search-logs',
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
     * 과정 좋아요 해제
     * 과정 좋아요를 해제한다.
     * @param courseUuid 과정 uuid
     * @returns number OK
     * @throws ApiError
     */
    public static unlike(
        courseUuid: string,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/course/{courseUuid}/unlike',
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
     * 과정 좋아요 조회
     * 과정의 좋아요 정보를 조회한다.
     * @param courseUuid 과정 uuid
     * @returns com_ever_edu_lms_course_dto_res_CourseLikesResDto OK
     * @throws ApiError
     */
    public static findCourseLikesByCourseTsId(
        courseUuid: string,
    ): CancelablePromise<com_ever_edu_lms_course_dto_res_CourseLikesResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/course/{courseUuid}/like',
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
     * 과정 좋아요
     * 과정에 좋아요를 누른다.
     * @param courseUuid 과정 uuid
     * @returns number OK
     * @throws ApiError
     */
    public static like(
        courseUuid: string,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/course/{courseUuid}/like',
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
     * 한 테넌트별 키워드의 자동완성 기능
     * 한 테넌트 내의 키워드 입력시 자동 완성을 제공해주는 기능이다.
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static saveAutoCompleteKeyword(
        requestBody: com_ever_edu_lms_search_logs_dto_req_SearchLogRequestDto,
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
     * @param courseType
     * @returns com_ever_edu_lms_course_dto_res_SequenceResDto$onUser OK
     * @throws ApiError
     */
    public static findBySequenceNo(
        courseSequenceUuid: string,
        courseType: 'ELEARNING' | 'ELEARNING_SANGSI' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY',
    ): CancelablePromise<com_ever_edu_lms_course_dto_res_SequenceResDto$onUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/sequence/{courseSequenceUuid}',
            path: {
                'courseSequenceUuid': courseSequenceUuid,
            },
            query: {
                'courseType': courseType,
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
     * 한 테넌트별 한 사용자의 최근 검색어 조회
     * 한 테넌트별 한 사용자의 최근 10개 검색어를 조회합니다.
     * @param tenantUuid
     * @param userUuid
     * @returns com_ever_edu_lms_search_logs_dto_res_SearchLogResponseDto OK
     * @throws ApiError
     */
    public static getRecentSearchLogs(
        tenantUuid: string,
        userUuid: string,
    ): CancelablePromise<Array<com_ever_edu_lms_search_logs_dto_res_SearchLogResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/search-logs/{tenantUuid}/{userUuid}/recent',
            path: {
                'tenantUuid': tenantUuid,
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
     * @param tenantUuid
     * @returns com_ever_edu_lms_search_logs_dto_res_SearchLogPopularResponseDto OK
     * @throws ApiError
     */
    public static getPopularSearchLogs(
        tenantUuid: string,
    ): CancelablePromise<Array<com_ever_edu_lms_search_logs_dto_res_SearchLogPopularResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/search-logs/{tenantUuid}/popular-logs',
            path: {
                'tenantUuid': tenantUuid,
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
     * 과정 조회
     * 과정 id를 통해 조회한다.
     * @param courseUuid
     * @returns com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser OK
     * @throws ApiError
     */
    public static findByCourseId(
        courseUuid: string,
    ): CancelablePromise<com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/course/{courseUuid}',
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
        courseType?: 'ELEARNING' | 'ELEARNING_SANGSI' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY',
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
     * @param tenantUuid
     * @param keyword
     * @returns com_ever_edu_lms_search_logs_dto_res_SearchLogResponseDto OK
     * @throws ApiError
     */
    public static getKeywordAutoComplete(
        tenantUuid: string,
        keyword: string,
    ): CancelablePromise<Array<com_ever_edu_lms_search_logs_dto_res_SearchLogResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/auto-complete/{tenantUuid}/{keyword}',
            path: {
                'tenantUuid': tenantUuid,
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
     * @param tenantUuid
     * @param userUuid
     * @returns string OK
     * @throws ApiError
     */
    public static deleteSearchLogs(
        tenantUuid: string,
        userUuid: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/search-logs/{tenantUuid}/{userUuid}',
            path: {
                'tenantUuid': tenantUuid,
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
     * @param tenantUuid
     * @param userUuid
     * @param keyword
     * @returns string OK
     * @throws ApiError
     */
    public static deleteSearchLog(
        tenantUuid: string,
        userUuid: string,
        keyword: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/search-logs/{tenantUuid}/{userUuid}/{keyword}',
            path: {
                'tenantUuid': tenantUuid,
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
