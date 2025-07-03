/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_res_ImageResDto = {
    /**
     * 저정소유형. Enum(FileUploadStatus) - S3|HMG
     */
    reposType?: string;
    /**
     * 원본파일이름
     */
    originalFileName?: string;
    /**
     *  파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     */
    filePath?: string;
    /**
     * 파일크기
     */
    fileSize?: number;
    /**
     * 썸네일 이미지 URL
     */
    imageUrl?: string;
};

