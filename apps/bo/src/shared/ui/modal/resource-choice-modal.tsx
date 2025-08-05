import { queryOptions } from '@entities/contents';
import {
  CODE_GROUP,
  SearchBoxConfig,
  useContentsMap,
  useLanguageMap,
  useSearchBox,
} from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { TenantByRoleDropdownFormField, TenantChannelDropdownFormField } from '../form';
import { SearchBox } from '../search-box';

interface Props {
  tenantId?: number;
  channelUuid?: number;
  courseType?: string;
  initialTenantId?: number;
  initialChannelUuid?: string;
  initialContentType?: string;
}

const ResourceChoiceModalComponent = ({
  tenantId,
  channelUuid,
  courseType,
  initialTenantId,
  initialChannelUuid,
  initialContentType,
}: Props) => {
  const { closeModal } = useModal();
  const { getLanguageName } = useLanguageMap();
  const { getContentsTypeName } = useContentsMap();
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
        {
          name: 'contentTypes',
          type: 'dropdown',
          label: t('유형'),
          value: initialContentType ?? '',
          variant: 'text',
          format: 'string',
          readOnly: initialContentType ? true : false,
          presetOptionLabel: t('LABEL.form.label.all', '전체'),
          optionsConfig: {
            codeGroup: CODE_GROUP['cms.content.ContentType'],
          },
        },
      ],
      [
        {
          name: 'langCountryCode',
          type: 'dropdown',
          label: t('언어'),
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
          },
        },
        {
          name: 'contentName',
          label: t('교육자원명'),
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
        size: 100,
        name: 'contentType',
        label: t('유형'),
        render: (info: any) => {
          const type = info.getValue();
          return getContentsTypeName(type);
        },
      },
      // TODO: 교육자원 링크 누르면 교육자원의 상세 팝업 떠야함.
      {
        size: 300,
        name: 'contentName',
        label: t('교육자원명'),
      },
      // TODO: 세부정보 유형마다 다르게 보여줘야됨.
      {
        name: 'contentAddInfo',
        label: t('세부정보'),
      },
      {
        name: 'langCountryCode',
        label: t('언어'),
        render: (info: any) => {
          const locale = info.getValue();
          return getLanguageName(locale);
        },
      },
      // TODO: 미리보기 클릭시 학습창 노출 되어야함.
      { name: 'preview', label: t('미리보기') },
    ],
  };

  const { provider, getValues, onFormChange } = useSearchBox(SearchBoxConfig());
  const { config, gridFetch } = useGridBox(gridBoxConfig, getValues);

  const handleOnConfirm = () => {
    if (!selectedRow) return;
    closeModal(selectedRow);
  };
  useEffect(() => {
    if (!channelUuid) return;
    onFormChange({ channelUuid });
  }, [channelUuid, onFormChange]);

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
      <ModalTitle>{t('교육자원 선택')}</ModalTitle>
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

export const ResourceChoiceModal = ResourceChoiceModalComponent;
