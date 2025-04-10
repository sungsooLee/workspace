/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto } from './com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto';
export type com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto = {
    /**
     * 메뉴ID
     */
    menuId?: number | null;
    /**
     * 정렬순서
     */
    sortOrder?: number | null;
    /**
     * 사용여부
     */
    useYn?: boolean | null;
    /**
     * 삭제여부
     */
    deleteYn?: boolean | null;
    /**
     * 테넌트ID
     */
    tenantNo?: number | null;
    /**
     * 메뉴CODE
     */
    menuCode?: string | null;
    /**
     * 경로
     */
    path?: string | null;
    /**
     * 뎁스
     */
    depth?: number | null;
    /**
     * 바로가기영역여부
     */
    quickAccessAreaYn?: boolean | null;
    /**
     * 개인정보포함여부
     */
    personalDataContainYn?: boolean | null;
    /**
     * 메뉴scope (FO/BO/EX)
     */
    menuScope?: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto.menuScope | null;
    /**
     * 메뉴 노출 시작일
     */
    menuStartDate?: string | null;
    /**
     * 메뉴 노출 종료일
     */
    menuEndDate?: string | null;
    /**
     * 부모ID
     */
    parentId?: number | null;
    /**
     * 번역 리스트
     */
    translations: Array<com_ever_edu_pms_multilingual_dto_req_MultilingualSaveReqDto$TranslationDto>;
};
export namespace com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto {
    /**
     * 메뉴scope (FO/BO/EX)
     */
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

