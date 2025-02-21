import { useCallback, useEffect } from 'react';
import { Button } from '@learnway/ui';
import { CODE_GROUP } from '@learnway/config';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import useSearchBox from '../../../../../shared/ui/search-box/use-search-box';
import { GridBox, useGridBox } from '../../../../../shared/ui/grid-box';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { SearchBox, SearchBoxConfig } from '../../../../../shared/ui/search-box';
import { translationQueryOptions } from '../../../../../entities/translation/service/translation.queries';

export const Route = createFileRoute('/_layout/platform/system/translation/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { config: sConfig, getData } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getData);

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
    gridFetch();
  }, []);
  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleNewTranslation}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox config={sConfig} onSearch={handleOnSearch} />
        <div style={{ height: '100px' }}></div>
        <GridBox config={gConfig} />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    {
      name: 'languageCode',
      type: 'dropdown',
      label: t('다국어 분류'),
      value: '',
      options: [{ value: '', label: '전체' }],
      optionsConfig: {
        type: 'self',
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
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
          to={'/platform/system/translation/view?code=' + info.getValue()}>
          {info.getValue()}
        </Link>
      ),
    },
    { name: 'useYn', label: '사용여부' },
    { name: 'koreanName', label: '한국어' },
    { name: 'englishName', label: '영어' },
    { name: 'createdBy', label: '등록자' },
    { name: 'createdDate', label: '등록일시' },
    { name: 'lastModifiedBy', label: '수정자' },
    { name: 'modifiedDate', label: '수정일시' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
