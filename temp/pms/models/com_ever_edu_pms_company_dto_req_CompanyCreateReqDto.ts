/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto } from './com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto';
export type com_ever_edu_pms_company_dto_req_CompanyCreateReqDto = {
    /**
     * 회사코드
     */
    companyCode: string;
    /**
     * 회사유형코드
     */
    companyType: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.companyType;
    /**
     * 회사명
     */
    name: string;
    /**
     * 회사영문명
     */
    engName: string;
    /**
     * 사업자등록번호
     */
    brn?: string;
    /**
     * 회사명 약어
     */
    abbreviationName: string;
    /**
     * 대표자명
     */
    rpsntrName: string;
    /**
     * 대표전화번호 국가번호
     */
    companyTelNoCountryCode?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.companyTelNoCountryCode;
    /**
     * 대표전화번호
     */
    companyTelNo?: string;
    /**
     * 대표FAX번호 국가번호
     */
    companyFaxNoCountryCode?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.companyFaxNoCountryCode;
    /**
     * 대표FAX번호
     */
    companyFaxNo?: string;
    /**
     * 대표이메일
     */
    companyEmail?: string;
    /**
     * 기본주소
     */
    basicAddress?: string;
    /**
     * 상세주소
     */
    detailAddress?: string;
    /**
     * 우편번호
     */
    postNo?: string;
    /**
     * 인사 데이터 수동 관리 여부
     */
    isUseEditableHrInfo?: boolean;
    /**
     * 회원 가입 유형
     */
    companyMemberJoinType?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.companyMemberJoinType;
    /**
     * 연동시스템 사용여부
     */
    isUseLinkageSystem?: boolean;
    /**
     * 연동시스템 유형
     */
    linkageType?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.linkageType;
    /**
     * 연동시스템
     */
    linkageSystem?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.linkageSystem;
    /**
     * 서비스 타입
     */
    serviceType: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.serviceType;
    /**
     * 비용결제용 법인코드
     */
    paymentCompanyCode?: string;
    /**
     * SSO 사용여부
     */
    isUseSso?: boolean;
    /**
     * SSO 로그인 유형
     */
    ssoType?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.ssoType;
    /**
     * 비밀번호 인증 유형
     */
    passwordAuthType?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.passwordAuthType;
    /**
     * 비밀번호 인증유형 리스트
     */
    passwordAuthTypeList?: Array<'PLATFORM' | 'HMG_SSO' | 'AUTOWAY'>;
    /**
     * 2차 인증 사용여부
     */
    isUseTwoFactorAuth?: boolean;
    /**
     * 2차 인증 유형 유형
     */
    twoFactorAuthType?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.twoFactorAuthType;
    /**
     * 휴대폰 본인인증 사용
     */
    isUsePhoneAuth?: boolean;
    /**
     * 로그인 제한 시간 설정
     */
    isUseLoginLimitTime?: boolean;
    /**
     * 워터마크 사용여부
     */
    isUseWatermark?: boolean;
    /**
     * 워터마크 문구
     */
    watermarkText?: string;
    /**
     * 워터마크 위치
     */
    watermarkPosition?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.watermarkPosition;
    /**
     * 플레이어 재생바 제어 제한 사용여부
     */
    isUsePlayerControlLimit?: boolean;
    /**
     * 이러닝 집중 모드 사용여부
     */
    isUseFocusMode?: boolean;
    /**
     * 학습창 캡처 방지 사용여부
     */
    isUseCaptureBlock?: boolean;
    /**
     * 결재 사용여부
     */
    isUseApproval?: boolean;
    /**
     * 과정 수강 신청 결재라인
     */
    enrollApprovalMatrix?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.enrollApprovalMatrix;
    /**
     * 채널 신청 결재라인
     */
    channelApprovalMatrix?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.channelApprovalMatrix;
    /**
     * 사외과정 지원 신청 절차
     */
    externalEnrollApplicationProcess?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.externalEnrollApplicationProcess;
    /**
     * 사외과정 신청 결재라인
     */
    externalEnrollApprovalMatrix?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.externalEnrollApprovalMatrix;
    /**
     * 자격증 이력 결재라인
     */
    certificationApprovalMatrix?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.certificationApprovalMatrix;
    /**
     * 자격증 응시료 지원신청 사용여부
     */
    isUseExamFeeSupport?: boolean;
    /**
     * 자격증 응시료 지원 신청 절차
     */
    examFeeApplicationProcess?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.examFeeApplicationProcess;
    /**
     * 어학 이력 결재라인
     */
    languageApprovalMatrix?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.languageApprovalMatrix;
    /**
     * 수강신청 결재라인 사용
     */
    isUseApprovalCourseApplication?: boolean;
    /**
     * 학습시간 제한
     */
    isUseStudyTimeLimit?: boolean;
    /**
     * 1일 진도 제한
     */
    isUseDailyStudyLimit?: boolean;
    /**
     * 진도 초기화
     */
    isUseResetStudyInfo?: boolean;
    /**
     * 교재 사용
     */
    isUseTextbook?: boolean;
    /**
     * 1인당 교육비 사용
     */
    isUseTrainingCostPerPerson?: boolean;
    /**
     * 고용보험 환급 사용
     */
    isUseEmploymentInsuranceRefund?: boolean;
    /**
     * 수료증 제공 여부
     */
    isProvideCertificate?: boolean;
    /**
     * 학습 포인트(마일리지) 사용
     */
    isUseLearningPoint?: boolean;
    /**
     * 사전 레벨 테스트 사용
     */
    isUsePreLevelTest?: boolean;
    /**
     * 과정 플래그 사용
     */
    isUseCourseFlag?: boolean;
    /**
     * 회사 전체 정보 사용 설정
     */
    isUseCompanyInfo?: boolean;
    /**
     * 데이터 소스(데이터 원천)
     */
    hrDataSource?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.hrDataSource;
    /**
     * 담당부서
     */
    managerDept?: string;
    /**
     * 담당자 직위/직책
     */
    managerPosition?: string;
    /**
     * 담당자 이름
     */
    managerName?: string;
    /**
     * 회사담당자전화번호 국가번호
     */
    managerPhoneCountryCode?: com_ever_edu_pms_company_dto_req_CompanyCreateReqDto.managerPhoneCountryCode;
    /**
     * 담당자 전화번호
     */
    managerPhone?: string;
    /**
     * 담당자 이메일
     */
    managerEmail?: string;
    /**
     * 회사로그인제한정보
     */
    companyLoginRestrictionList?: Array<com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto>;
};
export namespace com_ever_edu_pms_company_dto_req_CompanyCreateReqDto {
    /**
     * 회사유형코드
     */
    export enum companyType {
        CAR = 'CAR',
        GROUP = 'GROUP',
        HYUNDAI_GLOBAL = 'HYUNDAI_GLOBAL',
        HYUNDAI_GLOBAL_DEALER = 'HYUNDAI_GLOBAL_DEALER',
        HYUNDAI_SALES = 'HYUNDAI_SALES',
        HYUNDAI_SERVICE = 'HYUNDAI_SERVICE',
        HYUNDAI_PRODUCTION = 'HYUNDAI_PRODUCTION',
        KIA_GLOBAL = 'KIA_GLOBAL',
        KIA_GLOBAL_DEALER = 'KIA_GLOBAL_DEALER',
        KIA_SALES = 'KIA_SALES',
        KIA_SERVICE = 'KIA_SERVICE',
        KIA_PRODUCTION = 'KIA_PRODUCTION',
        CP = 'CP',
        ETC = 'ETC',
    }
    /**
     * 대표전화번호 국가번호
     */
    export enum companyTelNoCountryCode {
        KOR_82 = 'KOR_82',
        AFG_93 = 'AFG_93',
        ALB_355 = 'ALB_355',
        DZA_213 = 'DZA_213',
        ASM_1_684 = 'ASM_1_684',
        AND_376 = 'AND_376',
        AGO_244 = 'AGO_244',
        AIA_1_264 = 'AIA_1_264',
        ATA_672 = 'ATA_672',
        ATA_64 = 'ATA_64',
        ATG_1_268 = 'ATG_1_268',
        ARG_54 = 'ARG_54',
        ARM_374 = 'ARM_374',
        ABW_297 = 'ABW_297',
        ASC_247 = 'ASC_247',
        AUS_61 = 'AUS_61',
        AUT_43 = 'AUT_43',
        AZE_994 = 'AZE_994',
        BHS_1_242 = 'BHS_1_242',
        BHR_973 = 'BHR_973',
        BGD_880 = 'BGD_880',
        BRB_1_246 = 'BRB_1_246',
        BLR_375 = 'BLR_375',
        BEL_32 = 'BEL_32',
        BLZ_501 = 'BLZ_501',
        BEN_229 = 'BEN_229',
        BMU_1_441 = 'BMU_1_441',
        BTN_975 = 'BTN_975',
        BOL_591 = 'BOL_591',
        BIH_387 = 'BIH_387',
        BWA_267 = 'BWA_267',
        BRA_55 = 'BRA_55',
        VGB_1_284 = 'VGB_1_284',
        BRN_673 = 'BRN_673',
        BGR_359 = 'BGR_359',
        BFA_226 = 'BFA_226',
        MMR_95 = 'MMR_95',
        BDI_257 = 'BDI_257',
        KHM_855 = 'KHM_855',
        CMR_237 = 'CMR_237',
        CAN_1 = 'CAN_1',
        CPV_238 = 'CPV_238',
        CYM_1_345 = 'CYM_1_345',
        CAF_236 = 'CAF_236',
        TCD_235 = 'TCD_235',
        CHL_56 = 'CHL_56',
        CHN_86 = 'CHN_86',
        CXR_61 = 'CXR_61',
        CCK_61 = 'CCK_61',
        COL_57 = 'COL_57',
        COM_269 = 'COM_269',
        COK_682 = 'COK_682',
        CRC_506 = 'CRC_506',
        HRV_385 = 'HRV_385',
        CUB_53 = 'CUB_53',
        CYP_357 = 'CYP_357',
        CZE_420 = 'CZE_420',
        COD_243 = 'COD_243',
        DNK_45 = 'DNK_45',
        DGA_246 = 'DGA_246',
        DJI_253 = 'DJI_253',
        DMA_1_767 = 'DMA_1_767',
        DOM_1_849 = 'DOM_1_849',
        DOM_1_829 = 'DOM_1_829',
        DOM_1_809 = 'DOM_1_809',
        ECU_593 = 'ECU_593',
        EGY_20 = 'EGY_20',
        SLV_503 = 'SLV_503',
        GNQ_240 = 'GNQ_240',
        ERI_291 = 'ERI_291',
        EST_372 = 'EST_372',
        ETH_251 = 'ETH_251',
        FLK_500 = 'FLK_500',
        FRO_298 = 'FRO_298',
        FJI_679 = 'FJI_679',
        FIN_358 = 'FIN_358',
        FRA_33 = 'FRA_33',
        GUF_594 = 'GUF_594',
        PYF_689 = 'PYF_689',
        GAB_241 = 'GAB_241',
        GMB_220 = 'GMB_220',
        GEO_995 = 'GEO_995',
        DEU_49 = 'DEU_49',
        GHA_233 = 'GHA_233',
        GIB_350 = 'GIB_350',
        GRC_30 = 'GRC_30',
        GRL_299 = 'GRL_299',
        GRD_1_473 = 'GRD_1_473',
        GLP_590 = 'GLP_590',
        GUM_1_671 = 'GUM_1_671',
        GTM_502 = 'GTM_502',
        GIN_224 = 'GIN_224',
        GNB_245 = 'GNB_245',
        GUY_592 = 'GUY_592',
        HTI_509 = 'HTI_509',
        VAT_39 = 'VAT_39',
        HND_504 = 'HND_504',
        HKG_852 = 'HKG_852',
        HUN_36 = 'HUN_36',
        IS_354 = 'IS_354',
        IND_91 = 'IND_91',
        IDN_62 = 'IDN_62',
        IRN_98 = 'IRN_98',
        IRQ_964 = 'IRQ_964',
        IRL_353 = 'IRL_353',
        IMN_44 = 'IMN_44',
        ISR_972 = 'ISR_972',
        ITA_39 = 'ITA_39',
        CIV_225 = 'CIV_225',
        JAM_1_876 = 'JAM_1_876',
        JPN_81 = 'JPN_81',
        JEY_44 = 'JEY_44',
        JOR_962 = 'JOR_962',
        KAZ_7 = 'KAZ_7',
        KEN_254 = 'KEN_254',
        KIR_686 = 'KIR_686',
        KWT_965 = 'KWT_965',
        KGZ_996 = 'KGZ_996',
        LAO_856 = 'LAO_856',
        LVA_371 = 'LVA_371',
        LBN_961 = 'LBN_961',
        LSO_266 = 'LSO_266',
        LBR_231 = 'LBR_231',
        LBY_218 = 'LBY_218',
        LIE_423 = 'LIE_423',
        LTU_370 = 'LTU_370',
        LUX_352 = 'LUX_352',
        MAC_853 = 'MAC_853',
        MKD_389 = 'MKD_389',
        MDG_261 = 'MDG_261',
        MWI_265 = 'MWI_265',
        MYS_60 = 'MYS_60',
        MDV_960 = 'MDV_960',
        MLI_223 = 'MLI_223',
        MLT_356 = 'MLT_356',
        MHL_692 = 'MHL_692',
        MTQ_596 = 'MTQ_596',
        MRT_222 = 'MRT_222',
        MUS_230 = 'MUS_230',
        MYT_262 = 'MYT_262',
        MEX_52 = 'MEX_52',
        FSM_691 = 'FSM_691',
        MDA_373 = 'MDA_373',
        MCO_377 = 'MCO_377',
        MNG_976 = 'MNG_976',
        MNE_382 = 'MNE_382',
        MSR_1_664 = 'MSR_1_664',
        MAR_212 = 'MAR_212',
        MOZ_258 = 'MOZ_258',
        NAM_264 = 'NAM_264',
        NRU_674 = 'NRU_674',
        NPL_977 = 'NPL_977',
        NLD_31 = 'NLD_31',
        ANT_599 = 'ANT_599',
        NCL_687 = 'NCL_687',
        NZL_64 = 'NZL_64',
        NIC_505 = 'NIC_505',
        NER_227 = 'NER_227',
        NGA_234 = 'NGA_234',
        NIU_683 = 'NIU_683',
        NFK_672 = 'NFK_672',
        PRK_850 = 'PRK_850',
        MNP_1_670 = 'MNP_1_670',
        NOR_47 = 'NOR_47',
        OMN_968 = 'OMN_968',
        PAK_92 = 'PAK_92',
        PLW_680 = 'PLW_680',
        PSE_970 = 'PSE_970',
        PAN_507 = 'PAN_507',
        PNG_675 = 'PNG_675',
        PRY_595 = 'PRY_595',
        PER_51 = 'PER_51',
        PHL_63 = 'PHL_63',
        PCN_870 = 'PCN_870',
        POL_48 = 'POL_48',
        PRT_351 = 'PRT_351',
        PRI_1_939 = 'PRI_1_939',
        PRI_1_787 = 'PRI_1_787',
        QAT_974 = 'QAT_974',
        COG_242 = 'COG_242',
        REU_262 = 'REU_262',
        ROU_40 = 'ROU_40',
        RUS_7 = 'RUS_7',
        RWA_250 = 'RWA_250',
        BLM_590 = 'BLM_590',
        SHN_290 = 'SHN_290',
        KNA_1_869 = 'KNA_1_869',
        LCA_1_758 = 'LCA_1_758',
        MAF_590 = 'MAF_590',
        SPM_508 = 'SPM_508',
        VCT_1_784 = 'VCT_1_784',
        WSM_685 = 'WSM_685',
        SMR_378 = 'SMR_378',
        STP_239 = 'STP_239',
        SAU_966 = 'SAU_966',
        SEN_221 = 'SEN_221',
        SRB_381 = 'SRB_381',
        SYC_248 = 'SYC_248',
        SLE_232 = 'SLE_232',
        SGP_65 = 'SGP_65',
        SXM_1_721 = 'SXM_1_721',
        SVK_421 = 'SVK_421',
        SVN_386 = 'SVN_386',
        SLB_677 = 'SLB_677',
        SOM_252 = 'SOM_252',
        ZAF_27 = 'ZAF_27',
        SSD_211 = 'SSD_211',
        ESP_34 = 'ESP_34',
        LKA_94 = 'LKA_94',
        SDN_249 = 'SDN_249',
        SUR_597 = 'SUR_597',
        SJM_47 = 'SJM_47',
        SWZ_268 = 'SWZ_268',
        SWE_46 = 'SWE_46',
        CHE_41 = 'CHE_41',
        SYR_963 = 'SYR_963',
        TWN_886 = 'TWN_886',
        TJK_992 = 'TJK_992',
        TZA_255 = 'TZA_255',
        THA_66 = 'THA_66',
        TLS_670 = 'TLS_670',
        TGO_228 = 'TGO_228',
        TKL_690 = 'TKL_690',
        TON_676 = 'TON_676',
        TTO_1_868 = 'TTO_1_868',
        TUN_216 = 'TUN_216',
        TUR_90 = 'TUR_90',
        TKM_993 = 'TKM_993',
        TCA_1_649 = 'TCA_1_649',
        TUV_688 = 'TUV_688',
        UGA_256 = 'UGA_256',
        UKR_380 = 'UKR_380',
        ARE_971 = 'ARE_971',
        GBR_44 = 'GBR_44',
        USA_1 = 'USA_1',
        URY_598 = 'URY_598',
        VIR_1_340 = 'VIR_1_340',
        UZB_998 = 'UZB_998',
        VUT_678 = 'VUT_678',
        VEN_58 = 'VEN_58',
        VNM_84 = 'VNM_84',
        WLF_681 = 'WLF_681',
        ESH_212 = 'ESH_212',
        YEM_967 = 'YEM_967',
        ZMB_260 = 'ZMB_260',
        ZWE_263 = 'ZWE_263',
    }
    /**
     * 대표FAX번호 국가번호
     */
    export enum companyFaxNoCountryCode {
        KOR_82 = 'KOR_82',
        AFG_93 = 'AFG_93',
        ALB_355 = 'ALB_355',
        DZA_213 = 'DZA_213',
        ASM_1_684 = 'ASM_1_684',
        AND_376 = 'AND_376',
        AGO_244 = 'AGO_244',
        AIA_1_264 = 'AIA_1_264',
        ATA_672 = 'ATA_672',
        ATA_64 = 'ATA_64',
        ATG_1_268 = 'ATG_1_268',
        ARG_54 = 'ARG_54',
        ARM_374 = 'ARM_374',
        ABW_297 = 'ABW_297',
        ASC_247 = 'ASC_247',
        AUS_61 = 'AUS_61',
        AUT_43 = 'AUT_43',
        AZE_994 = 'AZE_994',
        BHS_1_242 = 'BHS_1_242',
        BHR_973 = 'BHR_973',
        BGD_880 = 'BGD_880',
        BRB_1_246 = 'BRB_1_246',
        BLR_375 = 'BLR_375',
        BEL_32 = 'BEL_32',
        BLZ_501 = 'BLZ_501',
        BEN_229 = 'BEN_229',
        BMU_1_441 = 'BMU_1_441',
        BTN_975 = 'BTN_975',
        BOL_591 = 'BOL_591',
        BIH_387 = 'BIH_387',
        BWA_267 = 'BWA_267',
        BRA_55 = 'BRA_55',
        VGB_1_284 = 'VGB_1_284',
        BRN_673 = 'BRN_673',
        BGR_359 = 'BGR_359',
        BFA_226 = 'BFA_226',
        MMR_95 = 'MMR_95',
        BDI_257 = 'BDI_257',
        KHM_855 = 'KHM_855',
        CMR_237 = 'CMR_237',
        CAN_1 = 'CAN_1',
        CPV_238 = 'CPV_238',
        CYM_1_345 = 'CYM_1_345',
        CAF_236 = 'CAF_236',
        TCD_235 = 'TCD_235',
        CHL_56 = 'CHL_56',
        CHN_86 = 'CHN_86',
        CXR_61 = 'CXR_61',
        CCK_61 = 'CCK_61',
        COL_57 = 'COL_57',
        COM_269 = 'COM_269',
        COK_682 = 'COK_682',
        CRC_506 = 'CRC_506',
        HRV_385 = 'HRV_385',
        CUB_53 = 'CUB_53',
        CYP_357 = 'CYP_357',
        CZE_420 = 'CZE_420',
        COD_243 = 'COD_243',
        DNK_45 = 'DNK_45',
        DGA_246 = 'DGA_246',
        DJI_253 = 'DJI_253',
        DMA_1_767 = 'DMA_1_767',
        DOM_1_849 = 'DOM_1_849',
        DOM_1_829 = 'DOM_1_829',
        DOM_1_809 = 'DOM_1_809',
        ECU_593 = 'ECU_593',
        EGY_20 = 'EGY_20',
        SLV_503 = 'SLV_503',
        GNQ_240 = 'GNQ_240',
        ERI_291 = 'ERI_291',
        EST_372 = 'EST_372',
        ETH_251 = 'ETH_251',
        FLK_500 = 'FLK_500',
        FRO_298 = 'FRO_298',
        FJI_679 = 'FJI_679',
        FIN_358 = 'FIN_358',
        FRA_33 = 'FRA_33',
        GUF_594 = 'GUF_594',
        PYF_689 = 'PYF_689',
        GAB_241 = 'GAB_241',
        GMB_220 = 'GMB_220',
        GEO_995 = 'GEO_995',
        DEU_49 = 'DEU_49',
        GHA_233 = 'GHA_233',
        GIB_350 = 'GIB_350',
        GRC_30 = 'GRC_30',
        GRL_299 = 'GRL_299',
        GRD_1_473 = 'GRD_1_473',
        GLP_590 = 'GLP_590',
        GUM_1_671 = 'GUM_1_671',
        GTM_502 = 'GTM_502',
        GIN_224 = 'GIN_224',
        GNB_245 = 'GNB_245',
        GUY_592 = 'GUY_592',
        HTI_509 = 'HTI_509',
        VAT_39 = 'VAT_39',
        HND_504 = 'HND_504',
        HKG_852 = 'HKG_852',
        HUN_36 = 'HUN_36',
        IS_354 = 'IS_354',
        IND_91 = 'IND_91',
        IDN_62 = 'IDN_62',
        IRN_98 = 'IRN_98',
        IRQ_964 = 'IRQ_964',
        IRL_353 = 'IRL_353',
        IMN_44 = 'IMN_44',
        ISR_972 = 'ISR_972',
        ITA_39 = 'ITA_39',
        CIV_225 = 'CIV_225',
        JAM_1_876 = 'JAM_1_876',
        JPN_81 = 'JPN_81',
        JEY_44 = 'JEY_44',
        JOR_962 = 'JOR_962',
        KAZ_7 = 'KAZ_7',
        KEN_254 = 'KEN_254',
        KIR_686 = 'KIR_686',
        KWT_965 = 'KWT_965',
        KGZ_996 = 'KGZ_996',
        LAO_856 = 'LAO_856',
        LVA_371 = 'LVA_371',
        LBN_961 = 'LBN_961',
        LSO_266 = 'LSO_266',
        LBR_231 = 'LBR_231',
        LBY_218 = 'LBY_218',
        LIE_423 = 'LIE_423',
        LTU_370 = 'LTU_370',
        LUX_352 = 'LUX_352',
        MAC_853 = 'MAC_853',
        MKD_389 = 'MKD_389',
        MDG_261 = 'MDG_261',
        MWI_265 = 'MWI_265',
        MYS_60 = 'MYS_60',
        MDV_960 = 'MDV_960',
        MLI_223 = 'MLI_223',
        MLT_356 = 'MLT_356',
        MHL_692 = 'MHL_692',
        MTQ_596 = 'MTQ_596',
        MRT_222 = 'MRT_222',
        MUS_230 = 'MUS_230',
        MYT_262 = 'MYT_262',
        MEX_52 = 'MEX_52',
        FSM_691 = 'FSM_691',
        MDA_373 = 'MDA_373',
        MCO_377 = 'MCO_377',
        MNG_976 = 'MNG_976',
        MNE_382 = 'MNE_382',
        MSR_1_664 = 'MSR_1_664',
        MAR_212 = 'MAR_212',
        MOZ_258 = 'MOZ_258',
        NAM_264 = 'NAM_264',
        NRU_674 = 'NRU_674',
        NPL_977 = 'NPL_977',
        NLD_31 = 'NLD_31',
        ANT_599 = 'ANT_599',
        NCL_687 = 'NCL_687',
        NZL_64 = 'NZL_64',
        NIC_505 = 'NIC_505',
        NER_227 = 'NER_227',
        NGA_234 = 'NGA_234',
        NIU_683 = 'NIU_683',
        NFK_672 = 'NFK_672',
        PRK_850 = 'PRK_850',
        MNP_1_670 = 'MNP_1_670',
        NOR_47 = 'NOR_47',
        OMN_968 = 'OMN_968',
        PAK_92 = 'PAK_92',
        PLW_680 = 'PLW_680',
        PSE_970 = 'PSE_970',
        PAN_507 = 'PAN_507',
        PNG_675 = 'PNG_675',
        PRY_595 = 'PRY_595',
        PER_51 = 'PER_51',
        PHL_63 = 'PHL_63',
        PCN_870 = 'PCN_870',
        POL_48 = 'POL_48',
        PRT_351 = 'PRT_351',
        PRI_1_939 = 'PRI_1_939',
        PRI_1_787 = 'PRI_1_787',
        QAT_974 = 'QAT_974',
        COG_242 = 'COG_242',
        REU_262 = 'REU_262',
        ROU_40 = 'ROU_40',
        RUS_7 = 'RUS_7',
        RWA_250 = 'RWA_250',
        BLM_590 = 'BLM_590',
        SHN_290 = 'SHN_290',
        KNA_1_869 = 'KNA_1_869',
        LCA_1_758 = 'LCA_1_758',
        MAF_590 = 'MAF_590',
        SPM_508 = 'SPM_508',
        VCT_1_784 = 'VCT_1_784',
        WSM_685 = 'WSM_685',
        SMR_378 = 'SMR_378',
        STP_239 = 'STP_239',
        SAU_966 = 'SAU_966',
        SEN_221 = 'SEN_221',
        SRB_381 = 'SRB_381',
        SYC_248 = 'SYC_248',
        SLE_232 = 'SLE_232',
        SGP_65 = 'SGP_65',
        SXM_1_721 = 'SXM_1_721',
        SVK_421 = 'SVK_421',
        SVN_386 = 'SVN_386',
        SLB_677 = 'SLB_677',
        SOM_252 = 'SOM_252',
        ZAF_27 = 'ZAF_27',
        SSD_211 = 'SSD_211',
        ESP_34 = 'ESP_34',
        LKA_94 = 'LKA_94',
        SDN_249 = 'SDN_249',
        SUR_597 = 'SUR_597',
        SJM_47 = 'SJM_47',
        SWZ_268 = 'SWZ_268',
        SWE_46 = 'SWE_46',
        CHE_41 = 'CHE_41',
        SYR_963 = 'SYR_963',
        TWN_886 = 'TWN_886',
        TJK_992 = 'TJK_992',
        TZA_255 = 'TZA_255',
        THA_66 = 'THA_66',
        TLS_670 = 'TLS_670',
        TGO_228 = 'TGO_228',
        TKL_690 = 'TKL_690',
        TON_676 = 'TON_676',
        TTO_1_868 = 'TTO_1_868',
        TUN_216 = 'TUN_216',
        TUR_90 = 'TUR_90',
        TKM_993 = 'TKM_993',
        TCA_1_649 = 'TCA_1_649',
        TUV_688 = 'TUV_688',
        UGA_256 = 'UGA_256',
        UKR_380 = 'UKR_380',
        ARE_971 = 'ARE_971',
        GBR_44 = 'GBR_44',
        USA_1 = 'USA_1',
        URY_598 = 'URY_598',
        VIR_1_340 = 'VIR_1_340',
        UZB_998 = 'UZB_998',
        VUT_678 = 'VUT_678',
        VEN_58 = 'VEN_58',
        VNM_84 = 'VNM_84',
        WLF_681 = 'WLF_681',
        ESH_212 = 'ESH_212',
        YEM_967 = 'YEM_967',
        ZMB_260 = 'ZMB_260',
        ZWE_263 = 'ZWE_263',
    }
    /**
     * 회원 가입 유형
     */
    export enum companyMemberJoinType {
        FO_JOIN_DEALER = 'FO_JOIN_DEALER',
        FO_JOIN_NORMAL = 'FO_JOIN_NORMAL',
        FO_JOIN_PARTNER = 'FO_JOIN_PARTNER',
        BO_JOIN_MANAGER = 'BO_JOIN_MANAGER',
    }
    /**
     * 연동시스템 유형
     */
    export enum linkageType {
        INTERFACE = 'INTERFACE',
        FTP = 'FTP',
    }
    /**
     * 연동시스템
     */
    export enum linkageSystem {
        GIM = 'GIM',
        HSW = 'HSW',
        KSW = 'KSW',
        DMSSH = 'DMSSH',
        DMSSK = 'DMSSK',
        DDMSH = 'DDMSH',
        DDMSK = 'DDMSK',
        VAATZ = 'VAATZ',
    }
    /**
     * 서비스 타입
     */
    export enum serviceType {
        BASIC = 'BASIC',
        CORE = 'CORE',
        ENTERPRISE = 'ENTERPRISE',
        CONSIGNMENT = 'CONSIGNMENT',
        FREE_CHARGE = 'FREE_CHARGE',
    }
    /**
     * SSO 로그인 유형
     */
    export enum ssoType {
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
        AES = 'AES',
    }
    /**
     * 비밀번호 인증 유형
     */
    export enum passwordAuthType {
        PLATFORM = 'PLATFORM',
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
    }
    /**
     * 2차 인증 유형 유형
     */
    export enum twoFactorAuthType {
        MPASS = 'MPASS',
        MPASS_OTP = 'MPASS_OTP',
        MPASS_FIDO = 'MPASS_FIDO',
        GOOGLE_OTP = 'GOOGLE_OTP',
    }
    /**
     * 워터마크 위치
     */
    export enum watermarkPosition {
        TOP_LEFT = 'TOP_LEFT',
        TOP_CENTER = 'TOP_CENTER',
        TOP_RIGHT = 'TOP_RIGHT',
        MIDDLE_LEFT = 'MIDDLE_LEFT',
        MIDDLE_CENTER = 'MIDDLE_CENTER',
        MIDDLE_RIGHT = 'MIDDLE_RIGHT',
        BOTTOM_LEFT = 'BOTTOM_LEFT',
        BOTTOM_CENTER = 'BOTTOM_CENTER',
        BOTTOM_RIGHT = 'BOTTOM_RIGHT',
    }
    /**
     * 과정 수강 신청 결재라인
     */
    export enum enrollApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    /**
     * 채널 신청 결재라인
     */
    export enum channelApprovalMatrix {
        TENANT_MANAGER = 'TENANT_MANAGER',
        NONE = 'NONE',
    }
    /**
     * 사외과정 지원 신청 절차
     */
    export enum externalEnrollApplicationProcess {
        APPLICATION_REGISTER = 'APPLICATION_REGISTER',
        REGISTER = 'REGISTER',
        NONE = 'NONE',
    }
    /**
     * 사외과정 신청 결재라인
     */
    export enum externalEnrollApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    /**
     * 자격증 이력 결재라인
     */
    export enum certificationApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    /**
     * 자격증 응시료 지원 신청 절차
     */
    export enum examFeeApplicationProcess {
        APPLICATION_REGISTER = 'APPLICATION_REGISTER',
        REGISTER = 'REGISTER',
        NONE = 'NONE',
    }
    /**
     * 어학 이력 결재라인
     */
    export enum languageApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
        NONE = 'NONE',
    }
    /**
     * 데이터 소스(데이터 원천)
     */
    export enum hrDataSource {
        SAP = 'SAP',
        DMSS = 'DMSS',
        MANUAL = 'MANUAL',
        REGISTER = 'REGISTER',
        ETC = 'ETC',
    }
    /**
     * 회사담당자전화번호 국가번호
     */
    export enum managerPhoneCountryCode {
        KOR_82 = 'KOR_82',
        AFG_93 = 'AFG_93',
        ALB_355 = 'ALB_355',
        DZA_213 = 'DZA_213',
        ASM_1_684 = 'ASM_1_684',
        AND_376 = 'AND_376',
        AGO_244 = 'AGO_244',
        AIA_1_264 = 'AIA_1_264',
        ATA_672 = 'ATA_672',
        ATA_64 = 'ATA_64',
        ATG_1_268 = 'ATG_1_268',
        ARG_54 = 'ARG_54',
        ARM_374 = 'ARM_374',
        ABW_297 = 'ABW_297',
        ASC_247 = 'ASC_247',
        AUS_61 = 'AUS_61',
        AUT_43 = 'AUT_43',
        AZE_994 = 'AZE_994',
        BHS_1_242 = 'BHS_1_242',
        BHR_973 = 'BHR_973',
        BGD_880 = 'BGD_880',
        BRB_1_246 = 'BRB_1_246',
        BLR_375 = 'BLR_375',
        BEL_32 = 'BEL_32',
        BLZ_501 = 'BLZ_501',
        BEN_229 = 'BEN_229',
        BMU_1_441 = 'BMU_1_441',
        BTN_975 = 'BTN_975',
        BOL_591 = 'BOL_591',
        BIH_387 = 'BIH_387',
        BWA_267 = 'BWA_267',
        BRA_55 = 'BRA_55',
        VGB_1_284 = 'VGB_1_284',
        BRN_673 = 'BRN_673',
        BGR_359 = 'BGR_359',
        BFA_226 = 'BFA_226',
        MMR_95 = 'MMR_95',
        BDI_257 = 'BDI_257',
        KHM_855 = 'KHM_855',
        CMR_237 = 'CMR_237',
        CAN_1 = 'CAN_1',
        CPV_238 = 'CPV_238',
        CYM_1_345 = 'CYM_1_345',
        CAF_236 = 'CAF_236',
        TCD_235 = 'TCD_235',
        CHL_56 = 'CHL_56',
        CHN_86 = 'CHN_86',
        CXR_61 = 'CXR_61',
        CCK_61 = 'CCK_61',
        COL_57 = 'COL_57',
        COM_269 = 'COM_269',
        COK_682 = 'COK_682',
        CRC_506 = 'CRC_506',
        HRV_385 = 'HRV_385',
        CUB_53 = 'CUB_53',
        CYP_357 = 'CYP_357',
        CZE_420 = 'CZE_420',
        COD_243 = 'COD_243',
        DNK_45 = 'DNK_45',
        DGA_246 = 'DGA_246',
        DJI_253 = 'DJI_253',
        DMA_1_767 = 'DMA_1_767',
        DOM_1_849 = 'DOM_1_849',
        DOM_1_829 = 'DOM_1_829',
        DOM_1_809 = 'DOM_1_809',
        ECU_593 = 'ECU_593',
        EGY_20 = 'EGY_20',
        SLV_503 = 'SLV_503',
        GNQ_240 = 'GNQ_240',
        ERI_291 = 'ERI_291',
        EST_372 = 'EST_372',
        ETH_251 = 'ETH_251',
        FLK_500 = 'FLK_500',
        FRO_298 = 'FRO_298',
        FJI_679 = 'FJI_679',
        FIN_358 = 'FIN_358',
        FRA_33 = 'FRA_33',
        GUF_594 = 'GUF_594',
        PYF_689 = 'PYF_689',
        GAB_241 = 'GAB_241',
        GMB_220 = 'GMB_220',
        GEO_995 = 'GEO_995',
        DEU_49 = 'DEU_49',
        GHA_233 = 'GHA_233',
        GIB_350 = 'GIB_350',
        GRC_30 = 'GRC_30',
        GRL_299 = 'GRL_299',
        GRD_1_473 = 'GRD_1_473',
        GLP_590 = 'GLP_590',
        GUM_1_671 = 'GUM_1_671',
        GTM_502 = 'GTM_502',
        GIN_224 = 'GIN_224',
        GNB_245 = 'GNB_245',
        GUY_592 = 'GUY_592',
        HTI_509 = 'HTI_509',
        VAT_39 = 'VAT_39',
        HND_504 = 'HND_504',
        HKG_852 = 'HKG_852',
        HUN_36 = 'HUN_36',
        IS_354 = 'IS_354',
        IND_91 = 'IND_91',
        IDN_62 = 'IDN_62',
        IRN_98 = 'IRN_98',
        IRQ_964 = 'IRQ_964',
        IRL_353 = 'IRL_353',
        IMN_44 = 'IMN_44',
        ISR_972 = 'ISR_972',
        ITA_39 = 'ITA_39',
        CIV_225 = 'CIV_225',
        JAM_1_876 = 'JAM_1_876',
        JPN_81 = 'JPN_81',
        JEY_44 = 'JEY_44',
        JOR_962 = 'JOR_962',
        KAZ_7 = 'KAZ_7',
        KEN_254 = 'KEN_254',
        KIR_686 = 'KIR_686',
        KWT_965 = 'KWT_965',
        KGZ_996 = 'KGZ_996',
        LAO_856 = 'LAO_856',
        LVA_371 = 'LVA_371',
        LBN_961 = 'LBN_961',
        LSO_266 = 'LSO_266',
        LBR_231 = 'LBR_231',
        LBY_218 = 'LBY_218',
        LIE_423 = 'LIE_423',
        LTU_370 = 'LTU_370',
        LUX_352 = 'LUX_352',
        MAC_853 = 'MAC_853',
        MKD_389 = 'MKD_389',
        MDG_261 = 'MDG_261',
        MWI_265 = 'MWI_265',
        MYS_60 = 'MYS_60',
        MDV_960 = 'MDV_960',
        MLI_223 = 'MLI_223',
        MLT_356 = 'MLT_356',
        MHL_692 = 'MHL_692',
        MTQ_596 = 'MTQ_596',
        MRT_222 = 'MRT_222',
        MUS_230 = 'MUS_230',
        MYT_262 = 'MYT_262',
        MEX_52 = 'MEX_52',
        FSM_691 = 'FSM_691',
        MDA_373 = 'MDA_373',
        MCO_377 = 'MCO_377',
        MNG_976 = 'MNG_976',
        MNE_382 = 'MNE_382',
        MSR_1_664 = 'MSR_1_664',
        MAR_212 = 'MAR_212',
        MOZ_258 = 'MOZ_258',
        NAM_264 = 'NAM_264',
        NRU_674 = 'NRU_674',
        NPL_977 = 'NPL_977',
        NLD_31 = 'NLD_31',
        ANT_599 = 'ANT_599',
        NCL_687 = 'NCL_687',
        NZL_64 = 'NZL_64',
        NIC_505 = 'NIC_505',
        NER_227 = 'NER_227',
        NGA_234 = 'NGA_234',
        NIU_683 = 'NIU_683',
        NFK_672 = 'NFK_672',
        PRK_850 = 'PRK_850',
        MNP_1_670 = 'MNP_1_670',
        NOR_47 = 'NOR_47',
        OMN_968 = 'OMN_968',
        PAK_92 = 'PAK_92',
        PLW_680 = 'PLW_680',
        PSE_970 = 'PSE_970',
        PAN_507 = 'PAN_507',
        PNG_675 = 'PNG_675',
        PRY_595 = 'PRY_595',
        PER_51 = 'PER_51',
        PHL_63 = 'PHL_63',
        PCN_870 = 'PCN_870',
        POL_48 = 'POL_48',
        PRT_351 = 'PRT_351',
        PRI_1_939 = 'PRI_1_939',
        PRI_1_787 = 'PRI_1_787',
        QAT_974 = 'QAT_974',
        COG_242 = 'COG_242',
        REU_262 = 'REU_262',
        ROU_40 = 'ROU_40',
        RUS_7 = 'RUS_7',
        RWA_250 = 'RWA_250',
        BLM_590 = 'BLM_590',
        SHN_290 = 'SHN_290',
        KNA_1_869 = 'KNA_1_869',
        LCA_1_758 = 'LCA_1_758',
        MAF_590 = 'MAF_590',
        SPM_508 = 'SPM_508',
        VCT_1_784 = 'VCT_1_784',
        WSM_685 = 'WSM_685',
        SMR_378 = 'SMR_378',
        STP_239 = 'STP_239',
        SAU_966 = 'SAU_966',
        SEN_221 = 'SEN_221',
        SRB_381 = 'SRB_381',
        SYC_248 = 'SYC_248',
        SLE_232 = 'SLE_232',
        SGP_65 = 'SGP_65',
        SXM_1_721 = 'SXM_1_721',
        SVK_421 = 'SVK_421',
        SVN_386 = 'SVN_386',
        SLB_677 = 'SLB_677',
        SOM_252 = 'SOM_252',
        ZAF_27 = 'ZAF_27',
        SSD_211 = 'SSD_211',
        ESP_34 = 'ESP_34',
        LKA_94 = 'LKA_94',
        SDN_249 = 'SDN_249',
        SUR_597 = 'SUR_597',
        SJM_47 = 'SJM_47',
        SWZ_268 = 'SWZ_268',
        SWE_46 = 'SWE_46',
        CHE_41 = 'CHE_41',
        SYR_963 = 'SYR_963',
        TWN_886 = 'TWN_886',
        TJK_992 = 'TJK_992',
        TZA_255 = 'TZA_255',
        THA_66 = 'THA_66',
        TLS_670 = 'TLS_670',
        TGO_228 = 'TGO_228',
        TKL_690 = 'TKL_690',
        TON_676 = 'TON_676',
        TTO_1_868 = 'TTO_1_868',
        TUN_216 = 'TUN_216',
        TUR_90 = 'TUR_90',
        TKM_993 = 'TKM_993',
        TCA_1_649 = 'TCA_1_649',
        TUV_688 = 'TUV_688',
        UGA_256 = 'UGA_256',
        UKR_380 = 'UKR_380',
        ARE_971 = 'ARE_971',
        GBR_44 = 'GBR_44',
        USA_1 = 'USA_1',
        URY_598 = 'URY_598',
        VIR_1_340 = 'VIR_1_340',
        UZB_998 = 'UZB_998',
        VUT_678 = 'VUT_678',
        VEN_58 = 'VEN_58',
        VNM_84 = 'VNM_84',
        WLF_681 = 'WLF_681',
        ESH_212 = 'ESH_212',
        YEM_967 = 'YEM_967',
        ZMB_260 = 'ZMB_260',
        ZWE_263 = 'ZWE_263',
    }
}

