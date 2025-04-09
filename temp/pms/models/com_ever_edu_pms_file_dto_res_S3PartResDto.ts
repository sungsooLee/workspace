/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 업로드 Part 목록
 */
export type com_ever_edu_pms_file_dto_res_S3PartResDto = {
    /**
     * S3 멀티파트 업로드 파트 번호(1 ~ 1000)
     */
    PartNumber?: number;
    /**
     * 업로드 일자
     */
    LastModified?: string;
    /**
     * Part 사이즈
     */
    Size?: number;
    /**
     * 업로드 Part ETag 값
     */
    ETag?: string;
};

