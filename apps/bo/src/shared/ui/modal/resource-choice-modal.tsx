import {
  CODE_GROUP,
  SearchBoxConfig,
  useContentsMap,
  useLanguageMap,
  useSearchBox,
} from '@learnway/hooks';
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
import { t } from 'i18next';
import { TenantByRoleDropdownFormField, TenantChannelDropdownFormField } from '../form';
import { queryOptions } from '@entities/contents';
import { useEffect, useState } from 'react';
import { SearchBox } from '../search-box';
import { TenantChannelDropdownFormField2 } from '../form/tenant-channel-dropdown-form-field2';

interface Props {
  tenantId?: number;
  channelUuid?: number;
  courseType?: string;
}

const ResourceChoiceModalComponent = ({ tenantId, channelUuid, courseType }: Props) => {
  const { close } = useModal();
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
          value: '',
          format: 'object',
          element: <TenantByRoleDropdownFormField />,
          readOnly: true,
        },
        {
          name: 'channelUuid',
          type: 'custom',
          label: t('채널'),
          value: '',
          format: 'object',
          element: <TenantChannelDropdownFormField />,
        },
        {
          name: 'contentTypes',
          type: 'dropdown',
          label: t('유형'),
          value: '',
          variant: 'text',
          format: 'string',
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
          label: t('학습자원명'),
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
      // TODO: 학습자원 링크 누르면 학습자원의 상세 팝업 떠야함.
      {
        size: 300,
        name: 'contentName',
        label: t('학습자원명'),
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
    close(selectedRow);
  };
  useEffect(() => {
    if (!channelUuid) return;
    onFormChange({ channelUuid });
  }, [channelUuid, onFormChange]);

  return (
    <ModalContainer>
      <ModalTitle>{t('학습자원 선택')}</ModalTitle>
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

export const ResourceChocieModal = ResourceChoiceModalComponent;
