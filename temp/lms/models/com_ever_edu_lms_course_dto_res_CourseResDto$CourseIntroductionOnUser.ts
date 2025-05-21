/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_channel_dto_res_ChannelInfoDto } from './com_ever_edu_lms_channel_dto_res_ChannelInfoDto';
import type { com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto } from './com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto';
import type { com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper } from './com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper';
import type { com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser } from './com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser';
import type { com_ever_edu_lms_curriculum_dto_CurriculumInfoDto } from './com_ever_edu_lms_curriculum_dto_CurriculumInfoDto';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser = {
    courseUUID?: string;
    thumbnailUrl?: string;
    language?: string;
    courseName?: string;
    likeCount?: number;
    shareCount?: number;
    starRating?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser.courseType;
    channelInfo?: com_ever_edu_lms_channel_dto_res_ChannelInfoDto;
    primaryCategoryPath?: string;
    relatedCourse?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;
    learningSpaceType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser.learningSpaceType;
    recognizedStudyMinutes?: number;
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser.trainingLevelType;
    isCertificateProvided?: boolean;
    courseSummary?: string;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper>;
    courseGoal?: string;
    courseContent?: string;
    trainingTarget?: string;
    curriculumInfoDto?: com_ever_edu_lms_curriculum_dto_CurriculumInfoDto;
    progressMinPassScore?: number;
    examMinPassScore?: number;
    asgmtMinPassScore?: number;
    totalMinPassScore?: number;
    progressWeights?: number;
    examWeights?: number;
    asgmtWeights?: number;
    sequenceListOnUser?: Array<com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser>;
    operatorId?: number;
    operatorTelNo?: string;
    isEnrollRequired?: boolean;
    deviceRestrictType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser.deviceRestrictType;
    /**
     * 사내망 제어 여부
     */
    isIntranetRestricted?: boolean;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled?: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed?: boolean;
    isTextbookProvided?: boolean;
    textbookName?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseIntroductionOnUser {
    export enum courseType {
        ELEARNING = 'ELEARNING',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
    export enum learningSpaceType {
        EXTERNAL_SITE = 'EXTERNAL_SITE',
        LEARNING_WAY = 'LEARNING_WAY',
        FACE_TO_FACE = 'FACE_TO_FACE',
        NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
    }
    export enum trainingLevelType {
        NONE = 'NONE',
        BEGINNER = 'BEGINNER',
        BASIC = 'BASIC',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
        EXPERT = 'EXPERT',
    }
    export enum deviceRestrictType {
        NONE = 'NONE',
        PC = 'PC',
        MOBILE = 'MOBILE',
    }
}

