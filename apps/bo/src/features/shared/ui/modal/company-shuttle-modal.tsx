import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';

import { SearchBox } from '@shared/ui/search-box';

import { TransferGrid, TransferGridImperative } from '@learnway/ui';
import { IcoRefresh02 } from '@learnway/icons';

import { useRef, useState } from 'react';

const dummyData = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: `id${i}`,
    company: `name${i}`,
    owner: `owner${i}`,
    ownerTel: `ownerTel${i}`,
  }));

const CompanyShuttleComponent = () => {
  const ref = useRef<TransferGridImperative>(null);

  const { close } = useModal();

  const { provider: sProvider } = useSearchBox(searchConfig);
  const [option, setOption] = useState<any>();

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('id', {
      header: t('회사구분'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('company', {
      header: t('회사'),
      size: 132,
      cell: (info) => info.getValue(),
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('owner', {
      header: t('대표자'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('ownerTel', {
      header: t('대표전화'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log('data', data);
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
      <ModalTitle>{t('회사 선택')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <TransferGrid
          ref={ref}
          onChange={(data: any) => {
            console.log('data :::: ', data);
            setOption(data);
          }}
          showNumberingColumn={false}
          gridData={dummyData}
          columns={columns}
          rowKey={'id'}
          leftTitle={t('회사 목록')}
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
        name: 'companyDivision',
        type: 'dropdown',
        label: t('회사구분'),
        format: 'array',
        value: undefined,
        options: [
          { value: 'company-g-cd-A', label: t('회사구분A') },
          { value: 'company-g-cd-B', label: t('회사구분B') },
          { value: 'company-g-cd-C', label: t('회사구분C') },
          { value: 'company-g-cd-D', label: t('회사구분D') },
          { value: 'company-g-cd-E', label: t('회사구분E') },
          { value: 'company-g-cd-F', label: t('회사구분F') },
        ],
        dropdownConfig: {
          isSearchable: true,
          placeholder: t('입력 선택'),
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사'),
        format: 'array',
        value: undefined,
        options: [
          { value: 'company-cd-A', label: t('회사A') },
          { value: 'company-cd-B', label: t('회사B') },
          { value: 'company-cd-C', label: t('회사C') },
          { value: 'company-cd-D', label: t('회사D') },
          { value: 'company-cd-E', label: t('회사E') },
          { value: 'company-cd-F', label: t('회사F') },
        ],
        dropdownConfig: {
          isSearchable: true,
          placeholder: t('입력 선택'),
        },
      },
    ],
  ],
};
