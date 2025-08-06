import { queryOptions } from '@entities/department';
import { usersQueryOptions } from '@entities/users';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
  handleRowSelect: (row: any) => void;
};

const UserChoiceComponent = ({ handleRowSelect }: Props) => {
  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          required: true,
          name: 'companyId',
          type: 'dropdown',
          label: '회사',
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
          label: '소속',
          value: '',
          presetOptionLabel: t('LABEL.form.label.select', '선택'),
          options: [],
          format: 'object',
          isSearchable: true,
          isClearable: true,
        },
      ],
      [
        {
          name: 'employeeNumber',
          type: 'text',
          label: '사번',
          value: '',
        },
        {
          name: 'userName',
          type: 'text',
          label: '이름',
          value: '',
        },
      ],
    ],
    validator: { companyId: { required: true } },
  };

  const gridConfig = {
    query: usersQueryOptions.list,
    columns: [],
    data: [],
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      totalRows: 2,
    },
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('company', {
      id: 'company',
      cell: (info) => info.row.original.company.name,
      header: t('회사'),
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('dept', {
      id: 'dept',
      cell: (info) => info.row.original.dept.deptName,
      header: t('소속'),
      size: 150,
      enableGrouping: false,
    }),
    columnHelper.accessor('employeeNumber', {
      id: 'employeeNumber',
      cell: (info) => info.getValue(),
      header: t('사번'),
      size: 220,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: t('이름'),
      size: 220,
      enableGrouping: false,
    }),
    columnHelper.accessor('isOnLeave', {
      cell: (info) => {
        const { isOnLeave, isSuspended, retireDate } = info.row.original;
        if (isSuspended) return t('휴직');
        else if (isOnLeave && retireDate) return t('퇴직');
        else return t('재직');
      },
      header: t('재직여부'),
      enableGrouping: false,
    }),
    columnHelper.accessor('accountType', {
      cell: (info) => {
        const { enabledDate, lockedDate, dormantDate } = info.row.original;
        if (enabledDate === null) return t('대기');
        else if (lockedDate !== null) return t('잠김');
        else if (dormantDate !== null) return t('휴면');
        return t('정상');
      },
      header: t('계정상태'),
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  const { provider: sProvider, getValues, setOptions, setValue } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);
  const queryClient = useQueryClient();
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

  return (
    <div className={popupStyles.wrap}>
      <SearchBox provider={sProvider} onSearch={(data) => gridFetch(data)} />
      <Divider />
      <GridBox
        onRowSelect={handleRowSelect}
        config={config}
        columns={columns}
        showColumnSettings={false}
        title={t('유저조회목록')}
      />
    </div>
  );
};

export const UserChoice = UserChoiceComponent;
