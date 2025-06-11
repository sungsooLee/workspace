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
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
/**
 * 화면번호: NLP_BO_TMS_1001_17_01
 */
const RoleShuttleModalComponent = forwardRef((_) => {
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
          label: t('테넌트명'),
          value: undefined,
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.tenant.tenantId'],
          },
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            isSearchable: true,
            placeholder: '입력 선택',
          },
        },
        {
          name: 'companyName',
          type: 'text',
          label: t('회사명'),
          value: '',
        },
        {
          name: 'managerRole',
          type: 'dropdown',
          label: t('관리자 역할'),
          value: 'roleA',
          options: [
            { value: 'roleA', label: t('역할A') },
            { value: 'roleB', label: t('역할B') },
            { value: 'roleC', label: t('역할C') },
            { value: 'roleD', label: t('역할D') },
            { value: 'roleE', label: t('역할E') },
          ],
        },
        {
          name: 'name',
          type: 'text',
          label: t('이름'),
          placeholder: t('이름을 입력하세요.'),
          value: '',
        },
      ],
    ],
    validator: {
      tenantId: { required: true },
    },
  };

  const { provider: sProvider } = useSearchBox(searchConfig);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트명'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('companyName', {
      header: t('회사'),
      size: 132,
      cell: (info) => info.getValue(),
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('tenantMappingRoleName', {
      header: t('관리자 역할'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: t('이름'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];

  const handleOnConfirm = () => {
    closeModal(option);
  };
  const queryClient = useQueryClient();

  const [gridData, setGrideData] = useState<any[]>([]);
  const [option, setOption] = useState<any>();

  const handleOnSearch = async (data: any) => {
    const response = await queryClient.fetchQuery(roleManagerQueryOptions.list(data));
    setGrideData(response.content);
  };

  return (
    <ModalContainer>
      <ModalTitle>HRD 담당자 역할 조회</ModalTitle>
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
            rowKey={'roleId'}
            leftTitle={t('HRD 담당자 역할 목록')}
            rightTitle={t('HRD 담당자 역할 선택')}
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

export const RoleShuttleModal = RoleShuttleModalComponent;
