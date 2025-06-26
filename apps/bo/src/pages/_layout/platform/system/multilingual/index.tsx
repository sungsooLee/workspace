import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
  Button,
  CountText,
  EditInputCell,
  EditTextareaCell,
  TableBox,
  useGridBox,
  useModal,
} from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString, SelectOption } from '@learnway/shared';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { translationQueryOptions } from '@entities/translation/service/translation.queries';
import {
  CODE_GROUP,
  SearchBoxConfig,
  useCurrentRoute,
  useSearchBox,
  useLanguageMap,
  useCodeStore,
  useUnsavedChangesConfirm,
} from '@learnway/hooks';
import { useWatch } from 'react-hook-form';
import { SearchBox } from '@shared/ui/search-box';
import { CellContext } from '@tanstack/react-table';
import {
  useDeployTranslation,
  useTranslation,
} from '@entities/translation/service/translation.hook';
import { t } from 'i18next';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { GridExcelDownloadButton, GridExcelUploadButton } from '@features/shared';
import { TranslationStatusPopup } from '@features/platform/system/multilingual/translation-status-popup';
import { PMSApiPrefix } from '@learnway/config';

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
  const {
    provider: sProvider,
    getValues,
    onFormChange,
    onFormValid,
    setOptions,
    control,
    setValue,
  } = useSearchBox(searchConfig);
  const { getCode } = useCodeStore();
  const { getLanguageName } = useLanguageMap();
  const keyTypeCode = useWatch({ control, name: 'keyTypeCode' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { update } = useTranslation({
    onSuccess: () => {
      setIsSubmitting(false);
      setShouldUpdateOriginalData(true); // 변경 후 OriginalData 갱신하기 위함.
      gridFetch(getValues());
    },
  });

  const { deploy } = useDeployTranslation({});
  const router = useRouter();
  const [currentTargetLocale, setCurrentTargetLocale] = useState<string>('');

  const [successTranslationCount, setSuccessTranslationCount] = useState<number>(0);
  const originalDataRef = useRef<any>(null);
  const [shouldUpdateOriginalData, setShouldUpdateOriginalData] = useState<boolean>(true);

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

  // 커스텀 훅을 사용한 간단한 변경사항 확인
  const { confirmChanges } = useUnsavedChangesConfirm(originalDataRef.current, data?.content, {
    compareFields: ['targetLanguage'], // 비교할 필드 지정
    deepCompare: false,
    confirmFunction: confirm,
    confirmOptions: {
      title: t('LABEL.confirm.unsaved.title'),
      content: t('LABEL.confirm.unsaved.message'),
    },
  });

  const withUnsavedChangesCheck = useCallback(
    <T extends any[]>(action: (...args: T) => void | Promise<void>) => {
      return async (...args: T) => {
        if (!(await confirmChanges())) return;
        await action(...args);
      };
    },
    [confirmChanges],
  );

  const wrappedGridConfig = useMemo(() => {
    const originalOnStateChange = gConfig.onStateChange;
    return {
      ...gConfig,
      onStateChange: async (state: any) => {
        if (!(await confirmChanges())) return;
        setShouldUpdateOriginalData(true); // 소트 후 새 데이터로 originalData 업데이트
        originalOnStateChange?.(state);
      },
    };
  }, [gConfig, confirmChanges]);

  /**
   * @param data
   */
  const handleOnSearch = async (form: any) => {
    if (!(await confirmChanges())) return;
    setCurrentTargetLocale(getValues('targetLocale'));
    originalDataRef.current = null; // 검색 시 즉시 초기화
    setShouldUpdateOriginalData(true); // 검색 시 originalData 업데이트 허용
    gridFetch(getValues());
  };

  /**
   *  번역본 S3 배포
   */
  const handleDeployMultilingual = withUnsavedChangesCheck(async () => {
    const locale = getValues('targetLocale').toLowerCase();
    deploy({ locale: locale });
  });

  /**
   * 번역본 저장
   */
  const handleSaveMultilingual = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!data) return;
    if (
      !(await confirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.platform.system.multilingual.save-content'),
      }))
    ) {
      setIsSubmitting(false);
      return;
    }
    const uploadData: TranslationType = {
      keyTypeCode: getValues('keyTypeCode'),
      targetLocale: getValues('targetLocale').toLowerCase(),
      translations: [],
    };
    const dataArr = data.content;
    dataArr.forEach((item: any) => {
      uploadData.translations.push({
        multilingualKey: item.multilingualKey,
        translation: item.targetLanguage || '',
      });
    });
    update(uploadData);
  }, [data, isSubmitting, confirm, getValues, update]);

  const handleExcelUpload = async (data: Record<string, any>[]) => {
    console.log('🚀 ~ handleExcelUpload ~ data:', data);
    // data post 처리 로직
  };

  const customExcelButtons = (
    <>
      <GridExcelUploadButton
        validateUrl="/multilingual/excelUploadValidation"
        disabled={data && data.content && data.content.length === 0}
        onUpload={handleExcelUpload}
      />
      <GridExcelDownloadButton
        url={`${PMSApiPrefix()}/multilingual/exportExcel`}
        params={getValues()}
        disabled={data && data.content && data.content.length === 0}
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
  );

  const init = async () => {
    if (state.keyType || state.multilingualKey) {
      onFormChange({
        keyTypeCode: state?.keyType,
        multilingualKey: state?.multilingualKey || '',
        translation: state.translation || '',
        targetLocale: 'EN',
      });
      if (await onFormValid()) {
        handleOnSearch(getValues());
      }
    }
  };

  useEffect(() => {
    const updateTargetLocaleOptions = async () => {
      const allOptions = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const baseOptions = [{ value: '', label: t('LABEL.form.label.select') }];
      const currentTargetLocale = getValues('targetLocale');

      if (keyTypeCode === 'HRD_CENTER_MENU') {
        const filteredOptions = allOptions.filter((option) => option.value === 'EN');
        const newOptions = [...baseOptions, ...filteredOptions];
        setOptions('targetLocale', newOptions);

        const availableValues = newOptions.map((option) => option.value);
        if (currentTargetLocale && !availableValues.includes(currentTargetLocale)) {
          setValue('targetLocale', '');
        }
      } else {
        setOptions('targetLocale', [...baseOptions, ...allOptions]);
      }
    };

    updateTargetLocaleOptions();
  }, [keyTypeCode]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (data?.content?.length > 0) {
      setSuccessTranslationCount(data.content[0].targetTranslatedCount);
      console.log('새 데이터:', data.content);
      if (shouldUpdateOriginalData) {
        originalDataRef.current = JSON.parse(JSON.stringify(data.content));
        console.log('originalData 업데이트됨:', originalDataRef.current);
        setShouldUpdateOriginalData(false);
      }
    } else {
      setSuccessTranslationCount(0);
      if (shouldUpdateOriginalData) {
        originalDataRef.current = null;
      }
    }
  }, [data?.content]);

  return (
    <div>
      <PageContainer>
        <ContentsButtons>
          <LinkBox>
            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={withUnsavedChangesCheck(() => {
                router.navigate({ to: '/platform/menu' });
              })}
            >
              {t('LABEL.platform.system.multilingual.platform-menu')}
            </Button>

            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={withUnsavedChangesCheck(() => {
                router.navigate({ to: '/platform/label-message' });
              })}
            >
              {t('LABEL.platform.system.multilingual.platform-message')}
            </Button>
          </LinkBox>
          <Button
            type="button"
            variant="point"
            // disabled={isSaveDisable}
            size="sm"
            onClick={handleDeployMultilingual}
          >
            {t('LABEL.button.deploy')}
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={
              getValues('targetLocale') === '' ||
              (data && data.content && data.content.length === 0) ||
              isSubmitting
            }
            size="sm"
            onClick={handleSaveMultilingual}
          >
            {t('LABEL.button.save')}
          </Button>
        </ContentsButtons>
        <MainContents>
          <SearchBox
            provider={sProvider}
            onSearch={handleOnSearch}
            onBeforeSubmit={confirmChanges}
          />
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className="grid_wrap">
              <TableBox
                config={wrappedGridConfig}
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
                      {currentTargetLocale ? getLanguageName(currentTargetLocale) : ''}
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
        },
      },
      {
        name: 'isTranslated',
        type: 'dropdown',
        label: 'LABEL.platform.system.multilingual.translationStatus',
        value: '',
        options: [
          { value: '', label: t('LABEL.all') },
          { value: 'true', label: t('pms.multilingual.Is_Translation.true') },
          { value: 'false', label: t('pms.multilingual.Is_Translation.false') },
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
      render: (info: CellContext<any, string>) => {
        return info.row.getValue('keyTypeName');
      },
      // enableHiding: true,
      // meta: {
      //   hidden: true,
      // },
    },
    {
      name: 'keyTypeName',
      label: t('LABEL.platform.system.multilingual.keyType'),
      meta: {
        hidden: true,
      },
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
        return info.row.getValue('keyType') === 'MESSAGE' ||
          info.row.getValue('keyType') === 'LABEL' ? (
          <EditTextareaCell info={info} textarea={{ maxLength: 150 }} />
        ) : (
          <EditInputCell info={info} input={{ type: 'text', maxLength: 150 }} />
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
      size: 80,
      enableSorting: false,
    },
    {
      name: 'modifiedDate',
      label: t('LABEL.grid.column.updatedDate'),
      render: (info: any) => (
        <span className={'whitespace-nowrap'}>
          {getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_MIN)}
        </span>
      ),
      meta: {
        cellAlign: 'center',
      },
    },
  ],
  data: [],
});
