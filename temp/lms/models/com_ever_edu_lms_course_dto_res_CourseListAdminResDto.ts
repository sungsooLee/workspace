/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseListAdminResDto = {
    courseUuid?: string;
    completedWizardStep?: com_ever_edu_lms_course_dto_res_CourseListAdminResDto.completedWizardStep;
    tenantName?: string;
    channelName?: string;
    courseId?: number;
    openingYear?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseListAdminResDto.courseType;
    isBookmarks?: boolean;
    courseName?: string;
    isUsed?: boolean;
    sequenceCount?: number;
    viewCount?: number;
    likesCount?: number;
    shareCount?: number;
    reviewCount?: number;
    studentCount?: number;
    coordinatorName?: string;
    operatorName?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CourseListAdminResDto {
    export enum completedWizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

