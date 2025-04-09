/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_common_cd_dto_req_CommonCdSaveReqDto = {
    /**
     * 코드그룹번호
     */
    cdGroupNo: string;
    /**
     * 코드번호
     */
    cdNo: string;
    /**
     * 코드명
     */
    cdName: string;
    /**
     * 코드순서
     */
    cdSeq: number;
    /**
     * 코드내용
     */
    cdContent: string;
    /**
     * 적용일시
     */
    applyDatetime: string;
    /**
     * 유효여부
     */
    validityYn: boolean;
    /**
     * 참고값1
     */
    referenceVal1?: string | null;
    /**
     * 참고값2
     */
    referenceVal2?: string | null;
    /**
     * 참고값3
     */
    referenceVal3?: string | null;
    /**
     * 참고값4
     */
    referenceVal4?: string | null;
    /**
     * 참고값5
     */
    referenceVal5?: string | null;
    /**
     * 다국어코드
     */
    multilingulCd: string;
    /**
     * 사용여부
     */
    useYn?: boolean | null;
    /**
     * 삭제여부
     */
    deleteYn?: boolean | null;
};

