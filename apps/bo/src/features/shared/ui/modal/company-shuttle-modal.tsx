import { useRef, useState } from 'react';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
  useModal,
} from '@learnway/ui';

import { SearchBox } from '@shared/ui/search-box';
import { IcoRefresh02 } from '@learnway/icons';
import { useQueryClient } from '@tanstack/react-query';
import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';

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
    const queryPromise = queryClient.fetchQuery(companyQueryOptions.all());
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
    <ModalContainer className="h-[740]">
      <ModalTitle>{t('회사 조회')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <ShuttleGridToGrid
          ref={ref}
          onSelectedChange={(data: any) => {
            setOption(data);
          }}
          showNumberingColumn={false}
          gridData={gridData}
          columns={columns}
          rowKey={'companyId'}
          leftTitle={t('회사 조회 목록')}
          rightTitle={t('회사 선택')}
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
        name: 'companyCode',
        type: 'text',
        label: t('회사코드'),
        value: '',
      },
      {
        name: 'name',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
    ],
  ],
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('companyType', {
    id: 'companyType',
    cell: (info) => info.getValue(),
    header: '회사구분',
    enableGrouping: false,
    size: 132,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => info.getValue(),
    header: '회사',
    size: 132,
    enableGrouping: false,
  }),
  columnHelper.accessor('rpsntrName', {
    id: 'rpsntrName',
    cell: (info) => info.getValue(),
    header: '대표자',
    size: 132,
    enableGrouping: false,
  }),

  columnHelper.accessor('callNumber', {
    id: 'callNumber',
    cell: (info) => info.getValue(),
    header: '대표 전화',
    size: 132,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
