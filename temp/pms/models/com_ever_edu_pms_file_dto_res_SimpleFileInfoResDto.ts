/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto = {
    /**
     * 파일 아이디
     */
    fileId?: number;
    /**
     * 원본파일이름
     */
    fileName?: string;
    /**
     * S3버킷명
     */
    s3Bucket?: string;
    /**
     * S3 Key, Key 경로구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt
     */
    s3Key?: string;
    /**
     * 파일크기
     */
    fileSize?: number;
    /**
     * 파일확장자
     */
    extType?: string;
    /**
     * 업로드 상태. COMPLETE|ONGOING(파일 후속 처리가 필요한 상태)|FAIL(파일 후속 처리 실패, 사용여부 false)
     */
    uploadStatus?: string;
};

