/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_external_tenant_dto_res_TenantResDto } from './com_ever_edu_external_tenant_dto_res_TenantResDto';
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto';
import type { com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto } from './com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper';
import type { com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto } from './com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin = {
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.wizardStep;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.courseType;
    channelUuid?: string;
    tenantList?: Array<com_ever_edu_external_tenant_dto_res_TenantResDto>;
    primaryCategoryId?: number;
    /**
     * 카테고리 목록
     */
    categories?: Array<com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;
    language?: string;
    courseName?: string;
    courseSummary?: string;
    courseContent?: string;
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.trainingLevelType;
    learningSpaceType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.learningSpaceType;
    coordinatorId?: number;
    /**
     * 담당자 이름
     */
    coordinatorName?: string;
    /**
     * 담당자 부서명
     */
    coordinatorDeptName?: string;
    /**
     * 담당자 연락처 국가코드
     */
    coordinatorTelCountryCode?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.coordinatorTelCountryCode;
    coordinatorTelNo?: string;
    /**
     * 담당자 이메일
     */
    coordinatorEmail?: string;
    operatorId?: number;
    /**
     * 운영자 이름
     */
    operatorName?: string;
    /**
     * 운영자 부서이름
     */
    operatorDeptName?: string;
    /**
     * 운영자 연락처 국가코드
     */
    operatorTelCountryCode?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.operatorTelCountryCode;
    operatorTelNo?: string;
    /**
     * 운영자 이메일
     */
    operatorEmail?: string;
    /**
     * 수강신청 설정 여부
     */
    isEnrollRequired?: boolean;
    /**
     * 수강신청 결재 라인 (pms.course.ApprovalLineType)
     */
    approvalLineType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.approvalLineType;
    /**
     * 수강 신청 정원 제한 여부
     */
    isMaxEnrollQuotaRestricted?: boolean;
    /**
     * 수강 신청 정원
     */
    maxEnrollQuota?: number;
    /**
     * 수강 신청 대기 (lms.course.WaitListPickMethodType)
     */
    waitListPickMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.waitListPickMethodType;
    /**
     * 최대 대기 인원
     */
    maxWaitlistQuota?: number;
    /**
     * 차수 중복수강
     */
    isDuplicateEnrollAllowed?: boolean;
    /**
     * 대표 커리큘럼id
     */
    primaryCurriculumId?: number;
    /**
     * 학습 환경 설정 여부
     */
    isLearnEnvEnabled?: boolean;
    /**
     * 기기 제한
     */
    deviceRestrictType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.deviceRestrictType;
    /**
     * 네트워크 제한(사내망 제어 여부)
     */
    isIntranetRestricted?: boolean;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.learningRestrictTimeType;
    /**
     * 복습 제한 여부
     */
    isReviewRestricted?: boolean;
    /**
     * 복습 가능 기간(개월)
     */
    maxReviewPeriodMonths?: number;
    /**
     * 캡처 방지 여부
     */
    isCaptureBlockEnabled?: boolean;
    /**
     * 보안 서약 여부
     */
    isSecurityAgreementEnable?: boolean;
    /**
     * 학습 제어 설정 여부
     */
    isLearnControlEnabled?: boolean;
    /**
     * 1일 진도 제한
     */
    isDailyLearningProgressRestricted?: boolean;
    /**
     * 1일 진도 제한(%)
     */
    maxDailyLearningProgress?: number;
    /**
     * 진도 초기화 여부
     */
    isProgressResetEnabled?: boolean;
    /**
     * 커리큘럼 순차 학습 적용 여부
     */
    isSequentialLearningRequired?: boolean;
    /**
     * 동영상 탐색바 제한 여부
     */
    isPlayerControlRestricted?: boolean;
    /**
     * (cms.video.PlayBackRate)
     */
    maxPlayBackRate?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.maxPlayBackRate;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption?: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.passMethodType;
    /**
     * 수료증 제공 여부
     */
    isCertificateProvided?: boolean;
    /**
     * 항목별 이수 기준 (진도)
     */
    progressMinPassScore?: number;
    /**
     * 항목별 이수 기준 (출석)
     */
    attendanceMinPassScore?: number;
    /**
     * 항목별 이수 기준 (평가)
     */
    examMinPassScore?: number;
    /**
     * 항목별 이수 기준 (과제)
     */
    asgmtMinPassScore?: number;
    /**
     * 항목별 이수 기준 (총점)
     */
    totalMinPassScore?: number;
    /**
     * 반영 비율 (진도)
     */
    progressWeights?: number;
    /**
     * 반영 비율 (출석)
     */
    attendanceWeights?: number;
    /**
     * 반영 비율 (시험)
     */
    examWeights?: number;
    /**
     * 반영 비율 (과제)
     */
    asgmtWeights?: number;
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    recognizedStudyMinType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.recognizedStudyMinType;
    /**
     * 인정 학습 횟수
     */
    recognizedStudyCycles?: number;
    /**
     * 인정학습시간(분)
     */
    recognizedStudyMinutes?: number;
    /**
     * 학습포인트 여부
     */
    isRecognizedStudyPoint?: boolean;
    /**
     * 인정학습점수(학습포인트)
     */
    recognizedStudyPoint?: number;
    /**
     * 커뮤니티[공지/자료실/커뮤니티/공유] 설정 여부
     */
    isCommunicationToolEnabled?: boolean;
    /**
     * 공지사항 기능 사용 여부
     */
    isNoticeEnabled?: boolean;
    /**
     * Q&A 기능 사용 여부
     */
    isQnaBoardEnabled?: boolean;
    /**
     * 자료실 기능 사용 여부
     */
    isMartialBoardEnabled?: boolean;
    /**
     * 커뮤니티 기능 사용 여부
     */
    isCommunityEnabled?: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed?: boolean;
    /**
     * 강사 설정 여부
     */
    isInstructorAssigned?: boolean;
    /**
     * (lms.course.InstructorAssignType)
     */
    instructorAssignType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.instructorAssignType;
    /**
     * 강사ID
     */
    instructorId?: number;
    /**
     * 강사 직접입력
     */
    instructorName?: string;
    /**
     * 교재 설정 여부
     */
    isTextbookProvided?: boolean;
    /**
     * 교재명
     */
    textbookName?: string;
    /**
     * 교재비
     */
    textbookFee?: number;
    /**
     * 사전/연관 학습 설정 여부
     */
    isRelatedPrerequisiteCourseExisted?: boolean;
    preRequisiteCourseList?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;
    relatedCourseList?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;
    /**
     * HMG 과정 데이터 표준 분류 > 대분류
     */
    hmgStandardMainCategory?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.hmgStandardMainCategory;
    /**
     * HMG 과정 데이터 표준 분류 > 중분류
     */
    hmgStandardSubCategory?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.hmgStandardSubCategory;
    /**
     * 1인당 교육비 사용
     */
    isUseTrainingCostPerPerson?: boolean;
    /**
     * 1인당 교육비(원)
     */
    trainingCostPerPerson?: number;
    /**
     * 고용보험 환급 사용
     */
    isUseEmploymentInsuranceRefund?: boolean;
    /**
     * 고용보험 환급비(원)
     */
    employmentInsuranceRefund?: number;
    /**
     * 오토에버 위탁 전용 설정 여부
     */
    isUseOutsourcing?: boolean;
    /**
     * 수강신청 단계에서 레벨테스트 수집 여부
     */
    isPreLevelTestRequired?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집 여부
     */
    isBookDeliveryInfoRequired?: boolean;
    /**
     * 튜터id
     */
    tutorId?: number;
    /**
     * 튜터 이름
     */
    tutorName?: string;
    /**
     * 위탁 소유 회사 ID
     */
    outsourcingCompanyId?: number;
    /**
     * 위탁 소유 회사 이름
     */
    outsourcingCompanyName?: string;
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 과정 노출 시작일
     */
    courseValidityStartDate?: string;
    /**
     * 과정 노출 시작 시각
     */
    courseValidityStartHour?: number;
    /**
     * 과정 노출 종료일
     */
    courseValidityEndDate?: string;
    /**
     * 과정 노출 종료 시각
     */
    courseValidityEndHour?: number;
    /**
     * 썸네일 이미지 Group UUID
     */
    thumbnailFileGroupUuid?: number;
    /**
     * 대표 썸네일 이미지 UUID
     */
    primaryThumbnailFileUuid?: number;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper>;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
    export enum trainingLevelType {
        NONE = 'NONE',
        BEGINNER = 'BEGINNER',
        BASIC = 'BASIC',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
        EXPERT = 'EXPERT',
    }
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * 담당자 연락처 국가코드
     */
    export enum coordinatorTelCountryCode {
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
     * 운영자 연락처 국가코드
     */
    export enum operatorTelCountryCode {
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
     * 수강신청 결재 라인 (pms.course.ApprovalLineType)
     */
    export enum approvalLineType {
        NONE = 'NONE',
        LEADER = 'LEADER',
        OPERATOR = 'OPERATOR',
        LEADER_OPERATOR = 'LEADER_OPERATOR',
        DEPEND_COMPANY = 'DEPEND_COMPANY',
    }
    /**
     * 수강 신청 대기 (lms.course.WaitListPickMethodType)
     */
    export enum waitListPickMethodType {
        NONE = 'NONE',
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
    /**
     * 기기 제한
     */
    export enum deviceRestrictType {
        NONE = 'NONE',
        PC = 'PC',
        MOBILE = 'MOBILE',
    }
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    export enum learningRestrictTimeType {
        NONE = 'NONE',
        WORK_HOURS = 'WORK_HOURS',
        OFF_HOURS = 'OFF_HOURS',
    }
    /**
     * (cms.video.PlayBackRate)
     */
    export enum maxPlayBackRate {
        X1_25 = 'X1_25',
        X1_5 = 'X1_5',
        X1_75 = 'X1_75',
        X2 = 'X2',
    }
    /**
     * (lms.course.PassMethodType)
     */
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    export enum recognizedStudyMinType {
        TIME = 'TIME',
        COUNT_TIME = 'COUNT_TIME',
    }
    /**
     * (lms.course.InstructorAssignType)
     */
    export enum instructorAssignType {
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * HMG 과정 데이터 표준 분류 > 대분류
     */
    export enum hmgStandardMainCategory {
        COMM_ON_BOARD = 'COMM_ON_BOARD',
        COMM_ROLE = 'COMM_ROLE',
        COMM_GLOBAL = 'COMM_GLOBAL',
        COMM_ETC = 'COMM_ETC',
        ROLE_LITERACY = 'ROLE_LITERACY',
        ROLE_BASE = 'ROLE_BASE',
        ROLE_ADVANCED = 'ROLE_ADVANCED',
        LEADER = 'LEADER',
    }
    /**
     * HMG 과정 데이터 표준 분류 > 중분류
     */
    export enum hmgStandardSubCategory {
        SOFTWARE = 'SOFTWARE',
        AI_DS = 'AI_DS',
        ELECTRIFICATION = 'ELECTRIFICATION',
        FUTURE_MOBILITY = 'FUTURE_MOBILITY',
        ENERGY = 'ENERGY',
        START_CITY = 'START_CITY',
        ETC = 'ETC',
    }
}

