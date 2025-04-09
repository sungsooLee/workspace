/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 파일 그룹 정보
 */
export type com_ever_edu_pms_file_dto_res_FileGroupInfoResDto = {
    /**
     * 파일그룹 아이디
     */
    groupId?: number;
    /**
     * 업로드유형, ATTATCH|CONTENTS
     */
    uploadType?: string;
    /**
     * 업무분류유형, LMS|PMS|CMS
     */
    affairsType?: string;
    /**
     * 기본경로. 1-2Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt; upload/community/board/2025/01/02/file.ppt -&gt; upload/community/board
     */
    s3BasePath?: string;
    /**
     * 언어코드
     */
    languageCode?: string;
    /**
     * 삭제여부
     */
    deleteYn?: boolean;
    /**
     * 사용여부
     */
    useYn?: boolean;
};

