/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto = {
    /**
     * 테넌트 이름
     */
    tenantName?: string;
    /**
     * 온/오프라인 타입
     */
    onOffLineType?: com_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto.onOffLineType;
    /**
     * 교육공간 UUID
     */
    learningSpaceId?: number;
    /**
     * 교육공간 이름
     */
    learningSpaceName?: string;
    /**
     * 온라인: URL, 오프라인: 주소
     */
    addressUrl?: string;
    /**
     * 미리보기(약도 또는 Link URL)
     */
    preview?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_lms_space_dto_res_LearningSpaceListAdminResDto {
    /**
     * 온/오프라인 타입
     */
    export enum onOffLineType {
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE',
    }
}

