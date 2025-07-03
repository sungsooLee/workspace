/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * S3 멀티파트 업로드 ETag 및 PartNumber 정보 배열
 */
export type com_ever_edu_global_s3_dto_req_UploadETagPartsReqDto = {
    /**
     * S3 Part 업로드 ETag
     */
    ETag: string;
    /**
     * 업로드 파트 번호(1 ~ 10000)
     */
    PartNumber?: number;
};

