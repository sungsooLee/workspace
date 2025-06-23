/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_badge_dto_req_BadgeGroupSaveReqDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeGroupSaveReqDto';
import type { com_ever_edu_lms_badge_dto_req_BadgeGroupSearchReqDto$SearchByAdminDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeGroupSearchReqDto$SearchByAdminDto';
import type { com_ever_edu_lms_badge_dto_req_BadgeGroupUpdateReqDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeGroupUpdateReqDto';
import type { com_ever_edu_lms_badge_dto_req_BadgeMappingGroupSaveReqDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeMappingGroupSaveReqDto';
import type { com_ever_edu_lms_badge_dto_req_BadgePreRequisiteReqDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgePreRequisiteReqDto';
import type { com_ever_edu_lms_badge_dto_req_BadgeSaveReqDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeSaveReqDto';
import type { com_ever_edu_lms_badge_dto_req_BadgeSearchReqDto$SearchByAdminDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeSearchReqDto$SearchByAdminDto';
import type { com_ever_edu_lms_badge_dto_req_BadgeUpdateReqDto } from '../models/com_ever_edu_lms_badge_dto_req_BadgeUpdateReqDto';
import type { com_ever_edu_lms_badge_dto_res_BadgePreRequisiteResDto$OnAdmin } from '../models/com_ever_edu_lms_badge_dto_res_BadgePreRequisiteResDto$OnAdmin';
import type { com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin } from '../models/com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin';
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteMappingReqDto } from '../models/com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteMappingReqDto';
import type { com_ever_edu_lms_category_dto_req_CategoryMasterDnDRequestDto } from '../models/com_ever_edu_lms_category_dto_req_CategoryMasterDnDRequestDto';
import type { com_ever_edu_lms_category_dto_req_CategoryMasterSaveRequestDto } from '../models/com_ever_edu_lms_category_dto_req_CategoryMasterSaveRequestDto';
import type { com_ever_edu_lms_category_dto_req_CategoryMasterUpdateRequestDto } from '../models/com_ever_edu_lms_category_dto_req_CategoryMasterUpdateRequestDto';
import type { com_ever_edu_lms_category_dto_req_TenantCategoryDnDRequestDto } from '../models/com_ever_edu_lms_category_dto_req_TenantCategoryDnDRequestDto';
import type { com_ever_edu_lms_category_dto_req_TenantCategoryMappingRequestDto } from '../models/com_ever_edu_lms_category_dto_req_TenantCategoryMappingRequestDto';
import type { com_ever_edu_lms_category_dto_req_TenantCategorySaveRequestDto } from '../models/com_ever_edu_lms_category_dto_req_TenantCategorySaveRequestDto';
import type { com_ever_edu_lms_category_dto_req_TenantCategoryUpdateRequestDto } from '../models/com_ever_edu_lms_category_dto_req_TenantCategoryUpdateRequestDto';
import type { com_ever_edu_lms_category_dto_res_CategoryMasterDto } from '../models/com_ever_edu_lms_category_dto_res_CategoryMasterDto';
import type { com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto } from '../models/com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto';
import type { com_ever_edu_lms_category_dto_res_TenantCategoryDto } from '../models/com_ever_edu_lms_category_dto_res_TenantCategoryDto';
import type { com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto } from '../models/com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto';
import type { com_ever_edu_lms_course_dto_req_CoursePrimaryCurriculumReqDto } from '../models/com_ever_edu_lms_course_dto_req_CoursePrimaryCurriculumReqDto';
import type { com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto } from '../models/com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1 } from '../models/com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2 } from '../models/com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3 } from '../models/com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew } from '../models/com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew';
import type { com_ever_edu_lms_course_dto_req_SequenceDeleteReqDto } from '../models/com_ever_edu_lms_course_dto_req_SequenceDeleteReqDto';
import type { com_ever_edu_lms_course_dto_req_SequenceSaveReqDto } from '../models/com_ever_edu_lms_course_dto_req_SequenceSaveReqDto';
import type { com_ever_edu_lms_course_dto_req_SequenceSearchReqDto$ByAdmin } from '../models/com_ever_edu_lms_course_dto_req_SequenceSearchReqDto$ByAdmin';
import type { com_ever_edu_lms_course_dto_req_SequenceUpdateEnrollConfDto } from '../models/com_ever_edu_lms_course_dto_req_SequenceUpdateEnrollConfDto';
import type { com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto } from '../models/com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto';
import type { com_ever_edu_lms_course_dto_res_CourseConfigResDto } from '../models/com_ever_edu_lms_course_dto_res_CourseConfigResDto';
import type { com_ever_edu_lms_course_dto_res_SequenceResDto$onAdmin } from '../models/com_ever_edu_lms_course_dto_res_SequenceResDto$onAdmin';
import type { com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent } from '../models/com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent';
import type { com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByAdmin } from '../models/com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByAdmin';
import type { com_ever_edu_lms_space_dto_req_LearningSpaceListReqDto } from '../models/com_ever_edu_lms_space_dto_req_LearningSpaceListReqDto';
import type { com_ever_edu_lms_space_dto_req_LearningSpaceSaveReqDto } from '../models/com_ever_edu_lms_space_dto_req_LearningSpaceSaveReqDto';
import type { com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto } from '../models/com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto';
import type { com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByAdmin } from '../models/com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByAdmin';
import type { org_springdoc_core_converters_models_Pageable } from '../models/org_springdoc_core_converters_models_Pageable';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeGroupListResDto$OnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeGroupListResDto$OnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_CourseListAdminResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_CourseListAdminResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin } from '../models/org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoService {
    /**
     * 테넌트 카테고리 조정(제한된 업데이트)
     * 테넌트 카테고리를 조정(제한된 업데이트)한다.
     * @param tenantId
     * @param categoryId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static adjustTenantCategory(
        tenantId: number,
        categoryId: number,
        requestBody: com_ever_edu_lms_category_dto_req_TenantCategoryUpdateRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/tenant/{tenantId}/category/{categoryId}/update',
            path: {
                'tenantId': tenantId,
                'categoryId': categoryId,
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
     * 테넌트 카테고리 dnd
     * 테넌트 카테고리를 dnd 업데이트한다.
     * @param tenantId
     * @param categoryId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateTenantCategoryDnD(
        tenantId: number,
        categoryId: number,
        requestBody: com_ever_edu_lms_category_dto_req_TenantCategoryDnDRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/tenant/{tenantId}/category/{categoryId}/dnd',
            path: {
                'tenantId': tenantId,
                'categoryId': categoryId,
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
     * 차수 단건 조회
     * 차수를 조회한다.
     * @param sequenceId
     * @returns com_ever_edu_lms_course_dto_res_SequenceResDto$onAdmin OK
     * @throws ApiError
     */
    public static findBySequenceNo1(
        sequenceId: number,
    ): CancelablePromise<com_ever_edu_lms_course_dto_res_SequenceResDto$onAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/sequence/{sequenceId}',
            path: {
                'sequenceId': sequenceId,
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
     * 차수 수정
     * 차수 정보를 수정한다
     * @param sequenceId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static updateSequence(
        sequenceId: number,
        requestBody: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/sequence/{sequenceId}',
            path: {
                'sequenceId': sequenceId,
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
     * 차수 삭제
     * 차수를 논리적으로 삭제한다.
     * @param sequenceId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteSeqList(
        sequenceId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/sequence/{sequenceId}',
            path: {
                'sequenceId': sequenceId,
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
     * 차수 수정
     * 차수 정보를 수정한다
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static listUpdate(
        requestBody: Array<com_ever_edu_lms_course_dto_req_SequenceUpdateEnrollConfDto>,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/sequence/list-update',
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
     * 과정 생성 마법사3
     * 과정 개설 > 3. 커리큘럼 설정 저장
     * @param courseId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static wizard3(
        courseId: number,
        requestBody: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/course/wizard3/{courseId}',
            path: {
                'courseId': courseId,
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
     *  과정 생성 마법사2
     * 과정 개설 > 2. 수강신청 설정 저장
     * @param courseId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static wizard2(
        courseId: number,
        requestBody: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/course/wizard2/{courseId}',
            path: {
                'courseId': courseId,
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
     *  과정 생성 마법사1
     * 과정 개설 > 1. 기본정보 설정 저장(수정)
     * @param courseId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static wizard1(
        courseId: number,
        requestBody: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/course/wizard1/{courseId}',
            path: {
                'courseId': courseId,
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
     * 마스터 카테고리 메타 정보 업데이트
     * 마스터 카테고리 정보를 업데이트한다.
     * @param categoryId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static update(
        categoryId: number,
        requestBody: com_ever_edu_lms_category_dto_req_CategoryMasterUpdateRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/category/{categoryId}/update',
            path: {
                'categoryId': categoryId,
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
     * 마스터 카테고리 트리 이동 저장
     * Drag aNd Drop 으로 트리가 변경 될 경우 변경한다. 동일 레벨 순서변경만 가능
     * @param categoryId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static dnd(
        categoryId: number,
        requestBody: com_ever_edu_lms_category_dto_req_CategoryMasterDnDRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/category/{categoryId}/dnd',
            path: {
                'categoryId': categoryId,
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
     * [BO] 뱃지 정보 수정
     * 뱃지 정보를 수정 한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static update1(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgeUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/badge',
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
     * [BO] 뱃지 정보 생성
     * 뱃지 정보를 생성 한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static save2(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgeSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/badge',
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
     * [BO] 뱃지 정보 삭제
     * 뱃지 정보를 삭제 한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static delete2(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgeUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/badge',
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
     * [BO]뱃지 그룹에 매핑된 뱃지 리스트 조회
     * 뱃지 그룹에 매핑되어 있는 뱃지리스트들을 조회한다.
     * @param params
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin OK
     * @throws ApiError
     */
    public static findPage7(
        params: com_ever_edu_lms_badge_dto_req_BadgeSearchReqDto$SearchByAdminDto,
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeListResDto$OnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/badge-group',
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
     * [BO] 뱃지 그룹 정보 수정
     * 뱃지 그룹 정보를 수정 한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static update2(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgeGroupUpdateReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/badge-group',
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
     * [BO] 뱃지 그룹 정보 생성
     * 뱃지 그룹 정보를 생성 한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static save3(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgeGroupSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/badge-group',
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
     * 테넌트 공통 카테고리 매핑
     * 마스터 카테고리(공통)를 테넌트 카테고리로 매핑한다.
     * @param tenantId
     * @param categoryId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static commonMapping(
        tenantId: number,
        categoryId: number,
        requestBody: com_ever_edu_lms_category_dto_req_TenantCategoryMappingRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/tenant/{tenantId}/category/{categoryId}/common-mapping',
            path: {
                'tenantId': tenantId,
                'categoryId': categoryId,
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
     * 테넌트 카테고리 생성
     * 테넌트 카테고리를 생성한다.
     * @param tenantId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveTenantCategory(
        tenantId: number,
        requestBody: com_ever_edu_lms_category_dto_req_TenantCategorySaveRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/tenant/{tenantId}/category/save-and-mapping',
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
     * 교육 장소 목록 조회
     * 교육장소 목록을 조회한다.
     * @param pageable
     * @param param
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto OK
     * @throws ApiError
     */
    public static findAll(
        pageable: org_springdoc_core_converters_models_Pageable,
        param: com_ever_edu_lms_space_dto_req_LearningSpaceListReqDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/space',
            query: {
                'pageable': pageable,
                'param': param,
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
     * 교육 장소 등록
     * 교육장소 정보를 신규 등록한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static save(
        requestBody: com_ever_edu_lms_space_dto_req_LearningSpaceSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/space',
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
     * 차수 생성
     * 차수를 N건을 생성한다. 과정Id를 리턴
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveSequence(
        requestBody: com_ever_edu_lms_course_dto_req_SequenceSaveReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/sequence',
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
     * 차수 복사
     * 차수를 복사한다.
     * @param sequenceId
     * @returns number OK
     * @throws ApiError
     */
    public static copy(
        sequenceId: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/sequence/{sequenceId}/copy',
            path: {
                'sequenceId': sequenceId,
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
     * 카프카 쓰지 않고 바로 입과
     * 바로 입과 테스트
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static enrollTest1(
        requestBody: com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/enroll-test',
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
     * 과정 생성 마법사3-대표커리큘럼 신규/복사 등록
     * 과정 개설 > 3. 커리큘럼 설정 > 대표 커리큘럼 신규등록
     * @param courseId
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static newPrimaryCurriculum(
        courseId: number,
        requestBody: com_ever_edu_lms_course_dto_req_CoursePrimaryCurriculumReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/course/wizard3/{courseId}/curriculum',
            path: {
                'courseId': courseId,
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
     * 과정 생성 마법사 시작
     * 과정 개설 > 1. 기본정보 설정 저장(신규등록)
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static newWizard(
        requestBody: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/course/wizard/new',
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
     * 마스터 카테고리 단건 생성
     * 카테고리 트리에서 우클릭하여 단건을 생성한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static save1(
        requestBody: com_ever_edu_lms_category_dto_req_CategoryMasterSaveRequestDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/category/save',
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
     * 블랙/화이트를 삭제한다.
     * 블랙/화이트를 삭제한다.
     * @param groupId
     * @returns any OK
     * @throws ApiError
     */
    public static delete(
        groupId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/black-and-white/{groupId}/delete',
            path: {
                'groupId': groupId,
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
     * 블랙/화이트 목록을 mapping한다.
     * 블랙/화이트 목록을 mapping한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static mapping(
        requestBody: com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteMappingReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/black-and-white/mapping',
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
     * [BO]뱃지를 부여하는 API다.
     * 뱃지 내의 과정 수료 조건을 보고 뱃지를 발급한다.
     * @param userUuid
     * @param badgeId
     * @returns any OK
     * @throws ApiError
     */
    public static issueBadge(
        userUuid: string,
        badgeId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/badge/issue/{userUuid}/{badgeId}',
            path: {
                'userUuid': userUuid,
                'badgeId': badgeId,
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
     * [BO] 뱃지 선수조건을 등록한다
     * 뱃지와 뱃지 사이의 선수조건을 설정한다.
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static saveBadgePreRequisite(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgePreRequisiteReqDto,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/badge-prerequisite',
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
     * [BO] 뱃지에 과정 매핑
     * 뱃지에 과정이나 시험 정보를 매핑한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static save4(
        requestBody: com_ever_edu_lms_badge_dto_req_BadgeMappingGroupSaveReqDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/badge-group/mappings',
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
     * 테넌트 카테고리 조회한다.
     * @param tenantId
     * @param categoryId
     * @returns com_ever_edu_lms_category_dto_res_TenantCategoryDto OK
     * @throws ApiError
     */
    public static findTenantCategoryTree(
        tenantId: number,
        categoryId: number,
    ): CancelablePromise<com_ever_edu_lms_category_dto_res_TenantCategoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenant/{tenantId}/category/{categoryId}',
            path: {
                'tenantId': tenantId,
                'categoryId': categoryId,
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
     * tenant 카테고리 트리 조회
     * 카테고리 트리를 조회한다.
     * @param tenantId
     * @returns com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto OK
     * @throws ApiError
     */
    public static findTenantCategoryTree1(
        tenantId: number,
    ): CancelablePromise<com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenant/{tenantId}/category/tree',
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
     * 과정 생성 카테고리 팝업
     * 과정 생성 시 카테고리 추가를 위한 팝업 용도 입니다.
     * @param tenantIds
     * @returns com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto OK
     * @throws ApiError
     */
    public static findTenantsCategoryTree(
        tenantIds: Array<number>,
    ): CancelablePromise<com_ever_edu_lms_category_dto_res_TenantCategoryTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenant/{tenantIds}/category/tree/popup',
            path: {
                'tenantIds': tenantIds,
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
     * [BO]테넌트에 매핑된 뱃지그룹 조회
     * 테넌트에 매핑되어있는 뱃지그룹들을 조회한다.
     * @param params
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeGroupListResDto$OnAdmin OK
     * @throws ApiError
     */
    public static findPage3(
        params: com_ever_edu_lms_badge_dto_req_BadgeGroupSearchReqDto$SearchByAdminDto,
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_badge_dto_res_BadgeGroupListResDto$OnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/tenant/badge-group',
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
     * 수강이력
     * 수강이력
     * @param params
     * @param pageable
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin OK
     * @throws ApiError
     */
    public static findPage4(
        params: com_ever_edu_lms_student_dto_req_StudentSearchDto$SearchByAdmin,
        pageable: org_springdoc_core_converters_models_Pageable,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/students',
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
     * 교육 장소 상세 조회
     * 교육장소 UUID로 상세정보를 조회한다.
     * @param learningSpaceUuid
     * @returns com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto OK
     * @throws ApiError
     */
    public static findByUuid(
        learningSpaceUuid: string,
    ): CancelablePromise<com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/space/{learningSpaceUuid}',
            path: {
                'learningSpaceUuid': learningSpaceUuid,
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
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin OK
     * @throws ApiError
     */
    public static findPage5(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_lms_course_dto_req_SequenceSearchReqDto$ByAdmin,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/sequences',
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
     * 과정 목록 조회
     * 과정 목록을 조회한다.
     * @param pageable
     * @param params
     * @returns org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_CourseListAdminResDto OK
     * @throws ApiError
     */
    public static findPage6(
        pageable: org_springdoc_core_converters_models_Pageable,
        params: com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_lms_course_dto_res_CourseListAdminResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/courses',
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
     * 과정 항목 설정 정보
     * 채널, 과정유형에 설정된 항목 설정정보 조회(채널 선택시 호출)
     * @param channelId
     * @param courseType
     * @returns com_ever_edu_lms_course_dto_res_CourseConfigResDto OK
     * @throws ApiError
     */
    public static getCourseConfig(
        channelId: number,
        courseType: 'ELEARNING1' | 'ELEARNING2' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY',
    ): CancelablePromise<com_ever_edu_lms_course_dto_res_CourseConfigResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/course/config',
            query: {
                'channelId': channelId,
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
     * 카테고리 코드 중복체크(마스터/테넌트)
     * 유효시 true(마스터 카테고리 테넌트 카테고리 공통 사용)
     * @param code
     * @returns boolean OK
     * @throws ApiError
     */
    public static codeValidation(
        code: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/category/{code}/validation',
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
     * 마스터 카테고리 조회
     * 카테고리 트리를 조회한다.
     * @param categoryId
     * @returns com_ever_edu_lms_category_dto_res_CategoryMasterDto OK
     * @throws ApiError
     */
    public static findCategoryMaster(
        categoryId: number,
    ): CancelablePromise<com_ever_edu_lms_category_dto_res_CategoryMasterDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/category/{categoryId}',
            path: {
                'categoryId': categoryId,
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
     * 마스터 카테고리 조회
     * 카테고리 트리를 조회한다.
     * @returns com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto OK
     * @throws ApiError
     */
    public static findCategoryMasterTree(): CancelablePromise<com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/category/tree',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * [BO]뱃지내 있는 컴포넌트 상세 조회
     * 뱃지에 엮여있는 뱃지 컴포넌트 정보를 상세 조회한다..
     * @param badgeId
     * @returns com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin OK
     * @throws ApiError
     */
    public static findBadgeDetail(
        badgeId: number,
    ): CancelablePromise<com_ever_edu_lms_badge_dto_res_BadgeResDto$OnAdmin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/badge/{badgeId}',
            path: {
                'badgeId': badgeId,
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
     * [BO] 뱃지 선수조건을 조회한다
     * 한 뱃지 내의 선수 조건을 조회한다.
     * @param badgeId
     * @returns com_ever_edu_lms_badge_dto_res_BadgePreRequisiteResDto$OnAdmin OK
     * @throws ApiError
     */
    public static findBadgePreRequisite(
        badgeId: number,
    ): CancelablePromise<Array<com_ever_edu_lms_badge_dto_res_BadgePreRequisiteResDto$OnAdmin>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/badge-prerequisite/{badgeId}',
            path: {
                'badgeId': badgeId,
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
     * 테넌트 카테고리 삭제
     * 테넌트 카테고리를 삭제한다.
     * @param tenantId
     * @param categoryId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTenantCategory(
        tenantId: number,
        categoryId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/tenant/{tenantId}/category/{categoryId}/delete',
            path: {
                'tenantId': tenantId,
                'categoryId': categoryId,
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
     * 차수 삭제
     * 차수를 논리적으로 삭제한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static deleteSeqList1(
        requestBody: Array<com_ever_edu_lms_course_dto_req_SequenceDeleteReqDto>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/sequence/list-delete',
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
     * 수강신청을 강제 취소한다.
     * 수강신청을 취소한다.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static cancel1(
        requestBody: com_ever_edu_lms_enroll_dto_req_EnrollCancelReqDto$ByAdmin,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/enroll',
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
     * 과정 삭제
     * 과정을 논리적으로 삭제한다.
     * @param courseId
     * @param courseType
     * @returns any OK
     * @throws ApiError
     */
    public static findByUuid1(
        courseId: number,
        courseType: 'ELEARNING1' | 'ELEARNING2' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/course/{courseId}',
            path: {
                'courseId': courseId,
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
     * 마스터 카테고리를 삭제한다. (논리 삭제)
     * 마스터 카테고리를 삭제한다. 매핑된 테넌트나 과정이 있으면 삭제 불가?
     * @param categoryId
     * @returns any OK
     * @throws ApiError
     */
    public static delete1(
        categoryId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/category/{categoryId}/delete',
            path: {
                'categoryId': categoryId,
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
     * [BO] 뱃지 그룹 정보 삭제
     * 뱃지 그룹 정보를 삭제 한다.
     * @param badgeGroupId
     * @returns number OK
     * @throws ApiError
     */
    public static delete3(
        badgeGroupId: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/badge-group/{badgeGroupId}',
            query: {
                'badgeGroupId': badgeGroupId,
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
