import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
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
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { useWatch } from 'react-hook-form';
import { queryOptions } from '@entities/department';

const UserShuttleComponent = () => {
  const ref = useRef<ShuttleGridToGridImperative>(null);

  const [option, setOption] = useState<any>();
  const [gridData, setGrideData] = useState<any[]>([]);

  const { close } = useModal();

  const queryClient = useQueryClient();
  const { provider: sProvider, setValue, setOptions } = useSearchBox(searchConfig);
  const companyId = useWatch({ control: sProvider.control, name: 'companyId' });

  useEffect(() => {
    if (!companyId && companyId !== 0) return;

    (async () => {
      const { content } = await queryClient.fetchQuery(queryOptions.list({ companyId }));
      setValue('deptId', '');
      if (content)
        setOptions(
          'deptId',
          content.map((_: any) => ({ value: _.deptId, label: _.deptName })),
        );
    })();
  }, [companyId]);

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    const queryPromise = queryClient.fetchQuery(
      usersQueryOptions.all({ ...data, page: 0, size: 2000 }),
    );
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
      <ModalTitle>{t('유저조회')}</ModalTitle>
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
          rowKey={'userId'}
          leftTitle={t('유저조회목록')}
          rightTitle={t('유저 선택')}
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

export const UserShuttleModal = UserShuttleComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        required: true,
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
        format: 'number',
        isSearchable: true,
        isClearable: true,
        placeholder: '입력 선택',
      },
      {
        name: 'deptId',
        type: 'dropdown',
        label: t('소속'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.select', '선택'),
        options: [],
        format: 'number',
        isSearchable: true,
        isClearable: true,
      },
      {
        name: 'userNo',
        type: 'text',
        label: t('사번'),
        value: '',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
      },
    ],
  ],
  validator: { companyId: { required: true } },
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('company', {
    header: t('회사'),
    size: 132,
    cell: (info) => info.row.original.company.name,
  }),
  columnHelper.accessor('dept', {
    header: t('소속'),
    size: 132,
    cell: (info) => info.row.original.dept.deptName,
  }),
  columnHelper.accessor('employeeNumber', {
    header: t('사번'),
    size: 132,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: t('이름'),
    size: 132,
    cell: (info) => info.getValue(),
  }),
] as ColumnDef<any, unknown>[];
