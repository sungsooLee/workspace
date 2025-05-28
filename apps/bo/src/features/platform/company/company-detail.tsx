import { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import {
  Button,
  ChipListModalSelectorFormField,
  useGridBox,
  useGridBoxConfig,
  ContentsRow,
  GridBox,
  Input,
  useModal,
  RadioGroupFormField,
} from '@learnway/ui';
import {
  ContentsHistoryInfoFormField,
  FormInfoArea,
  FormRow,
  FormSubTitle,
  SwitchFormField,
} from '@shared/ui';
import {
  DynamicFormConfig,
  useDynamicForm,
  CODE_GROUP,
  useSearchBox,
  SearchBoxConfig,
} from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { LoginRestrictTimeSettingModal } from '@features/shared/ui/modal/login-restrict-time-setting-modal';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const CompanyDetailComponent: FC<any> = ({ mode }) => {
  const { open: openModal, close: closeModal } = useModal();
  const { provider, fetchData, onSubmit, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig);
  return (
    <>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'linkageSystem'}
          element={<RadioGroupFormField disabled={true} />}
        />
      </ContentsRow>

      <FormSubTitle label={'HR 시스템 연동 정보'} />
      <ContentsRow type={'horizontal'}>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'isUseLinkageSystem'}
          element={<SwitchFormField disabled={true} />}
        />
      </ContentsRow>

      <FormSubTitle label={'회사 기본 정보'} />
      <ContentsRow>
        <FormRow provider={provider} name={'companyType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'name'} />
        <FormRow provider={provider} name={'engName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'brn'} />
        <FormRow provider={provider} name={'rpsntrName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'abbreviation'} />
        <FormRow provider={provider} name={'대표 이메일'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'대표 전화번호'} />
        <FormRow provider={provider} name={'대표 팩스번호'} />
      </ContentsRow>

      <FormSubTitle label={'플랫폼 계약 설정 정보'} />
      <ContentsRow>
        <FormRow provider={provider} name={'serviceType'} />
        <FormRow provider={provider} name={'paymentCompanyCode'} />
      </ContentsRow>

      <FormSubTitle label={'로그인 및 인증 설정 정보'} />
      <ContentsRow type={'horizontal'}>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'isUseSso'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'ssoType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'usePassword'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'isUseTwoFactorAuth'}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'twoFactorAuthType'}
        />
      </ContentsRow>

      <FormSubTitle
        label={'로그인 제한 시간 설정'}
        titleNode={
          <p className={formStyles.guide_text}>
            사용자가 학습자 사이트에 로그인 가능한 시간을 설정할 수 있으며, 회사의 유저그룹을
            기준으로 로그인 제한 시간을 설정할 수 있습니다.
          </p>
        }
        actionNode={
          <Button
            variant={'gray2'}
            size={'sm'}
            label={'선택'}
            onClick={() => {
              openModal({
                width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
                content: <LoginRestrictTimeSettingModal />,
                onClose(data: any) {
                  console.log('data', data);
                },
              });
            }}
          />
        }
      />
      <div className="grid_wrap">
        <GridBox
          config={gConfig}
          columns={columns}
          height={160}
          // showColumnSettings={false}
          // showNumberingColumn={true}
          multiple
          //title={''}
          //   customButtonNode={
          //     <>
          //       <Button
          //         variant="text"
          //         size="sm"
          //         //onClick={handleAddMode}
          //       >
          //         <IcoPlus width={16} height={16} stroke="#131C30" />
          //         {t('LABEL.button.add')}
          //       </Button>
          //       <Button
          //         variant="text"
          //         size="sm"
          //         //onClick={handleAddMode}
          //       >
          //         <IcoMinus width={16} height={16} stroke="#131C30" />
          //         {t('LABEL.button.delete')}
          //       </Button>
          //     </>
          //   }
        />
      </div>

      <FormSubTitle label={'보안 설정 정보'} />
      <ContentsRow type={'horizontal'}>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'isUseWatermark'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'watermarkText'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'watermarkPosition'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'isUsePlayerControlLimit'} />
        <FormRow provider={provider} name={'isUseFocusMode'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'isUseCaptureBlock'}
        />
      </ContentsRow>

      <FormSubTitle label={'결재라인 설정 정보'} />
      <ContentsRow>
        <FormRow provider={provider} name={'enrollApprovalMatrix'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'channelApprovalMatrix'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'externalEnrollApplicationProcess'} />
      </ContentsRow>

      <ContentsRow>
        <FormRow provider={provider} name={'자격증 응시료 지원 신청 결재라인'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'languageApprovalMatrix'} />
      </ContentsRow>

      <FormSubTitle label={'교육 및 과정 연관 설정 정보'} />
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'수강 신청 결재라인 사용'} />
        <FormRow provider={provider} name={'학습시간 제한'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'1일 진도 제한'} />
        <FormRow provider={provider} name={'진도 초기화'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'교재 사용'} />
        <FormRow provider={provider} name={'교재 배송지 사용'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'1인당 교육비 사용'} />
        <FormRow provider={provider} name={'고용보험 환급 사용'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'수료증 제공 여부'} />
        <FormRow provider={provider} name={'학습 포인트(마일리지) 사용'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'사전 레벨 테스트 사용'} />
        <FormRow provider={provider} name={'과정 플래그 사용'} />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow
          className={dynamicFormStyles.w_half}
          provider={provider}
          name={'회사 정보 사용 여부'}
        />
      </ContentsRow>

      <FormSubTitle label={'담당자 정보'} />
      <ContentsRow>
        <FormRow provider={provider} name={'managerDept'} />
        <FormRow provider={provider} name={'managerPosition'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'managerName'} />
        <FormRow provider={provider} name={'managerEmail'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'managerPhone'} />
        <FormRow provider={provider} name={'휴대폰 번호'} />
      </ContentsRow>
    </>
  );
};

export const CompanyDetail = CompanyDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'linkageSystem',
      type: 'radio-group',
      label: t('HR 시스템 연동 방식 설정'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.LinkageSystem'],
      },
    },
    {
      name: 'isUseLinkageSystem',
      type: 'switch',
      label: t('HR 시스템 연동 여부'),
      value: false,
      guideText: '회사 정보를 수동 입력하는 경우 등록 정보를 직접 입력해야 합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? 'HR 연동' : '수동 등록'),
      },
    },
    {
      name: 'companyType',
      type: 'radio-group',
      label: t('그룹'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyType'],
      },
    },
    {
      name: 'name',
      type: 'text',
      label: t('회사명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'engName',
      type: 'text',
      label: t('회사명(영문)'),
      value: '',
      placeholder: '',
    },
    {
      name: 'brn',
      type: 'text',
      label: t('사업자등록번호'),
      value: '',
      placeholder: '사업자등록번호 입력(123-12-12345)',
    },
    {
      name: 'rpsntrName',
      type: 'text',
      label: t('대표자명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'abbreviation',
      type: 'text',
      label: t('법인 약어'),
      value: '',
      placeholder: '',
    },
    {
      name: '대표 이메일',
      type: 'text',
      label: t('대표 이메일'),
      value: '',
      placeholder: 'hyundai@hyundai.com',
    },
    {
      label: t('대표 전화번호'),
      name: '대표 전화번호',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: '대표전화번호nationCode',
        number: '대표전화번호',
      },
      placeholder: '대표 전화번호 입력 (02-234-5678)',
    },
    {
      label: t('대표 팩스번호'),
      name: '대표 팩스번호',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: '대표팩스번호NationCode',
        number: '대표팩스번호',
      },
      placeholder: '대표 팩스번호 입력 (070-2345-6789)',
    },
    {
      name: 'serviceType',
      type: 'radio-group',
      label: t('서비스 유형 선택'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.PlatformServiceType'],
      },
    },
    {
      name: 'paymentCompanyCode',
      type: 'text',
      label: t('비용 결재 용 법인 코드'),
      value: '',
      placeholder: '',
    },
    {
      name: 'isUseSso',
      type: 'switch',
      label: t('SSO 로그인 사용'),
      value: false,
      guideText: 'HR 시스템과 연동하는 회사는 SSO 로그인 유형을 수정할 수 없습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'ssoType',
      type: 'radio-group',
      label: t('SSO 로그인 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SsoType'],
      },
      guideText: 'HR 시스템을 연동하는 회사는 2차 인증 유형을 수정할 수 없습니다.',
    },
    {
      name: 'usePassword', // API 누락
      type: 'radio-group',
      label: t('비밀번호 관리 방식'),
      value: true,
      options: [
        { value: true, label: '비밀번호 사용자' },
        { value: false, label: '비밀번호 미사용자' },
      ],
      guideText:
        '비밀번호 사용자는 학습 플랫폼에서 비밀번호를 관리하고, 비밀번호 미사용자는 그룹웨어(HMG SSO, 오토웨이)에서 비밀번호를 관리합니다.',
    },
    {
      name: 'isUseTwoFactorAuth',
      type: 'switch',
      label: t('로그인 2차 인증 사용'),
      value: true,
      guideText: '2차 로그인 인증 여부를 설정할 수 있습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'twoFactorAuthType',
      type: 'radio-group',
      label: t('2차 인증 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'],
      },
      guideText: 'HR 시스템을 연동하는 회사는 2차 인증 유형을 수정할 수 없습니다.',
    },
    {
      name: 'isUseWatermark',
      type: 'switch',
      label: t('워터 마크 사용'),
      value: true,
      guideText: 'ON인 경우 워터마크 문구와 노출 위치에 따라 학습창에 워터마크가 노츌됩니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'watermarkText',
      type: 'text',
      label: t('워터마크 문구'),
      value: '',
      guideText: '입력한 문구와 성명, 사번이 학습창에 노출됩니다.',
      placeholder: '',
    },
    {
      name: 'watermarkPosition',
      type: 'radio-group',
      label: t('워터마크 노출 위치'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.WatermarkPosition'],
      },
      guideText: '워터마크 노출 위치를 지정할 수 있습니다.',
    },
    {
      name: 'isUsePlayerControlLimit',
      type: 'switch',
      label: t('플레이어 재생바 제어 제한'),
      value: true,
      guideText:
        'ON인 경우 학습창 내 플레이어의 재생바를 이동할 수 없으며, 배속 기능도 사용할 수 없습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'isUseFocusMode',
      type: 'switch',
      label: t('이러닝 집중 모드'),
      value: true,
      guideText: 'ON인 경우 학습창이 전체 화면으로 노출되고, 마우스를 외부로 이동할 수 없습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'isUseCaptureBlock',
      type: 'switch',
      label: t('학습창 캡쳐 방지'),
      value: true,
      guideText: 'ON인 경우 학습창 화면을 캡쳐할 수 없습니다. ',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: 'enrollApprovalMatrix',
      type: 'radio-group',
      label: t('과정 수강 신청 결재라인'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
      },
      guideText: '사용자 과정 수강 신청 시에 수강신청 결재라인을 설정할 수 있습니다.',
    },
    {
      name: 'channelApprovalMatrix',
      type: 'radio-group',
      label: t('채널 신청 결재라인'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
      },
      guideText: '사외과정 신청 시에 수강신청 결재라인을 설정할 수 있습니다.',
    },
    {
      name: 'externalEnrollApplicationProcess',
      type: 'radio-group',
      label: t('사외과정 지원 신청 절차'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.ApplicationProcess'],
      },
      guideText: '사외과정 지원 신청 절차를 설정할 수 있습니다.',
    },
    {
      name: '자격증 응시료 지원 신청 결재라인',
      type: 'radio-group',
      label: t('자격증 응시료 지원 신청 결재라인'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
      },
      guideText: '자격증 응시료 지원 신청 결재라인을 설정할 수 있습니다.',
    },
    {
      name: 'languageApprovalMatrix',
      type: 'radio-group',
      label: t('어학 이력 결재라인'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
      },
      guideText: '어학 이력 결재라인을 설정할 수 있습니다.',
      tooltip: 'EMPTY',
    },

    {
      name: '수강 신청 결재라인 사용',
      type: 'switch',
      label: t('수강 신청 결재라인 사용'),
      value: true,
      guideText: '수강 신청할 때 승인하는 결제 라인을 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '학습시간 제한',
      type: 'switch',
      label: t('학습시간 제한'),
      value: true,
      guideText: '정해진 시간에만 학습을 할 수 있도록 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '1일 진도 제한',
      type: 'switch',
      label: t('1일 진도 제한'),
      value: true,
      guideText: '하루에 학습할 수 있는 진도 제한을 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '진도 초기화',
      type: 'switch',
      label: t('진도 초기화'),
      value: true,
      guideText: '수강했던 학습 자원의 재학습 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '교재 사용',
      type: 'switch',
      label: t('교재 사용'),
      value: true,
      guideText: '과정 등록 시 교재와 교재 정보 사용 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '교재 배송지 사용',
      type: 'switch',
      label: t('교재 배송지 사용'),
      value: true,
      guideText: '교재를 사용하는 경우 교재 배송지 필요 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '1인당 교육비 사용',
      type: 'switch',
      label: t('1인당 교육비 사용'),
      value: true,
      guideText: '교육비 사용 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '고용보험 환급 사용',
      type: 'switch',
      label: t('고용보험 환급 사용'),
      value: false,
      guideText: '과정 등록 시 고융보험 환급 사용 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '수료증 제공 여부',
      type: 'switch',
      label: t('수료증 제공 여부'),
      value: true,
      guideText: '과정 이수 시 수료증 제공 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '학습 포인트(마일리지) 사용',
      type: 'switch',
      label: t('학습 포인트(마일리지) 사용'),
      value: false,
      guideText: '학습 포인트 사용 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '사전 레벨 테스트 사용',
      type: 'switch',
      label: t('사전 레벨 테스트 사용'),
      value: true,
      guideText: '학습자가 해당 과청 수강 신청 시 사전 레벨 테스트 필요 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '과정 플래그 사용',
      type: 'switch',
      label: t('과정 플래그 사용'),
      value: true,
      guideText:
        '수강신청 마스터, 과정 추출, 교육 통계에 사용하는 과정 분류 값 사용 여부를 설정합니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },
    {
      name: '회사 정보 사용 여부',
      type: 'switch',
      label: t('회사 정보 사용 여부'),
      value: true,
      guideText: 'OFF인  경우 해당 회사 사용자는 테넌트에 로그인 할 수 없습니다.',
      switchConfig: {
        label: (value: boolean) => (value ? '사용' : '미사용'),
      },
    },

    {
      name: 'managerDept',
      type: 'text',
      label: t('담당 부서'),
      value: '',
      placeholder: '',
    },
    {
      name: 'managerPosition',
      type: 'text',
      label: t('직위/직책'),
      value: '',
      placeholder: '',
    },
    {
      name: 'managerName',
      type: 'text',
      label: t('성명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'managerEmail',
      type: 'text',
      label: t('이메일'),
      value: '',
      placeholder: 'hyundai@hyundai.com',
    },
    {
      label: t('전화번호(사무실)'),
      name: 'managerPhone',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'nationCode',
        number: 'managerPhone',
      },
      placeholder: '전화번호 입력 (02-234-5678)',
    },
    {
      label: t('휴대폰 번호'),
      name: '휴대폰 번호',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: '휴대폰번호nationCode',
        number: '휴대폰 번호',
      },
      placeholder: '휴대폰번호 입력 (010-2345-6789)',
    },
  ],
  validator: {
    name: true,
    engName: true,
    brn: true,
    watermarkText: true,
    languageApprovalMatrix: true,
  },
};

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [],

  //   pagination: {
  //     pageSize: 10,
  //     pageIndex: 0,
  //     totalRows: 0,
  //   },
  //   excel: {
  //     upload: '/upload',
  //   },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('loginRestrictionType', {
    cell: (info) => info.getValue(),
    header: '로그인 제한 구분',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('loginRestrictionName', {
    cell: (info) => info.getValue(),
    header: '로그인 제한명',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('restrictionStrDate', {
    cell: (info) =>
      info.row.original.restrictionStrDate + ' ~ ' + info.row.original.restrictionEndDate,
    header: '제한 기간',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('loginRestrictionSettingType', {
    cell: (info) => info.getValue(),
    header: '제한 설정 방식',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('userGroup', {
    cell: (info) => info.getValue(),
    header: '유저그룹 설정',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('userGroupTarget', {
    cell: (info) => info.getValue(),
    header: '유저그룹 대상자',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => info.getValue(),
    header: '사용',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('createdBy', {
    cell: (info) => info.getValue(),
    header: '등록자',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) =>
      getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
    header: '등록일시',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('lastModifiedBy', {
    cell: (info) => info.getValue(),
    header: '수정자',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('modifiedDate', {
    cell: (info) =>
      getDateToString(new Date(info.row.original.modifiedDate), DATE_TIME_FORMAT.DATETIME_SEC),
    header: '수정일시',
    size: 200,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
