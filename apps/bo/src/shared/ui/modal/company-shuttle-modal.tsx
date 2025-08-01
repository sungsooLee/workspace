import { queryOptions as companyQueryOptions } from '@entities/companies';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ShuttleGridToGrid, ShuttleGridToGridImperative } from '@learnway/ui/shuttle-grid-to-grid';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useRef, useState } from 'react';
/**
 * 화면번호: NLP_BO_TMS_1001_19_01
 * @returns
 */
const CompanyShuttleComponent = () => {
  const ref = useRef<ShuttleGridToGridImperative>(null);

  const [option, setOption] = useState<any>();
  const [gridData, setGrideData] = useState<any[]>([]);

  const { closeModal } = useModal();

  const queryClient = useQueryClient();
  const { provider: sProvider } = useSearchBox(searchConfig());

  const handleOnSearch = (data: any) => {
    const queryPromise = queryClient.fetchQuery(companyQueryOptions.listPopupAll(data));
    queryPromise.then((data) => {
      setGrideData(data.content);
    });
  };

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!option) return;
    closeModal(option);
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('회사 조회')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <Divider />
        <ShuttleGridToGrid
          ref={ref}
          onSelectedChange={(data: any) => {
            setOption(data);
          }}
          showNumberingColumn={false}
          gridData={gridData}
          columns={columns()}
          rowKey={'companyId'}
          leftTitle={t('회사 목록')}
          rightTitle={t('회사 선택')}
          visibleRowCount={8}
        />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
        <Button
          type={'button'}
          label={t('확인')}
          variant={'primary'}
          size={'lg'}
          onClick={handleOnConfirm}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CompanyShuttleModal = CompanyShuttleComponent;

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'companyType',
        type: 'dropdown',
        label: t('그룹'),
        value: '',
        optionsConfig: {
          options: [{ label: t('전체'), value: '' }],
          codeGroup: CODE_GROUP['pms.company.CompanyType'],
        },
      },
      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyCode'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 또는 선택',
        },
      },
    ],
  ],
});

const columnHelper = createColumnHelper<any>();
const columns = () =>
  [
    columnHelper.accessor('companyType', {
      id: 'companyType',
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`),
      header: t('그룹'),
      size: 132,
    }),
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: t('회사'),
      size: 132,
    }),
    columnHelper.accessor('rpsntrName', {
      id: 'rpsntrName',
      cell: (info) => info.getValue(),
      header: t('대표자'),
      size: 132,
    }),

    columnHelper.accessor('managerPhone', {
      id: 'managerPhone',
      cell: (info) => info.getValue(),
      header: t('대표전화'),
      size: 132,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
