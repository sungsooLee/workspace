import { useRouter, useRouterState } from '@tanstack/react-router';
import { CellContext } from '@tanstack/react-table';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DatePicker,
  EditDropdownCell, EditInputCell,
  EditSwitchCell,
  FormSubTitle,
  GridFormField,
  Input,
  useModal,
} from '@learnway/ui';

import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { FormDisplay } from '@features/form/ui/form-display';
import { FormRow, OrganizationChoiceTreeModal } from '@shared/ui';

import { LoginAuthenticationSettingInformation } from '@features/platform-management/company';
import UsersService from '@entities/users/api/users';
import { queryOptions as CompanyService } from '@entities/companies/service/companies.queries';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUser } from '@entities/users/service/users.hook';
import { useCodesByCodeGroup } from '@entities/platform';
import { useSystemCodeDetail } from '@entities/common-code';
import {
  CompanyUserDetailAccount
} from '@features/platform-management/company/company-user-management/ui/company-user-detail-account';
import { EnFormMode } from '@types';

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const duplicateCheckEmployeeNumber = async (companyCode: string) => {
  const result = false;

  if (result) return DuplicateState.duplicated;
  else return DuplicateState.ok;
};

/**
 * 화면번호: NLP_BO_TMS_1111_09
 * @param props
 * @param ref
 * @returns
 */
const TenantUserRegistComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const queryClient = useQueryClient();

  const { open: openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const { data: codeGroupData } = useSystemCodeDetail('cmmon.TelCountryCode');

  const formRef = useRef<HTMLFormElement>(null);

  const { create } = useCreateUser({
    onSuccess: async () => {
      router.navigate({to: '/platform/tenant/user'})
    }
  })

  const companyCodes = routerState.location.state?.companyCodes;

  const { provider, updateFormData, onSubmit, onFormChange, getValues, control, clearFormError, setFormError } =
    useDynamicForm(formConfig());

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
      // 현재 25-07-17 : 회사 코드 전체를 보내면 400 error 발생
      // content: <OrganizationChoiceTreeModal companyCodes={companyCodes} />,
      content: <OrganizationChoiceTreeModal companyCodes={['H199', 'H103',]} />,
    });

    const company = await queryClient.fetchQuery(CompanyService.detail(organization.companyCode));
    const changeData = {
      ...getValues(),
      companyId: company.companyId,
      companyName: organization.companyName,
      lastDept: organization.deptName,
      deptId: organization.deptId,
      firstDept: '',
      loginRestriction: company.companyLoginRestrictionList
    };

    if (organization.depth > 2) {
      changeData.firstDept = organization.allTreePath[0].deptName;
    }

    onFormChange(changeData);
  };

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);

    const payload = {
      // 회사/조직 정보
      companyId: data.companyId, //회사 id
      deptId: data.deptId, // 부서 id
      isLeader: data.userPosition === '1',
      positionName: data.positionName, // 호칭(직위),
      jobDomain: [''],
      jobRole: [''],
      joinDate: data.userJoining, // 입사일
      // 퇴사일
      promotionDate: data.userPromotion, // 최근 승진일
      isOnLeave: false, // 재직 상태: (휴직)
      isSuspended: false, // 재직 상태: (정직)
      // 개인 정보
      name: data.name, // 이름
      password: 'P@ssw0rd', // 임시 비밀 번호 : 대문자/소문자/특수문자/숫자 8자리 이상
      employeeNumber: data.employeeNumber, // 사번
      birthday: data.birthday, // 생년월일
      email: data.email.fieldValue, // 아이디(이메일)
      phoneNumber: data.phoneNumber, // 휴대폰 번호
      engName: data.engName, // 영문 이름
      gender: data.userGender, // 성별
      companyPhoneNationNumber: null, // 연락처(사무실)-국가번호
      companyPhoneNumber: data.companyNumber, // 연락처(사무실)

      // 직군/직무: 직군 선택에 따른 직무 - 현재 공통 코드로만 존재할지 아니면 따로 관리를 할지를 협의해야한다고 해서 구현 못 함.

      // 계정 정보
      linkageSystem: data.hrInfoManageType !== 'MANUAL_MANAGE' ? data.hrInfoManageType : null,
      accountStatus: null,

      // 로그인 및 인증 설정 정보
      ssoType: data.isUseSso ? data.ssoTypeList !== 'AES_Link' ? data.ssoTypeList : null : null,
      authType: data.passwordAuthType,
      twoFactorAuthType: data.twoFactorAuthType,
      foTwoFactorAuthEnabled: data.twoFactorAuthPlatformTypeList.includes('FO_PLATFORM'),
      boTwoFactorAuthEnabled: data.twoFactorAuthPlatformTypeList.includes('BO_PLATFORM'),
    };

    // 현재 회사(조직)조회 팝업에 데이터가 없어 임시로 테스트하기 위해 넣음: 추후 삭제
    payload.companyId = 54;
    payload.deptId = 2;

    if( data.userState === '2' ) {
      payload.isOnLeave = true;
      payload.isSuspended = false;
    } else if( data.userState === '3' ) {
      payload.isOnLeave = false;
      payload.isSuspended = true;
    }

    if( data.hrInfoManageType === 'AUTO_MANAGE' ) {
      payload.linkageSystem = data.linkageSystem;
    }

    if( data.jobDomain !== '' ) {
      payload.jobDomain = Array.of(data.jobDomain);
      payload.jobRole = [];
    } else {
      if( data.jobManagement ) {
        const jobDomains: any[] = [];
        const jobRoleNames: any[] = [];
        data.jobManagement.forEach((job: any) => {
          jobDomains.push(job.jobDomainName)
          jobRoleNames.push(job.jobRoleName)
        });
        payload.jobDomain = [...jobDomains];
        payload.jobRole = [...jobRoleNames];
      }
    }

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    )
    console.log('payload: {} => ', filteredPayload);
    if (await openConfirm('저장 하시겠습니까?')) {
      create(filteredPayload);
    }
  };

  const duplicateCheckEmail = async (email: string) => {
    const payload = { email };
    const result = await UsersService.existsEmail(payload);
    if (result.isEmailExists) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
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
        <FormRow provider={provider} name="positionName" />
        <FormRow provider={provider} name="jobDomain" />
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

      <FormSubTitle label={t('개인 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="name" />
        <FormRow provider={provider} name="engName" />
        <FormRow
          provider={provider}
          name="employeeNumber"
          // element={
          //   <DuplicateCheckInputFormField onDuplicationCheck={duplicateCheckEmployeeNumber} />
          // }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="email"
          element={
            <DuplicateCheckInputFormField
              onDuplicationCheck={duplicateCheckEmail}
              type={'text'}
              validation={{
                onError: (msg: string) => setFormError('code', msg),
                onSuccess: () => clearFormError('code'),
              }}
            />
          }
        />
        <FormRow provider={provider} name="birthday" element={<DatePicker displayType="day" />} />
        <FormRow provider={provider} name="userGender" />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="region" element={<Input disabled={true} />} />
        <FormRow provider={provider} name="phoneNumber" />
        <FormRow provider={provider} name="companyNumber" />
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
                columns: columns(),
                title: t('직군/직무 관리'),
                visibleRowCount: 1,
              }}
            />
          }
        />
      </ContentsRow>

      <CompanyUserDetailAccount provider={provider} formMode={EnFormMode.ADD}/>
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
              disabled
            />
          }
        />
      </ContentsRow>
      <FormSubTitle label={t('로그인 및 인증 설정 정보')} lineType="dark" />
      <LoginAuthenticationSettingInformation provider={provider} />
      <ContentsRow>
        <FormRow provider={provider} name="loginRestriction" />
      </ContentsRow>
    </form>
  );
};

export const TenantUserRegist = forwardRef(TenantUserRegistComponent);

const columns = () => [
  {
    header: '직군',
    accessorKey: 'jobDomainName',
    size: 200,
    cell: (info: CellContext<any, string>) => (
      <EditDropdownCell
        info={info}
        dropdown={{
          options: [
            { label: '브랜드&베이직', value: 'BRAND&BASIC' },
            { label: '영업', value: 'SELLING' },
            { label: '서비스', value: 'SERVICE' },
          ],
        }}
      />
    ),
    meta: {
      cellAlign: 'center',
    },
  },
  {
    header: '직무',
    accessorKey: 'jobRoleName',
    size: 'auto',
    cell: (info: CellContext<any, string>) => (
      <EditDropdownCell
        info={info}
        dropdown={{
          options: [
            { label: '스텝', value: 'STAFF' },
            { label: '시스템 매니저', value: 'SYSTEM_MANAGER' },
            { label: '트레이닝 매니저', value: 'TRAINING_MANAGER' },
            { label: '기타', value: 'ETC' },
          ],
        }}
      />
    ),
    meta: {
      cellAlign: 'center',
    },
  },
  {
    header: '정/부',
    accessorKey: 'isUsed',
    size: 170,
    cell: (info: CellContext<any, boolean>) => (
      <EditSwitchCell
        info={info}
        switchConfig={{ label: (value: boolean) => (value ? t('정') : t('부')) }}
      />
    ),
    meta: {
      cellAlign: 'center',
    },
  },
];

const formConfig = (): DynamicFormConfig => ({
  builders: [
    { name: 'companyId', type: 'hidden', label: '', value: '', format: 'number' },
    {
      name: 'companyName',
      type: 'text',
      label: t('회사'),
      value: '현대오토에버',
    },
    {
      name: 'firstDept',
      type: 'text',
      label: t('본부'),
      value: '',
    },
    {
      name: 'lastDept',
      type: 'text',
      label: t('소속'),
      value: '개발본부',
    },
    { name: 'deptId', type: 'hidden', label: '', value: '', format: 'number' },
    {
      name: 'userPosition',
      type: 'dropdown',
      label: t('보직'),
      value: '',
      presetOptionLabel: t('LABEL.form.label.select'),
      options: [
        { value: '1', label: t('조직장') },
        { value: '2', label: t('조직원') },
      ]
    },
    {
      name: 'positionName',
      type: 'dropdown',
      label: t('호칭(지위)'),
      value: '',
      presetOptionLabel: t('LABEL.form.label.select'),
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.UserGroupType'],
      },
    },
    {
      name: 'jobDomain',
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
      type: 'radio-group',
      label: t('재직 상태'),
      value: '1',
      options: [
        { label: '재직', value: '1' },
        { label: '정직', value: '2' },
        { label: '휴직', value: '3' },
        { label: '퇴사', value: '4' },
      ],
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
      name: 'engName',
      type: 'text',
      label: t('영문 이름'),
      value: '',
    },
    {
      name: 'employeeNumber',
      type: 'text',
      label: t('사번'),
      value: '',
      format: 'number',
      maxLength: 7
    },
    {
      name: 'email',
      type: 'custom',
      label: t('아이디(이메일)'),
      format: 'object',
      value: { fieldValue: '', checkState: DuplicateState.needInput },
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
      type: 'text',
      format: 'number',
      value: '',
    },
    {
      label: t('연락처(사무실)'),
      name: 'companyNumber',
      type: 'phone-number',
      format: 'string',
      value: '',
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
      value: ['FO_PLATFORM', 'BO_PLATFORM'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyMemberJoinType'],
      },
      guideText: t('수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.'),
    },
    {
      name: 'linkageSystem',
      type: 'radio-group',
      label: t('회원 가입 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.LinkageSystem'],
      },
      guideText: t('수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.'),
    },
    {
      name: 'accountStatus',
      type: 'radio-group',
      label: t('계정상태'),
      value: '1',
      options: [
        { label: '정상', value: '1' },
        { label: '잠김', value: '2' },
        { label: '휴면(정상)', value: '3' },
        { label: '휴면(잠김)', value: '4' },
      ],
    },

    {
      name: 'lastAccountStatusUpdateDate',
      type: 'text',
      label: t('계정 상태 최종 변경일'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'dormantDate',
      type: 'text',
      label: t('휴면 상태 변경일'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'approvalStatus',
      type: 'text',
      label: t('승인상태'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'lastApprovalStatusUpdateDate',
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
      type: 'radio-group',
      label: '',
      value: 'AES_Link',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SsoType'],
      },
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
      value: ['BO_PLATFORM'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthPlatformType'],
      },
    },

    // 종료
    {
      name: 'loginRestriction',
      type: 'checkbox-group',
      label: t('로그인 제한'),
      value: ['2'],
      options: [
        { label: '로그인 제한 시간 설정', value: '1' },
        { label: '근테 연동 로그인 제한', value: '2' },
        { label: '제한 없음', value: '3' },
      ],
      guideText: t('로그인 시간 제한 선택 시 회사관리 제한 시간에는 로그인할 수 없습니다.'),
      disabled: true,
    },
  ],
  validator: {
    companyName: true,
    lastDept: true,

    name: { required: true },
    employeeNumber: { required: true },

    userGender: { required: true },
    email: {
      required: true,
      conditions: [
        {
          fn: (values) => {
            const value =
              typeof values.email === 'string'
                ? values.email
                : values.email.fieldValue;
            if( !value || value.trim().length === 0) return false;
            const pattern = new RegExp(EMAIL_REGEX, 'i');
            return !pattern.test(value.trim());
          },
          message: t('이메일 형식에 맞게 입력해 주세요.'),
        },
        {
          fn: (values) => {
            const fieldValue = values.email.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('아이디(이메일)') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.email.checkState === DuplicateState.check ||
            values.email.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('아이디(이메일)') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.email.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('아이디(이메일)') }),
        },
      ],
    },
  },
});
