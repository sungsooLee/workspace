/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_req_FileInfoReqDto = {
    groupId?: number;
    /**
     * 파일그룹 아이디
     */
    groupUuid?: string;
    /**
     * 원본파일이름
     */
    originalFileName: string;
    /**
     * 서버파일이름(S3에 저장된 파일의 이름)
     */
    serverFileName: string;
    /**
     * 파일크기
     */
    fileSize?: number;
    /**
     * 세부경로, 3Depth 경로<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt;upload/community/board/2025/01/02/file.ppt -&gt;/2025/01/02
     */
    detailPath: string;
};

