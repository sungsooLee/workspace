/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_space_dto_req_LearningSpaceSaveReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId: number;
    /**
     * 교육공간 유형(온/오프라인)
     */
    onOffLineType: com_ever_edu_lms_space_dto_req_LearningSpaceSaveReqDto.onOffLineType;
    /**
     * 교육공간 이름
     */
    learningSpaceName: string;
    /**
     * 교육공간 코드
     */
    learningSpaceCode: string;
    /**
     * 약도 첨부파일 UUID
     */
    mapFileGroupUuid?: string;
    /**
     * 우편번호
     */
    postalCode?: string;
    /**
     * 주소
     */
    address?: string;
    /**
     * 상세주소
     */
    addressDetail?: string;
    /**
     * 온라인 Link URL
     */
    linkUrl?: string;
    /**
     * 메모
     */
    notes?: string;
    /**
     * 사용 여부
     */
    isUsed: boolean;
};
export namespace com_ever_edu_lms_space_dto_req_LearningSpaceSaveReqDto {
    /**
     * 교육공간 유형(온/오프라인)
     */
    export enum onOffLineType {
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE',
    }
}

