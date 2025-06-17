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
     * 엑셀 실패 데이터 인 번호(1 base) 목록
     */
    faultRows?: Array<number>;
    /**
     * 엑셀 데이터 리스트, result = true인 경우
     */
    dataList?: Array<Record<string, any>>;
};

