/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_file_dto_req_FileGroupCopyInternalReqDto = {
    /**
     * 원본 파일그룹 UUID
     */
    srcGroupUuid: string;
    /**
     * 대상 파일그룹 UUID, 미지정 시 원본 파일그룹 속성으로 신규 그룹 생성
     */
    destGroupUuid?: string;
    /**
     * 실패 파일 발생 시 파일 및 정보 삭제 여부
     */
    failRollback: boolean;
};

