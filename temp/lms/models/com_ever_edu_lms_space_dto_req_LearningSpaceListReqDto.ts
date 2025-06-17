/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_space_dto_req_LearningSpaceListReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 온/오프라인 구분
     */
    onOffLineType?: com_ever_edu_lms_space_dto_req_LearningSpaceListReqDto.onOffLineType;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 교육공간 이름
     */
    learningSpaceName?: string;
};
export namespace com_ever_edu_lms_space_dto_req_LearningSpaceListReqDto {
    /**
     * 온/오프라인 구분
     */
    export enum onOffLineType {
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE',
    }
}

