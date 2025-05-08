import React, { useCallback, useState } from 'react';
import { Button, GridBox, useGridBox, useModal } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { LabelMessagesQueryParams } from '@types';
import { CourseTypeOptionCardModal } from '@features/learning/course';

export const Route = createFileRoute('/_unauth/learning_test/course/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();
  const { t } = useTranslation();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedLabelMessageId, setSelectedLabelMessageId] = useState<number>(0);

  /**
   * 검색 실행 시 호출되는 핸들러
   * @param {any} data - 검색 조건 데이터
   */
  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  /**
   * 그리드에서 '추가' 버튼 클릭 시 호출되는 핸들러
   * 음수 임시 ID를 설정하여 새 항목 추가 모드로 전환
   */
  const handleGridAddClick = () => {
    setSelectedLabelMessageId(Date.now() * -1); // 음수 랜덤 값 설정
  };

  /**
   * 그리드의 행 선택 시 호출되는 핸들러
   * @param {any} row - 선택된 행 데이터
   */
  const handleGridRowSelect = (row: any) => {
    row && setSelectedLabelMessageId(row?.labelMessageId);
  };

  /**
   * '과정 개설' 버튼 클릭 시 호출되는 핸들러
   */
  const handleCourseOpenClick = async () => {
    const value = await openModal({
      content: <CourseTypeOptionCardModal />,
      width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
    });

    // 선택한 유형의 등록 페이지로 이동
  };

  return (
    <PageContainer scrollHidden={true}>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.courseOpen')}
          onClick={handleCourseOpenClick}
        />
      </ContentsButtons>
      <MainContents>
        {/* 검색 */}
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        {/* 그리드 */}
        <GridBox
          config={gConfig}
          height={440}
          multiple
          showNumberingColumn
          onRowSelect={handleGridRowSelect}
          onAddClick={handleGridAddClick}
        />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: any = {
  builders: [
    [
      // 테넌트
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('LABEL.form.label.tenant'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '미사용' },
        ],
      },
      // 채널
      {
        name: 'channel',
        type: 'dropdown',
        label: t('LABEL.form.label.channel'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '미사용' },
        ],
      },
      // 과정유형
      {
        name: 'courseType',
        type: 'dropdown',
        label: t('LABEL.form.label.courseType'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '미사용' },
        ],
      },
      // 운영자
      {
        name: 'operator',
        type: 'text',
        label: t('LABEL.form.label.operator'),
        value: '',
      },
    ],
    [
      // 개설년도
      {
        name: 'openingDate',
        type: 'dropdown',
        label: t('LABEL.form.label.openingDate'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '미사용' },
        ],
      },
      // 사용여부
      {
        name: 'useYn',
        type: 'dropdown',
        label: t('LABEL.form.label.useYn'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '미사용' },
        ],
      },
      // 과정코드
      {
        name: 'courseCode',
        type: 'text',
        label: t('LABEL.form.label.courseCode'),
        value: '',
      },
      // 과정명
      {
        name: 'courseName',
        type: 'text',
        label: t('LABEL.form.label.courseName'),
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  title: t('LABEL.grid.title.courseList'),
  query: queryOptions.all<LabelMessagesQueryParams>,
  // data: [
  //   { labelMessageId: 1, labelMessageType: 'a', labelMessageMultilingulKey: 'a' },
  //   { labelMessageId: 2, labelMessageType: 'a2', labelMessageMultilingulKey: 'a2' },
  // ],
  columns: [
    // 채널
    { name: 'channel', label: () => t('LABEL.grid.column.channel'), size: 90 },
    // 테넌트
    { name: 'tenant', label: () => t('LABEL.grid.column.tenant'), size: 140 },
    // 과정유형
    { name: 'courseType', label: () => t('LABEL.grid.column.courseType'), size: 90 },
    // 과정코드
    { name: 'courseCode', label: () => t('LABEL.grid.column.courseCode'), size: 90 },
    // 과정명
    { name: 'courseName', label: () => t('LABEL.grid.column.courseName'), size: 200 },
    // 차수
    { name: 'session', label: () => t('LABEL.grid.column.session'), size: 90 },
    // 담당자
    { name: 'manager', label: () => t('LABEL.grid.column.manager'), size: 90 },
    // 운영자
    { name: 'operator', label: () => t('LABEL.grid.column.operator'), size: 90 },
    // 사용여부
    { name: 'useYn', label: () => t('LABEL.grid.column.useYn'), size: 90 },
    // 개설년도
    { name: 'openingDate', label: () => t('LABEL.grid.column.openingDate'), size: 90 },
    // 미리보기
    { name: 'preview', label: () => t('LABEL.grid.column.preview'), size: 90 },
    // 등록일
    { name: 'createdDate', label: () => t('LABEL.grid.column.createdDate'), size: 120 },
    // 등록자
    { name: 'createdBy', label: () => t('LABEL.grid.column.createdBy'), size: 90 },
    // URL 생성
    { name: 'urlGeneration', label: () => t('LABEL.grid.column.urlGeneration'), size: 90 },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
