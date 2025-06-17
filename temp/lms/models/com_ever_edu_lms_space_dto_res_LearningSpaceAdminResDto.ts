/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_xternal_tenant_dto_res_TenantResDto } from './com_ever_edu_xternal_tenant_dto_res_TenantResDto';
export type com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto = {
    /**
     * 교육공간을 사용하는 테넌트 목록
     */
    tenants?: Array<com_ever_edu_xternal_tenant_dto_res_TenantResDto>;
    /**
     * 교육공간 UUID
     */
    learningSpaceUuid?: string;
    /**
     * 교육공간 이름
     */
    learningSpaceName?: string;
    /**
     * 온/오프라인 구분
     */
    onOffLineType?: com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto.onOffLineType;
    /**
     * 교육공간 코드
     */
    learningSpaceCode?: string;
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
     * 강의장 연계 가능 여부
     */
    isLectureHallCoordinated?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_lms_space_dto_res_LearningSpaceAdminResDto {
    /**
     * 온/오프라인 구분
     */
    export enum onOffLineType {
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE',
    }
}

