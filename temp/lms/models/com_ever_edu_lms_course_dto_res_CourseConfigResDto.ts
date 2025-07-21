/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 항목 표시/비표시, 보안설정 등
 */
export type com_ever_edu_lms_course_dto_res_CourseConfigResDto = {
    /**
     * 수강신청 설정
     */
    enrollOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.enrollOption;
    /**
     * 학습 환경 설정
     */
    learningEnvOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.learningEnvOption;
    /**
     * 학습 제어 설정
     */
    learningControlOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.learningControlOption;
    /**
     * 이수기준 설정
     */
    passOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.passOption;
    /**
     * 커뮤니티 설정
     */
    communicationOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.communicationOption;
    /**
     * 강사 설정
     */
    instructorOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.instructorOption;
    /**
     * 교재 설정
     */
    textBookOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.textBookOption;
    /**
     * 사전/연관학습 설정
     */
    relatedCourseOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.relatedCourseOption;
    /**
     * 행정항목 설정
     */
    adminDataOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.adminDataOption;
    /**
     * 완성차 테넌트 전용 항목 설정 여부
     */
    carTenantCustomOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.carTenantCustomOption;
    /**
     * 로템 테넌트 전용 항목 설정 여부
     */
    rotemTenantCustomOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.rotemTenantCustomOption;
    /**
     * 위탁 테넌트 전용 항목 설정 여부
     */
    outsourcingTenantCustomOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.outsourcingTenantCustomOption;
    /**
     * 위아 테넌트 전용 항목 설정 여부
     */
    wiaTenantCustomOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.wiaTenantCustomOption;
    /**
     * 오토에버 테넌트 전용 항목 설정 여부
     */
    autoeverTenantCustomOption?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.autoeverTenantCustomOption;
    /**
     * 사용가능 컨텐츠 설정
     */
    allowedContentTypes?: Array<'VIDEO' | 'EBOOK' | 'SCORM' | 'HTML5_VIDEO' | 'IMAGE' | 'EXTERNAL_LINK' | 'EXTERNAL_AGENCY' | 'BLOG' | 'EXAM' | 'EXAM_POOL' | 'ASSIGNMENT' | 'SURVEY' | 'ETC'>;
    /**
     * 파일 저장소 유형
     */
    fileStorageType?: com_ever_edu_lms_course_dto_res_CourseConfigResDto.fileStorageType;
};
export namespace com_ever_edu_lms_course_dto_res_CourseConfigResDto {
    /**
     * 수강신청 설정
     */
    export enum enrollOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 학습 환경 설정
     */
    export enum learningEnvOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 학습 제어 설정
     */
    export enum learningControlOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 이수기준 설정
     */
    export enum passOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 커뮤니티 설정
     */
    export enum communicationOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 강사 설정
     */
    export enum instructorOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 교재 설정
     */
    export enum textBookOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 사전/연관학습 설정
     */
    export enum relatedCourseOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 행정항목 설정
     */
    export enum adminDataOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 완성차 테넌트 전용 항목 설정 여부
     */
    export enum carTenantCustomOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 로템 테넌트 전용 항목 설정 여부
     */
    export enum rotemTenantCustomOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 위탁 테넌트 전용 항목 설정 여부
     */
    export enum outsourcingTenantCustomOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 위아 테넌트 전용 항목 설정 여부
     */
    export enum wiaTenantCustomOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 오토에버 테넌트 전용 항목 설정 여부
     */
    export enum autoeverTenantCustomOption {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
        OPTION_USE = 'OPTION_USE',
        OPTION_NOT_USE = 'OPTION_NOT_USE',
    }
    /**
     * 파일 저장소 유형
     */
    export enum fileStorageType {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
}

