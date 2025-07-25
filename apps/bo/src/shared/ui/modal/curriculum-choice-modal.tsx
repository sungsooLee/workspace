import { t } from 'i18next';
import {
  Button,
  Divider,
  GridBox,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { SearchBox } from '../search-box';
import { CODE_GROUP, SearchBoxConfig, useLanguageMap, useSearchBox } from '@learnway/hooks';
import { TenantByRoleDropdownFormField, TenantChannelDropdownFormField } from '../form';
import { queryOptions } from '@entities/curriculum';
import { useEffect, useState } from 'react';

interface Props {
  initialTenantId?: number;
  initialChannelUuid?: number;
  initialContentType?: string; // 유형인데 API에는 없음
  openingYear?: number;
  languageCountryCode?: string;
  curriculumName?: string;
}

export const CurriculumChoiceModal = ({
  initialTenantId,
  initialChannelUuid,
  initialContentType,
  openingYear,
  languageCountryCode,
  curriculumName,
}: Props) => {
  const { closeModal } = useModal();

  const { getLanguageName } = useLanguageMap();
  const [selectedRow, setSelectedRow] = useState();

  const SearchBoxConfig = (): SearchBoxConfig => ({
    builders: [
      [
        {
          name: 'tenantId',
          type: 'custom',
          label: t('테넌트'),
          value: initialTenantId || '',
          format: 'object',
          element: <TenantByRoleDropdownFormField />,
          readOnly: true,
        },
        {
          name: 'channelUuid',
          type: 'custom',
          label: t('채널'),
          value: initialChannelUuid || '',
          format: 'object',
          element: <TenantChannelDropdownFormField readOnly />,
        },
        // {
        //   name: 'contentTypes',
        //   type: 'dropdown',
        //   label: t('유형'),
        //   value: initialContentType ?? '',
        //   variant: 'text',
        //   format: 'string',
        //   readOnly: initialContentType ? true : false,
        //   presetOptionLabel: t('LABEL.form.label.all', '전체'),
        //   optionsConfig: {
        //     codeGroup: CODE_GROUP['cms.content.ContentType'],
        //   },
        // },
      ],
      [
        {
          name: 'openingYear',
          type: 'dropdown',
          label: t('개설년도'),
          value: openingYear || '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          // optionsConfig: {
        },
        {
          name: 'languageCountryCode',
          type: 'dropdown',
          label: t('언어'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
          },
        },
        {
          name: 'curriculumName',
          label: t('커리큘럼명'),
          type: 'text',
          value: '',
        },
      ],
    ],
    validator: {
      tenantId: true,
      channelUuid: true,
    },
  });

  const gridBoxConfig: useGridBoxConfig = {
    query: (param: any) => queryOptions.list(param),
    columns: [
      {
        name: 'openingYear',
        label: t('개설연도'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
      },
      //   { field: 'con', headerName: t('유형'), width: 200 }, 유형 아직 없음
      { name: 'curriculumName', label: t('커리큘럼명'), size: 400 },
      {
        name: 'languageCountryCode',
        label: t('언어'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
        render: (info: any) => {
          const locale = info.getValue();
          return getLanguageName(locale);
        },
      },
      {
        name: 'preview',
        label: t('미리보기'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
        render: (info: any) => (
          <p className="underline" onClick={() => console.log(info)}>
            미리보기
          </p>
        ),
      },
    ],
  };

  const { provider, getValues, onFormChange } = useSearchBox(SearchBoxConfig());
  const { config, gridFetch } = useGridBox(gridBoxConfig, getValues);

  const handleOnConfirm = () => {
    if (!selectedRow) return;
    closeModal(selectedRow);
  };

  useEffect(() => {
    const initialValues: any = {};

    if (initialTenantId) {
      initialValues.tenantId = initialTenantId;
    }

    if (initialChannelUuid) {
      initialValues.channelUuid = initialChannelUuid;
    }

    if (initialContentType) {
      initialValues.contentTypes = initialContentType;
    }

    if (Object.keys(initialValues).length > 0) {
      onFormChange(initialValues);
    }
  }, [initialTenantId, initialChannelUuid, initialContentType, onFormChange]);

  useEffect(() => {
    gridFetch(getValues());
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('커리큘럼 선택')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={provider} onSearch={gridFetch} />
        <Divider />
        <GridBox config={config} showNumberingColumn onRowSelect={setSelectedRow} />
      </ModalBody>
      <ModalFooter>
        <Button label={t('확인')} variant="primary" size="lg" onClick={handleOnConfirm} />
      </ModalFooter>
    </ModalContainer>
  );
};
