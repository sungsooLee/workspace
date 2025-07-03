/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto$FileGroupReqDto } from './com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto$FileGroupReqDto';
export type com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto = {
    /**
     * 대상 파일그룹 UUID, 기존 파일 그룹 사용 시 필수
     */
    destGroupUuid?: string;
    newGroupInfo?: com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto$FileGroupReqDto;
    /**
     * 실패 파일 발생 시 파일 및 정보 삭제 여부
     */
    failRollback: boolean;
    /**
     * 복사 대상 파일 UUID 목록
     */
    fileUuids?: Array<string>;
};

