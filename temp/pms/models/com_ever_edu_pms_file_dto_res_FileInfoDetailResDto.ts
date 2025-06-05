/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_res_GroupInfoResDto } from './com_ever_edu_pms_file_dto_res_GroupInfoResDto';
export type com_ever_edu_pms_file_dto_res_FileInfoDetailResDto = {
    group?: com_ever_edu_pms_file_dto_res_GroupInfoResDto;
    /**
     * 파일 아이디
     */
    fileUuid?: string;
    /**
     * 원본파일이름
     */
    originalFileName?: string;
    /**
     * 서버파일이름(S3에 저장된 파일의 이름)
     */
    serverFileName?: string;
    /**
     * 파일크기
     */
    fileSize?: number;
    /**
     * 파일세부경로, 3Depth 경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt;upload/community/board/2025/01/02/file.ppt -&gt;/2025/01/02
     */
    detailPath?: string;
    /**
     * S3|HMG 파일전체경로<br>경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt;upload/community/board/2025/01/02/file.ppt
     */
    filePath?: string;
    /**
     * 파일유형. 코드그룹(pms.file.FileType) - IMAGE|VIDEO|DOC|TXT|WEB|ZIP|ETC
     */
    fileType?: com_ever_edu_pms_file_dto_res_FileInfoDetailResDto.fileType;
    /**
     * 업로드 상태. 코드그룹(pms.file.FileUploadStatus) - COMPLETE|ONGOING(파일 후속 처리 상태)|FAIL(파일 후속 처리 실패)
     */
    uploadStatus?: com_ever_edu_pms_file_dto_res_FileInfoDetailResDto.uploadStatus;
    /**
     * 삭제여부
     */
    deleteYn?: boolean;
    /**
     * 사용여부
     */
    useYn?: boolean;
};
export namespace com_ever_edu_pms_file_dto_res_FileInfoDetailResDto {
    /**
     * 파일유형. 코드그룹(pms.file.FileType) - IMAGE|VIDEO|DOC|TXT|WEB|ZIP|ETC
     */
    export enum fileType {
        IMAGE = 'IMAGE',
        VIDEO = 'VIDEO',
        DOC = 'DOC',
        TXT = 'TXT',
        WEB = 'WEB',
        ZIP = 'ZIP',
        ETC = 'ETC',
    }
    /**
     * 업로드 상태. 코드그룹(pms.file.FileUploadStatus) - COMPLETE|ONGOING(파일 후속 처리 상태)|FAIL(파일 후속 처리 실패)
     */
    export enum uploadStatus {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        COMPLETE = 'COMPLETE',
        ONGOING = 'ONGOING',
        FAIL = 'FAIL',
    }
}

