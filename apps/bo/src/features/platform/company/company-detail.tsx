import React, { FC, useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import {
  Button,
  useGridBox,
  useGridBoxConfig,
  ContentsRow,
  GridBox,
  useModal,
  RadioGroupFormField,
  Input,
  ContentsRowItem,
  Switch,
} from '@learnway/ui';
import { FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { DuplicateCodeGuideText } from '@features/platform/category';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { LoginRestrictTimeSettingModal } from '@features/shared/ui/modal/login-restrict-time-setting-modal';
import { UserGroupTabsChoiceModal } from '@features/shared';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { useCheckExistsCompanyCode } from '@entities/companies';

const CompanyDetailComponent: FC<any> = ({ mode }) => {
  const { open: openModal, close: closeModal, confirm: openConfirm } = useModal();

  const { provider, fetchData, onSubmit, onFormChange, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);

  const [isSuccessCodeCheck, setIsSuccessCodeCheck] = useState(false);
  const [codeCheckState, setCodeCheckState] = useState<'none' | 'success' | 'duplicate' | 'error'>(
    'none',
  );
  const initialFromValuesRef = React.useRef<any>(null);

  const tempLoginRestrictTimeSetting = React.useRef<any>(null);
  const [loginRestrictTimeSettings, setLoginRestrictTimeSettings] = useState<any[]>([]);

  const { checkExistsCompanyCode: checkExists } = useCheckExistsCompanyCode({});

  const isFieldChanged = (fieldName: string, currentValue: any) => {
    if (!initialFromValuesRef.current) return true;
    return initialFromValuesRef.current[fieldName] !== currentValue;
  };

  const handleCodeChange = (newCode: string) => {
    const isChanged = isFieldChanged('companyCode', newCode);
    console.log('handleCodeChange isChanged', isChanged);
    console.log('handleCodeChange newCode', newCode);

    if (onFormChange) {
      // 코드가 변경됐을 경우에만 중복 체크 필요
      onFormChange({
        isDuplicateCode: !isChanged && mode === 'view',
      });
      setCodeCheckState(!isChanged && mode === 'view' ? 'success' : 'none');
    }
  };

  const handleOnSubmit = (data: any) => {
    // View 모드에서 저장 처리
    if (mode === 'view') {
      const isCodeChanged = isFieldChanged('companyCode', data.companyCode);
      // 코드가 변경되지 않았으면 중복 체크 없이 진행
      if (!isCodeChanged) {
        // const body = {
        //   name: data.name,
        //   categoryCode: data.code,
        //   categoryContent: data.categoryContent,
        //   id: data.key,
        //   isUsed: data.isUsed,
        // };
        // console.log('## check body', body);
        // // 수정 API 호출
        // onUpdate(body);
        return;
      }
    }

    // "{{code}}의 중복 여부를 확인해 주세요."
    if (codeCheckState === 'none') {
      setFormError?.(
        'code',
        t('LABEL.form.validation.check', { code: t('LABEL.form.input.companyCode') }),
      );
      return;
    }

    //  '이미 사용 중인 {{code}} 코드입니다.'
    if (!isSuccessCodeCheck || codeCheckState === 'duplicate') {
      setFormError?.(
        'code',
        t('LABEL.form.validation.duplicated', { code: t('LABEL.form.input.companyCode') }),
      );
      return;
    }

    // const body = {
    //   name: data.name,
    //   categoryCode: data.code,
    //   categoryContent: data.categoryContent,
    //   categoryType: 'COMMON',
    //   sortSeq: data.sortSeq,
    //   parentId: data.parentKey,
    // };

    // console.log('## check body', body);
    // onSave?.(body);
  };

  const handleAddClick = () => {
    openModal({
      width: 'lg',
      content: <LoginRestrictTimeSettingModal />,
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
        console.log('## tempLoginRestrictTimeSetting', tempLoginRestrictTimeSetting.current);
        const newSetting = JSON.parse(JSON.stringify(tempLoginRestrictTimeSetting.current));
        tempLoginRestrictTimeSetting.current = null;
        setLoginRestrictTimeSettings([...loginRestrictTimeSettings, newSetting]);
      },
    });
  };

  const handleLoginRestrictTimeUsed = (index: number, value: boolean) => {
    setLoginRestrictTimeSettings((prev) => {
      const newSettings = [...prev];
      newSettings[index] = { ...newSettings[index], isUsed: value };
      return newSettings;
    });
  };

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('loginRestrictionType', {
      cell: (info) => t('pms.company.LoginRestrictionType.' + info.getValue()),
      header: t('로그인 제한 구분'),
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('loginRestrictionName', {
      cell: (info) => <Button className="link">{info.row.original.loginRestrictionName}</Button>,
      header: t('로그인 제한명'),
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('restrictionStrDate', {
      cell: (info) =>
        getDateToString(new Date(info.row.original.restrictionDate.from), DATE_TIME_FORMAT.DATE) +
        ' ~ ' +
        getDateToString(new Date(info.row.original.restrictionDate.to), DATE_TIME_FORMAT.DATE),
      header: t('제한 기간'),
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('loginRestrictionSettingType', {
      cell: (info) => t('pms.company.LoginRestrictionSettingType.' + info.getValue()),
      header: t('제한 설정 방식'),
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('userGroup', {
      cell: (info) => <Button label={t('유저그룹 설정')} variant={'gray'} size={'md'} />,
      header: t('유저그룹 설정'),
      size: 120,
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('userGroupTarget', {
      cell: (info) => {
        console.log('## row', info.row);
        return <Button label={t('대상자')} variant={'gray'} size={'md'} />;
      },
      header: t('유저그룹 대상자'),
      size: 120,
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('isUsed', {
      cell: (info) => (
        <Switch
          checked={info.row.original.isUsed}
          onCheckedChange={(checked: boolean) =>
            handleLoginRestrictTimeUsed(info.row.index, checked)
          }
        />
      ),
      header: t('사용'),
      size: 100,
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('createdBy', {
      cell: (info) => info.getValue(),
      header: t('등록자'),
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('createdDate', {
      cell: (info) =>
        info.row.original.createdDate
          ? getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '',
      header: t('등록일시'),
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('lastModifiedBy', {
      cell: (info) => info.getValue(),
      header: t('수정자'),
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('modifiedDate', {
      cell: (info) =>
        info.row.original.modifiedDate
          ? getDateToString(new Date(info.row.original.modifiedDate), DATE_TIME_FORMAT.DATETIME_SEC)
          : '',
      header: t('수정일시'),
      size: 200,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('회사 인사 데이터 관리 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'companyType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'hrInfoManageType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'companyMemberJoinTypeList'} />
      </ContentsRow>

      <FormSubTitle label={t('회사 기본 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'companyCode'}
          element={
            <DuplicateCodeGuideText
              clearFormError={clearFormError}
              checkExists={(data: string) => {
                checkExists(data, {
                  onSuccess: (data: any) => {
                    const isUnique = data;
                    setIsSuccessCodeCheck(isUnique);
                    setCodeCheckState(isUnique ? 'success' : 'duplicate');
                    onFormChange?.({
                      isDuplicateCode: isUnique,
                    });
                  },
                  onError: () => {
                    setIsSuccessCodeCheck(false);
                    setCodeCheckState('error');
                    onFormChange?.({ isDuplicateCode: false });
                  },
                });
              }}
              isSuccess={isSuccessCodeCheck}
              codeCheckState={codeCheckState}
              handleCodeChange={handleCodeChange}
              setFormError={setFormError}
            />
          }
        />

        <FormRow provider={provider} name={'name'} />
        <FormRow provider={provider} name={'engName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'brn'} />
        <FormRow provider={provider} name={'rpsntrName'} />
        <FormRow provider={provider} name={'abbreviationName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'companyEmail'} />
        <FormRow provider={provider} name={'companyTelNo'} />
        <FormRow provider={provider} name={'companyFaxNo'} />
      </ContentsRow>

      <FormSubTitle label={t('플랫폼 계약 설정 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'serviceTypeList'} />
        <FormRow
          provider={provider}
          name={'paymentCompanyCode'}
          element={<Input disabled={true} />}
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
          <FormDisplay provider={provider} dependencies={[{ name: 'isUseSso', value: true }]}>
            <ContentsRow>
              <FormRow provider={provider} name={'ssoTypeList'} />
            </ContentsRow>
          </FormDisplay>
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
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}
          >
            <FormRow provider={provider} name={'twoFactorAuthPlatformTypeList'} />
          </FormDisplay>
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow
            className={dynamicFormStyles.w_half}
            provider={provider}
            name={'twoFactorAuthType'}
          />
        </ContentsRowItem>
      </ContentsRow>

      <div className="grid_wrap py-10">
        <GridBox
          columns={columns}
          data={loginRestrictTimeSettings}
          multiple
          showAdd
          showRemove
          showTotalCount={false}
          onAddClick={handleAddClick}
          title={t('로그인 제한 시간 설정')}
          guideText={t(
            '사용자가 학습자 사이트에 로그인 가능한 시간을 설정할 수 있으며, 회사의 유저그룹을 기준으로 로그인 제한 시간을 설정할 수 있습니다.',
          )}
        />
      </div>

      <FormSubTitle label={t('보안 설정 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'isUseWatermark'}
          className={dynamicFormStyles.form_item_horizontal}
        />
        <FormDisplay provider={provider} dependencies={[{ name: 'isUseWatermark', value: true }]}>
          <FormRow provider={provider} name={'watermarkText'} />
        </FormDisplay>
      </ContentsRow>

      <FormDisplay provider={provider} dependencies={[{ name: 'isUseWatermark', value: true }]}>
        <ContentsRow>
          <FormRow provider={provider} name={'watermarkPosition'} />
        </ContentsRow>
      </FormDisplay>
      <ContentsRow>
        <FormRow provider={provider} name={'playerControlLimitType'} />
        <FormRow provider={provider} name={'focusModeType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'captureBlockType'} />
      </ContentsRow>

      {/* <FormSubTitle label={'결재라인 설정 정보'} lineType="dark" />
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
      </ContentsRow> */}
      <FormSubTitle label={t('회사 사용 설정')} lineType="dark" />
      <ContentsRow type={'horizontal'}>
        <FormRow className={dynamicFormStyles.w_half} provider={provider} name={'isUsed'} />
      </ContentsRow>

      <FormSubTitle label={t('담당자 정보')} />
      <ContentsRow>
        <FormRow provider={provider} name={'managerDept'} />
        <FormRow provider={provider} name={'managerPosition'} />
        <FormRow provider={provider} name={'managerName'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'managerEmail'} />
        <FormRow provider={provider} name={'managerOfficeTel'} />
        <FormRow provider={provider} name={'managerPhone'} />
      </ContentsRow>
    </form>
  );
};

export const CompanyDetail = CompanyDetailComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'companyType',
      type: 'radio-group',
      label: t('그룹 선택'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyType'],
      },
      guideText: t('회원 가입하는 회사는 직접 등록하며, HR 시스템 연동 회사는 자동 등록됩니다.'),
    },
    {
      name: 'hrInfoManageType',
      type: 'radio-group',
      label: t('인사 데이터 관리 방식'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
      },
      guideText: t('자동관리와 수동관리 선택에 따라서 아래 회원가입 유형의 옵션이 달라집니다.'),
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
      name: 'companyCode',
      type: 'custom',
      label: t('회사 코드'),
      value: '',
      placeholder: '',
    },
    {
      name: 'isDuplicateCode',
      type: 'hidden',
      format: 'boolean',
      value: false,
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
      placeholder: '',
    },
    {
      name: 'rpsntrName',
      type: 'text',
      label: t('대표자명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'abbreviationName',
      type: 'text',
      label: t('법인 약어'),
      value: '',
      placeholder: '',
    },
    {
      name: 'companyEmail',
      type: 'text',
      label: t('대표 이메일'),
      value: '',
      placeholder: '',
    },
    {
      label: t('대표 전화번호'),
      name: 'companyTelNo',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'companyTelNoCountryCode',
        number: 'companyTelNo',
      },
      placeholder: t('대표 전화번호 입력 (02-234-5678)'),
    },
    {
      label: t('대표 팩스번호'),
      name: 'companyFaxNo',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'companyFaxNoCountryCode',
        number: 'companyFaxNo',
      },
      placeholder: t('대표 팩스번호 입력 (070-2345-6789)'),
    },

    {
      name: 'serviceTypeList',
      type: 'checkbox-group',
      label: t('서비스 유형 선택'),
      value: [],
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
      label: t('SSO 로그인 사용 및 SSO 로그인 유형'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'ssoTypeList',
      type: 'checkbox-group',
      label: '',
      value: [],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SsoType'],
      },
      guideText: t('SSO 로그인 사용 여부를 설정합니다.'),
    },
    {
      name: 'passwordAuthType',
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
      name: 'twoFactorAuthType',
      type: 'radio-group',
      label: t('2차 인증 유형'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'],
      },
      guideText: t('로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다.'),
    },
    {
      name: 'twoFactorAuthPlatformTypeList',
      type: 'checkbox-group',
      label: '',
      value: [],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.PlatformServiceType'],
      },
      guideText: t('2차 로그인 인증 여부를 설정할 수 있습니다.'),
    },
    {
      name: 'isUseWatermark',
      type: 'switch',
      label: t('워터 마크 사용'),
      value: true,
      guideText: t(
        '워터마크는 학습창(동영상과 e-book)에서만 노출되며, 과정 등록 시 설정 옵션이 우선 적용됩니다.',
      ),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'watermarkText',
      type: 'text',
      label: t('워터마크 문구'),
      value: '',
      guideText: t('입력한 문구와 성명, 사번이 학습창에 노출됩니다.'),
      placeholder: '',
      maxLength: 10,
    },
    {
      name: 'watermarkPosition',
      type: 'radio-group',
      label: t('워터마크 노출 위치'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.WatermarkPosition'],
      },
      guideText: t('워터마크 노출 위치를 지정할 수 있습니다.'),
    },
    {
      name: 'playerControlLimitType',
      type: 'radio-group',
      label: t('플레이어 재생바 제어 제한'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SettingBasisType'],
      },
      guideText: t(
        '사용 설정 시 학습창 내 플레이어의 재생바를 이동할 수 없으며, 배속 기능도 사용할 수 없습니다.',
      ),
    },
    {
      name: 'focusModeType',
      type: 'radio-group',
      label: t('이러닝 집중 모드'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SettingBasisType'],
      },
      guideText: t(
        '사용 설정 시 학습창 내 플레이어의 재생바를 이동할 수 없으며, 배속 기능도 사용할 수 없습니다.',
      ),
    },
    {
      name: 'captureBlockType',
      type: 'radio-group',
      label: t('학습창 캡쳐 방지'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SettingBasisType'],
      },
      guideText: t('사용 설정 시 학습창 화면을 캡쳐할 수 없습니다.'),
    },
    // {
    //   name: 'enrollApprovalMatrix',
    //   type: 'radio-group',
    //   label: t('과정 수강 신청 결재라인'),
    //   value: '',
    //   optionsConfig: {
    //     codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
    //   },
    //   guideText: '사용자 과정 수강 신청 시에 수강신청 결재라인을 설정할 수 있습니다.',
    // },
    // {
    //   name: 'channelApprovalMatrix',
    //   type: 'radio-group',
    //   label: t('채널 신청 결재라인'),
    //   value: '',
    //   optionsConfig: {
    //     codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
    //   },
    //   guideText: '사외과정 신청 시에 수강신청 결재라인을 설정할 수 있습니다.',
    // },
    // {
    //   name: 'externalEnrollApplicationProcess',
    //   type: 'radio-group',
    //   label: t('사외과정 지원 신청 절차'),
    //   value: '',
    //   optionsConfig: {
    //     codeGroup: CODE_GROUP['pms.company.ApplicationProcess'],
    //   },
    //   guideText: '사외과정 지원 신청 절차를 설정할 수 있습니다.',
    // },
    // {
    //   name: '자격증 응시료 지원 신청 결재라인',
    //   type: 'radio-group',
    //   label: t('자격증 응시료 지원 신청 결재라인'),
    //   value: '',
    //   optionsConfig: {
    //     codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
    //   },
    //   guideText: '자격증 응시료 지원 신청 결재라인을 설정할 수 있습니다.',
    // },
    // {
    //   name: 'languageApprovalMatrix',
    //   type: 'radio-group',
    //   label: t('어학 이력 결재라인'),
    //   value: '',
    //   optionsConfig: {
    //     codeGroup: CODE_GROUP['pms.company.ApprovalMatrix'],
    //   },
    //   guideText: '어학 이력 결재라인을 설정할 수 있습니다.',
    //   tooltip: 'EMPTY',
    // },

    // {
    //   name: '수강 신청 결재라인 사용',
    //   type: 'switch',
    //   label: t('수강 신청 결재라인 사용'),
    //   value: true,
    //   guideText: '수강 신청할 때 승인하는 결제 라인을 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '학습시간 제한',
    //   type: 'switch',
    //   label: t('학습시간 제한'),
    //   value: true,
    //   guideText: '정해진 시간에만 학습을 할 수 있도록 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '1일 진도 제한',
    //   type: 'switch',
    //   label: t('1일 진도 제한'),
    //   value: true,
    //   guideText: '하루에 학습할 수 있는 진도 제한을 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '진도 초기화',
    //   type: 'switch',
    //   label: t('진도 초기화'),
    //   value: true,
    //   guideText: '수강했던 학습 자원의 재학습 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '교재 사용',
    //   type: 'switch',
    //   label: t('교재 사용'),
    //   value: true,
    //   guideText: '과정 등록 시 교재와 교재 정보 사용 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '교재 배송지 사용',
    //   type: 'switch',
    //   label: t('교재 배송지 사용'),
    //   value: true,
    //   guideText: '교재를 사용하는 경우 교재 배송지 필요 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '1인당 교육비 사용',
    //   type: 'switch',
    //   label: t('1인당 교육비 사용'),
    //   value: true,
    //   guideText: '교육비 사용 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '고용보험 환급 사용',
    //   type: 'switch',
    //   label: t('고용보험 환급 사용'),
    //   value: false,
    //   guideText: '과정 등록 시 고융보험 환급 사용 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '수료증 제공 여부',
    //   type: 'switch',
    //   label: t('수료증 제공 여부'),
    //   value: true,
    //   guideText: '과정 이수 시 수료증 제공 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '학습 포인트(마일리지) 사용',
    //   type: 'switch',
    //   label: t('학습 포인트(마일리지) 사용'),
    //   value: false,
    //   guideText: '학습 포인트 사용 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '사전 레벨 테스트 사용',
    //   type: 'switch',
    //   label: t('사전 레벨 테스트 사용'),
    //   value: true,
    //   guideText: '학습자가 해당 과청 수강 신청 시 사전 레벨 테스트 필요 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    // {
    //   name: '과정 플래그 사용',
    //   type: 'switch',
    //   label: t('과정 플래그 사용'),
    //   value: true,
    //   guideText:
    //     '수강신청 마스터, 과정 추출, 교육 통계에 사용하는 과정 분류 값 사용 여부를 설정합니다.',
    //   switchConfig: {
    //     label: (value: boolean) => (value ? '사용' : '미사용'),
    //   },
    // },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      guideText: t('OFF인  경우 해당 회사 사용자는 테넌트에 로그인 할 수 없습니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
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
      name: 'managerOfficeTel',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'managerOfficeTelCountryCode',
        number: 'managerOfficeTel',
      },
      placeholder: t('전화번호 입력 (02-234-5678)'),
    },
    {
      label: t('휴대폰 번호'),
      name: 'managerPhone',
      type: 'phone-number',
      format: 'string',
      value: '',
      fields: {
        nationCode: 'managerPhoneCountryCode',
        number: 'managerPhone',
      },
      placeholder: t('휴대폰번호 입력 (010-2345-6789)'),
    },
  ],
  validator: {
    companyMemberJoinTypeList: {
      required: true,
      conditions: [
        {
          fn: (values) =>
            values.hrInfoManageType === 'AUTO_MANAGE' &&
            values.companyMemberJoinTypeList.length !== 1,
          message: t('자동 관리는 하나의 유형만 선택할 수 있습니다.'),
        },
      ],
    },
    companyCode: true,
    isDuplicateCode: {
      required: {
        fn: (values) => {
          return values.isDuplicateCode === true;
        },
        message: t('LABEL.form.validation.check', { code: t('LABEL.form.input.companyCode') }),
        path: 'companyCode',
      },
      conditions: [],
    },
    name: true,
    engName: true,
    brn: true,
    serviceTypeList: true,
    watermarkText: true,

    languageApprovalMatrix: true,
  },
};
