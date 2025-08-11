import {
  MultilingualUpdateReqParams,
  useDeployTranslation,
  useTranslation,
} from '@entities/translation';
import {
  createGridConfig,
  MultilingualSearchForm,
  TranslationStatusPopup,
} from '@features/platform-management/platform/multilingual-managemnet';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { PMSApiPrefix } from '@learnway/config';
import {
  CODE_GROUP,
  getCodeLabel,
  SelectOption,
  useCodeStore,
  useCurrentRoute,
  useDynamicForm2,
} from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { CountText, Divider } from '@learnway/ui/elements';
import { TableBox, useGridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui/buttons';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui/layout';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

export const Route = createLazyFileRoute('/_layout/platform/system/multilingual/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { confirm, alert, openModal } = useModal();
  const { state } = useCurrentRoute();
  const { data: authUser } = useFetchAuthUser();
  const { provider, onSubmit, getValues, setValue, control } = useDynamicForm2();

  const [valuesWithLabel, setValuesWithLabel] = useState<Record<string, SelectOption>>({});
  const { getCode } = useCodeStore();
  const keyTypeCode = useWatch({ control, name: 'keyTypeCode' });
  const targetLocale = useWatch({ control, name: 'targetLocale' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyTypeCodeOptions, setKeyTypeCodeOptions] = useState<SelectOption[]>([]);
  const [targetLocaleOptions, setTargetLocaleOptions] = useState<SelectOption[]>([]);

  const getGridFetchParams = () => ({
    ...getValues(),
    roleId: authUser?.activeRole?.roleId,
    tenantId: authUser?.activeTenant?.tenantId,
  });

  const { update } = useTranslation({
    onSuccess: () => {
      setIsSubmitting(false);
      gridFetch(getGridFetchParams());
    },
  });

  const { createByExcel } = useTranslation({
    onSuccess: () => {
      gridFetch(getGridFetchParams());
    },
  });

  const { deploy } = useDeployTranslation({});
  const router = useRouter();
  const [currentTargetLocale, setCurrentTargetLocale] = useState<string>('');

  const [successTranslationCount, setSuccessTranslationCount] = useState<number>(0);

  const handleCellClick = useCallback(
    (data: any) => {
      openModal({
        content: <TranslationStatusPopup {...data} />,
      });
    },
    [openModal],
  );

  const gridConfig = useMemo(
    () => createGridConfig(handleCellClick, currentTargetLocale),
    [handleCellClick, currentTargetLocale],
  );

  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getGridFetchParams);
  const gridStateRef = useRef<any>(null); // 그리드 상태 저장용

  // 커스텀 reset 핸들러 - 초기값으로 설정
  const handleReset = useCallback(() => {
    setValue('keyTypeCode', '');
    setValue('targetLocale', '');
    setValue('isTranslated', '');
    setValue('multilingualKey', '');
    setValue('translation', '');
  }, [setValue]);

  /**
   * @param data
   */
  const handleOnSearch = async (form: any) => {
    setCurrentTargetLocale(form.targetLocale);
    gridFetch(
      { ...form, roleId: authUser?.activeRole?.roleId, tenantId: authUser?.activeTenant?.tenantId },
      { ...gridStateRef.current, page: 0 },
    );

    // valuesWithLabel 설정
    const newValuesWithLabel: Record<string, SelectOption> = {};
    if (form.keyTypeCode) {
      const keyTypeOptions = await getCode(CODE_GROUP['pms.multilingual.KeyTypeCode']);
      const keyTypeOption = keyTypeOptions.find((opt) => opt.value === form.keyTypeCode);
      if (keyTypeOption) newValuesWithLabel.keyTypeCode = keyTypeOption;
    }
    if (form.targetLocale) {
      const targetLocaleOptions = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const targetLocaleOption = targetLocaleOptions.find((opt) => opt.value === form.targetLocale);
      if (targetLocaleOption) newValuesWithLabel.targetLocale = targetLocaleOption;
    }
    if (form.isTranslated) {
      newValuesWithLabel.isTranslated = {
        value: form.isTranslated,
        label: form.isTranslated === 'true' ? t('번역완료') : t('번역필요'),
      };
    }
    setValuesWithLabel(newValuesWithLabel);
  };

  /**
   *  번역본 S3 배포
   */
  const handleDeployMultilingual = async () => {
    const targetLocale = getValues('targetLocale');
    if (targetLocale) {
      deploy({ locale: targetLocale.toLowerCase() });
    }
  };

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
    const keyTypeCode = getValues('keyTypeCode');
    const targetLocale = getValues('targetLocale');
    if (!keyTypeCode || !targetLocale) {
      setIsSubmitting(false);
      return;
    }
    const uploadData: MultilingualUpdateReqParams = {
      keyTypeCode,
      targetLocale: targetLocale.toLowerCase(),
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
    const targetLocale = getValues('targetLocale');
    if (targetLocale) {
      await createByExcel({
        data,
        params: { targetLocale: targetLocale.toLowerCase() },
      });
    }
  };

  const customExcelButtons = (
    <>
      <GridExcelUploadButton
        validateUrl="/multilingual/excelUploadValidation"
        disabled={!data || (data && data.content && data.content.length === 0)}
        onUpload={handleExcelUpload}
      />
      <GridExcelDownloadButton
        url={`${PMSApiPrefix()}/multilingual/exportExcel`}
        params={{ ...getValues(), targetLocale: getValues('targetLocale')?.toLowerCase() || '' }}
        paramLabels={valuesWithLabel}
        dataCount={data?.totalElements}
        disabled={!data?.totalElements}
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
      const formData = {
        keyTypeCode: state?.keyType || '',
        multilingualKey: state?.multilingualKey || '',
        translation: state.translation || '',
        targetLocale: 'EN',
        isTranslated: '',
        isMenuEntry: state?.isMenuEntry || false,
      };

      // Form values 설정
      Object.entries(formData).forEach(([key, value]) => {
        setValue(key, value);
      });

      // 검색 실행
      await handleOnSearch(formData);
    }
  };

  // 옵션 초기화
  useEffect(() => {
    const loadOptions = async () => {
      // keyTypeCode 옵션 로드
      const keyTypeOptions = await getCode(CODE_GROUP['pms.multilingual.KeyTypeCode']);
      const defaultOPtions = keyTypeOptions.map((item) => {
        return { label: item.cdContent, value: item.value };
      });
      const isPlatformManager = authUser?.activeRole?.roleType === 'PLATFORM_MANAGER';

      if (!isPlatformManager) {
        const filteredOptions = defaultOPtions.filter((option) =>
          ['', 'LEARNER_MENU', 'HRD_CENTER_MENU'].includes(String(option.value)),
        );
        setKeyTypeCodeOptions([{ value: '', label: t('선택') }, ...filteredOptions]);
      } else {
        setKeyTypeCodeOptions([{ value: '', label: t('선택') }, ...defaultOPtions]);
      }

      // targetLocale 옵션 로드
      const localeOptions = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      setTargetLocaleOptions([{ value: '', label: t('선택') }, ...localeOptions]);
    };

    loadOptions();
    init();
  }, [authUser?.activeRole?.roleType]);

  // keyTypeCode 변경 시 targetLocale 옵션 업데이트
  useEffect(() => {
    const updateTargetLocaleOptions = async () => {
      if (keyTypeCode === 'HRD_CENTER_MENU') {
        const allOptions = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
        const filteredOptions = allOptions.filter((option) => option.value === 'EN');
        setTargetLocaleOptions([{ value: '', label: t('선택') }, ...filteredOptions]);

        // 현재 선택된 targetLocale이 EN이 아니면 초기화
        const currentTargetLocale = getValues('targetLocale');
        if (currentTargetLocale && currentTargetLocale !== 'EN') {
          setValue('targetLocale', '');
        }
      } else if (keyTypeCode) {
        const allOptions = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
        setTargetLocaleOptions([{ value: '', label: t('선택') }, ...allOptions]);
      }
    };

    if (keyTypeCode !== undefined) {
      updateTargetLocaleOptions();
    }
  }, [keyTypeCode]);

  useEffect(() => {
    if (data?.content?.length > 0) {
      setSuccessTranslationCount(data.content[0].targetTranslatedCount);
    } else {
      setSuccessTranslationCount(0);
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
              onClick={() => {
                router.navigate({ to: '/platform/menu' });
              }}
            >
              {t('메뉴관리')}
            </Button>

            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={() => {
                router.navigate({ to: '/platform/label-message' });
              }}
            >
              {t('라벨/메세지 관리')}
            </Button>
          </LinkBox>
          <Button
            type="button"
            variant="point"
            // disabled={isSaveDisable}
            disabled={targetLocale === ''}
            size="sm"
            onClick={handleDeployMultilingual}
          >
            {t('배포')}
          </Button>

          <Button
            type="button"
            variant="primary"
            disabled={
              targetLocale === '' ||
              !data ||
              !data.content ||
              data.content.length === 0 ||
              isSubmitting
            }
            size="sm"
            onClick={handleSaveMultilingual}
          >
            {t('저장')}
          </Button>
        </ContentsButtons>
        <MainContents>
          <MultilingualSearchForm
            provider={provider}
            onSubmit={onSubmit}
            onSearch={handleOnSearch}
            keyTypeCodeOptions={keyTypeCodeOptions}
            targetLocaleOptions={targetLocaleOptions}
            keyTypeCode={keyTypeCode}
            onReset={handleReset}
          />
          <Divider />
          <TableBox
            config={gConfig}
            titleCustomNode={
              <>
                <CountText
                  label={t('pms.multilingual.Is_Translation.true', '')}
                  count={successTranslationCount}
                />
                <span className={'normal_text'}>
                  {t('LABEL.platform.system.multilingual.currentTranslationLanguage')} :{' '}
                  {currentTargetLocale
                    ? getCodeLabel(
                        CODE_GROUP['pms.multilingual.LangCountryCode'],
                        currentTargetLocale,
                      )
                    : ''}
                </span>
              </>
            }
            excelButtons={customExcelButtons}
          />
        </MainContents>
      </PageContainer>
    </div>
  );
}
