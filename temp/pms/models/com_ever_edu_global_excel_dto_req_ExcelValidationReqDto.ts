/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_global_excel_dto_req_ExcelValidationReqDto = {
    /**
     * S3 Key<br>S3 경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt;upload/community/board/2025/01/02/file.xlsx
     */
    s3Key: string;
    /**
     * 헤더 컬럼 시작 위치(좌 상단)
     */
    firstPos: string;
    /**
     * 헤더 컬럼 시작 위치(우 하단)
     */
    lastPos: string;
    /**
     * 유효하지 않은 행 포함 시 S3 파일 삭제 여부
     */
    isDeleteOnFailure?: boolean;
};

