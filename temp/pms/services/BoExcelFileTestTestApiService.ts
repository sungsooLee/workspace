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
     * excel_read_sample_user.xlsx 파일 유효성검사
     * 엑셀 유효성검사 <br>엑셀 파일(을 멀티파트 업로드하여 유효성검사 처리<br>S3 upload/template/sample/excel_read_sample_user.xlsx 파일을 다운로드 받은 후 후 멀티파트 업로드 테스트하세요.
     * @param formData
     * @returns com_ever_edu_global_excel_dto_res_ExcelValidationResDto OK
     * @throws ApiError
     */
    public static multipartExcelUserFileValidation(
        formData?: {
            multipartFile?: Blob;
        },
    ): CancelablePromise<com_ever_edu_global_excel_dto_res_ExcelValidationResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/validation/excel/user',
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
    public static excelImportUserFileDec(
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
    public static excelImportLangCodeFileDec(
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
    public static excelImportCsvFileDec(
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
     * Excel 생성 후 다운로드 처리(PMS_엑셀다운로드테스트_사용자데이터_POI_EXPORT_DATA.xlsx)
     * Excel 생성 후 다운로드 처리 테스트
     * @returns any OK
     * @throws ApiError
     */
    public static poiExcelFileExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/poi/user',
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
     * Excel 생성 후 다운로드 처리(PMS_엑셀다운로드테스트_사용자데이터_EXPORT_DATA.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3 템플릿(public/template/sample/PMS_엑셀다운로드테스트_사용자데이터_EXPORT_템플릿.xlsx) 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static jxlsExcelFileExportUser(): CancelablePromise<any> {
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
     * Excel 생성 후 다운로드 처리(PMS_엑셀다운로드테스트_타이틀_사용자데이터_EXPORT_DATA.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3 템플릿(public/template/sample/PMS_엑셀다운로드테스트_타이틀_사용자데이터_EXPORT_템플릿.xlsx) 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static jxlsExcelFileExportTitleUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/title_user',
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
     * Excel 생성 후 다운로드 처리(PMS_엑셀다운로드테스트_테스트데이터01_EXPORT_DATA.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3 템플릿(public/template/sample/PMS_엑셀다운로드테스트_테스트데이터01_EXPORT_템플릿.xlsx) 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static jxlsExcelFileExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/sample01',
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
     * Excel 생성 후 다운로드 처리(PMS_엑셀다운로드테스트_다중쉬트_EXPORT_DATA.xlsx
     * Excel 생성 후 다운로드 처리 테스트 <br>S3 템플릿(public/template/sample/PMS_엑셀다운로드테스트_다중쉬트_EXPORT_템플릿.xlsx) 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static jxlsExcelMultiSheetFileExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/multisheet',
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
     * Excel 생성 후 다운로드 처리(PMS_엑셀다운로드테스트_다국어코드_EXPORT_DATA.xlsx)
     * Excel 생성 후 다운로드 처리 테스트 <br>S3 템플릿(public/template/sample/PMS_엑셀다운로드테스트_다국어코드_EXPORT_템플릿.xlsx) 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static jxlsExcelFileExportLangCode(): CancelablePromise<any> {
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
     * Excel 생성 후 다운로드 처리(CMS_전체학습자원_EXPORT_DATA.xlsx
     * Excel 생성 후 다운로드 처리 테스트 <br>S3 템플릿(public/template/excel/CMS_전체학습자원_EXPORT_템플릿.xlsx) 파일을 다운받아 데이터 매핑 후 다운로드 처리
     * @returns any OK
     * @throws ApiError
     */
    public static jxlsExcelFileExportContents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/export/jxls/contents',
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
}
