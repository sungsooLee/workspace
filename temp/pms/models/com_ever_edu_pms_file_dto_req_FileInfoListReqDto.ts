/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileInfoReqDto } from './com_ever_edu_pms_file_dto_req_FileInfoReqDto';
export type com_ever_edu_pms_file_dto_req_FileInfoListReqDto = {
    /**
     * 세부경로, 3Depth 경로<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br>Ex&gt;upload/community/board/2025/01/02/file.ppt -&gt;/2025/01/02
     */
    detailPath: string;
    /**
     * 파일정보목록
     */
    files?: Array<com_ever_edu_pms_file_dto_req_FileInfoReqDto>;
};

