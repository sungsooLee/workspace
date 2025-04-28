/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_menu_dto_res_TreeBaseDto } from './com_ever_edu_pms_menu_dto_res_TreeBaseDto';
export type com_ever_edu_pms_menu_dto_res_MenuTreeDto = {
    parentId?: number;
    children?: Array<com_ever_edu_pms_menu_dto_res_TreeBaseDto>;
    menuId?: number;
    menuCode?: string;
    menuName?: string;
    path?: string;
    sortOrder?: number;
    isShortCutArea?: boolean;
    isUsed?: boolean;
    isPersoninfoInclusion?: boolean;
    isMobileExposed?: boolean;
    isWebExposed?: boolean;
    menuScope?: com_ever_edu_pms_menu_dto_res_MenuTreeDto.menuScope;
    menuStartDate?: string;
    menuEndDate?: string;
    menuDesc?: string;
    isHiddenMenu?: boolean;
    roles?: string;
};
export namespace com_ever_edu_pms_menu_dto_res_MenuTreeDto {
    export enum menuScope {
        FO = 'FO',
        BO = 'BO',
        EX = 'EX',
    }
}

