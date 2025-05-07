/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_res_ExcelValidationResDto } from '../models/com_ever_edu_global_excel_dto_res_ExcelValidationResDto';
import type { com_ever_edu_pms_file_dto_test_LangCodeCsvVO } from '../models/com_ever_edu_pms_file_dto_test_LangCodeCsvVO';
import type { com_ever_edu_pms_file_dto_test_LangCodeVO } from '../models/com_ever_edu_pms_file_dto_test_LangCodeVO';
import type { com_ever_edu_pms_file_dto_test_UserExcelVO } from '../models/com_ever_edu_pms_file_dto_test_UserExcelVO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoExcelFileTestTestApiService {
    /**
     * MultipartFile Excel 업로드 처리(excel_read_sample_user.xlsx)
     * MultipartFile Excel(excel_read_sample_user.xlsx) 업로드 처리 테스트
     * @param companyCode companyCode
     * @param firstColumn 헤더 시작 컬럼명
     * @param lastColumn 헤더 마지막 컬럼명
     * @param decYn 복호화 처리
     * @param formData
     * @returns com_ever_edu_pms_file_dto_test_UserExcelVO OK
     * @throws ApiError
     */
    public static excelAttachUserFileDec(
        companyCode: string,
        firstColumn: string,
        lastColumn: string,
        decYn: string,
        formData?: {
            multipartFile?: Blob;
        },
    ): CancelablePromise<Array<com_ever_edu_pms_file_dto_test_UserExcelVO>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/import/user',
            query: {
                'companyCode': companyCode,
                'firstColumn': firstColumn,
                'lastColumn': lastColumn,
                'decYn': decYn,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * MultipartFile Excel 업로드 처리(excel_read_sample_lang_code.xlsx)
     * MultipartFile Excel(excel_read_sample_lang_code.xlsx) 업로드 처리 테스트
     * @param companyCode companyCode
     * @param firstColumn 헤더 시작 컬럼명
     * @param lastColumn 헤더 마지막 컬럼명
     * @param decYn 복호화 처리
     * @param formData
     * @returns com_ever_edu_pms_file_dto_test_LangCodeVO OK
     * @throws ApiError
     */
    public static excelAttachLangCodeFileDec(
        companyCode: string,
        firstColumn: string,
        lastColumn: string,
        decYn: string,
        formData?: {
            multipartFile?: Blob;
        },
    ): CancelablePromise<Array<com_ever_edu_pms_file_dto_test_LangCodeVO>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/import/langcode',
            query: {
                'companyCode': companyCode,
                'firstColumn': firstColumn,
                'lastColumn': lastColumn,
                'decYn': decYn,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * MultipartFile Csv 업로드 처리(csv_read_lang_code_sample.csv)
     * MultipartFile Excel(csv_read_lang_code_sample.csv) 업로드 처리 테스트
     * @param companyCode companyCode
     * @param firstColumn 헤더 시작 컬럼명
     * @param lastColumn 헤더 마지막 컬럼명
     * @param decYn 복호화 처리
     * @param formData
     * @returns com_ever_edu_pms_file_dto_test_LangCodeCsvVO OK
     * @throws ApiError
     */
    public static excelAttachCsvFileDec(
        companyCode: string,
        firstColumn: string,
        lastColumn: string,
        decYn: string,
        formData?: {
            multipartFile?: Blob;
        },
    ): CancelablePromise<Array<com_ever_edu_pms_file_dto_test_LangCodeCsvVO>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/import/csv/01',
            query: {
                'companyCode': companyCode,
                'firstColumn': firstColumn,
                'lastColumn': lastColumn,
                'decYn': decYn,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Excel 생성 후 다운로드 처리(jxls_user_data.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3(public/template/sample/jxls_user_data.xlsx) 템플릿 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static excelJxlsFileExportUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/user',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Excel 생성 후 다운로드 처리(jxls_lang_code_data.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3(public/template/sample/jxls_template_lang_code.xlsx) 템플릿 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static excelJxlsFileExportlangCode(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/langcode',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Excel 생성 후 다운로드 처리(jxls_export_data_01.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3(public/template/sample/jxls_template_sample_01.xlsx) 템플릿 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static excelJxlsFileExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/01',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * S3 템플릿 파일 다운로드 요청
     * S3 템플릿 파일 다운로드 요청한다. <br><br><b>템플릿 파일명</b>: <br>- csv_read_sample_lang_code.csv <br>- excel_read_sample_lang_code.xlsx <br>- excel_read_sample_user.xlsx <br>- jxls_template_sample_01.xlsx<br>- jxls_template_lang_code.xlsx<br>- jxls_template_user.xlsx
     * @param fileName 템플릿 파일명 <br>- csv_read_sample_lang_code.csv <br>- excel_read_sample_lang_code.xlsx <br>- excel_read_sample_user.xlsx <br>- jxls_template_sample_01.xlsx <br>- jxls_template_lang_code.xlsx<br>- jxls_template_user.xlsx
     * @returns any OK
     * @throws ApiError
     */
    public static fileDownloadResponse1(
        fileName: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/s3/template/download',
            query: {
                'fileName': fileName,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * S3 excel_read_sample_user.xlsx 파일 유효성검사
     * 엑셀 유효성검사 <br>S3(public/template/sample/excel_read_sample_user.xlsx) 파일을 다운받아 엑셀 유효성검사 처리
     * @returns com_ever_edu_global_excel_dto_res_ExcelValidationResDto OK
     * @throws ApiError
     */
    public static s3ExcelUserFileValidation(): CancelablePromise<com_ever_edu_global_excel_dto_res_ExcelValidationResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/excel/validation/user',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Excel 생성 후 다운로드 처리(excel_export_user_01.xlsx)
     * Excel 생성 후 다운로드 처리 테스트
     * @returns any OK
     * @throws ApiError
     */
    public static excelUserFileExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/excel/export/javaxcel/user',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
