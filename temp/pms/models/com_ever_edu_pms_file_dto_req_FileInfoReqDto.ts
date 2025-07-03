/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 파일정보목록
 */
export type com_ever_edu_pms_file_dto_req_FileInfoReqDto = {
    /**
     * 파일 업로드유형, 코드그룹(pms.file.FileUploadType) - S3_SINGLEPART|S3_MULTIPART
     */
    fileUploadType: com_ever_edu_pms_file_dto_req_FileInfoReqDto.fileUploadType;
    /**
     * 원본파일이름
     */
    originalFileName: string;
    /**
     * 서버파일이름(S3에 저장된 파일의 이름)
     */
    serverFileName: string;
    /**
     * 파일크기
     */
    fileSize?: number;
};
export namespace com_ever_edu_pms_file_dto_req_FileInfoReqDto {
    /**
     * 파일 업로드유형, 코드그룹(pms.file.FileUploadType) - S3_SINGLEPART|S3_MULTIPART
     */
    export enum fileUploadType {
        S3_SINGLEPART = 'S3_SINGLEPART',
        S3_MULTIPART = 'S3_MULTIPART',
    }
}

