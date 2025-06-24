import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { t } from 'i18next';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
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
} from '@learnway/ui';
import dayjs from 'dayjs';
import { FormRow, FormSubTitle, ContentsHistoryInfoFormField } from '@shared/ui';
import { FormDisplay } from '@features/form/ui/form-display';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString, getStringToDate, cn } from '@learnway/shared';
import { DuplicateCheckInputFormField, DuplicateState } from '@features/form';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { LoginRestrictTimeSettingModal } from '@features/shared/ui/modal/login-restrict-time-setting-modal';
import { UserGroupTabsChoiceModal, UserGroupChoiceModal } from '@features/shared';
import { EnGlobalConst, EnFormMode } from '@types';
import { useCreateCompany, useUpdateCompany, useFetchCompany } from '@entities/companies';
import CompaniesService from '@entities/companies/api/companies';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const CompanyDetailComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const { data: detailData, refetch } = useFetchCompany(companyCode);

  const { open: openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const { provider, fetchData, onSubmit, onFormChange, getValues, control } =
    useDynamicForm(formConfig);

  const tempLoginRestrictTimeSetting = React.useRef<any>(null);
  const [loginRestrictTimeSettings, setLoginRestrictTimeSettings] = useState<any[]>([]);

  useEffect(() => {
    if (props.mode === EnFormMode.VIEW && detailData) {
      console.log('detailData', detailData);
      const initialData = {
        ...detailData,
        companyCode: {
          fieldValue: detailData.companyCode,
          checkState: DuplicateState.okStart,
        },
      };
      // 기등록된 회사의 NULL 치환
      const convertedData = replaceNullValues(initialData, [
        'companyMemberJoinTypeList',
        'serviceTypeList',
        'ssoTypeList',
        'twoFactorAuthPlatformTypeList',
      ]);
      console.log('##### initialData', convertedData);
      fetchData(convertedData);
      setTimeout(() => {
        fetchData(convertedData);
      }, 10000);

      const loginRestrictions = detailData.companyLoginRestrictionList.map((limit: any) => ({
        ...limit,
        restrictionDate: {
          from: getStringToDate(limit.restrictionStartDate),
          to: getStringToDate(limit.restrictionEndDate),
        },
        timeLimits: limit.companyLoginRestrictionDetailList.map((detail: any) => ({
          ...detail,
          id: detail.companyLoginRestrictionDetailId,
          dayOfTheWeek: detail.dayOfWeekType,
          loginRestrictionTime: {
            from: timeStringToDate(detail.startTime),
            to: timeStringToDate(detail.endTime),
          },
        })),
      }));
      console.log('#### loginRestrictions', loginRestrictions);
      setLoginRestrictTimeSettings(loginRestrictions);
    }
  }, [detailData]);

  const timeStringToDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return dayjs().hour(hours).minute(minutes).second(0).millisecond(0).toDate();
  };

  const replaceNullValues = (obj: any, arrayKeys: string[], replacement = '') => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value === null ? (arrayKeys.includes(key) ? [] : replacement) : value,
      ]),
    );
  };

  const formRef = useRef<HTMLFormElement>(null);

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
          refetch();
        },
      });
    },
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
    if (props.mode === EnFormMode.ADD) {
      if (await openConfirm('저장 하시겠습니까?')) {
        create(payload);
      }
    } else if (props.mode === EnFormMode.VIEW) {
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
        if (data) {
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
        } else tempLoginRestrictTimeSetting.current = null;
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
        if (data) {
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
        }
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

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('loginRestrictionType', {
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.LoginRestrictionType.${info.getValue()}`,
        ),
      header: t('로그인 제한 구분'),
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('loginRestrictionName', {
      cell: (info) => (
        <Button
          className="link"
          stopPropagation
          onClick={() => handleLoginRestrictTimeDetailClick(info.row)}
        >
          {info.row.original.loginRestrictionName}
        </Button>
      ),
      header: t('로그인 제한명'),
      size: 160,
      enableGrouping: false,
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
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.LoginRestrictionSettingType.${info.getValue()}`,
        ),
      header: t('제한 설정 방식'),
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('userGroup', {
      cell: (info) => (
        <Button
          label={t('유저그룹 설정')}
          variant={'gray'}
          size={'md'}
          stopPropagation
          onClick={() => changeUserGroup(info.row)}
        />
      ),
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
        return (
          <Button
            label={t('대상자')}
            variant={'gray'}
            size={'md'}
            stopPropagation
            onClick={() => handleUserGroupMemberView()}
          />
        );
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
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('회사 인사 데이터 관리 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow provider={provider} name={'companyType'} element={<RadioGroupFormField />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name={'hrInfoManageType'} element={<RadioGroupFormField />} />
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

      <FormSubTitle label={t('회사 기본 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'companyCode'}
          element={<DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} />}
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
            <FormRow
              provider={provider}
              name={'ssoTypeList'}
              element={<CheckboxGroupFormField />}
            />
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
            <FormRow
              provider={provider}
              name={'twoFactorAuthPlatformTypeList'}
              element={<CheckboxGroupFormField />}
            />
          </FormDisplay>
        </ContentsRowItem>
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isUseTwoFactorAuth', value: true }]}>
        <ContentsRow>
          <FormRow
            className={dynamicFormStyles.w_half}
            provider={provider}
            name={'twoFactorAuthType'}
            element={<RadioGroupFormField />}
          />
        </ContentsRow>
      </FormDisplay>

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
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isUseWatermark', value: true }]}>
        <ContentsRow>
          <FormRow provider={provider} name={'watermarkText'} />
        </ContentsRow>
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
        <FormRow provider={provider} name={'ipAccessControlTypeFo'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'ipAccessControlTypeBo'}
          className={dynamicFormStyles.w_half}
        />
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
*/}
      <FormSubTitle label={t('회사 사용 설정')} lineType="dark" />
      <ContentsRow type={'horizontal'}>
        <FormRow provider={provider} name={'isUsed'} />
        <div className={cn(formStyles.form_item)}></div>
        <div className={cn(formStyles.form_item)}></div>
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
      {/* {props.mode === EnFormMode.VIEW && <ContentsHistoryInfoFormField />} */}
    </form>
  );
};

export const CompanyDetail = forwardRef(CompanyDetailComponent);

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'companyType',
      type: 'radio-group',
      label: t('그룹 선택'),
      value: 'GLOBAL',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.CompanyType'],
      },
      guideText: t('회원 가입하는 회사는 직접 등록하며, HR 시스템 연동 회사는 자동 등록됩니다.'),
    },
    {
      name: 'hrInfoManageType',
      type: 'radio-group',
      label: t('인사 데이터 관리 방식'),
      value: 'MANUAL_MANAGE',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
      },
      guideText: t('자동관리와 수동관리 선택에 따라서 아래 회원가입 유형의 옵션이 달라집니다.'),
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
      name: 'linkageSystem',
      type: 'radio-group',
      label: t('회원 가입 유형'),
      value: 'GIM',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.LinkageSystem'],
      },
      guideText: t('수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.'),
    },
    {
      name: 'companyCode',
      type: 'custom',
      label: t('회사 코드'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      placeholder: '',
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
      label: '',
      name: 'companyTelNoCountryCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
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
      label: '',
      name: 'companyFaxNoCountryCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
    },
    {
      name: 'serviceTypeList',
      type: 'checkbox-group',
      label: t('서비스 유형 선택'),
      value: ['BASIC'],
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.PlatformServiceType'],
      },
    },
    {
      name: 'isUseSso',
      type: 'switch',
      label: t('SSO 로그인 사용 및 SSO 로그인 유형'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      guideText: t('SSO 로그인 사용 여부를 설정합니다.'),
    },
    {
      name: 'ssoTypeList',
      type: 'checkbox-group',
      label: '',
      value: ['AES_Link'],
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
      guideText: t('로그인 2차 인증 사용하는 경우 2차 인증 유형을 선택할 수 있습니다.'),
    },
    {
      name: 'twoFactorAuthType',
      type: 'radio-group',
      label: t('2차 인증 유형'),
      value: 'GOOGLE_OTP',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.TwoFactorAuthType'],
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
      value: 'TOP_LEFT',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.WatermarkPosition'],
      },
      guideText: t('워터마크 노출 위치를 지정할 수 있습니다.'),
    },
    {
      name: 'playerControlLimitType',
      type: 'radio-group',
      label: t('플레이어 재생바 제어 제한'),
      value: 'BASIS_COMPANY',
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
      value: 'BASIS_COMPANY',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SettingBasisType'],
      },
      guideText: t('사용 설정 시 학습창이 전체화면으로 노출되고 마우스 외부 이동이 불가합니다.'),
    },
    {
      name: 'captureBlockType',
      type: 'radio-group',
      label: t('학습창 캡쳐 방지'),
      value: 'BASIS_COMPANY',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.SettingBasisType'],
      },
      guideText: t('사용 설정 시 학습창 화면을 캡쳐할 수 없습니다.'),
    },
    {
      name: 'ipAccessControlTypeFo',
      type: 'radio-group',
      label: t('IP 접근 제한 설정(FO)'),
      value: 'ACCESS_IN_SIDE',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.IpAccessControlType'],
      },
      guideText: t('학습자 사이트의 IP 접근 제한을 설정합니다.'),
    },
    {
      name: 'ipAccessControlTypeBo',
      type: 'radio-group',
      label: t('IP 접근 제한 설정(BO)'),
      value: 'ACCESS_IN_SIDE',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.IpAccessControlType'],
      },
      guideText: t('HRD 센터의 IP 접근 제한을 설정합니다.'),
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
      label: '',
      name: 'managerOfficeTelCountryCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
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
    {
      label: '',
      name: 'managerPhoneCountryCode',
      type: 'hidden',
      format: 'string',
      value: 'KOR_82',
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
    companyCode: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.companyCode.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('회사 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.companyCode.checkState === DuplicateState.check ||
            values.companyCode.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('회사 코드') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.companyCode.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('회사 코드') }),
        },
      ],
    },
    name: true,
    engName: true,
    brn: {
      required: true,
      conditions: [
        {
          fn: (values) => {
            const regex = /\D/;
            return regex.test(values.brn);
          },
          message: t('사업자 등록번호는 숫자만 입력해 주세요.'),
        },
      ],
    },
    serviceTypeList: true,
    watermarkText: {
      required: {
        fn: (values) => {
          return values.isUseWatermark === true;
        },
      },
    },
    companyEmail: {
      required: false,
      conditions: [
        {
          fn: (values) => {
            if (values.companyEmail.trim().length === 0) return false;
            const pattern = new RegExp(EMAIL_REGEX, 'i');
            return !pattern.test(values.companyEmail.trim());
          },
          message: t('이메일 형식에 맞게 입력해 주세요.'),
        },
      ],
    },
    managerEmail: {
      required: false,
      conditions: [
        {
          fn: (values) => {
            if (values.managerEmail.trim().length === 0) return false;
            const pattern = new RegExp(EMAIL_REGEX, 'i');
            return !pattern.test(values.managerEmail.trim());
          },
          message: t('이메일 형식에 맞게 입력해 주세요.'),
        },
      ],
    },
  },
};
