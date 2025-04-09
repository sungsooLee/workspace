/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * ETag 및 PartNumber 속성이 있는 객체 배열
 */
export type com_ever_edu_pms_file_dto_req_UploadETagPartsReqDto = {
    /**
     * S3 Part 업로드 ETag
     */
    ETag: string;
    /**
     * 업로드 파트 번호(1 ~ 10000)
     */
    PartNumber?: number;
};

