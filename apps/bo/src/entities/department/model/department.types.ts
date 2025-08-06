/**
 * 부서 ([BO] 회사 부서 리스트 검색 항목 DTO)
 */
export interface Department {
  /**
   * 부서ID
   */
  deptId: number;
  /**
   * 뎁스
   */
  depth: number;
  /**
   * 정렬순서
   */
  sortOrder: number;
  /**
   * 부서코드
   */
  deptCode: string;
  /**
   * 매니저 사원번호
   */
  managerEmployeeNumber: string;
  /**
   * 매니저 사원번호 Uuid
   */
  managerEmployeeNumberUuid: string;
  /**
   * 매니저 성명
   */
  managerName: string;
  /**
   * 부서명
   */
  deptName: string;
  /**
   * 부서영문명
   */
  deptEngName: string;
  /**
   * 부서 설명
   */
  deptDesc: string;
  /**
   * 사용여부
   */
  isUsed: boolean;
  /**
   * 삭제여부
   */
  isDeleted: boolean;
  /**
   * 상위부서코드
   */
  parentDeptId: number;
  /**
   * 부서 구성원 수
   */
  deptMemberCount: number;
  /**
   * 조직등록유형
   */
  hrInfoManageType: string;
  /**
   * 회사코드
   */
  companyCode: string;
  /**
   * 회사명
   */
  companyName: string;
  /**
   * 회사유형
   */
  companyType: string;
  /**
   * 상위 부서리스트
   */
  parentDeptList: Department[];
  /**
   * 등록자ID
   */
  createdBy: string;
  /**
   * 등록일시
   */
  createdDate: string;
  /**
   * 최종수정자ID
   */
  lastModifiedBy: string;
  /**
   * 최종수정일시
   */
  modifiedDate: string;
  /**
   * 하위부서
   */
  childList: Department[];
}

/**
 * 부서 유저 ([BO] 회사 부서 유저 리스트 검색 항목 DTO)
 */
export interface DepartmentUser {
  /**
   * 회사코드
   */
  companyCode: string;

  /**
   * 회사명
   */
  companyName: string;

  /**
   * 회사유형
   */
  companyType: string;
  /**
   * 부서ID
   */
  deptId: number;
  /**
   * 부서코드
   */
  deptCode: string;
  /**
   * 부서명
   */
  deptName: string;
  /**
   * 조직등록유형
   */
  hrInfoManageType: string;
  /**
   * 유저 uuid
   */
  uuid: string;
  /**
   * 사번
   */
  employeeNumber: string;
  /**
   * 성명
   */
  name: string;
  /**
   * 보직 여부
   */
  isLeader: boolean;
  retireDate: string;
  userState: string;
  userStatus: string;
  /**
   * 계정 상태
   */
  accountStatus: string;
}
