/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_ThumbnailFileResDto = {
    /**
     * 파일그룹 UUID
     */
    groupUuid?: string;
    /**
     * 파일 UUID
     */
    fileUuid?: string;
    /**
     * 원본파일이름
     */
    fileName?: string;
    /**
     * 파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt
     */
    imageUrl?: string;
};

