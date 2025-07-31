import { useRouter, useRouterState } from '@tanstack/react-router';
import { CellContext } from '@tanstack/react-table';
import { t } from 'i18next';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import {
  ChipListModalSelectorFormField,
  GridFormField,
  RadioGroupFormField,
} from '@learnway/ui/form-field';

import { FormDisplay } from '@features/form/ui/form-display';
import { getUserStatus } from '@features/platform-management/company/company-user-management/service/company-user.service';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { ContentsRow } from '@learnway/ui/contents-row';
import { EditInputCell, EditSwitchCell } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { ContentsHistoryInfoFormField, FormRow } from '@shared/ui';
import { EnGlobalConst } from '@types';
interface userDetailProps {
  userData: any;
}

function compareLatestDate(dates: string[]) {
  const validDates = dates.filter((d): d is string => d! == null);

  return validDates.length > 0
    ? validDates.reduce((latest, current) =>
        new Date(current) > new Date(latest) ? current : latest,
      )
    : '-';
}

const jobDomainMap = {
  'BRAND&BASIC': '브랜드&베이직',
  SELLING: '영업',
  SERVICE: '서비스',
};

const jobRoleMap = {
  STAFF: '스텝',
  SYSTEM_MANAGER: '시스템 매니저',
  TRAINING_MANAGER: '트레이닝 매니저',
  ETC: '기타',
};

/**
 *
 * @param props
 * @param ref
 * @returns
 */
const TenantUserApplicationDetailComponent = (props: userDetailProps, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { openModal, confirm: openConfirm, alert: openAlert } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const { provider, updateFormData, onSubmit, onFormChange, getValues, control } =
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

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
  };

  useEffect(() => {
    if (props.userData) {
      const userData = props.userData;
      console.log('#### userData {} => ', userData);
      const dates = [userData.lockedDate, userData.dormantDate, userData.deletedDate];
      const latestDate = compareLatestDate(dates);

      const data = {
        ...userData,
        phoneNumber: userData.phoneNumber && formatPhoneNumber(userData.phoneNumber),
        companyNumber:
          userData.companyPhoneNumber && formatPhoneNumber(userData.companyPhoneNumber),
        companyName: userData.company.name,
        deptName: userData.dept?.deptName,
        userPosition: userData.isLeader ? t('조직장') : t('조직원'),
        gender:
          userData.gender &&
          t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Gender.${userData.gender}`),
        userState: getUserStatus(userData),

        createdDate:
          userData.createdDate &&
          getDateToString(new Date(userData.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
        joinDate:
          userData.joinDate &&
          getDateToString(new Date(userData.joinDate), DATE_TIME_FORMAT.DATETIME_SEC),
        retireDate:
          userData.retireDate &&
          getDateToString(new Date(userData.retireDate), DATE_TIME_FORMAT.DATETIME_SEC),
        promotionDate:
          userData.promotionDate &&
          getDateToString(new Date(userData.promotionDate), DATE_TIME_FORMAT.DATETIME_SEC),
        dormantDate:
          userData.dormantDate &&
          getDateToString(new Date(userData.dormantDate), DATE_TIME_FORMAT.DATETIME_SEC),

        // 계정 정보 데이터 관리 방식
        hrInfoManageType: userData.linkageSystem ? userData.linkageSystem : 'MANUAL_MANAGE',
        companyMemberJoinTypeList: userData.companyMemberJoinTypeList
          ? userData.companyMemberJoinTypeList
          : ['BO_JOIN_MANAGER'],
        accountStatus: 'NORMAL',
        approvalStatus: userData.enabledDate !== null ? '승인' : '대기',
        lastApprovalStatusUpdateDate:
          userData.enabledDate &&
          getDateToString(new Date(userData.enabledDate), DATE_TIME_FORMAT.DATETIME_SEC),
        accountLastUpdateDate: latestDate
          ? getDateToString(new Date(latestDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        tenant: userData.tenants,

        loginRestriction: userData.company.companyLoginRestrictionList,
      };
      if (userData.lockedDate === null) {
        if (userData.dormantDate !== null) {
          data.accountStatus = 'INACTIVE_LOCK';
        }
      } else {
        if (userData.dormantDate === null) {
          data.accountStatus = 'INACTIVE';
        } else {
          data.accountStatus = 'LOCK';
        }
      }

      if (
        (userData.jobRole && userData.jobRole.length > 0) ||
        (userData.jobDomain && userData.jobDomain.length > 0)
      ) {
        data.jobDomain = null;
        data.jobRole = null;
        const maxLength = Math.max(userData.jobRole.length, userData.jobDomain.length);
        const result = Array.from({ length: maxLength }, (_, i) => {
          const id = `${userData.jobDomain[i] ?? null}_${userData.jobRole[i] ?? null}`;
          const role1 = userData.jobDomain[i] ?? null;
          const role2 = userData.jobRole[i] ?? null;
          console.log('1', jobDomainMap[role1 as keyof typeof jobDomainMap]);
          console.log('2', jobRoleMap[role2 as keyof typeof jobRoleMap]);
          return {
            id,
            jobDomainName: jobDomainMap[role1 as keyof typeof jobDomainMap] ?? role1,
            jobRoleName: jobRoleMap[role2 as keyof typeof jobRoleMap] ?? role2,
          };
        });
        data.jobDomains = result;
      }

      updateFormData(data);
    }
  }, [props.userData]);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('개인 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="name" element={<Input disabled />} />
        <FormRow provider={provider} name="engName" element={<Input disabled />} />
        <FormRow provider={provider} name="employeeNumber" element={<Input disabled />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="email" element={<Input disabled />} />
        <FormRow provider={provider} name="birthday" element={<Input disabled />} />
        <FormRow provider={provider} name="gender" element={<Input disabled />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="phoneNumber" />
        <FormRow provider={provider} name="companyNumber" />
        <FormRow provider={provider} name="createdDate" element={<Input disabled />} />
      </ContentsRow>

      <FormSubTitle label={t('회사/조직 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name="companyName" element={<Input disabled />} />
        <FormRow provider={provider} name="firstDept" element={<Input disabled />} />
        <FormRow provider={provider} name="deptName" element={<Input disabled />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="userPosition" element={<Input disabled />} />
        <FormRow provider={provider} name="positionName" element={<Input disabled />} />
        <FormRow provider={provider} name="jobDomain" element={<Input disabled />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'joinDate'} element={<Input disabled />} />
        <FormRow provider={provider} name={'retireDate'} element={<Input disabled />} />
        <FormRow provider={provider} name={'promotionDate'} element={<Input disabled />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="userState" />
        <FormRow provider={provider} name="userModifyDate" element={<Input disabled />} />
        <div className={formStyles.form_item}></div>
      </ContentsRow>

      {/* 직군/직무 정보 */}
      <FormSubTitle label={t('직군/직무 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name="jobDomains"
          element={
            <GridFormField
              gridProps={{
                columns: columns(),
                title: t('직군/직무 관리'),
                visibleRowCount: 1,
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
        <FormRow
          provider={provider}
          name="accountState"
          element={<RadioGroupFormField disabled />}
        />
        <FormRow provider={provider} name="accountLastUpdateDate" element={<Input disabled />} />
        <FormRow provider={provider} name="dormantDate" element={<Input disabled />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="approvalStatus" element={<Input disabled />} />
        <FormRow
          provider={provider}
          name="lastApprovalStatusUpdateDate"
          element={<Input disabled />}
        />
        <div className={formStyles.form_item}></div>
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name="tenant"
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'tenantName',
                valueField: 'tenantId',
                wordwrap: true,
                hideBorder: true,
                isOptionHideCloseButton: (option: any) => option,
              }}
              disabled
            />
          }
        />
      </ContentsRow>
      <ContentsHistoryInfoFormField />
    </form>
  );
};

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, ''); // 숫자만 남기기

  if (cleaned.startsWith('02')) {
    // 서울번호 (지역번호 2자리)
    if (cleaned.length === 9) {
      return cleaned.replace(/(02)(\d{3})(\d{4})/, '$1-$2-$3'); // 02-123-4567
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(02)(\d{4})(\d{4})/, '$1-$2-$3'); // 02-1234-5678
    }
  } else if (/^0\d{2}/.test(cleaned)) {
    // 지방번호 (지역번호 3자리: 031, 051 등)
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // 031-123-4567
    }
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 031-1234-5678 or 010-1234-5678
    }
  }

  return phone; // 조건에 맞지 않으면 원본 반환
}

export const TenantUserApplicationDetail = forwardRef(TenantUserApplicationDetailComponent);
const columns = () => [
  {
    header: '직군',
    accessorKey: 'jobDomainName',
    size: 200,
    cell: (info: CellContext<any, string>) => (
      <EditInputCell info={info} input={{ disabled: true }} />
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
      <EditInputCell info={info} input={{ disabled: true }} />
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
        switch={{ disabled: true }}
      />
    ),
    meta: {
      cellAlign: 'center',
    },
  },
];

const formConfig = (): DynamicFormConfig => ({
  builders: [
    // 개인 정보
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
      value: null,
      placeholder: ' ',
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
      value: '',
      placeholder: ' ',
    },
    {
      name: 'gender',
      type: 'text',
      label: t('성별'),
      value: '',
      placeholder: ' ',
    },
    {
      label: t('휴대폰 번호'),
      name: 'phoneNumber',
      type: 'text',
      value: '',
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
      label: t('회원가입일'),
      name: 'createdDate',
      type: 'text',
      format: 'string',
      value: '',
    },
    // 회사 조직 정보
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
      label: t('실'),
      value: '',
      placeholder: ' ',
    },
    { name: 'deptId', type: 'hidden', label: '', value: '' },
    {
      name: 'deptName',
      type: 'text',
      label: t('소속'),
      value: '',
    },
    {
      name: 'userPosition',
      type: 'text',
      label: t('보직'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'positionName',
      type: 'text',
      label: t('호칭(지위)'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'jobDomain',
      type: 'text',
      label: t('직군'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'joinDate',
      type: 'text',
      label: t('입사일'),
      format: 'object',
      value: undefined,
      placeholder: ' ',
    },
    {
      name: 'retireDate',
      type: 'text',
      label: t('퇴사일'),
      format: 'object',
      value: undefined,
      placeholder: ' ',
    },
    {
      name: 'promotionDate',
      type: 'text',
      label: t('최근 승진일'),
      format: 'object',
      value: undefined,
      placeholder: ' ',
    },
    {
      name: 'userState',
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
    // 직군/직무 정보
    {
      label: '',
      name: 'jobManagement',
      type: 'custom',
      value: [],
    },
    // 계정 정보
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
      value: ['BO_JOIN_MANAGER'],
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
      type: 'checkbox-group',
      label: t('로그인 제한'),
      value: ['2'],
      options: [
        { label: '로그인 제한 시간 설정', value: '1' },
        { label: '근테 연동 로그인 제한', value: '2' },
        { label: '제한 없음', value: '3' },
      ],
      guideText: t('로그인 시간 제한 선택 시 회사관리 제한 시간에는 로그인할 수 없습니다.'),
    },
  ],
});
