/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_res_S3PartResDto } from './com_ever_edu_pms_file_dto_res_S3PartResDto';
export type com_ever_edu_pms_file_dto_res_ListUploadPartsResDto = {
    /**
     * S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt
     */
    Key?: string;
    /**
     * S3 업로드Id
     */
    UploadId?: string;
    /**
     * 업로드 Part 목록
     */
    Parts?: Array<com_ever_edu_pms_file_dto_res_S3PartResDto>;
};

