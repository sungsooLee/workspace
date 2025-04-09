/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_menu_dto_res_MenuTreeDto = {
    menuId?: number;
    menuCode?: string;
    path?: string;
    sortOrder?: number;
    quickAccessAreaYn?: boolean;
    useYn?: boolean;
    personalDataContainYn?: boolean;
    visibleMobileYn?: boolean;
    visiblePcYn?: boolean;
    menuScope?: com_ever_edu_pms_menu_dto_res_MenuTreeDto.menuScope;
    menuStartDate?: string;
    menuEndDate?: string;
    menuDesc?: string;
    hiddenYn?: boolean;
    parentId?: number;
    roles?: string;
    children?: Array<com_ever_edu_pms_menu_dto_res_MenuTreeDto>;
};
export namespace com_ever_edu_pms_menu_dto_res_MenuTreeDto {
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

