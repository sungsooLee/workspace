/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_res_FileGroupInfoResDto } from './com_ever_edu_pms_file_dto_res_FileGroupInfoResDto';
export type com_ever_edu_pms_file_dto_res_FileInfoDetailResDto = {
    group?: com_ever_edu_pms_file_dto_res_FileGroupInfoResDto;
    /**
     * 파일 아이디
     */
    fileId?: number;
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
     * S3세부경로, S3경로에서 3Depth 경로<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)<br> Ex&gt;upload/community/board/2025/01/02/file.ppt -&gt;/2025/01/02
     */
    s3DetailPath?: string;
    /**
     * 파일유형, IMAGE|VIDEO|DOC|TXT|WEB|ZIP|ETC
     */
    fileType?: string;
    /**
     * 업로드 상태. COMPLETE|ONGOING(파일 후속 처리가 필요한 상태)|FAIL(파일 후속 처리 실패, 사용여부 false)
     */
    uploadStatus?: string;
    /**
     * 삭제여부
     */
    deleteYn?: boolean;
    /**
     * 사용여부
     */
    useYn?: boolean;
};

