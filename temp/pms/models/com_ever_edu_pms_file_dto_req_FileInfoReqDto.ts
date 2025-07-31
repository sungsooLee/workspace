/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_req_FileInfoReqDto = {
    /**
     * Enum(pms.file.FileUploadType) - S3_SINGLEPART|S3_MULTIPART
     */
    fileUploadType: com_ever_edu_pms_file_dto_req_FileInfoReqDto.fileUploadType;
    originalFileName: string;
    serverFileName: string;
    fileSize?: number;
};
export namespace com_ever_edu_pms_file_dto_req_FileInfoReqDto {
    /**
     * Enum(pms.file.FileUploadType) - S3_SINGLEPART|S3_MULTIPART
     */
    export enum fileUploadType {
        S3_SINGLEPART = 'S3_SINGLEPART',
        S3_MULTIPART = 'S3_MULTIPART',
    }
}

