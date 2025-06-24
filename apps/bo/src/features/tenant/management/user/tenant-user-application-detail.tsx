import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { CellContext, ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import dayjs from 'dayjs';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
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
  GridFormField,
  EditDropdownCell,
  EditSwitchCell,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString, getStringToDate } from '@learnway/shared';

import { FormRow, FormSubTitle, ContentsHistoryInfoFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
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
import { LoginAuthenticationSettingInformation } from '@features/platform/company';

/**
 *
 * @param props
 * @param ref
 * @returns
 */
const TenantUserApplicationDetailComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { open: openModal, confirm: openConfirm, alert: openAlert } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const companyCodes = routerState.location.state?.companyCodes;

  const { provider, fetchData, onSubmit, onFormChange, getValues, control } =
    useDynamicForm(formConfig);

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

  const handleCompanySearchButtonClick = async () => {
    const organization = await openModal({
      width: 'md',
      content: <OrganizationChoiceTreeModal companyCodes={companyCodes} />,
    });

    const changeData = {
      companyId: organization.companyId,
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

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('개인 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="name" />
        <FormRow provider={provider} name="employeeNumber" element={<Input />} />

        <FormRow provider={provider} name="email" element={<Input />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="birthday" element={<DatePicker displayType="day" />} />
        <FormRow provider={provider} name="userGender" />
        <FormRow provider={provider} name="region" element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="phoneNumber" />
        <FormRow provider={provider} name="companyNumber" />
        <div className={formStyles.form_item}></div>
      </ContentsRow>

      <FormSubTitle label={t('회사/조직 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="companyName" element={<Input disabled={true} />}>
          <Button
            label={t('조회')}
            variant="gray"
            size="sm"
            stopPropagation
            onClick={handleCompanySearchButtonClick}
          />
        </FormRow>
        <FormRow provider={provider} name="firstDept" element={<Input disabled={true} />} />
        <FormRow provider={provider} name="lastDept" element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="userPosition" />
        <FormRow provider={provider} name="userTitle" />
        <FormRow provider={provider} name="userGroupType" />
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
        <FormRow provider={provider} name="userState" />
        <FormRow provider={provider} name="userModifyDate" element={<Input disabled={true} />} />
        <div className={formStyles.form_item}></div>
      </ContentsRow>

      <FormSubTitle label={t('직군/직무 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name="jobManagement"
          element={
            <GridFormField
              gridProps={{
                multiple: true,
                showAdd: true,
                showRemove: true,
                showTotalCount: false,
                columns: columns,
                title: t('직군/직무 관리'),
                visibleRowCount: 3,
              }}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={t('계정 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="hrInfoManageType" />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'MANUAL_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow provider={provider} name="companyMemberJoinTypeList" />
        </ContentsRow>
      </FormDisplay>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'hrInfoManageType', value: 'AUTO_MANAGE' }]}
      >
        <ContentsRow>
          <FormRow provider={provider} name="linkageSystem" />
        </ContentsRow>
      </FormDisplay>

      <ContentsRow>
        <FormRow provider={provider} name="accountState" />
        <FormRow
          provider={provider}
          name="accountLastUpdateDate"
          element={<Input disabled={true} />}
        />
        <FormRow
          provider={provider}
          name="accountDormancyUpdateDate"
          element={<Input disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="approvalStat" element={<Input disabled={true} />} />
        <FormRow provider={provider} name="approvalStateDate" element={<Input disabled={true} />} />
        <div className={formStyles.form_item}></div>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="" />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenant"
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
    </form>
  );
};

export const TenantUserApplicationDetail = forwardRef(TenantUserApplicationDetailComponent);
const columns = [
  {
    header: '직군',
    accessorKey: 'opt1',
    size: 200,
    cell: (info: CellContext<any, string>) => (
      <EditDropdownCell
        info={info}
        dropdown={{
          options: [{ label: '선택', value: '' }],
        }}
      />
    ),
    meta: {
      headerAlign: 'center',
      cellAlign: 'center',
    },
  },
  {
    header: '직무',
    accessorKey: 'loginRestrictionTime',
    size: 'auto',
    cell: (info: CellContext<any, string>) => (
      <EditDropdownCell
        info={info}
        dropdown={{
          options: [{ label: '선택', value: '' }],
        }}
      />
    ),
    meta: {
      headerAlign: 'center',
      cellAlign: 'center',
    },
  },
  {
    header: '정/부',
    accessorKey: 'isUsed',
    size: 170,
    cell: (info: CellContext<any, boolean>) => <EditSwitchCell info={info} />,
    meta: {
      headerAlign: 'center',
      cellAlign: 'center',
    },
  },
];

const formConfig: DynamicFormConfig = {
  builders: [
    { name: 'companyId', type: 'hidden', label: '', value: '' },
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
      label: '',
      name: 'jobManagement',
      type: 'custom',
      value: [],
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
