import { queryOptions } from '@entities/department';
import { useSaveUsers } from '@entities/role';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { DateRangePickerFormField } from '@features/form';
import {
  CODE_GROUP,
  DynamicFormConfig,
  SearchBoxConfig,
  useDynamicForm,
  useSearchBox,
} from '@learnway/hooks';
import {
  Button,
  ContentsRow,
  Divider,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
  useModal,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { UsersParams } from '@types';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

type UserShuttleComponentProps = Pick<UsersParams, 'roleId'> & {
  isShowDateRangePicker?: boolean;
};

const UserShuttleComponent = ({
  roleId,
  isShowDateRangePicker = false,
}: UserShuttleComponentProps) => {
  const ref = useRef<ShuttleGridToGridImperative>(null);

  const [option, setOption] = useState<any>();
  const [gridData, setGrideData] = useState<any[]>([]);

  const { closeModal, alert } = useModal();
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
          format: 'object',
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
  const { saveUsersRole: saveRoleUsers } = useSaveUsers({});
  const queryClient = useQueryClient();
  const { provider: sProvider, setValue, setOptions } = useSearchBox(searchConfig);
  const companyId = useWatch({ control: sProvider.control, name: 'companyId' });
  const formRef = useRef<HTMLFormElement>(null);
  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    getValues,
    clearFormError,
    setFormError,
  } = useDynamicForm(formConfig);

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
      usersQueryOptions.all({ ...data, roleId, page: 0, size: 2000 }),
    );
    queryPromise.then((data) => {
      setGrideData(data.content);
    });
    //TODO fetch
  };

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!option) return;
    closeModal(option);
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
    const payload = { roleId, body: { addUserUuids: addUsers } };
    const result = await new Promise((resolve) => {
      saveRoleUsers(payload, { onSuccess: resolve });
    });
    console.log('getValues', result);
    closeModal();
  };

  return (
    <ModalContainer className="h-[740]">
      <ModalTitle>{t('유저조회')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <Divider />
        <ShuttleGridToGrid
          ref={ref}
          onSelectedChange={setOption}
          showNumberingColumn={false}
          gridData={gridData}
          columns={columns}
          rowKey={'uuid'}
          leftTitle={t('유저조회목록')}
          rightTitle={t('유저 선택')}
        />
        {isShowDateRangePicker && (
          <form className="mt-5 w-1/2" ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="dateRange"
                element={<DateRangePickerFormField />}
              />
              {/* <FormRow provider={provider} name="---" /> */}
            </ContentsRow>
          </form>
        )}
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

export const UserShuttleModal = UserShuttleComponent;
