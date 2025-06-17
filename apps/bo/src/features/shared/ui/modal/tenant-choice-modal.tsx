import { FC, useState, forwardRef, useCallback } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { tenantQueryOptions } from '@entities/tenant/service/tenant.queries';

const TenantModalComponent: FC<any> = forwardRef(({ rootPath }, ref) => {
  const { close: closeModal } = useModal();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          required: true,
          name: 'tenantId',
          type: 'dropdown',
          format: 'number',
          label: t('테넌트'),
          value: undefined,
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.tenant.tenantId'],
          },
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            placeholder: '입력 또는 선택',
          },
        },
        {
          name: 'companyCode',
          type: 'dropdown',
          label: t('회사'),
          value: '',
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.company.companyCode'],
          },
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            placeholder: '입력 또는 선택',
          },
        },
        {
          name: 'tenantMappingRoleName',
          type: 'text',
          label: t('테넌트 담당자'),
          value: '',
        },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('사용여부'),
          value: '',
          options: [
            { value: '', label: t('전체') },
            { value: 2, label: t('사용') },
            { value: 3, label: t('미사용') },
          ],
        },
      ],
      [],
    ],
    validator: {
      tenantId: { required: true },
    },
  };

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const gridConfig = {
    query: tenantQueryOptions.list,
    columns: [
      {
        name: 'no1',
        label: 'NO.',
        type: 'numbering',
      },
      {
        name: 'tenantName',
        label: t('테넌트'),
        render: (info: any) => info.row.original.tenantName,
      },
      {
        name: 'companyTenantList',
        label: t('회사'),
        render: (info: any) => {
          const companyNames = info.row.original.companyTenantList.map(({ companyName }: any) => {
            return companyName;
          });
          return companyNames.toString();
        },
      },
      {
        name: 'tenantUserList',
        label: t('테넌트 담당자'),
        render: (info: any) => {
          const tenantUserList = info.row.original.tenantUserList.map(({ userName }: any) => {
            return userName;
          });
          return tenantUserList.toString();
        },
      },
      {
        name: 'isUsed',
        label: '사용여부',
        render: (info: any) => {
          return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
        },
      },
    ],
    data: [],

    pagination: {
      pageSize: 10,
      pageIndex: 0,
      totalRows: 0,
    },
  };
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  return (
    <ModalContainer>
      <ModalTitle>테넌트 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={gConfig}
              //   columns={columns}
              // showColumnSettings={false}
              title={t('테넌트 목록')}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const TenantChoiceModal = TenantModalComponent;
