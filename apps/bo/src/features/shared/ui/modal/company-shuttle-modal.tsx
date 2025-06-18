import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import { IcoRefresh02 } from '@learnway/icons';
import {
  Button,
  Divider,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
  useModal,
} from '@learnway/ui';
import { SearchBoxConfig, useSearchBox, CODE_GROUP } from '@learnway/hooks';

import { SearchBox } from '@shared/ui/search-box';
import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';

import { EnGlobalConst } from '@types';
/**
 * 화면번호: NLP_BO_TMS_1001_19_01
 * @returns
 */
const CompanyShuttleComponent = () => {
  const ref = useRef<ShuttleGridToGridImperative>(null);

  const [option, setOption] = useState<any>();
  const [gridData, setGrideData] = useState<any[]>([]);

  const { close } = useModal();

  const queryClient = useQueryClient();
  const { provider: sProvider } = useSearchBox(searchConfig);

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    const queryPromise = queryClient.fetchQuery(companyQueryOptions.all(data));
    queryPromise.then((data) => {
      setGrideData(data.content);
    });
    //TODO fetch
  };

  const handleOnClose = () => {
    close();
  };
  const handleOnConfirm = () => {
    if (!option) return;
    close(option);
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
          columns={columns}
          rowKey={'companyId'}
          leftTitle={t('회사 목록')}
          rightTitle={t('회사 선택')}
          visibleRowCount={8}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          icon={<IcoRefresh02 width={16} height={16} className="icon_refresh" />}
          variant={'gray'}
          size={'lg'}
          onClick={() => {
            ref.current?.resetSelection();
          }}
        >
          {t('초기화')}
        </Button>
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

const searchConfig: SearchBoxConfig = {
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
        name: 'name',
        type: 'text',
        label: t('회사'),
        value: '',
      },
    ],
  ],
};

const columnHelper = createColumnHelper<any>();
const columns = [
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

  columnHelper.accessor('callNumber', {
    id: 'callNumber',
    cell: (info) => info.getValue(),
    header: t('대표전화'),
    size: 132,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
