import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import dayjs from 'dayjs';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  Button,
  ContentsRow,
  GridBox,
  useModal,
  RadioGroupFormField,
  Input,
  ContentsRowItem,
  Switch,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  DatePicker,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString, getStringToDate } from '@learnway/shared';

import { FormRow, FormSubTitle, ContentsHistoryInfoFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import {
  DuplicateCheckInputFormField,
  DuplicateState,
} from '@features/tenant/management/ui/duplicate-check-input-form-field';
import { LoginRestrictTimeSettingModal } from '@features/shared/ui/modal/login-restrict-time-setting-modal';
import {
  UserGroupTabsChoiceModal,
  UserGroupChoiceModal,
  CompanyChoiceModal,
  OrganizationChoiceTreeModal,
} from '@features/shared';
import { EnFormMode, EnGlobalConst } from '@types';

import { useCreateCompany, useUpdateCompany, useFetchCompany } from '@entities/companies';
import CompaniesService from '@entities/companies/api/companies';

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const TenantUserRegistComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { open: openModal, confirm: openConfirm, alert: openAlert } = useModal();

  const tempLoginRestrictTimeSetting = React.useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const companyCodes = routerState.location.state?.companyCodes;

  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const { provider, fetchData, onSubmit, onFormChange, getValues, control } =
    useDynamicForm(formConfig);

  const [loginRestrictTimeSettings, setLoginRestrictTimeSettings] = useState<any[]>([]);

  const handleCompanySearchButtonClick = async () => {
    const organization = await openModal({
      width: 'md',
      content: <OrganizationChoiceTreeModal companyCodes={companyCodes} />,
    });

    const changeData = {
      companyName: organization.companyName,
      lastDept: organization.deptName,
      deptId: organization.deptId,
      firstDept: '',
    };

    if (organization.allTreePath.length > 3) {
      changeData.firstDept = organization.allTreePath[2].deptName;
    }
    onFormChange(changeData);
  };

  useEffect(() => {
    console.log('log');
  }, []);

  const timeStringToDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return dayjs().hour(hours).minute(minutes).second(0).millisecond(0).toDate();
  };

  useImperativeHandle(ref, () => ({
    saveData() {
      console.log('saveData');
      const form = formRef.current;
      if (form) {
        console.log('formValue');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const { create } = useCreateCompany({
    onSuccess: () => {
      openAlert({
        title: t('저장되었습니다.'),
        onClose: () => {
          router.navigate({ to: '/platform/company/management' });
        },
      });
    },
  });
  const { update } = useUpdateCompany({
    onSuccess: () => {
      openAlert({
        title: t('저장되었습니다.'),
        onClose: () => {
          //refetch();
        },
      });
    },
  });

  const watchedValues = useWatch({
    control,
    name: ['isUseSso', 'isUseTwoFactorAuth', 'isUseWatermark', 'twoFactorAuthPlatformTypeList'],
  });

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
    console.log('loginRestrictTimeSettings', loginRestrictTimeSettings);

    const loginRestrictions = loginRestrictTimeSettings.map((item) => ({
      ...item,
      restrictionStartDate: getDateToString(
        new Date(item.restrictionDate.from),
        DATE_TIME_FORMAT.DATE,
      ),
      restrictionEndDate: getDateToString(new Date(item.restrictionDate.to), DATE_TIME_FORMAT.DATE),
      companyLoginRestrictionDetailList: item.timeLimits.map((limit: any) => ({
        dayOfWeekType: limit.dayOfTheWeek,
        startTime: getDateToString(
          new Date(limit.loginRestrictionTime.from),
          DATE_TIME_FORMAT.HOUR_MIN,
        ),
        endTime: getDateToString(
          new Date(limit.loginRestrictionTime.to),
          DATE_TIME_FORMAT.HOUR_MIN,
        ),
        isUsed: limit.isUsed,
      })),
    }));

    const payload = {
      ...data,
      companyCode: data.companyCode.fieldValue,
      companyLoginRestrictionList: loginRestrictions,
    };
    console.log('mode', props.mode);
    console.log('payload', payload);
    if (props.mode === 'add') {
      if (await openConfirm('저장 하시겠습니까?')) {
        create(payload);
      }
    } else if (props.mode === 'view') {
      if (await openConfirm('수정 하시겠습니까?')) {
        update(payload);
      }
    }
  };

  const handleAddClick = () => {
    openModal({
      width: 'lg',
      content: <LoginRestrictTimeSettingModal mode={EnFormMode.ADD} />,
      onClose(data: any) {
        if (data) {
          console.log('## data', data);
          // 제한 설정 임시 저장
          tempLoginRestrictTimeSetting.current = { ...data, isUsed: true };
          setTimeout(() => openConfirmChooseUserGroup(), 0);
        }
      },
    });
  };

  const handleRemoveClick = () => {
    const deleteRows = tableInstance?.getSelectedRowModel().rows;
    if (deleteRows && deleteRows.length > 0) {
      console.log('deleteRows', deleteRows);
      const indexesToRemove = deleteRows.map((r) => r.index);
      console.log('indexesToRemove', indexesToRemove);

      setLoginRestrictTimeSettings((prev) => {
        const newSettings = prev.filter((_, index) => !indexesToRemove.includes(index));
        return newSettings;
      });
    }
  };

  const openConfirmChooseUserGroup = () => {
    openConfirm({
      title: t('유저그룹을 설정하시겠습니까?'),
      content: (
        <>
          {t('유저 그룹을 추가로 설정해야 합니다.')}
          <br />
          {t('유저그룹을 설정하지 않는 경우 로그인 제한 시간 설정이 목록에 추가되지 않습니다.')}
        </>
      ),
      onClose: (value: boolean) => {
        console.log('success');
        if (value) {
          setTimeout(() => chooseUserGroup(), 0);
        } else {
          // 제한 설정 임시 저장 삭제
          tempLoginRestrictTimeSetting.current = null;
        }
      },
    });
  };

  const chooseUserGroup = () => {
    openModal({
      width: 'xl',
      content: <UserGroupTabsChoiceModal />,
      onClose(data: any) {
        console.log('### selectedUserGroups', data);
        const userGroups = data.map((group: any) => ({
          userGroupId: group.key,
          isUsed: true,
        }));
        console.log('## tempLoginRestrictTimeSetting', tempLoginRestrictTimeSetting.current);
        const newSetting = JSON.parse(JSON.stringify(tempLoginRestrictTimeSetting.current));
        tempLoginRestrictTimeSetting.current = null;
        setLoginRestrictTimeSettings([
          ...loginRestrictTimeSettings,
          { ...newSetting, companyLoginRestrictionUserGroupList: userGroups },
        ]);
      },
    });
  };

  const changeUserGroup = (info: any) => {
    openModal({
      width: 'xl',
      content: <UserGroupTabsChoiceModal />,
      onClose(data: any) {
        console.log('### selectedUserGroups', data);
        console.log('### info', info);
        const userGroups = data.map((group: any) => ({
          userGroupId: group.key,
          isUsed: true,
        }));
        setLoginRestrictTimeSettings((prev) => {
          const newSettings = [...prev];
          newSettings[data.index] = {
            ...newSettings[data.index],
            companyLoginRestrictionUserGroupList: userGroups,
          };
          return newSettings;
        });
      },
    });
  };

  const handleUserGroupMemberView = () => {
    openModal({
      width: 'xl',
      content: <UserGroupChoiceModal />,
    });
  };

  const handleLoginRestrictTimeUsed = (index: number, value: boolean) => {
    setLoginRestrictTimeSettings((prev) => {
      const newSettings = [...prev];
      newSettings[index] = { ...newSettings[index], isUsed: value };
      return newSettings;
    });
  };

  const handleLoginRestrictTimeDetailClick = (info: any) => {
    openModal({
      width: 'lg',
      content: <LoginRestrictTimeSettingModal mode={EnFormMode.VIEW} data={info} />,
      onClose(data: any) {
        if (data) {
          console.log('## data', data);
          setLoginRestrictTimeSettings((prev) => {
            const newSettings = [...prev];
            newSettings[data.index] = { ...newSettings[data.index], ...data.node };
            return newSettings;
          });
        }
      },
    });
  };

  const duplicateCheck = async (companyCode: string) => {
    const payload = { companyCode: companyCode };
    const result: boolean = await CompaniesService.existsCode(payload);

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('회사/조직 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'companyName'} element={<Input disabled={true} />}>
          <Button
            label={t('조회')}
            variant="gray"
            size="sm"
            stopPropagation
            onClick={handleCompanySearchButtonClick}
          />
        </FormRow>
        <FormRow provider={provider} name={'firstDept'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'lastDept'} element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'userPosition'} />
        <FormRow provider={provider} name={'userTitle'} />
        <FormRow provider={provider} name={'userGroupType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'userJoining'}
          element={<DatePicker displayType="day" />}
        />
        <FormRow
          provider={provider}
          name={'userResignation'}
          element={<DatePicker displayType="day" />}
        />
        <FormRow
          provider={provider}
          name={'userPromotion'}
          element={<DatePicker displayType="day" />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'userState'} />
        <FormRow provider={provider} name={'userModifyDate'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'__'} />
      </ContentsRow>

      <FormSubTitle label={t('개인 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'name'} />
        <FormRow
          provider={provider}
          name={'employeeNumber'}
          element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} />}
        />

        <FormRow
          provider={provider}
          name={'email'}
          element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'birthday'} element={<DatePicker displayType="day" />} />
        <FormRow provider={provider} name={'userGender'} />
        <FormRow provider={provider} name={'region'} element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'phoneNumber'} />
        <FormRow provider={provider} name={'companyNumber'} />
        <FormRow provider={provider} name={'__'} />
      </ContentsRow>

      <FormSubTitle label={t('직군/직무 정보')} lineType="dark" />
      <div className="grid_wrap py-10">
        <GridBox
          columns={columns}
          data={loginRestrictTimeSettings}
          multiple
          showAdd
          showRemove
          showTotalCount={false}
          onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
          onAddClick={handleAddClick}
          onRemoveClick={handleRemoveClick}
          disabledSelectionToggle={true}
          title={t('직군/직무 관리')}
        />
      </div>

      <FormSubTitle label={t('계정 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'hrInfoManageType'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'MANUAL_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow provider={provider} name={'companyMemberJoinTypeList'} />
        </ContentsRow>
      </FormDisplay>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'AUTO_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow provider={provider} name={'linkageSystem'} />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow>
        <FormRow provider={provider} name={'accountState'} />
        <FormRow
          provider={provider}
          name={'accountLastUpdateDate'}
          element={<Input disabled={true} />}
        />
        <FormRow
          provider={provider}
          name={'accountDormancyUpdateDate'}
          element={<Input disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'approvalStat'} element={<Input disabled={true} />} />
        <FormRow
          provider={provider}
          name={'approvalStateDate'}
          element={<Input disabled={true} />}
        />
        <FormRow provider={provider} name={'__'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenant'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'name',
                valueField: 'value',
                wordwrap: true,
              }}
            />
          }
        />
      </ContentsRow>
      <FormSubTitle label={t('로그인 및 인증 설정 정보')} lineType="dark" />
      <ContentsRow>
        <ContentsRowItem>
          <FormRow
            provider={provider}
            name={'isUseSso'}
            className={dynamicFormStyles.form_item_horizontal}
          />
          <FormRow
            provider={provider}
            name={'ssoTypeList'}
            element={<CheckboxGroupFormField disabled={!watchedValues[0]} />}
          />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow provider={provider} name={'passwordAuthType'} />
        </ContentsRowItem>
      </ContentsRow>

      <ContentsRow>
        <ContentsRowItem>
          <FormRow
            provider={provider}
            name={'isUseTwoFactorAuth'}
            className={dynamicFormStyles.form_item_horizontal}
          ></FormRow>
          <FormRow
            provider={provider}
            name={'twoFactorAuthPlatformTypeList'}
            element={<CheckboxGroupFormField disabled={!watchedValues[1]} />}
          />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow
            className={dynamicFormStyles.w_half}
            provider={provider}
            name={'twoFactorAuthType'}
            element={<RadioGroupFormField disabled={!watchedValues[1]} />}
          />
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="loginRestriction" />
      </ContentsRow>
    </form>
  );
};

export const TenantUserRegist = forwardRef(TenantUserRegistComponent);

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('loginRestrictionType', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.LoginRestrictionType.${info.getValue()}`),
    header: t('직군'),
    size: 160,
  }),
  columnHelper.accessor('loginRestrictionName', {
    header: t('직무'),
    size: 160,
  }),
  columnHelper.accessor('restrictionStrDate', {
    cell: (info) =>
      getDateToString(new Date(info.row.original.restrictionDate.from), DATE_TIME_FORMAT.DATE) +
      ' ~ ' +
      getDateToString(new Date(info.row.original.restrictionDate.to), DATE_TIME_FORMAT.DATE),
    header: t('정'),
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('loginRestrictionSettingType', {
    cell: (info) =>
      t(
        `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.LoginRestrictionSettingType.${info.getValue()}`,
      ),
    header: t('부'),
    size: 120,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'companyName',
      type: 'text',
      label: t('회사'),
      value: '',
    },
    {
      name: 'firstDept',
      type: 'text',
      label: t('본부'),
      value: '',
    },
    { name: 'deptId', type: 'hidden', label: '', value: '' },
    {
      name: 'lastDept',
      type: 'text',
      label: t('소속'),
      value: '',
    },
    {
      name: 'userPosition',
      type: 'dropdown',
      label: t('보직'),
      value: '',
      presetOptionLabel: t('LABEL.form.label.select'),
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.UserGroupType'],
      },
    },
    {
      name: 'userTitle',
      type: 'dropdown',
      label: t('호칭(지위)'),
      value: '',
      presetOptionLabel: t('LABEL.form.label.select'),
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.UserGroupType'],
      },
    },
    {
      name: 'userGroupType',
      type: 'dropdown',
      label: t('직군'),
      value: '',
      presetOptionLabel: t('LABEL.form.label.select'),
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.UserGroupType'],
      },
    },
    {
      name: 'userJoining',
      type: 'text',
      label: t('입사일'),
      format: 'object',
      value: undefined,
    },
    {
      name: 'userResignation',
      type: 'text',
      label: t('퇴사일'),
      format: 'object',
      value: undefined,
    },
    {
      name: 'userPromotion',
      type: 'text',
      label: t('최근 승진일'),
      format: 'object',
      value: undefined,
    },

    {
      name: 'userState',
      type: 'text',
      label: t('재직 상태'),
      value: '',
      placeholder: '',
    },
    {
      name: 'userModifyDate',
      type: 'text',
      label: t('재직 상태 변경일'),
      value: '',
      placeholder: ' ',
    },

    {
      name: 'name',
      type: 'text',
      label: t('이름'),
      value: '',
    },
    {
      name: 'employeeNumber',
      type: 'text',
      label: t('사번'),
      value: '',
    },
    {
      name: 'email',
      type: 'text',
      label: t('아이디(이메일)'),
      value: '',
    },
    {
      name: 'birthday',
      type: 'text',
      label: t('생년월일'),
      format: 'object',
      value: undefined,
    },
    {
      name: 'userGender',
      type: 'dropdown',
      label: t('성별'),
      value: 'MALE',
      format: 'object',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.Gender'],
      },
    },
    {
      name: 'region',
      type: 'text',
      label: t('지역'),
      value: '',
      placeholder: ' ',
    },

    {
      label: t('휴대폰 번호'),
      name: 'phoneNumber',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'phoneNumberCountryCode',
        number: 'phoneNumber',
      },
    },
    {
      label: '',
      name: 'phoneNumberCountryCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
    },
    {
      label: t('연락처(사무실)'),
      name: 'companyNumber',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'companyNumberCountryCode',
        number: 'companyNumber',
      },
    },
    {
      label: '',
      name: 'companyNumberCountryCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
    },

    {
      name: 'hrInfoManageType',
      type: 'radio-group',
      label: t('인사 데이터 관리 방식'),
      value: 'MANUAL_MANAGE',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
      },
    },
    {
      name: 'companyMemberJoinTypeList',
      type: 'checkbox-group',
      label: t('회원 가입 유형'),
      value: ['FO_JOIN_DEALER'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyMemberJoinType'],
      },
      guideText: t('수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.'),
    },
    {
      name: 'companyMemberJoinType',
      type: 'checkbox-group',
      label: t('회원 가입 유형'),
      value: 'GIM',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyMemberJoinType'],
      },
      guideText: t('수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.'),
    },

    {
      name: 'accountState',
      type: 'radio-group',
      label: t('계정상태'),
      value: '',
      options: [
        { label: '정상', value: '1' },
        { label: '잠김', value: '2' },
        { label: '휴면(정상)', value: '3' },
        { label: '휴면(잠김)', value: '4' },
      ],
    },

    {
      name: 'accountLastUpdateDate',
      type: 'text',
      label: t('계정 상태 최종 변경일'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'accountDormancyUpdateDate',
      type: 'text',
      label: t('휴면 상태 변경일'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'approvalStat',
      type: 'text',
      label: t('승인상태'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'approvalStateDate',
      type: 'text',
      label: t('승인상태 최종 변경일'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'tenant',
      type: 'text',
      label: t('테넌트'),
      value: '',
    },

    // 로그인 및 인증 설정 정보
    {
      name: 'isUseSso',
      type: 'switch',
      label: t('SSO 로그인 사용 및 SSO 로그인 유형'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'ssoTypeList',
      type: 'checkbox-group',
      label: '',
      value: ['AES_Link'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SsoType'],
      },
      guideText: t('SSO 로그인 사용 여부를 설정합니다.'),
    },
    {
      name: 'passwordAuthType',
      type: 'radio-group',
      label: t('비밀번호 인증 유형'),
      value: 'PLATFORM',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.PasswordAuthType'],
      },
      guideText: t(
        '플랫폼은 플랫폼에서 비밀번호를 관리하고, 그외의 유형은 각 시스템에서 비밀번호를 관리합니다.',
      ),
    },
    {
      name: 'isUseTwoFactorAuth',
      type: 'switch',
      label: t('로그인 2차 인증 사용'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'twoFactorAuthType',
      type: 'radio-group',
      label: t('2차 인증 유형'),
      value: 'GOOGLE_OTP',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'],
      },
      guideText: t('로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다.'),
    },
    {
      name: 'twoFactorAuthPlatformTypeList',
      type: 'checkbox-group',
      label: '',
      value: ['FO_PLATFORM', 'BO_PLATFORM'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthPlatformType'],
      },
      guideText: t('2차 로그인 인증 여부를 설정할 수 있습니다.'),
    },

    // 종료
    {
      name: 'loginRestriction',
      type: 'radio-group',
      label: t('로그인 제한'),
      value: 'BASIS_COMPANY',
      options: [
        { label: '로그인 제한 시간 설정', value: '1' },
        { label: '근테 연동 로그인 제한', value: '2' },
        { label: '제한 없음', value: '3' },
      ],
      guideText: t('로그인 시간 제한 선택 시 회사관리 제한 시간에는 로그인할 수 없습니다.'),
    },
  ],
  validator: {
    companyName: true,
    lastDept: true,

    name: true,
    employeeNumber: true,

    serviceTypeList: true,
    userGender: true,
    email: {
      required: true,
      conditions: [
        {
          fn: (values) => {
            if (values.email.trim().length === 0) return false;
            const pattern = new RegExp(EMAIL_REGEX, 'i');
            return !pattern.test(values.email.trim());
          },
          message: t('이메일 형식에 맞게 입력해 주세요.'),
        },
      ],
    },
  },
};
