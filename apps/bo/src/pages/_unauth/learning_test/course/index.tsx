import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { CourseTypeOptionCardModal } from '@features/learning/course';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@features/shared';
import { LMSApiPrefix } from '@learnway/config';
import { useSearchBox } from '@learnway/hooks';
import { Button, Divider, GridBox, useGridBox, useModal } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { LabelMessagesQueryParams } from '@types';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { t } from 'i18next';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_unauth/learning_test/course/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation();
  const { open: openModal } = useModal();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  /**
   * 검색 실행 시 호출되는 핸들러
   * @param {any} data - 검색 조건 데이터
   */
  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  /**
   * 그리드의 행 선택 시 호출되는 핸들러
   * @param {any} row - 선택된 행 데이터
   */
  const handleGridRowSelect = (rows: any) => {
    rows && setSelectedCourses(rows);
  };

  /**
   * 과정 일괄업로드 버튼 클릭 시 호출되는 핸들러
   */
  const handleBatchUploadClick = () => {
    console.log('handleBatchUploadClick');
  };

  /**
   * '과정 개설' 버튼 클릭 시 호출되는 핸들러
   */
  const handleCourseOpenClick = async () => {
    const { value } = await openModal({
      content: <CourseTypeOptionCardModal />,
      width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
    });
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        courseType: 'CATEGORY', // 다국어 분류 - 공통코드
      },
    });
    // 선택한 유형의 등록 페이지로 이동
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.courseBatchUpload')}
          onClick={handleBatchUploadClick}
        />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.courseOpen')}
          onClick={handleCourseOpenClick}
        />
      </ContentsButtons>
      <MainContents>
        {/* 검색 */}
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        {/* Divider */}
        <Divider />
        {/* 그리드 */}
        <GridBox
          config={gConfig}
          multiple
          showNumberingColumn
          showCopy
          onRowSelect={handleGridRowSelect}
          customButtonNode={
            <Button variant="text" size="sm" label={t('LABEL.grid.header.toShare')} />
          }
          excelButtons={
            <>
              <GridExcelUploadButton
                url="/multilingual/exportExcel"
                validateUrl="/multilingual/excelUploadValidation"
              />
              <GridExcelDownloadButton
                url={`${LMSApiPrefix()}/multilingual/exportExcel`}
                params={getValues()}
                onBeforeDownload={async () => {
                  const keyTypeCode = getValues('keyTypeCode');
                  const targetLocale = getValues('targetLocale');
                  if (keyTypeCode === '' || targetLocale === '') {
                    alert({
                      type: 'warning',
                      content: t('분류와 번역언어는 필수 항목입니다.'),
                    });
                    throw new Error(t('분류와 번역언어는 필수 항목입니다.'));
                  }
                }}
              />
            </>
          }
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
    ],
    [
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
      // 담당자/운영자
      {
        name: 'adminName',
        type: 'text',
        label: t('LABEL.form.label.coordinator/Operator'),
        value: '',
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
    // 테넌트
    { name: 'tenant', label: () => t('LABEL.grid.column.tenant'), size: 140 },
    // 채널
    { name: 'channel', label: () => t('LABEL.grid.column.channel'), size: 90 },
    // 과정코드
    { name: 'courseCode', label: () => t('LABEL.grid.column.courseCode'), size: 90 },
    // 개설연도
    { name: 'openingDate', label: () => t('LABEL.grid.column.openingDate'), size: 90 },
    // 과정유형
    { name: 'courseType', label: () => t('LABEL.grid.column.courseType'), size: 90 },
    // 찜
    { name: 'favorite', label: () => t('LABEL.grid.column.favorite'), size: 40 },
    // 과정명
    { name: 'courseName', label: () => t('LABEL.grid.column.courseName'), size: 200 },
    // 사용
    { name: 'useYn', label: () => t('LABEL.grid.column.use'), size: 90 },
    // 차수
    { name: 'session', label: () => t('LABEL.grid.column.session'), size: 90 },
    // 조회
    { name: 'search', label: () => t('LABEL.grid.column.search'), size: 90 },
    // 좋아요
    { name: 'like', label: () => t('LABEL.grid.column.like'), size: 90 },
    // 공유
    { name: 'share', label: () => t('LABEL.grid.column.share'), size: 90 },
    // 후기
    { name: 'review', label: () => t('LABEL.grid.column.review'), size: 90 },
    // 수강생
    { name: 'student', label: () => t('LABEL.grid.column.student'), size: 90 },
    // 담당자
    { name: 'manager', label: () => t('LABEL.grid.column.manager'), size: 90 },
    // 운영자
    { name: 'operator', label: () => t('LABEL.grid.column.operator'), size: 90 },
    // 미리보기
    { name: 'preview', label: () => t('LABEL.grid.column.preview'), size: 90 },
    // URL
    { name: 'url', label: () => t('LABEL.grid.column.url'), size: 90 },
  ],
};
