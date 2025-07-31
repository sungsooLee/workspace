/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto } from './com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto';
import type { com_ever_edu_lms_course_dto_res_CourseUserSearchResDto } from './com_ever_edu_lms_course_dto_res_CourseUserSearchResDto';
import type { com_ever_edu_lms_course_dto_res_StarRatingResDto } from './com_ever_edu_lms_course_dto_res_StarRatingResDto';
import type { com_ever_edu_lms_tag_dto_res_TagResDto } from './com_ever_edu_lms_tag_dto_res_TagResDto';
export type com_ever_edu_lms_course_dto_res_CourseUserResDto = {
    /**
     * 과정명
     */
    courseName?: string;
    /**
     * 학생 등록 여부
     */
    isStudent?: boolean;
    /**
     * 별점 평점
     */
    starRatingAverage?: number;
    /**
     * 별점 목록(1-5)
     */
    starRatings?: Array<com_ever_edu_lms_course_dto_res_StarRatingResDto>;
    /**
     * 좋아요 체크 여부
     */
    isLikeCourse?: boolean;
    /**
     * 좋아요 수
     */
    likeCount?: number;
    /**
     * 조회수
     */
    viewCount?: number;
    /**
     * 채널 UUID
     */
    channelUuid?: string;
    /**
     * 과정 유형
     */
    courseType?: com_ever_edu_lms_course_dto_res_CourseUserResDto.courseType;
    /**
     * 대표카테고리 ID
     */
    primaryCategoryId?: number;
    /**
     * 카테고리 목록
     */
    categories?: Array<com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto>;
    /**
     * 난이도
     */
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseUserResDto.trainingLevelType;
    /**
     * 언어 설정
     */
    language?: Array<string>;
    /**
     * 썸네일 이미지 Group UUID
     */
    thumbnailFileGroupUuid?: string;
    /**
     * 대표 썸네일 이미지 UUID
     */
    primaryThumbnailFileUuid?: string;
    courseSummary?: string;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_tag_dto_res_TagResDto>;
    courseContent?: string;
    /**
     * 커리큘럼 ID
     */
    curriculumId?: number;
    /**
     * 수강신청 필요여부
     */
    isEnrollRequired?: boolean;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption?: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType?: com_ever_edu_lms_course_dto_res_CourseUserResDto.passMethodType;
    /**
     * 수료증 제공 여부
     */
    isCertificateProvided?: boolean;
    /**
     * 항목별 이수 기준 (진도)
     */
    progressMinPassScore?: number;
    /**
     * 항목별 이수 기준 (출석)
     */
    attendanceMinPassScore?: number;
    /**
     * 항목별 이수 기준 (평가)
     */
    examMinPassScore?: number;
    /**
     * 항목별 이수 기준 (과제)
     */
    asgmtMinPassScore?: number;
    /**
     * 항목별 이수 기준 (총점)
     */
    totalMinPassScore?: number;
    /**
     * 반영 비율 (진도)
     */
    progressWeights?: number;
    /**
     * 반영 비율 (출석)
     */
    attendanceWeights?: number;
    /**
     * 반영 비율 (시험)
     */
    examWeights?: number;
    /**
     * 반영 비율 (과제)
     */
    asgmtWeights?: number;
    /**
     * 강사 이름
     */
    instructorName?: string;
    /**
     * 강사 이메일
     */
    instructorEmail?: string;
    /**
     * 강사 경력
     */
    career?: string;
    coordinatorUuid?: string;
    /**
     * 담당자 이름
     */
    coordinatorName?: string;
    /**
     * 담당자 부서명
     */
    coordinatorDeptName?: string;
    coordinatorTelNo?: string;
    /**
     * 담당자 이메일
     */
    coordinatorEmail?: string;
    operatorUuid?: string;
    /**
     * 운영자 이름
     */
    operatorName?: string;
    /**
     * 운영자 부서이름
     */
    operatorDeptName?: string;
    operatorTelNo?: string;
    /**
     * 운영자 이메일
     */
    operatorEmail?: string;
    relatedCourseList?: Array<com_ever_edu_lms_course_dto_res_CourseUserSearchResDto>;
    /**
     * 사전 학습 목록
     */
    preqCourseList?: Array<com_ever_edu_lms_course_dto_res_CourseUserSearchResDto>;
};
export namespace com_ever_edu_lms_course_dto_res_CourseUserResDto {
    /**
     * 과정 유형
     */
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
    /**
     * 난이도
     */
    export enum trainingLevelType {
        NONE = 'NONE',
        BEGINNER = 'BEGINNER',
        BASIC = 'BASIC',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
        EXPERT = 'EXPERT',
    }
    /**
     * (lms.course.PassMethodType)
     */
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

