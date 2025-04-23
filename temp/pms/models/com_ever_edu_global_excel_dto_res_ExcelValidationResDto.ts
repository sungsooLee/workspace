/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_global_excel_dto_res_ExcelValidationResDto = {
    /**
     * 유효성 검사 결과
     */
    result?: boolean;
    /**
     * 엑셀 데이터 전체 row 수
     */
    totalRows?: number;
    /**
     * 실패 Row 번호 목록, 헤더 정의 다음 Index ~
     */
    faultRows?: Array<number>;
};

