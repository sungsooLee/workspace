/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 특화 폼 json
 */
export type com_ever_edu_pms_form_dto_FormJsonDto = {
    /**
     * 필드명
     */
    name?: string;
    /**
     * slug
     */
    slug?: string;
    /**
     * 필드 타입
     */
    type?: com_ever_edu_pms_form_dto_FormJsonDto.type;
    /**
     * 필수 입력 여부
     */
    isRequired?: boolean;
    /**
     * 커스텀 값
     */
    values?: Array<Record<string, Record<string, any>>>;
    /**
     * description
     */
    description?: string;
};
export namespace com_ever_edu_pms_form_dto_FormJsonDto {
    /**
     * 필드 타입
     */
    export enum type {
        TEXT = 'TEXT',
        SELECT = 'SELECT',
    }
}

