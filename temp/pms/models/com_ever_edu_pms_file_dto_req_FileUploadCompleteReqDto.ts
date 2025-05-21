/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_s3_dto_req_UploadETagPartsReqDto } from './com_ever_edu_global_s3_dto_req_UploadETagPartsReqDto';
export type com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto = {
    /**
     * S3 멀티파트 업로드 ETag 및 PartNumber 정보 배열
     */
    parts?: Array<com_ever_edu_global_s3_dto_req_UploadETagPartsReqDto>;
    /**
     * S3멀티파트 업로드인 경우 S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt
     */
    key?: string;
    /**
     * S3멀티파트 업로드인 경우 S3 업로드Id
     */
    uploadId?: string;
};

