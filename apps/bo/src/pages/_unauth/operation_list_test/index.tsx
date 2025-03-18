import React, { useCallback, useEffect } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { GridBox, useGridBox } from '../../../shared/ui/grid-box';
import { translationQueryOptions } from '../../../entities/translation/service/translation.queries';
import { CourseTypeOptionCardModal } from '../../../features/operation';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../shared/ui/search-box';

export const Route = createFileRoute('/_unauth/operation_list_test/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();

  const { config: sConfig, getData } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getData);

  useEffect(() => {
    gridFetch(getData(), { page: 0, size: 10 });
  }, []);

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleValidate = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  // const handleNewTranslation = () => {
  // router.navigate({ to: '/platform/system/translation/view' });
  // };

  const handleOpenModalCourseType = () => {
    openModal({
      content: <CourseTypeOptionCardModal />,
      width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
    });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('과정 개설')}
          onClick={handleOpenModalCourseType}
        />
      </ContentsButtons>
      <MainContents>
        {/*<SearchBox config={sConfig} onSearch={handleOnSearch} />*/}
        <div style={{ height: '100px' }}></div>
        <GridBox config={gConfig} />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    {
      name: '채널',
      type: 'dropdown',
      label: t('채널'),
      value: '',
      options: [
        { value: '', label: '전체' },
        { value: 'COMMON_CODE', label: t('채널') },
      ],
    },
    {
      name: '테넌트',
      type: 'dropdown',
      label: t('테넌트'),
      value: '',
      options: [
        { value: '', label: '전체' },
        { value: 'COMMON_CODE', label: t('테넌트') },
      ],
    },
    {
      name: '유형',
      type: 'dropdown',
      label: t('유형'),
      value: '',
      options: [
        { value: '', label: '전체' },
        { value: 'COMMON_CODE', label: t('유형') },
      ],
    },
    {
      name: '운영자',
      type: 'text',
      label: t('운영자'),
    },
    {
      name: '개설년도',
      type: 'dropdown',
      label: t('개설년도'),
      value: '',
      options: [
        { value: '', label: '전체' },
        { value: 'COMMON_CODE', label: t('개설년도') },
      ],
    },
    {
      name: '사용여부',
      type: 'dropdown',
      label: t('사용여부'),
      value: '',
      options: [
        { value: '', label: '전체' },
        { value: 'COMMON_CODE', label: t('사용여부') },
      ],
    },
    {
      name: '과정코드',
      type: 'text',
      label: t('과정코드'),
    },
    {
      name: '과정명',
      type: 'text',
      label: t('과정명'),
    },
  ],
};

const gridConfig = {
  query: translationQueryOptions.all,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: '채널', label: '채널' },
    { name: '테넌트', label: '테넌트' },
    { name: '과정유형', label: '과정유형' },
    { name: '과정코드', label: '과정코드' },
    { name: '과정', label: '과정명' },
    { name: '차수', label: '차수' },
    { name: '담당자', label: '담당자' },
    { name: '운영자', label: '운영자' },
    { name: '사용여부', label: '사용여부' },
    { name: '개설년도', label: '개설년도' },
    { name: '미리보기', label: '미리보기' },
    { name: '등록일', label: '등록일' },
    { name: '등록자', label: '등록자' },
    { name: 'URL 생성', label: 'URL 생성' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
