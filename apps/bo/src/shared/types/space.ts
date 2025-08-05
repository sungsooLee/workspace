/**
 * 교육 공간 정보 (목록 조회)
 */
export interface SpaceListItem {
  /**
   * 테넌트 이름
   */
  tenantName: string;
  /**
   * 온오프라인 구분 (lms.space.OnOffLineType)
   */
  onOffLineType: string;
  /**
   * 교육공간 ID
   */
  learningSpaceId: number;
  /**
   * 교육공간 이름
   */
  learningSpaceName: string;
  /**
   * 주소/URL (온라인:URL, 오프라인:주소)
   */
  addressUrl: string;
  /**
   * 미리보기 (약도 또는 Link URL)
   */
  preview: string;
  /**
   * 사용여부
   */
  isUsed: boolean;
}

/**
 * 교육 공간 정보
 */
export interface Space {
  /**
   * 테넌트 ID
   */
  tenantId: number;
  /**
   * 교육공간 ID
   */
  learningSpaceId: number;
  /**
   * 교육공간 이름
   */
  learningSpaceName: string;
  /**
   * 온오프라인 구분 (lms.space.OnOffLineType)
   */
  onOffLineType: string;
  /**
   * 교육공간 코드
   */
  learningSpaceCode: string;
  /**
   * 약도 첨부파일 UUID
   */
  mapFileGroupUuid?: string;
  /**
   * 우편번호
   */
  postalCode?: string;
  /**
   * 주소
   */
  address?: string;
  /**
   * 상세주소
   */
  addressDetail?: string;
  /**
   * 온라인 Link URL
   */
  linkUrl?: string;
  /**
   * 메모
   */
  notes?: string;
  /**
   * 사용여부
   */
  isUsed: boolean;
}
