/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto = {
    /**
     * 메뉴코드
     */
    menuCode?: string;
    /**
     * 메뉴명
     */
    menuName?: string;
    /**
     * 경로
     */
    path?: string | null;
    /**
     * 뎁스
     */
    depth?: number | null;
    /**
     * 정렬순서
     */
    sortOrder?: number | null;
    /**
     * 메뉴scope (FO/BO/EX)
     */
    menuScope?: com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto.menuScope;
    /**
     * 바로가기영역여부
     */
    isShortCutArea?: boolean | null;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 개인정보포함여부
     */
    isPersoninfoInclusion?: boolean | null;
    /**
     * 디바이스 노출여부 - 모바일
     */
    isMobileExposed?: boolean | null;
    /**
     * 디바이스 노출여부 - PC
     */
    isWebExposed?: boolean | null;
    /**
     * 메뉴 설명
     */
    menuDesc?: string | null;
    /**
     * 숨김 여부
     */
    isHiddenMenu?: boolean;
    /**
     * 상위메뉴번호
     */
    parentId: number | null;
    /**
     * api 리스트
     */
    apiMappingMenuList?: Array<number>;
};
export namespace com_ever_edu_pms_menu_dto_req_MenuSaveReqDto$MenuDto {
    /**
     * 메뉴scope (FO/BO/EX)
     */
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

