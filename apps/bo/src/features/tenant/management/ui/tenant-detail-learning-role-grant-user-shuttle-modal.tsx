import { useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
  ContentsRow,
  useModal,
} from '@learnway/ui';
import { IcoRefresh02 } from '@learnway/icons';
import {
  DynamicFormConfig,
  SearchBoxConfig,
  useSearchBox,
  useDynamicForm,
  CODE_GROUP,
} from '@learnway/hooks';

import { FormRow, ThumbnailListFormField } from '@shared/ui/';
import { DateRangeFormField } from '@shared/ui/search-box/date-range-form-field';

import { SearchBox } from '@shared/ui/search-box';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { useSaveUsers } from '@entities/role/service/role-manage.hook';
import { queryOptions as departmentQuery } from '@entities/department';
/**
 * 화면번호: NLP_BO_PMS_1110
 *
 * @returns
 */
const TenantDetailLearningRoleGrantUserShuttleModalComponent = ({ roleId }: { roleId: number }) => {
  const ref = useRef<ShuttleGridToGridImperative>(null);

  const [option, setOption] = useState<any>();
  const [gridData, setGrideData] = useState<any[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const { close, alert } = useModal();

  const queryClient = useQueryClient();
  const {
    provider: sProvider,
    getValues: getSearchValues,
    setOptions,
    setValue,
  } = useSearchBox(searchConfig);
  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);

  const { saveUsersRole: saveRoleUsers } = useSaveUsers({});

  const companyIdWatch = useWatch({ control: sProvider.control, name: 'companyId' });

  const searchParam = () => {
    const data = getSearchValues();
    data.size = 2000;
    return data;
  };

  const handleOnSearch = (data: any) => {
    const queryPromise = queryClient.fetchQuery(usersQueryOptions.list(searchParam()));
    queryPromise.then((data) => {
      setGrideData(data.content);
    });
  };

  const handleOnClose = () => {
    close();
  };
  const handleOnSubmit = async (data: any) => {
    const { dateRange } = getValues();
    if (!option || option.length === 0) {
      alert('사용자를 선택 하세요.');
      return;
    }

    const addUsers: any[] = [];
    option.forEach((item: any) => {
      addUsers.push({
        userUuid: item.uuid,
        startDate: dateRange.from,
        endDate: dateRange.to,
        isUsed: true,
      });
    });
    const payload = { roleId: roleId, body: { addUserUuids: addUsers } };
    console.log('getValues', payload);
    const result = await new Promise((resolve) => {
      saveRoleUsers(payload, { onSuccess: resolve });
    });
    console.log('getValues', result);
    close();
  };

  useEffect(() => {
    if (companyIdWatch) {
      (async () => {
        const paramDept = { companyId: companyIdWatch, size: 2000 };
        const data = await queryClient.fetchQuery(departmentQuery.list(paramDept));
        const deptIdOptions = data.content.map((item: any) => ({
          label: item.deptName,
          value: item.deptId,
        }));
        setOptions('deptId', deptIdOptions);
      })();
    } else {
      setValue('deptId', '');
      setOptions('deptId', []);
    }
  }, [companyIdWatch]);

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
          rowKey={'uuid'}
          leftTitle={t('사용자목록')}
          rightTitle={t('사용자 선택')}
          visibleRowCount={6}
        />
        <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)} style={{ marginTop: '20px' }}>
          <ContentsRow>
            <FormRow provider={provider} name="dateRange" element={<DateRangeFormField />} />
            <FormRow provider={provider} name="---" />
          </ContentsRow>
        </form>
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
          onClick={() => {
            const form = formRef.current;
            if (form) {
              form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
          }}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantDetailLearningRoleGrantUserShuttleModal =
  TenantDetailLearningRoleGrantUserShuttleModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'object',
        value: undefined,
        isSearchable: true,
        isClearable: true,
        placeholder: t('LABEL.grid.header.inputSelect'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
      },
      {
        name: 'deptId',
        type: 'dropdown',
        label: t('소속'),
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.select'),
        value: '',
        options: [],
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
      },
      {
        name: 'userNo',
        type: 'text',
        label: t('사번'),
        value: '',
      },
    ],
  ],
  validator: {
    companyId: true,
  },
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('company', {
    id: 'company',
    header: t('회사'),
    cell: (info) => info.row.original.company.name,
    size: 132,
  }),
  columnHelper.accessor('dept', {
    id: 'dept',
    header: t('소속'),
    size: 132,
    cell: (info) => info.row.original.dept.deptName,
    meta: {
      headerAlign: 'left', // 헤더만 가운데 정렬
      cellAlign: 'left', // 셀은 오른쪽 정렬
    },
  }),
  columnHelper.accessor('employeeNumber', {
    id: 'employeeNumber',
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

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'dateRange',
      type: 'date-range',
      label: t('역할 부여 기간'),
      format: 'object',
      value: { from: undefined, to: undefined },
      placeholder: '',
      maxLength: 150,
    },
  ],
  validator: {
    dateRange: {
      required: true,
      conditions: [
        {
          fn: (values) => !values.dateRange?.from,
          message: t('시작 및 종료 날짜를 선택하세요'),
        },
        {
          fn: (values) => !values.dateRange?.from,
          message: t('시작 날짜를 선택하세요'),
        },
        {
          fn: (values) => !values.dateRange?.to,
          message: t('종료 날짜를 선택하세요.'),
        },
        {
          fn: (values) => values.dateRange.from > values.dateRange.to,
          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
        },
      ],
    },
  },
};
