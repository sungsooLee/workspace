import { useCallback, useEffect } from 'react';
import { Button } from '@learnway/ui';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { GridBox, useGridBox } from '../../../../../shared/ui/grid-box';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { translationQueryOptions } from '../../../../../entities/translation/service/translation.queries';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../../shared/ui/search-box';

export const Route = createFileRoute('/_layout/platform/system/translation/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  /**
   * @param data
   */
  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  /**
   * 등록화면 이동
   */
  const handleNewTranslation = () => {
    router.navigate({ to: '/platform/system/translation/view' });
  };

  useEffect(() => {
    gridFetch(getValues(), { page: 0, size: 10 });
  }, []);
  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleNewTranslation}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <div style={{ height: '100px' }}></div>
        <GridBox config={gConfig} />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'keyType',
        type: 'dropdown',
        label: t('다국어 분류'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('공통코드') },
          { value: 'LABEL', label: t('라벨') },
          { value: 'CATEGORY', label: t('카테고리') },
          { value: 'ERROR', label: t('에러') },
          { value: 'MESSAGE', label: t('메세지') },
        ],
      },
      {
        name: 'translationCode',
        type: 'text',
        label: t('다국어 코드'),
      },
      {
        name: 'useYn',
        type: 'dropdown',
        label: '사용여부',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'Y', label: '사용' },
          { value: 'N', label: '미사용' },
        ],
      },
    ],
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
    {
      name: 'code',
      label: '다국어코드',
      render: (info: any) => (
        <Link
          className={'text-blue-600'}
          to={'/platform/system/translation/view?messageId=' + info.row.original.messageId}>
          {info.getValue()}
        </Link>
      ),
    },
    { name: 'translation', label: '기준언어' },
    {
      name: 'translationCount',
      label: '다국어번역',
      render: (info: any) => info.getValue() + ' / 28',
    },
    {
      name: 'translationCount_B',
      label: '다국어번역',
      render: (info: any) => (info.row.original.translationCount < 28 ? '번역필요' : '번역완료'),
    },
    {
      name: 'useYn',
      label: '사용여부',
      render: (info: any) => (info.getValue() ? '사용' : '미사용'),
    },
    { name: 'createdBy', label: '등록자' },
    {
      name: 'createdDate',
      label: '등록일시',
      render: (info: any) => (
        <span className={'whitespace-nowrap'}>
          {getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC)}
        </span>
      ),
    },
    { name: 'lastModifiedBy', label: '수정자' },
    {
      name: 'modifiedDate',
      label: '수정일시',
      render: (info: any) => (
        <span className={'whitespace-nowrap'}>
          {getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC)}
        </span>
      ),
    },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
// 2025-03-05 04:06:10
