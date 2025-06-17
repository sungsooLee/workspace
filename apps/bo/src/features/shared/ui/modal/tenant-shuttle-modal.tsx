import { useState, forwardRef, useRef } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { tenantQueryOptions } from '@entities/tenant/service/tenant.queries';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const TenantShuttleModalComponent = forwardRef((_) => {
  const ref = useRef<ShuttleGridToGridImperative>(null);
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
            isSearchable: true,
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

  const { provider: sProvider } = useSearchBox(searchConfig);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('companyTenantList', {
      header: t('회사'),
      size: 132,
      cell: (info) => {
        const companyNames = info.row.original.companyTenantList.map(({ companyName }: any) => {
          return companyName;
        });
        return companyNames.toString();
      },
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('tenantRoleList', {
      header: t('테넌트 담당자'),
      size: 132,
      cell: (info) => {
        const tenantUserList = info.row.original.tenantUserList.map(({ userName }: any) => {
          return userName;
        });
        return tenantUserList.toString();
      },
    }),
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      size: 132,
      cell: (info) => {
        return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const handleOnConfirm = () => {
    closeModal(option);
  };
  const queryClient = useQueryClient();

  const [gridData, setGrideData] = useState<any[]>([]);
  const [option, setOption] = useState<any>();

  const handleOnSearch = async (data: any) => {
    const response = await queryClient.fetchQuery(tenantQueryOptions.list(data));
    setGrideData(response.content);
  };

  return (
    <ModalContainer>
      <ModalTitle>테넌트 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <ShuttleGridToGrid
            ref={ref}
            onSelectedChange={(data: any) => {
              setOption(data);
            }}
            showNumberingColumn={false}
            gridData={gridData}
            columns={columns}
            rowKey={'tenantId'}
            leftTitle={t('테넌트 목록')}
            rightTitle={t('테넌트 선택')}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const TenantShuttleModal = TenantShuttleModalComponent;
