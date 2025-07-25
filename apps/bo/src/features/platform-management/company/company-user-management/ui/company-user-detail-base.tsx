import { DuplicateState } from '@features/form';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { ContentsRow, FormSubTitle, GridBox, Input, useModal, useToast } from '@learnway/ui';
import { ContentsHistoryInfoFormField, FormItem, FormRow } from '@shared/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnFormMode, EnGlobalConst } from '@types';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getUserStatus } from '../service/company-user.service';
import { CompanyUserDetailAccount } from './company-user-detail-account';
import { CompanyUserDetailAuthentication } from './company-user-detail-auth';
import { CompanyUserDetailJob } from './company-user-detail-job';
import { CompanyUserDetailPersonal } from './company-user-detail-personal';
import { useUpdateUser } from '@entities/users/service/users.hook';
import { useSystemCodeDetail } from '@entities/common-code';
import UsersService from '@entities/users/api/users';
import UserService from '@learnway/auth/entities/user/api/users';

interface CompanyUserDetailBaseProps {
  userInfo: any;
  userRefetch: () => void;
}

function compareLatestDate(dates: string[]) {
  const validDates = dates.filter((d): d is string => d! == null);

  return validDates.length > 0
    ? validDates.reduce((latest, current) => new Date(current) > new Date(latest) ? current : latest)
    : '-';
}

const CompanyUserDetailBaseComponent = (props: CompanyUserDetailBaseProps, ref: any) => {
  const { provider, control, updateFormData, onSubmit, onFormChange, clearFormError, getValues } =
    useDynamicForm(formConfig());


  const { confirm: openConfirm } = useModal();
  const { open: openToast } = useToast();
  const { data: codeGroupData } = useSystemCodeDetail('cmmon.TelCountryCode');

  const { update } = useUpdateUser({
    onSuccess: (data: any) => {
      openToast({ title: '저장 하였습니다.', type: 'success' });
      props.userRefetch();
      updateFormData(data);
    }
  })

  const [roleData, setRoleData] = useState<any[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (props.userInfo) {
      const user = props.userInfo;
      const dates = [user.lockedDate, user.dormantDate, user.deletedDate];
      const latestDate = compareLatestDate(dates);

      const initialData = {
        ...user,
        companyName: user.company.name,
        deptName: user.dept?.deptName,
        email: {
          fieldValue: user.email,
          checkState: DuplicateState.okStart,
        },
        gender:
          user.gender && t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Gender.${user.gender}`),
        area: user.locale?.displayCountry,
        birthday: user.birthday ? new Date(user.birthday) : '',
        position: user.isLeader ? t('조직장') : t('조직원'),
        joinDate: user.joinDate
          ? getDateToString(new Date(user.joinDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        retireDate: user.retireDate
          ? getDateToString(new Date(user.retireDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        userStatus: getUserStatus(user),
        promotionDate: user.promotionDate
          ? getDateToString(new Date(user.promotionDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        dormantDate: user.dormantDate
          ? getDateToString(new Date(user.dormantDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',

        // 계정 정보 데이터 관리 방식
        hrInfoManageType: user.linkageSystem ? user.linkageSystem : 'MANUAL_MANAGE',
        companyMemberJoinTypeList: user.companyMemberJoinTypeList ? user.companyMemberJoinTypeList : ['BO_JOIN_MANAGER'],
        accountStatus: 'NORMAL',
        approvalStatus: user.enabledDate !== null? '승인' : '대기',
        lastApprovalStatusUpdateDate: user.enabledDate
          ? getDateToString(new Date(user.enabledDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        // lockedDate, dormantDate, deletedDate 중 가장 최근 일자
        lastAccountStatusUpdateDate: latestDate ? getDateToString(new Date(latestDate), DATE_TIME_FORMAT.DATETIME_SEC) : '-',
        tenantList: user.tenants,

        // 로그인 및 인증 설정 정보
        isUseSso: user.ssoType !== null ? user.ssoType : false,
        ssoTypeList: user.ssoTypeList ? user.ssoTypeList : '',
        isUseTwoFactorAuth: user.boTwoFactorAuthEnabled || user.foTwoFactorAuthEnabled,
        twoFactorAuthPlatformTypeList: [user.boTwoFactorAuthEnabled && 'BO_PLATFORM', user.foTwoFactorAuthEnabled && 'FO_PLATFORM'],
        '2FAType': user.twoFactorAuthType,
      };
      if( user.lockedDate === null ) {
        if( user.dormantDate !== null ) {
          initialData.accountStatus = 'INACTIVE_LOCK';
        }
      } else {
        if( user.dormantDate === null ) {
          initialData.accountStatus = 'INACTIVE';
        } else {
          initialData.accountStatus = 'LOCK';
        }
      }

      if( (user.jobRole && user.jobRole.length > 0) || (user.jobDomain && user.jobDomain.length > 0) ) {
        initialData.jobDomain = null;
        initialData.jobRole = null;
        const maxLength = Math.max(user.jobRole.length, user.jobDomain.length);
        const result = Array.from({ length: maxLength }, (_, i) => ({
          id: `${user.jobDomain[i] ?? null}_${user.jobRole[i] ?? null}`,
          role1: user.jobDomain[i] ?? null,
          role2: user.jobRole[i] ?? null,
        }));
        initialData.jobDomains = result;
      }

      updateFormData(initialData);
    }
  }, [props.userInfo]);

  useImperativeHandle(ref, () => ({
    saveData() {
      const form = formRef.current;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
    const payload = {
      userUuid: props.userInfo.uuid,
      companyId: props.userInfo.company.companyId, //회사 id
      departmentId: props.userInfo.dept.deptId, // 부서 id
      // 회사/조직 정보
      isOnLeave: false, // 재직 상태: (휴직)
      isSuspended: false, // 재직 상태: (정직)
      // 개인 정보
      name: data.name, // 이름
      engName: data.engName, // 영문 이름
      employeeNumber: data.employeeNumber, // 사번
      birthday: data.birthday, // 생년월일
      gender: data.gender, // 성별
      phoneNumber: data.phoneNumber, // 휴대폰 번호
      companyPhoneNumber: data.companyPhoneNumber, // 연락처(사무실)
      // 직군/직무: 직군 선택에 따른 직무 - 현재 공통 코드로만 존재할지 아니면 따로 관리를 할지를 협의해야한다고 해서 구현 못 함.
      jobDomain: [''],
      jobRole: [''],
      // 계정 정보
      linkageSystem: data.hrInfoManageType !== 'MANUAL_MANAGE' ? data.hrInfoManageType : null,
      accountStatus: 'NORMAL',

      // 로그인 및 인증 설정 정보
      ssoType: data.isUseSso ? data.ssoTypeList : null,
      authType: data.authType,
      twoFactorAuthType: data['2FAType'],
      foTwoFactorAuthEnabled: false,
      boTwoFactorAuthEnabled: false,
      loginRestriction: data.company.companyLoginRestrictionList
    };

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

    if( data.isUseTwoFactorAuth ) {
      payload.foTwoFactorAuthEnabled = data.twoFactorAuthPlatformTypeList.includes('FO_PLATFORM');
      payload.boTwoFactorAuthEnabled = data.twoFactorAuthPlatformTypeList.includes('BO_PLATFORM');
    }

    if( data.jobDomain !== '' ) {
      payload.jobDomain = Array.of(data.jobDomain);
      payload.jobRole = [];
    } else {
      if( data.jobDomains ) {
        const jobDomains: any[] = [];
        const jobRoleNames: any[] = [];
        data.jobDomains.forEach((job: any) => {
          jobDomains.push(job.role1)
          jobRoleNames.push(job.role2)
        });
        payload.jobDomain = [...jobDomains];
        payload.jobRole = [...jobRoleNames];
      }
    }

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    )
    console.log('### payload', filteredPayload);
    if (await openConfirm('저장 하시겠습니까?')) {
      update(filteredPayload);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      {/* 개인 정보 */}
      <CompanyUserDetailPersonal provider={provider} />
      <FormSubTitle label={t('교재 배송 주소 및 교재 신청 내역')} lineType={'dark'} />
      <GridBox
        data={textBookData}
        columns={textBookColumns}
        title={t('교재 신청 내역')}
        guideText={t('과정 수강 시 교재 신청 내역입니다.')}
        showTotalCount={false}
        visibleRowCount={3}
      />

      <FormSubTitle label={t('회사/조직 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'companyName'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'deptName'} element={<Input readOnly={true} />} />
        <FormItem />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'position'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'positionName'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'jobDomain'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'joinDate'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'retireDate'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'promotionDate'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'userStatus'} />
        <FormRow provider={provider} name={'userModifyDate'} element={<Input disabled={true} />} />
        <FormItem />
      </ContentsRow>
      {/* 직군/직무 정보 */}
      <CompanyUserDetailJob provider={provider} />
      {/* 계정 정보 */}
      <CompanyUserDetailAccount provider={provider} formMode={EnFormMode.VIEW} />
      {/* 로그인 및 인증 설정 정보 */}
      <CompanyUserDetailAuthentication provider={provider} />
      <ContentsHistoryInfoFormField />
    </form>
  );
};

export const CompanyUserDetailBase = forwardRef(CompanyUserDetailBaseComponent);

const formConfig = (): DynamicFormConfig => ({
  builders: [
    {
      name: 'name',
      type: 'text',
      label: t('이름'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'engName',
      type: 'text',
      label: t('영문 이름'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'employeeNumber',
      type: 'text',
      label: t('사번'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'email',
      type: 'custom',
      label: t('아이디 (이메일)'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: ' ',
      disabled: true
    },
    {
      name: 'birthday',
      type: 'text',
      label: t('생년월일'),
      format: 'object',
      value: undefined,
    },
    {
      name: 'gender',
      type: 'dropdown',
      label: t('성별'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.Gender'],
      },
    },
    {
      name: 'area',
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
      disabled: true,
    },
    {
      label: t('연락처 (사무실)'),
      name: 'companyPhoneNumber',
      type: 'phone-number',
      format: 'string',
      value: '',
      placeholder: '',
    },
    {
      name: 'companyName',
      type: 'text',
      label: t('회사'),
      value: '',
      placeholder: '',
    },
    {
      name: 'deptName',
      type: 'text',
      label: t('소속'),
      value: '',
      placeholder: '',
    },
    {
      name: 'position',
      type: 'text',
      label: t('보직'),
      value: '',
      placeholder: '',
    },
    {
      name: 'positionName',
      type: 'text',
      label: t('호칭(직위)'),
      value: '',
      placeholder: '',
    },
    {
      name: 'jobDomain',
      type: 'text',
      label: t('직군'),
      value: '',
      placeholder: '',
    },
    {
      name: 'joinDate',
      type: 'text',
      label: t('입사일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'retireDate',
      type: 'text',
      label: t('퇴사일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'promotionDate',
      type: 'text',
      label: t('최근 승진일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'userStatus',
      type: 'radio-group',
      label: t('재직 상태'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.Status'],
      },
    },
    {
      name: 'userModifyDate',
      type: 'text',
      label: t('재직 상태 변경일'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'hrInfoManageType',
      type: 'radio-group',
      label: t('인사 데이터 관리 방식'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
      },
    },
    {
      name: 'companyMemberJoinTypeList',
      type: 'checkbox-group',
      label: t('회원 가입 유형'),
      value: [],
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
      label: t('계정 상태'),
      value: '',
      // optionsConfig: {
      //   codeGroup: CODE_GROUP['pms.user.AccountStatus'],
      // },
      options: [
        {value: 'NORMAL', label: '정상'},
        {value: 'LOCK', label: '잠김'},
        {value: 'INACTIVE', label: '휴면(정상)'},
        {value: 'INACTIVE_LOCK', label: '휴면(잠김)'},
      ]
    },
    {
      name: 'lastAccountStatusUpdateDate',
      type: 'text',
      label: t('계정 상태 최종 변경일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'dormantDate',
      type: 'text',
      label: t('휴면 상태 변경일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'approvalStatus',
      type: 'text',
      label: t('승인상태'),
      value: '',
      placeholder: '',
    },
    {
      name: 'lastApprovalStatusUpdateDate',
      type: 'text',
      label: t('승인상태 최종 변경일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'tenantList',
      type: 'custom',
      label: t('테넌트'),
      value: [],
      format: 'array',
    },
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
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SsoType'],
      },
    },
    {
      name: 'authType',
      type: 'radio-group',
      label: t('비밀번호 인증 유형'),
      value: '',
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
      name: 'twoFactorAuthPlatformTypeList',
      type: 'checkbox-group',
      label: '',
      value: ['FO_PLATFORM', 'BO_PLATFORM'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthPlatformType'],
      },
    },
    {
      name: '2FAType',
      type: 'radio-group',
      label: t('2차 인증 유형'),
      value: 'GOOGLE_OTP',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'],
      },
      guideText: t('로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다.'),
    },
    {
      name: 'limitLogin',
      type: 'checkbox-group',
      label: t('로그인 제한'),
      value: ['opt2'],
      options: [
        { label: '로그인 제한 시간 설정', value: 'opt1' },
        { label: '근태 연동 로그인 제한', value: 'opt2' },
        { label: '제한 없음', value: 'opt3' },
      ],
      guideText: t('로그인 시간 제한 선택 시 회사관리 제한 시간에는 로그인할 수 없습니다.'),
    },
    {
      name: 'jobDomains',
      type: 'custom',
      label: '',
      value: [],
    },
  ],
  validator: {
    name: true,
    email: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.email.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('이메일') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.email.checkState === DuplicateState.check ||
            values.email.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('이메일') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.email.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('이메일') }),
        },
      ],
    },
  },
});

const textBookData: any[] = [
  {
    courseNo: '12121212',
    courseName:
      '신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다.',
    stepName:
      '신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다.',
    address: '[12345] 서울시 강남구 테헤란로 00길 KG타워 1001호',
    textbookNo: '1212',
    deliveryDate: '2025-01-01',
    deliveryCompleteDate: '2025-01-01',
  },
  {
    courseNo: '12121212',
    courseName:
      '신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다.',
    stepName:
      '신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다.',
    address: '[12345] 서울시 강남구 테헤란로 00길 KG타워 1001호',
    textbookNo: '1212',
    deliveryDate: '2025-01-01',
    deliveryCompleteDate: '2025-01-01',
  },
  {
    courseNo: '12121212',
    courseName:
      '신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다.',
    stepName:
      '신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다. 신청한 과정명이 출력됩니다.',
    address: '[12345] 서울시 강남구 테헤란로 00길 KG타워 1001호',
    textbookNo: '1212',
    deliveryDate: '2025-01-01',
    deliveryCompleteDate: '2025-01-01',
  },
];

const columnHelper = createColumnHelper<any>();

const textBookColumns = [
  columnHelper.accessor('courseNo', {
    header: '과정번호',
    size: 125,
  }),
  columnHelper.accessor('courseName', {
    header: '과정명',
    size: 260,
  }),
  columnHelper.accessor('stepName', {
    header: '차수명',
    size: 277,
  }),
  columnHelper.accessor('address', {
    header: '교재배송 주소',
    meta: {
      headerAlign: 'center', // 헤더 정렬
      cellAlign: 'center', // 셀 정렬
    },
  }),
  columnHelper.accessor('textbookNo', {
    header: '교재번호',
    size: 140,
  }),
  columnHelper.accessor('deliveryDate', {
    header: '교재 배송 예정일',
    size: 138,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('deliveryCompleteDate', {
    header: '교재 배송 완료일',
    size: 138,
    meta: {
      cellAlign: 'center',
    },
  }),
] as ColumnDef<any, unknown>[];
