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
     * 메뉴scope (FO/BO/EX)
     */
    menuScope?: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$TenantMenuDto.menuScope | null;
    /**
     * 부모메뉴ID
     */
    parentMenuId?: number | null;
    /**
     * 부모맵핑메뉴ID
     */
    parentTenantMappingMenuId?: number | null;
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

