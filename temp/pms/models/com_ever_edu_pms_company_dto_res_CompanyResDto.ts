/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_company_dto_res_CompanyResDto = {
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * UUID
     */
    companyUuid?: string;
    /**
     * 회사코드
     */
    companyCode?: string;
    /**
     * 회사유형코드
     */
    companyType?: com_ever_edu_pms_company_dto_res_CompanyResDto.companyType;
    /**
     * 회사명
     */
    name?: string;
    /**
     * 회사영문명
     */
    engName?: string;
    /**
     * 사용여부
     */
    useYn?: boolean;
    /**
     * 사업자등록번호
     */
    brn?: string;
    /**
     * 대표자명
     */
    rpsntrName?: string;
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
     * 서비스 타입
     */
    serviceType?: com_ever_edu_pms_company_dto_res_CompanyResDto.serviceType;
    /**
     * 비용결제용 법인코드
     */
    paymentCompanyCode?: string;
    /**
     * 조직정보 수정 사용여부
     */
    isUseEditableDept?: boolean;
    /**
     * 연동시스템 사용여부
     */
    isUseLinkageSystem?: boolean;
    /**
     * 연동시스템 유형
     */
    linkageType?: com_ever_edu_pms_company_dto_res_CompanyResDto.linkageType;
    /**
     * 연동시스템
     */
    linkageSystem?: com_ever_edu_pms_company_dto_res_CompanyResDto.linkageSystem;
    /**
     * SSO 사용여부
     */
    isUseSso?: boolean;
    /**
     * SSO 로그인 유형
     */
    ssoType?: com_ever_edu_pms_company_dto_res_CompanyResDto.ssoType;
    /**
     * 2차 인증 사용여부
     */
    isUseTwoFactorAuth?: boolean;
    /**
     * 2차 인증 유형 유형
     */
    twoFactorAuthType?: com_ever_edu_pms_company_dto_res_CompanyResDto.twoFactorAuthType;
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
    watermarkPosition?: com_ever_edu_pms_company_dto_res_CompanyResDto.watermarkPosition;
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
    enrollApprovalMatrix?: com_ever_edu_pms_company_dto_res_CompanyResDto.enrollApprovalMatrix;
    /**
     * 사외과정 신청 결재라인
     */
    externalEnrollApprovalMatrix?: com_ever_edu_pms_company_dto_res_CompanyResDto.externalEnrollApprovalMatrix;
    /**
     * 사외과정 지원 신청 절차
     */
    externalEnrollApplicationProcess?: com_ever_edu_pms_company_dto_res_CompanyResDto.externalEnrollApplicationProcess;
    /**
     * 채널 신청 결재라인
     */
    channelApprovalMatrix?: com_ever_edu_pms_company_dto_res_CompanyResDto.channelApprovalMatrix;
    /**
     * 어학 이력 결재라인
     */
    languageApprovalMatrix?: com_ever_edu_pms_company_dto_res_CompanyResDto.languageApprovalMatrix;
    /**
     * 자격증 이력 결재라인
     */
    certificationApprovalMatrix?: com_ever_edu_pms_company_dto_res_CompanyResDto.certificationApprovalMatrix;
    /**
     * 자격증 응시료 지원신청 사용여부
     */
    isUseExamFeeSupport?: boolean;
    /**
     * 자격증 응시료 지원 신청 절차
     */
    examFeeApplicationProcess?: com_ever_edu_pms_company_dto_res_CompanyResDto.examFeeApplicationProcess;
    /**
     * 회사 전체 정보 사용 설정
     */
    isUseCompanyInfo?: boolean;
    /**
     * 데이터 소스(데이터 원천)
     */
    hrDataSource?: com_ever_edu_pms_company_dto_res_CompanyResDto.hrDataSource;
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
     * 담당자 전화번호
     */
    managerPhone?: string;
    /**
     * 담당자 이메일
     */
    managerEmail?: string;
    /**
     * 등록자ID
     */
    createdBy?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
    /**
     * 최종수정자ID
     */
    lastModifiedBy?: string;
    /**
     * 최종수정일시
     */
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_company_dto_res_CompanyResDto {
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
        ETC = 'ETC',
    }
    /**
     * 서비스 타입
     */
    export enum serviceType {
        CONSIGNMENT = 'CONSIGNMENT',
        BASIC = 'BASIC',
        CORE = 'CORE',
        ENTERPRISE = 'ENTERPRISE',
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
     * SSO 로그인 유형
     */
    export enum ssoType {
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
        AES = 'AES',
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
     * 사외과정 지원 신청 절차
     */
    export enum externalEnrollApplicationProcess {
        APPLICATION_REGISTER = 'APPLICATION_REGISTER',
        REGISTER = 'REGISTER',
    }
    /**
     * 채널 신청 결재라인
     */
    export enum channelApprovalMatrix {
        COMPANY = 'COMPANY',
        OPERATOR = 'OPERATOR',
        MANAGER = 'MANAGER',
        OPERATOR_MANAGER = 'OPERATOR_MANAGER',
        MANAGER_OPERATOR = 'MANAGER_OPERATOR',
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
}

