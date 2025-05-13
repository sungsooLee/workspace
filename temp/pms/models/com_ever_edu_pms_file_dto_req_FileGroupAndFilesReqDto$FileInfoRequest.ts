/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 파일정보목록
 */
export type com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto$FileInfoRequest = {
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

