import { queryOptions } from '@entities/label-messages-mock';
import { t } from 'i18next';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import React, { useEffect } from 'react';
import { GridBox, useGridBox } from '@learnway/ui';
import { LabelMessage, LabelMessagesQueryParams } from '@types';

interface RightPanelProps {
  /** 초기 테이블 파라미터 (검색 조건, 페이지 정보 등) */
  params: Record<string, any>;
  /** GridBox 인스턴스를 상위로 전달하고 싶을 때 사용 */
  setTableInstance?: (table: any) => void;
}

/**
 * 라벨/메시지 데이터를 조회하고 그리드 형태로 보여주는 우측 패널 컴포넌트
 *
 * @component
 * @param {RightPanelProps} props - 컴포넌트 props
 */
const RightPanelComponent = ({ params, setTableInstance }: RightPanelProps) => {
  const { config: gConfig, gridFetch } = useGridBox<LabelMessage>(gridConfig, () => params);

  /** 외부 params가 변경될 때 내부 fetchParams도 갱신 */
  useEffect(() => {
    if (params) {
      gridFetch(params);
    }
  }, [params]);

  return <GridBox config={gConfig} showNumberingColumn />;
};

/**
 * 라벨 메시지 관리용 테이블을 포함한 우측 패널
 */
export const RightPanel = RightPanelComponent;

const gridConfig = {
  query: queryOptions.all<LabelMessagesQueryParams>,
  rowId: 'labelMessageName',
  columns: [
    // 분류
    { name: 'labelMessageType', label: () => t('LABEL.grid.column.type'), size: 100 },
    // 라벨/메세지 코드
    {
      name: 'labelMessageMultilingulKey',
      label: t('LABEL.grid.column.labelMessageCode'),
      size: 200,
    },
    // 라벨/메세지
    { name: 'labelMessageName', label: t('LABEL.grid.column.labelMessage'), size: 200 },
    // 사용여부
    {
      name: 'isUsed',
      label: t('LABEL.grid.column.useYn'),
      size: 104,
      render: (info: any) => (info.getValue() ? 'Y' : 'N'),
    },
    // 등록자
    {
      name: 'createdBy',
      size: 139,
      label: t('LABEL.grid.column.createdBy'),
    },
    // 등록일
    {
      name: 'createdDate',
      label: t('LABEL.grid.column.createdDate'),
      size: 200,
      render: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
  ],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};
