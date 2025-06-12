import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  CountText,
  EditInputCell,
  EditTextareaCell,
  TableBox,
  useGridBox,
  useModal,
} from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { translationQueryOptions } from '@entities/translation/service/translation.queries';
import { CODE_GROUP, SearchBoxConfig, useCurrentRoute, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '@shared/ui/search-box';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from '@entities/translation/service/translation.hook';
import { t } from 'i18next';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { GridExcelButtons } from '@features/shared';
import { TranslationStatusPopup } from '@features/platform/system/multilingual/translation-status-popup';

export const Route = createFileRoute('/_layout/platform/system/multilingual/')({
  component: RouteComponent,
});
type TranslationType = {
  keyTypeCode: string;
  targetLocale: string;
  translations: { multilingualKey: string; translation: string }[];
};

function RouteComponent() {
  const { confirm, alert, open: openModal } = useModal();
  const { state } = useCurrentRoute();
  const { provider: sProvider, getValues, onFormChange, onFormValid } = useSearchBox(searchConfig);

  const { update } = useTranslation();
  const router = useRouter();
  const [currentTargetLocale, setCurrentTargetLocale] = useState<string>('');

  const handleCellClick = useCallback(
    (data: any) => {
      openModal({
        content: <TranslationStatusPopup {...data} />,
      });
    },
    [openModal],
  );

  const gridConfig = useMemo(() => createGridConfig(handleCellClick), [handleCellClick]);

  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const isSaveDisable = useMemo(
    () => gConfig.totalRows === 0 || currentTargetLocale === '',
    [gConfig.totalRows, currentTargetLocale],
  );
  // 번역완료
  const [successTranslationCount, setSuccessTranslationCount] = useState<number>(0);
  /**
   * @param data
   */
  const handleOnSearch = useCallback((form: any) => {
    setCurrentTargetLocale(getValues('targetLocale'));
    gridFetch(form);
  }, []);

  /**
   *  번역본 S3 배포
   */
  const handleDeployMultilingual = () => {
    alert('준비중입니다.');
  };

  /**
   * 번역본 저장
   */
  const handleSaveMultilingual = useCallback(async () => {
    console.log('data => ', data);
    if (!data) return;
    if (
      !(await confirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.platform.system.multilingual.save-content'),
      }))
    ) {
      return;
    }
    const uploadData: TranslationType = {
      keyTypeCode: getValues('keyTypeCode'),
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

  const customExcelButtons = (
    <GridExcelButtons
      showUpload={true}
      showDownload={true}
      uploadUrl="/multilingual/exportExcel"
      validateUrl="/multilingual/excelUploadValidation"
      downloadUrl="/multilingual/exportExcel"
      downloadParams={getValues()}
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
  );

  const init = async () => {
    if (state.keyType || state.multilingualKey) {
      onFormChange({
        keyTypeCode: state?.keyType,
        multilingualKey: state?.multilingualKey || '',
        translation: state.translation || '',
        targetLocale: 'en',
      });
      if (await onFormValid()) {
        handleOnSearch(getValues());
      }
    }
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setSuccessTranslationCount(data[0].targetTranslatedCount);
    } else {
      setSuccessTranslationCount(0);
    }
  }, [data]);
  return (
    <div>
      <PageContainer>
        <ContentsButtons>
          <LinkBox>
            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={() => {
                router.navigate({ to: '/platform/menu' });
              }}
            >
              {t('LABEL.platform.system.multilingual.platform-menu')}
            </Button>
            {/* <Button
              type="button"
              variant="point"
              size="sm"
              onClick={() => {
                router.navigate({ to: '/platform/category' });
              }}
            >
              {t('LABEL.platform.system.multilingual.platform-category')}
            </Button> */}
            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={() => {
                router.navigate({
                  to: '/platform/code/common-code-group',
                });
              }}
            >
              {t('LABEL.platform.system.multilingual.platform-code-common-code-group')}
            </Button>
            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={() => {
                router.navigate({
                  to: '/platform/label-message',
                });
              }}
            >
              {t('LABEL.platform.system.multilingual.platform-message')}
            </Button>
          </LinkBox>
          <Button
            type="button"
            variant="primary"
            disabled={isSaveDisable}
            size="sm"
            onClick={handleDeployMultilingual}
          >
            {t('LABEL.button.deploy')}
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={isSaveDisable}
            size="sm"
            onClick={handleSaveMultilingual}
          >
            {t('LABEL.button.save')}
          </Button>
        </ContentsButtons>
        <MainContents>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className="grid_wrap">
              <TableBox
                config={gConfig}
                titleCustomNode={
                  <>
                    {/*번역완료 개수*/}
                    <CountText
                      label={t('pms.multilingual.Is_Translation.true', '')}
                      count={successTranslationCount}
                    />
                    {/*번역중인언어*/}
                    <span className={'normal_text'}>
                      {t('LABEL.platform.system.multilingual.currentTranslationLanguage')} :{' '}
                      {currentTargetLocale
                        ? t(`pms.multilingual.LanguageType.${currentTargetLocale}`)
                        : ''}
                    </span>
                  </>
                }
                excelButtons={customExcelButtons}
                // showExcelDownload={true}
                // showUpload={true}
              />
            </div>
          </div>
        </MainContents>
      </PageContainer>
    </div>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'keyTypeCode',
        type: 'dropdown',
        label: 'LABEL.platform.system.multilingual.keyType',
        value: '',
        optionsConfig: {
          options: [{ value: '', label: 'LABEL.form.label.select' }],
          codeGroup: CODE_GROUP['pms.multilingual.KeyTypeCode'],
        },
      },
      {
        name: 'targetLocale',
        type: 'dropdown',
        label: 'LABEL.platform.system.multilingual.translationLanguage',
        value: '',

        optionsConfig: {
          options: [{ value: '', label: 'LABEL.form.label.select' }],
          codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
          /*type: 'self',
          excludeValues: ['kr'],
          filter: {
            target: 'keyType',
            value: 'HRD_CENTER_MENU',
            fn: (options: SelectOption[]) => options.filter((option) => option.value === 'en'),
          },*/
        },
      },
      {
        name: 'isTranslated',
        type: 'dropdown',
        label: 'LABEL.platform.system.multilingual.translationStatus',
        value: '',
        options: [
          { value: '', label: 'LABEL.all' },
          { value: 'true', label: 'pms.multilingual.Is_Translation.true' },
          { value: 'false', label: 'pms.multilingual.Is_Translation.false' },
        ],
      },
    ],
    [
      {
        name: 'multilingualKey',
        type: 'text',
        label: 'LABEL.platform.system.multilingual.multilingualKey',
        value: '',
        customConfig: {
          placeholder: {
            target: 'keyTypeCode',
            placeholder: (item: Record<string, any>) => {
              if (!item.keyTypeCode) {
                return 'LABEL.platform.system.multilingual.placeholder.multilingualKey.default';
              }
              return `LABEL.platform.system.multilingual.placeholder.multilingualKey.${item.keyTypeCode}`;
            },
          },
        },
      },
      {
        name: 'translation',
        type: 'text',
        label: 'LABEL.platform.system.multilingual.translation',
        value: '',
        customConfig: {
          placeholder: {
            target: 'keyTypeCode',
            placeholder: (item: Record<string, any>) => {
              if (!item.keyTypeCode) {
                return 'LABEL.platform.system.multilingual.placeholder.translation.default';
              }
              return `LABEL.platform.system.multilingual.placeholder.translation.${item.keyTypeCode}`;
            },
          },
        },
      },
    ],
  ],
  validator: {
    keyTypeCode: true,
    targetLocale: true,
  },
};

const createGridConfig = (onCellClick: (data: any) => void) => ({
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
      label: t('LABEL.platform.system.multilingual.keyType'),
    },
    {
      name: 'multilingualKey',
      label: t('LABEL.platform.system.multilingual.code'),
    },
    {
      name: 'baseLanguage',
      label: t('LABEL.platform.system.multilingual.baseLanguage'),
    },
    {
      name: 'targetLanguage',
      label: t('LABEL.platform.system.multilingual.targetLanguage'),
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
      label: t('LABEL.platform.system.multilingual.totalTranslatedCount'),
      render: (info: CellContext<any, string>) => {
        return (
          <div
            onClick={() => {
              const data = info.row.original;
              onCellClick(data);
            }}
            className="cursor-pointer underline"
          >
            {info.row.original.totalTranslatedCount} / {info.row.original.totalLocaleCount}
          </div>
        );
      },
    },
    {
      name: 'lastModifiedBy',
      label: t('LABEL.grid.column.updatedBy'),
      translation: true,
    },
    {
      name: 'modifiedDate',
      label: t('LABEL.grid.column.updatedDate'),
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
});
