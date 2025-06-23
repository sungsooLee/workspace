/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 항목 표시/비표시, 보안설정 등
 */
export type com_ever_edu_lms_course_dto_res_CourseConfigResDto = {
    '수강신청 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'수강신청 설정';
    '학습 환경 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'학습 환경 설정';
    '학습 제어 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'학습 제어 설정';
    '이수기준 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'이수기준 설정';
    '커뮤니티 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'커뮤니티 설정';
    '강사 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'강사 설정';
    '교재 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'교재 설정';
    '사전/연관학습 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'사전/연관학습 설정';
    '행정항목 설정'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'행정항목 설정';
    '사용가능 컨텐츠 설정'?: Array<'VIDEO' | 'EBOOK' | 'SCORM' | 'HTML5_VIDEO' | 'IMAGE' | 'EXTERNAL_LINK' | 'EXTERNAL_AGENCY' | 'BLOG' | 'EXAM' | 'EXAM_POOL' | 'ASSIGNMENT' | 'SURVEY' | 'ETC'>;
    '파일 저장소 유형'?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.'파일 저장소 유형';
};
export namespace com_ever_edu_lms_course_dto_res_CourseConfigResDto {
    export enum '수강신청 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '학습 환경 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '학습 제어 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '이수기준 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '커뮤니티 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '강사 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '교재 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '사전/연관학습 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '행정항목 설정' {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    export enum '파일 저장소 유형' {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
}

