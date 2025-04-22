import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, EditInputCell, EditTextareaCell, useModal } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { GridBox, useGridBox } from '@shared/ui/grid-box';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { translationQueryOptions } from '@entities/translation/service/translation.queries';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { SearchBoxConfig, SelectOption, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '@shared/ui/search-box';
import { CODE_GROUP } from '@learnway/config';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from '@entities/translation/service/translation.hook';
import { useFetchCodeGroups } from '@entities/platform';

export const Route = createFileRoute('/_layout/platform/system/multilingual/')({
  component: RouteComponent,
});
type TranslationType = {
  targetLocale: string;
  translations: { multilingualKey: string; translation: string }[];
};

function RouteComponent() {
  const { confirm } = useModal();
  const { state } = Route.useRouteContext();
  const { provider: sProvider, getValues, onFormChange } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const { update } = useTranslation();
  const [currentTargetLocale, setCurrentTargetLocale] = useState<string>('');
  const isSaveDisable = useMemo(
    () => gConfig.totalRows === 0 || currentTargetLocale === '',
    [gConfig.totalRows, currentTargetLocale],
  );
  /**
   * @param data
   */
  const handleOnSearch = useCallback((data: any) => {
    setCurrentTargetLocale(getValues('targetLocale'));
    gridFetch(data);
  }, []);
  /**
   * 등록화면 이동
   */
  const handleNewTranslation = useCallback(async () => {
    if (
      !(await confirm({
        title: '저장 하시겠습니까?',
        content: '화면에 노출된 번역 언어만 저장됩니다.',
      }))
    )
      return;

    const uploadData: TranslationType = {
      targetLocale: getValues('targetLocale'),
      translations: [],
    };
    data.forEach((item: any) => {
      uploadData.translations.push({
        multilingualKey: item.multilingualKey,
        translation: item.targetLanguage || '',
      });
    });
    update(uploadData);
  }, [data]);

  useEffect(() => {
    if (state.keyType) {
      onFormChange({ keyType: 'MENU', multilingualKey: state.multilingualKey || '' });
    }
  }, []);
  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm">
          메뉴 관리
        </Button>
        <Button type="button" variant="point" size="sm">
          카테고리 관리
        </Button>
        <Button type="button" variant="point" size="sm">
          공통코드 관리
        </Button>
        <Button type="button" variant="point" size="sm">
          라벨/메세지 관리
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={isSaveDisable}
          size="sm"
          onClick={handleNewTranslation}
        >
          저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        {currentTargetLocale}
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
        label: '분류',
        value: 'LABEL',
        options: [],
        optionsConfig: {
          type: 'self',
          codeGroup: CODE_GROUP.MULTILINGUAL_KEY_TYPE_CODE,
        },
      },
      {
        name: 'targetLocale',
        type: 'dropdown',
        label: '번역언어',
        value: 'en',
        options: [],
        optionsConfig: {
          type: 'self',
          codeGroup: CODE_GROUP.MULTILINGUAL,
          excludeValues: ['kr'],
          filter: {
            target: 'keyType',
            value: 'MENU',
            fn: (options: SelectOption[]) => options.filter((option) => option.value === 'en'),
          },
        },
      },
      {
        name: 'translationYn',
        type: 'dropdown',
        label: '번역상태',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'Y', label: '번역완료' },
          { value: 'N', label: '번역필요' },
        ],
      },
    ],
    [
      {
        name: 'multilingualKey',
        type: 'text',
        label: '코드(메뉴 코드/카테고리 코드/공통 코드/라벨 코드/메세지 코드)',
        value: '',
      },
      {
        name: 'translation',
        type: 'text',
        label: '기준명(메뉴명/카테고리명/공통코드명/라벨명/메세지명)',
        value: '',
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
      size: 50,
    },
    {
      name: 'keyType',
      label: '분류',
    },
    { name: 'multilingualKey', label: '코드' },
    {
      name: 'baseLanguage',
      label: '번역명(한국어)',
    },
    {
      name: 'targetLanguage',
      label: '번역명(번역언어)',
      accessorKey: 'text',
      render: (info: CellContext<any, string>) => {
        return info.row.getValue('keyType') === 'MESSAGE' ? (
          <EditTextareaCell info={info} textarea={{ maxLength: 100 }} />
        ) : (
          <EditInputCell info={info} input={{ type: 'text' }} />
        );
      },
    },
    {
      name: 'totalTranslatedCount',
      label: '번역완료',
      render: (info: CellContext<any, string>) => {
        return `${info.row.original.totalTranslatedCount} / ${info.row.original.totalLocaleCount}`;
      },
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
