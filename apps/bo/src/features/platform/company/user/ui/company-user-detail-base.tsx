import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { FormSubTitle, FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import {
  Input,
  ContentsRow,
  TableBox,
  ChipListModalSelectorFormField,
  RadioGroupFormField,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const CompanyUserDetailBaseComponent: FC<any> = ({ userInfo }) => {
  const { provider, fetchData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);
  const [roleData, setRoleData] = useState<any[]>([]);
  useEffect(() => {
    if (userInfo) {
      const value = {
        ...userInfo,
        companyName: userInfo.company.name,
        deptName: userInfo.dept.deptName,
      };
      fetchData(value);
    }
  }, [userInfo]);
  return (
    <>
      <FormSubTitle label={'개인 정보'} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'name'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'employeeNumber'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'email'} element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'birthday'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'gender'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'area'} element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'phoneNumber'} />
        <FormRow provider={provider} name={'officePhone'} />
      </ContentsRow>

      <FormSubTitle label={'교재 배송 주소 및 교재 신청 내역'} lineType={'dark'} />
      <TableBox data={textBookData} columns={textBookColumns} tableMode={true} />

      <FormSubTitle label={'회사/조직 정보'} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'companyName'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'room'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'deptName'} element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'position'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'spot'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'occupation'} element={<Input disabled={true} />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'joinDate'} element={<Input disabled={true} />} />
        <FormRow provider={provider} name={'quitDate'} element={<Input disabled={true} />} />
        <FormRow
          provider={provider}
          name={'lastPromotionDate'}
          element={<Input disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'employmentStatus'} />
        <FormRow
          provider={provider}
          name={'employmentStatusUpdateDate'}
          element={<Input disabled={true} />}
        />
      </ContentsRow>

      <FormSubTitle label={'직군/직무 정보'} lineType={'dark'} />
      <TableBox
        data={roleData}
        columns={roleColumns}
        tableMode={true}
        multiple
        showAdd
        showRemove
        height={110}
      />

      <FormSubTitle label={'계정 정보'} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'humanResourceManagementMethod'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'registerType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'accountStatus'} />
        <FormRow
          provider={provider}
          name={'lastAccountStatusUpdateDate'}
          element={<Input disabled={true} />}
        />
        <FormRow
          provider={provider}
          name={'lastDormantStatusUpdateDate'}
          element={<Input disabled={true} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'approvalStatus'} element={<Input disabled={true} />} />
        <FormRow
          provider={provider}
          name={'lastApprovalStatusUpdateDate'}
          element={<Input disabled={true} />}
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
              height={120}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={'로그인 및 인증 설정 정보'} lineType={'dark'} />
      <ContentsRow>
        <FormRow provider={provider} name={'useSsoLogin'} />
        <FormRow provider={provider} name={'ssoLoginType'} />
        <FormRow provider={provider} name={'passwordAuthType'} />
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

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'name',
      type: 'text',
      label: t('이름'),
      value: '',
      placeholder: '',
    },
    {
      name: 'employeeNumber',
      type: 'text',
      label: t('사번'),
      value: '',
      placeholder: '',
    },
    {
      name: 'email',
      type: 'text',
      label: t('아이디 (이메일)'),
      value: '',
      placeholder: '',
    },
    {
      name: 'birthday',
      type: 'text',
      label: t('생년월일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'gender',
      type: 'text',
      label: t('성별'),
      value: '',
      placeholder: '',
    },
    {
      name: 'area',
      type: 'text',
      label: t('지역'),
      value: '',
      placeholder: '',
    },
    {
      label: t('휴대폰 번호'),
      name: 'phoneNumber',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: '휴대폰nationCode',
        number: 'cellular',
      },
      placeholder: '010-1234-1234',
    },
    {
      label: '',
      name: '휴대폰nationCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
    },
    {
      label: t('연락처 (사무실)'),
      name: 'officePhone',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: '연락처nationCode',
        number: 'officePhone',
      },
      placeholder: '2-1234-1234',
    },
    {
      label: '',
      name: '연락처nationCode',
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
      name: 'quitDate',
      type: 'text',
      label: t('퇴사일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'lastPromotionDate',
      type: 'text',
      label: t('최근 승진일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'employmentStatus',
      type: 'radio-group',
      label: t('재직 상태'),
      value: 'opt1',
      options: [
        { label: t('재직'), value: 'opt1' },
        { label: t('정직'), value: 'opt2' },
        { label: t('휴직'), value: 'opt3' },
        { label: t('퇴사'), value: 'opt4' },
      ],
    },
    {
      name: 'employmentStatusUpdateDate',
      type: 'text',
      label: t('재직 상태 변경일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'humanResourceManagementMethod',
      type: 'radio-group',
      label: t('인사 데이터 관리 방식'),
      value: 'opt1',
      options: [
        { label: t('자동 관리'), value: 'opt1' },
        { label: t('수동 관리'), value: 'opt2' },
      ],
    },
    {
      name: 'registerType',
      type: 'radio-group',
      label: t('회원 가입 유형'),
      value: 'GIM',
      options: [
        { label: t('GIM'), value: 'GIM' },
        { label: t('HSW'), value: 'HSW' },
        { label: t('KSW'), value: 'KSW' },
        { label: t('DMSS(H)'), value: 'DMSSH' },
        { label: t('DMSS(K)'), value: 'DMSSK' },
        { label: t('DDMS(H)'), value: 'DDMSH' },
        { label: t('DDMS(K)'), value: 'DDMSK' },
        { label: t('VAATZ'), value: 'VAATZ' },
      ],
      guideText: t('수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.'),
    },
    {
      name: 'accountStatus',
      type: 'radio-group',
      label: t('계정 상태'),
      value: 'opt1',
      options: [
        { label: '정상', value: 'opt1' },
        { label: '잠김', value: 'opt2' },
        { label: '휴면(정상)', value: 'opt3' },
        { label: '휴면(잠김)', value: 'opt4' },
      ],
    },
    {
      name: 'lastAccountStatusUpdateDate',
      type: 'text',
      label: t('계정 상태 최종 변경일'),
      value: '',
      placeholder: '',
    },
    {
      name: 'lastDormantStatusUpdateDate',
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
      value: [
        { tenantId: 10, tenantName: '완성차 테넌트' },
        { tenantId: 1, tenantName: '테넌트' },
        { tenantId: 2, tenantName: '테넌트' },
        { tenantId: 3, tenantName: '테넌트' },
        { tenantId: 4, tenantName: '테넌트' },
        { tenantId: 5, tenantName: '테넌트' },
      ],
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
      guideText: t('SSO 로그인 사용 여부를 설정합니다.'),
    },
    {
      name: 'ssoLoginType',
      type: 'radio-group',
      label: t('SSO 로그인 유형'),
      value: 'opt1',
      options: [
        { label: 'HMG SSO', value: 'opt1' },
        { label: 'Autoway', value: 'opt2' },
        { label: 'AES Link', value: 'opt3' },
      ],
    },
    {
      name: 'passwordAuthType',
      type: 'radio-group',
      label: t('비밀번호 인증 유형'),
      value: 'opt1',
      options: [
        { label: '플랫폼', value: 'opt1' },
        { label: 'Autoway', value: 'opt2' },
        { label: 'AES Link', value: 'opt3' },
      ],
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
      options: [
        { label: 'FO 로그인', value: 'FO' },
        { label: 'BO 로그인', value: 'BO' },
      ],
    },
    {
      name: '2FAType',
      type: 'radio-group',
      label: t('2차 인증 유형'),
      value: 'opt1',
      options: [
        { label: 'MPASS (OTP/FIDO)', value: 'opt1' },
        { label: 'MPASS (FIDO)', value: 'opt2' },
        { label: 'MPASS (OTP)', value: 'opt3' },
        { label: '구글 OTP', value: 'opt4' },
      ],
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
  ],
};

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
    deleveryCompleteDate: '2025-01-01',
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
    deleveryCompleteDate: '2025-01-01',
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
    deleveryCompleteDate: '2025-01-01',
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
  columnHelper.accessor('deleveryCompleteDate', {
    header: '교재 배송 완료일',
    size: 138,
    meta: {
      cellAlign: 'center',
    },
  }),
] as ColumnDef<any, unknown>[];

const roleColumns = [
  columnHelper.accessor('occupation', {
    header: '직군',
    size: 570,
  }),
  columnHelper.accessor('job', {
    header: '직무',
    size: 570,
  }),
  columnHelper.accessor('main', {
    header: '정',
    size: 146,
  }),
  columnHelper.accessor('deputy', {
    header: '부',
    size: 146,
  }),
] as ColumnDef<any, unknown>[];
