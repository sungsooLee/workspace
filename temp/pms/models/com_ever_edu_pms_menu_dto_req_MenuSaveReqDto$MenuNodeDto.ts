/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 테넌트메뉴
 */
export type com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuNodeDto = {
    /**
     * 메뉴ID
     */
    menuId?: number | null;
    /**
     * 메뉴명
     */
    menuName?: string | null;
    /**
     * 메뉴URL파라메터
     */
    menuUrlParam?: string | null;
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
     * 개인정보포함여부
     */
    isPersoninfoInclusion?: boolean | null;
    /**
     * 히든메뉴여부
     */
    isHiddenMenu?: boolean | null;
    /**
     * 메뉴설명내용
     */
    menuDesc?: string | null;
    /**
     * 메뉴scope (FO/BO/EX)
     */
    menuScope?: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuNodeDto.menuScope | null;
    /**
     * children
     */
    children?: Array<com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuNodeDto> | null;
};
export namespace com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuNodeDto {
    /**
     * 메뉴scope (FO/BO/EX)
     */
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

