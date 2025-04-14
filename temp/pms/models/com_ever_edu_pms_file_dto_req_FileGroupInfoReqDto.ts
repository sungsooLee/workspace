/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto = {
    /**
     * 업로드유형, ATTATCH|CONTENTS
     */
    uploadType: string;
    /**
     * 업무분류유형, LMS|PMS|CMS
     */
    affairsType: string;
    /**
     * 저정소유형코드, S3|HMG
     */
    reposType: string;
    /**
     * 기본경로. 1-2Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt -&gt; upload/community/board
     */
    basicPath: string;
    /**
     * 언어코드
     */
    languageCode: string;
};

