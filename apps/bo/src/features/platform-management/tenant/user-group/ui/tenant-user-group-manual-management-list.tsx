import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { FC, useEffect } from 'react';

import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { FormRow2 } from '@learnway/ui/base-form';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { queryOptions as userGroupManualOptions } from '@entities/user-group/service/user-group.queries';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { useModal } from '@learnway/ui/modal';
import { EnFormMode, EnGlobalConst } from '@shared/types/enums';
import { CombineUserGroup } from '@shared/types/user-group';
import {
  DropdownFormField,
  FormItem,
  InputFormField,
  PeriodPickerFormField,
  TenantByRoleDropdownFormField,
} from '@shared/ui/form';
import { UserGroupChoiceModal } from '@shared/ui/modal';
import { SearchBoxForm } from '@shared/ui/search-box';
import { useCreation } from 'ahooks';

const _global = {
  linkClick: (userGroupId: number) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_PMS_2001 (유저그룹수동관리)
 * @param param0
 * @returns
 */
const TenantUserGroupManualManagementListComponent: FC<any> = () => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const { openModal } = useModal();

  _global.linkClick = (userGroupId: number) => {
    router.navigate({
      to: `/platform/tenant/usr-group/manual-detail`,
      state: {
        userGroupId,
        listParam: getValues(),
        mode: EnFormMode.VIEW,
      },
    });
  };

  const gridInitConfig = useCreation(
    () => ({
      query: userGroupManualOptions.userGroupManualList,
      columns: [
        {
          name: 'no',
          label: t('NO.'),
          type: 'numbering',
          enableSorting: false,
        },
        {
          name: 'tenantName',
          label: t('테넌트명'),
          size: 159,
        },
        {
          name: 'userGroupOriginType',
          label: t('유저그룹유형'),
          render: (info: any) => {
            return t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.UserGroupOriginType.${info.getValue()}`,
            );
          },
          size: 163,
        },
        {
          name: 'opt2',
          label: t('채널'),
          size: 106,
          render: (info: any) => {
            if (info.row.original.userGroupOriginType === 'CHANNEL') {
              return info.row.original.originName;
            }
            return info.getValue();
          },
          enableSorting: false,
        },
        {
          name: 'opt3',
          label: t('개인'),
          size: 101,
          render: (info: any) => {
            if (info.row.original.userGroupOriginType === 'PERSONAL') {
              return info.row.original.originName;
            }
            return info.getValue();
          },
          enableSorting: false,
        },
        {
          name: 'userGroupName',
          label: t('유저그룹명'),
          render: (info: any) => {
            return (
              <Button
                className="link"
                onClick={() => _global.linkClick(info.row.original.userGroupId)}
              >
                {info.getValue()}
              </Button>
            );
          },
          size: 207,
        },
        {
          name: 'userCount',
          label: t('대상자'),
          render: (info: any) => {
            return `${info.getValue().toLocaleString('ko-KR')}명`;
          },
          meta: {
            cellAlign: 'right',
          },
          size: 127,
        },
        {
          name: 'userGroupId',
          label: t('대상자 확인'),
          render: (info: any) => {
            const data = info.row.original;
            const combiners: CombineUserGroup[] = [
              {
                // groupId: 0,
                pathKey: '',
                pathValue: '',
                combiners: [
                  {
                    combineType: 'USER_GROUP',
                    combineValue: data.userGroupId,
                    combineName: '',
                  },
                ],
              },
            ];

            return (
              <Button
                variant="gray2"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserGroupChoiceModal groups={combiners} />,
                  });
                }}
              >
                {t('대상자')}
              </Button>
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 96,
          enableSorting: false,
        },
        {
          name: 'isUsed',
          label: t('사용여부'),
          render: (info: any) => {
            return info.row.original.isUsed ? t('사용') : t('미사용');
          },
          meta: {
            cellAlign: 'center',
          },
          size: 88,
        },
        {
          name: 'createdDate',
          label: t('등록일'),
          render: (info: any) => {
            return getDateToString(
              new Date(info.row.original.createdDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 194,
        },
        {
          name: 'modifiedDate',
          label: t('수정일'),
          render: (info: any) => {
            return getDateToString(
              new Date(info.row.original.modifiedDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 194,
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 20,
        sort: [],
      },
    }),
    [],
  );

  const handleOnSearchParam = () => {
    const data = getValues();
    const payload = {
      ...data,
      modifiedStartDate:
        data.dateRange &&
        data.dateRange.from &&
        getDateToString(new Date(data.dateRange.from), 'YYYY-MM-DDTHH:mm:ss'),
      modifiedEndDate:
        data.dateRange &&
        data.dateRange.to &&
        getDateToString(new Date(data.dateRange.to), 'YYYY-MM-DDTHH:mm:ss'),
      dateRange: null,
    };
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== '',
      ),
    );
    return filteredPayload;
  };
  const {
    provider: searchProvider,
    getValues,
    setValue,
    onFormChange,
    onFormValid,
    onSubmit,
  } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, handleOnSearchParam);

  const handleOnSearch = () => {
    gridFetch(handleOnSearchParam());
  };

  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch();
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

  return (
    <>
      <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name={'tenantId'}
            type="custom"
            label={t('LABEL.form.label.tenant', '테넌트')}
            value=""
            format="number"
            element={<TenantByRoleDropdownFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="userGroupOriginType"
            type="dropdown"
            label={t('유저그룹유형')}
            value=""
            format="string"
            element={
              <DropdownFormField
                optionsConfig={{ codeGroup: CODE_GROUP['pms.user.UserGroupOriginType'] }}
                presetOptionLabel={t('LABEL.form.label.all')}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name="channelName"
            type="text"
            label={t('채널')}
            value=""
            format="string"
            placeholder={t('입력')}
            element={<InputFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="personName"
            type="text"
            label={t('개인')}
            value=""
            format="string"
            placeholder={t('입력')}
            element={<InputFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="userGroupName"
            type="text"
            label={t('유저그룹명')}
            value=""
            format="string"
            placeholder={t('입력')}
            element={<InputFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="isUsed"
            label={t('LABEL.form.label.useYn')}
            format={'boolean'}
            element={
              <DropdownFormField
                presetOptionLabel={t('LABEL.form.label.select')}
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name={'dateRange'}
            label={t('수정기간')}
            format={'object'}
            element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day' }} />}
          />
          <FormItem />
        </ContentsRow>
      </SearchBoxForm>
      <Divider />
      <GridBox config={gConfig} />
    </>
  );
};

export const TenantUserGroupManualManagementList = TenantUserGroupManualManagementListComponent;
