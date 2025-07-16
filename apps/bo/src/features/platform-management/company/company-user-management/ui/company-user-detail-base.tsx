import { cn, getDateToString, DATE_TIME_FORMAT } from '@learnway/shared';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ColumnDef, createColumnHelper, CellContext } from '@tanstack/react-table';
import { t } from 'i18next';
import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { EnGlobalConst } from '@types';
import { CODE_GROUP, DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  ChipListModalSelectorFormField,
  ContentsRow,
  ContentsRowItem,
  FormSubTitle,
  Input,
  RadioGroupFormField,
  GridBox,
  GridFormField,
  EditDropdownCell,
  EditSwitchCell,
} from '@learnway/ui';
import { ContentsHistoryInfoFormField, FormItem, FormRow } from '@shared/ui';
import { FormDisplay } from '@features/form';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { getUserStatus } from '../service/company-user.service';

const CompanyUserDetailBaseComponent: FC<any> = ({ userInfo }) => {
  const { provider, control, updateFormData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig());
  const [roleData, setRoleData] = useState<any[]>([]);

  const watchedValues = useWatch({
    control,
    name: ['useSsoLogin', 'isUseTwoFactorAuth', 'twoFactorAuthPlatformTypeList'],
  });

  useEffect(() => {
    if (userInfo) {
      const initialData = {
        ...userInfo,
        companyName: userInfo.company.name,
        deptName: userInfo.dept?.deptName,
        gender:
          userInfo.gender &&
          t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Gender.${userInfo.gender}`),
        area: userInfo.nationCd?.displayName,
        joinDate: userInfo.joinDate
          ? getDateToString(new Date(userInfo.joinDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        retireDate: userInfo.retireDate
          ? getDateToString(new Date(userInfo.retireDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        userStatus: getUserStatus(userInfo),
        promotionDate: userInfo.promotionDate
          ? getDateToString(new Date(userInfo.promotionDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        dormantDate: userInfo.dormantDate
          ? getDateToString(new Date(userInfo.dormantDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '-',
        tenantList: userInfo.tenants,
      };
      updateFormData(initialData);
    }
  }, [userInfo]);

  const jobGroupColumns = [
    {
      header: '직군',
      accessorKey: 'role1',
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [{ label: 'TEST', value: 'TEST' }],
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
      accessorKey: 'role2',
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [{ label: 'TEST', value: 'TEST' }],
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
      accessorKey: 'isMain',
      size: 170,
      cell: (info: CellContext<any, boolean>) => <EditSwitchCell info={info} />,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];

  return (
    <>
      <FormSubTitle label={t('개인 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'name'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'engName'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'employeeNumber'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'email'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'birthday'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'gender'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'area'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'phoneNumber'} />
        <FormRow provider={provider} name={'companyPhoneNumber'} />
      </ContentsRow>

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
        <FormRow provider={provider} name={'room'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'deptName'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'position'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'spot'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'occupation'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'joinDate'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'retireDate'} element={<Input readOnly={true} />} />
        <FormRow provider={provider} name={'promotionDate'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'userStatus'} />
        <FormItem />
        <FormItem />
      </ContentsRow>

      <FormSubTitle label={t('직군/직무 정보')} lineType={'dark'} />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'jobGroups'}
          element={
            <GridFormField
              gridProps={{
                multiple: true,
                showAdd: true,
                showRemove: true,
                showTotalCount: false,
                columns: jobGroupColumns,
                title: t('직군/직무 관리'),
                visibleRowCount: 3,
              }}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={t('계정 정보')} lineType={'dark'} />
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
        <FormRow provider={provider} name={'accountStatus'} />
        <FormRow
          provider={provider}
          name={'lastAccountStatusUpdateDate'}
          element={<Input readOnly={true} />}
        />
        <FormRow provider={provider} name={'dormantDate'} element={<Input readOnly={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'approvalStatus'} element={<Input readOnly={true} />} />
        <FormRow
          provider={provider}
          name={'lastApprovalStatusUpdateDate'}
          element={<Input readOnly={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantList'}
          element={
            <ChipListModalSelectorFormField
              chipList={{
                labelField: 'tenantName',
                valueField: 'tenantId',
                hideBorder: true,
              }}
              disabled={true}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={t('로그인 및 인증 설정 정보')} lineType={'dark'} />
      <ContentsRow>
        <ContentsRowItem>
          <FormRow
            provider={provider}
            name={'useSsoLogin'}
            className={dynamicFormStyles.form_item_horizontal}
          />

          <FormRow
            provider={provider}
            name={'ssoType'}
            element={<RadioGroupFormField disabled={!watchedValues[0]} />}
          />
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow provider={provider} name={'authType'} />
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'use2FA'} />
        <FormRow provider={provider} name={'2FAType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'limitLogin'}
          element={<RadioGroupFormField disabled={true} />}
        />
      </ContentsRow>
      <ContentsHistoryInfoFormField />
    </>
  );
};

export const CompanyUserDetailBase = CompanyUserDetailBaseComponent;

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
      type: 'text',
      label: t('아이디 (이메일)'),
      value: '',
      placeholder: ' ',
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
      name: 'area',
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
        nationCode: 'phoneNationNumber',
        number: 'phoneNumber',
      },
      placeholder: '',
    },
    {
      label: '',
      name: 'phoneNationNumber',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
    },
    {
      label: t('연락처 (사무실)'),
      name: 'companyPhoneNumber',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'companyPhoneNationNumber',
        number: 'companyPhoneNumber',
      },
      placeholder: '',
    },
    {
      label: '',
      name: 'companyPhoneNationNumber',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
    },
    {
      name: 'companyName',
      type: 'text',
      label: t('회사'),
      value: '',
      placeholder: '',
    },
    {
      name: 'room',
      type: 'text',
      label: t('실'),
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
      name: 'spot',
      type: 'text',
      label: t('호칭(직위)'),
      value: '',
      placeholder: '',
    },
    {
      name: 'occupation',
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
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.user.AccountStatus'],
      },
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
      name: 'useSsoLogin',
      type: 'switch',
      label: t('SSO 로그인 사용'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'ssoType',
      type: 'radio-group',
      label: '',
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SsoType'],
      },
      guideText: t('SSO 로그인 사용 여부를 설정합니다.'),
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
      name: 'use2FA',
      type: 'checkbox-group',
      label: t('로그인 2차 인증 사용'),
      format: 'array',
      value: [],
      guideText: t('2차 로그인 인증 여부를 설정할 수 있습니다.'),
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
      type: 'radio-group',
      label: t('로그인 제한'),
      value: 'opt1',
      options: [
        { label: '로그인 제한 시간 설정', value: 'opt1' },
        { label: '근태 연동 로그인 제한', value: 'opt2' },
        { label: '제한 없음', value: 'opt3' },
      ],
      guideText: t('로그인 시간 제한 선택 시 회사관리 제한 시간에는 로그인할 수 없습니다.'),
    },
    {
      name: 'jobGroups',
      type: 'custom',
      label: '',
      value: [],
    },
  ],
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
