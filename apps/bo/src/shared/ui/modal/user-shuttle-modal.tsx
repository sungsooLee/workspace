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
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Divider } from '@learnway/ui/elements';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ShuttleGridToGrid, ShuttleGridToGridImperative } from '@learnway/ui/shuttle-grid-to-grid';
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
  const { provider, getValues } = useDynamicForm(formConfig);

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

  const handleOnSearch = (data: any) => {
    const queryPromise = queryClient.fetchQuery(
      usersQueryOptions.all({ ...data, page: 0, size: 2000 }),
    );
    queryPromise.then((data) => {
      setGrideData(data.content);
    });
  };

  const handleOnConfirm = async () => {
    if (!option || option.length === 0) {
      alert('사용자를 선택 하세요.');
      return;
    }
    if (isShowDateRangePicker) {
      const { dateRange } = getValues();
      const addUserUuids: {
        endDate: Date;
        isUsed: boolean;
        startDate: Date;
        userUuid: string;
      }[] = [];

      option.forEach((item: any) => {
        addUserUuids.push({
          userUuid: item.uuid,
          startDate: dateRange.from,
          endDate: dateRange.to,
          isUsed: true,
        });
      });
      await new Promise((resolve) => {
        saveRoleUsers({ roleId, body: { addUserUuids } }, { onSuccess: resolve });
      });
      closeModal();
    } else {
      closeModal(option);
    }
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
          <form className="mt-5 w-1/2" ref={formRef}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="dateRange"
                element={<DateRangePickerFormField />}
              />
            </ContentsRow>
          </form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
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
