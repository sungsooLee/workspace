/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_instructor_dto_req_InstructorUpdateReqDto = {
    /**
     * 강사 ID
     */
    instructorId: number;
    /**
     * 역할 부여 기간 시작일자
     */
    startDate: string;
    /**
     * 역할 부여 기간 종료일자
     */
    endDate: string;
    /**
     * 프로필 사진 첨부파일 group uuid
     */
    profileFileUuid?: string;
    /**
     * 차량 번호
     */
    carNumber?: string;
    /**
     * 강사 소개
     */
    introduction: string;
    /**
     * 강사 경력
     */
    career: string;
    /**
     * 강사 경력 인정 파일 Group uuid
     */
    carreerFileGroupUuid?: string;
    /**
     * 강사 경력 년수
     */
    carreerYear: number;
    /**
     * 강사 경력 개월
     */
    carreerMonth: number;
};

