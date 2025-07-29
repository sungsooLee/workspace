/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_instructor_dto_res_InstructorResDto = {
    /**
     * 강사ID
     */
    instructorId?: number;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 강사타입(사내/사외)
     */
    instructorType?: com_ever_edu_lms_instructor_dto_res_InstructorResDto.instructorType;
    /**
     * 전임강사 여부
     */
    isFulltimeInstructor?: boolean;
    /**
     * 역할 ID
     */
    roleId?: number;
    /**
     * 역할 부여 기간 시작일자
     */
    startDate?: string;
    /**
     * 역할 부여 기간 종료일자
     */
    endDate?: string;
    /**
     * 이름
     */
    instructorName?: string;
    /**
     * 회사
     */
    companyName?: string;
    /**
     * 프로필 사진 첨부파일 group uuid
     */
    profileFileUuid?: string;
    /**
     * 사번 또는 이메일
     */
    employeeIdOrEmail?: string;
    /**
     * 연락처
     */
    telNo?: string;
    /**
     * 국가코드
     */
    nationCd?: {
        language?: string;
        script?: string;
        variant?: string;
        displayName?: string;
        country?: string;
        unicodeLocaleAttributes?: Array<string>;
        unicodeLocaleKeys?: Array<string>;
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: Array<string>;
        iso3Language?: string;
        iso3Country?: string;
    };
    /**
     * 생년월일
     */
    birthday?: string;
    /**
     * 차량 번호
     */
    carNumber?: string;
    /**
     * 강사 소개
     */
    introduction?: string;
    /**
     * 강사 경력
     */
    career?: string;
    /**
     * 강사 경력 인정 파일 Group uuid
     */
    carreerFileGroupUuid?: string;
    /**
     * 강사 경력 년수
     */
    carreerYear?: number;
    /**
     * 강사 경력 개월
     */
    carreerMonth?: number;
};
export namespace com_ever_edu_lms_instructor_dto_res_InstructorResDto {
    /**
     * 강사타입(사내/사외)
     */
    export enum instructorType {
        INTERNAL_INSTRUCTOR = 'INTERNAL_INSTRUCTOR',
        EXTERNAL_INSTRUCTOR = 'EXTERNAL_INSTRUCTOR',
    }
}

