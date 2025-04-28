/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
    isUsed?: boolean | null;
    /**
     * 삭제여부
     */
    isDeleted?: boolean | null;
    /**
     * 모바일노출여부
     */
    isMobileExposed?: boolean | null;
    /**
     * PC웹노출여부
     */
    isWebExposed?: boolean | null;
    /**
     * 테넌트ID
     */
    tenantId?: number | null;
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
    isShortCutArea?: boolean | null;
    /**
     * 개인정보포함여부
     */
    isPersoninfoInclusion?: boolean | null;
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

