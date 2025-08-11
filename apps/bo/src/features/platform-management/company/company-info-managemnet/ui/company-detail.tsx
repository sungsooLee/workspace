import { useRouter, useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString, getStringToDate } from '@learnway/shared';
import { FormGuideText, FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow, ContentsRowItem } from '@learnway/ui/contents-row';
import { CheckboxGroupFormField, RadioGroupFormField } from '@learnway/ui/form-field';
import { GridBox } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Switch } from '@learnway/ui/switch';
import { useToast } from '@learnway/ui/toast';

import { useCreateCompany, useFetchCompany, useUpdateCompany } from '@entities/companies';
import CompaniesService from '@entities/companies/api/companies';
import { getCurrentAuthUser } from '@shared/lib';
import { EnFormMode, EnGlobalConst } from '@shared/types/enums';
import {
  DuplicateCheckInputFormField,
  DuplicateState,
  FormDisplay,
  FormItem,
  SwitchFormField,
} from '@shared/ui/form';
import { UserGroupChoiceModal, UserGroupTabsChoiceModal } from '@shared/ui/modal';
import { LoginRestrictTimeSettingModal } from '@shared/ui/modal/login-restrict-time-setting-modal';

import { LoginAuthenticationSettingInformation } from './login-authentication-setting-information';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

const EMAIL_REGEX =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

const CompanyDetailComponent = (props: any, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;
  const loginUser = getCurrentAuthUser();

  const { data: detailData, refetch } = useFetchCompany(companyCode);

  const { openModal, confirm: openConfirm, alert: openAlert } = useModal();
  const { open: openToast } = useToast();

  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const { provider, updateFormData, onSubmit, onFormChange, getValues } = useDynamicForm2();

  const tempLoginRestrictTimeSetting = React.useRef<any>(null);
  const [loginRestrictTimeSettings, setLoginRestrictTimeSettings] = useState<any[]>([]);

  useEffect(() => {
    console.log('####>>>>>>', getValues());
    if (props.mode === EnFormMode.VIEW && detailData) {
      console.log('detailData', detailData);
      const initialData = {
        ...detailData,
        companyCode: {
          fieldValue: detailData.companyCode,
          checkState: DuplicateState.okStart,
        },
      };
      // // 기등록된 회사의 NULL 치환
      // const convertedData = replaceNullValues(initialData, [
      //   'companyMemberJoinTypeList',
      //   'serviceTypeList',
      //   'ssoTypeList',
      //   'twoFactorAuthPlatformTypeList',
      // ]);
      console.log('##### initialData', initialData);
      updateFormData(initialData);

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
      const form = formRef.current;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const { create } = useCreateCompany({
    onSuccess: () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      router.navigate({ to: '/platform/company/management' });
    },
  });
  const { update } = useUpdateCompany({
    onSuccess: () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      refetch();
    },
  });

  const handleOnSubmit = async () => {
    // onSubmit에서 받아오는 데이터가 null -> 공백으로 넘어와서, getValues 사용
    const data = getValues();
    console.log('handleOnSubmit', data);
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
    if (
      await openConfirm({
        title: t('저장 하시겠습니까?'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      if (props.mode === EnFormMode.ADD) create(payload);
      else if (props.mode === EnFormMode.VIEW) update(payload);
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
    // 회사 기준 유저그룹 조회 필요하나, 임시로 activeTenant 적용
    const tenantIds = loginUser?.activeTenant?.tenantId ? [loginUser?.activeTenant?.tenantId] : [];
    openModal({
      width: 'xl',
      content: <UserGroupTabsChoiceModal tenantIds={tenantIds} />,
      onClose(data: any) {
        console.log('### selectedUserGroups', data);
        if (data) {
          console.log('## tempLoginRestrictTimeSetting', tempLoginRestrictTimeSetting.current);
          const newSetting = JSON.parse(JSON.stringify(tempLoginRestrictTimeSetting.current));
          tempLoginRestrictTimeSetting.current = null;
          setLoginRestrictTimeSettings([
            ...loginRestrictTimeSettings,
            { ...newSetting, companyLoginRestrictionWhiteUserGroupList: data },
          ]);
        } else tempLoginRestrictTimeSetting.current = null;
      },
    });
  };

  const changeUserGroup = (info: any) => {
    console.log('### info', info);
    // 회사 기준 유저그룹 조회 필요하나, 임시로 activeTenant 적용
    const tenantIds = loginUser?.activeTenant?.tenantId ? [loginUser?.activeTenant?.tenantId] : [];
    openModal({
      width: 'xl',
      content: (
        <UserGroupTabsChoiceModal
          tenantIds={tenantIds}
          option={info.original.companyLoginRestrictionWhiteUserGroupList}
        />
      ),
      onClose(data: any) {
        if (data) {
          setLoginRestrictTimeSettings((prev) => {
            const newSettings = [...prev];
            newSettings[info.index] = {
              ...newSettings[info.index],
              companyLoginRestrictionWhiteUserGroupList: data,
            };
            console.log('### newSettings', data);
            return newSettings;
          });
        }
      },
    });
  };

  const handleUserGroupMemberView = (info: any) => {
    openModal({
      width: 'xl',
      content: (
        <UserGroupChoiceModal groups={info.original.companyLoginRestrictionWhiteUserGroupList} />
      ),
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
    const payload =
      props.mode === EnFormMode.VIEW && detailData
        ? { companyCode, companyId: detailData.companyId }
        : { companyCode };
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
        `${getDateToString(
          new Date(info.row.original.restrictionDate.from),
          DATE_TIME_FORMAT.DATE,
        )} ~ ${getDateToString(
          new Date(info.row.original.restrictionDate.to),
          DATE_TIME_FORMAT.DATE,
        )}`,
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
        return (
          <Button
            label={t('대상자')}
            variant={'gray'}
            size={'md'}
            stopPropagation
            onClick={() => handleUserGroupMemberView(info.row)}
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
      {props.roleInfo !== 'TENANT' && (
        <>
          <FormSubTitle label={t('회사 인사 데이터 관리 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'companyType'}
              label={t('그룹 선택')}
              value={'GLOBAL'}
              format="string"
              guideText={t(
                '회원 가입하는 회사는 직접 등록하며, HR 시스템 연동 회사는 자동 등록됩니다.',
              )}
              element={
                <RadioGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.CompanyType'] }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'hrInfoManageType'}
              label={t('인사 데이터 관리 방식')}
              value={'MANUAL_MANAGE'}
              format="string"
              guideText={t(
                '자동관리와 수동관리 선택에 따라서 아래 회원가입 유형의 옵션이 달라집니다.',
              )}
              element={
                <RadioGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.HrInfoManageType'] }}
                />
              }
            />
          </ContentsRow>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'hrInfoManageType', value: 'MANUAL_MANAGE' }]}
          >
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'companyMemberJoinTypeList'}
                label={t('회원 가입 유형')}
                value={['FO_JOIN_DEALER']}
                guideText={t(
                  '수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.',
                )}
                element={
                  <CheckboxGroupFormField
                    optionsConfig={{ codeGroup: CODE_GROUP['pms.company.CompanyMemberJoinType'] }}
                  />
                }
                validation={{
                  required: true,
                  conditions: [
                    {
                      fn: (values: Record<string, any>) =>
                        values.hrInfoManageType === 'AUTO_MANAGE' &&
                        values.companyMemberJoinTypeList.length !== 1,
                      message: t('자동 관리는 하나의 유형만 선택할 수 있습니다.'),
                    },
                  ],
                }}
              />
            </ContentsRow>
          </FormDisplay>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'hrInfoManageType', value: 'AUTO_MANAGE' }]}
          >
            <ContentsRow>
              <FormRow2
                provider={provider}
                name={'linkageSystem'}
                label={t('회원 가입 유형')}
                format={'object'}
                value={'GIM'}
                guideText={t(
                  '수동 관리는 다수 선택할 수 있으며, 자동 관리는 하나만 선택할 수 있습니다.',
                )}
                element={
                  <RadioGroupFormField
                    optionsConfig={{ codeGroup: CODE_GROUP['pms.company.LinkageSystem'] }}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>
        </>
      )}

      <FormSubTitle label={t('회사 기본 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'companyCode'}
          label={t('회사 코드')}
          format={'object'}
          value={{ fieldValue: '', checkState: DuplicateState.needInput }}
          element={
            <DuplicateCheckInputFormField onDuplicationCheck={duplicateCheck} placeholder="" />
          }
          validation={{
            format: 'object',
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => {
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
          }}
        />
        <FormRow2
          provider={provider}
          name={'name'}
          label={t('회사명')}
          value={''}
          element={<Input placeholder="" />}
          validation={{ required: true }}
        />
        <FormRow2
          provider={provider}
          name={'engName'}
          label={t('회사명(영문)')}
          value={''}
          element={<Input placeholder="" />}
          validation={{ required: true }}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'brn'}
          label={t('사업자등록번호')}
          value={''}
          element={<Input placeholder="" />}
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => {
                  const regex = /\D/;
                  return regex.test(values.brn);
                },
                message: t('사업자 등록번호는 숫자만 입력해 주세요.'),
              },
            ],
          }}
        />
        <FormRow2
          provider={provider}
          name={'rpsntrName'}
          label={t('대표자명')}
          value={''}
          element={<Input placeholder="" />}
        />
        <FormRow2
          provider={provider}
          name={'abbreviationName'}
          label={t('법인 약어')}
          value={''}
          element={<Input placeholder="" />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'companyEmail'}
          label={t('대표 이메일')}
          value={''}
          element={<Input placeholder="" />}
          validation={{
            required: false,
            conditions: [
              {
                fn: (values: Record<string, any>) => {
                  console.log('# values', values);
                  if (!values.companyEmail || values.companyEmail.trim().length === 0) return false;
                  const pattern = new RegExp(EMAIL_REGEX, 'i');
                  console.log('### mail', values.companyEmail.trim());
                  return !pattern.test(values.companyEmail.trim());
                },
                message: t('이메일 형식에 맞게 입력해 주세요.'),
              },
            ],
          }}
        />
        <FormRow2
          provider={provider}
          name={'companyTelNo'}
          label={t('대표 전화번호')}
          format="string"
          value={''}
          element={<Input type="text" placeholder={t('대표 전화번호 입력 (02-234-5678)')} />}
          validation={{ required: false, format: 'string' }}
        />
        <FormRow2
          provider={provider}
          name={'companyFaxNo'}
          label={t('대표 팩스번호')}
          value={''}
          element={<Input type="text" placeholder={t('대표 팩스번호 입력 (070-2345-6789)')} />}
          validation={{ required: false, format: 'string' }}
        />
      </ContentsRow>

      <FormSubTitle label={t('플랫폼 계약 설정 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'serviceTypeList'}
          label={t('서비스 유형 선택')}
          value={['BASIC']}
          element={
            <CheckboxGroupFormField
              optionsConfig={{ codeGroup: CODE_GROUP['pms.company.PlatformServiceType'] }}
              value={['BASIC']}
            />
          }
          validation={{ required: true }}
        />
      </ContentsRow>

      <FormSubTitle label={t('로그인 및 인증 설정 정보')} lineType="dark" />
      <LoginAuthenticationSettingInformation provider={provider} />

      {props.mode === EnFormMode.VIEW && (
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
      )}

      <FormSubTitle label={t('보안 설정 정보')} lineType="dark" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'isUseWatermark'}
          label={t('워터 마크 사용')}
          value={true}
          guideText={t('워터마크는 학습창(동영상과 e-book)에서만 노출합니다.')}
          className={dynamicFormStyles.form_item_horizontal}
          element={
            <SwitchFormField
              switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
            />
          }
        />
      </ContentsRow>
      <FormDisplay provider={provider} dependencies={[{ name: 'isUseWatermark', value: true }]}>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'watermarkText'}
            label={t('워터마크 문구')}
            value={''}
            guideText={t('입력한 문구와 성명, 사번이 학습창에 노출됩니다.')}
            element={<Input type="text" placeholder="" maxLength={10} />}
            validation={{
              required: {
                fn: (values: Record<string, any>) => {
                  return values.isUseWatermark === true;
                },
              },
            }}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'watermarkPosition'}
            label={t('워터마크 노출 위치')}
            value={'TOP_LEFT'}
            guideText={t('워터마크 노출 위치를 지정할 수 있습니다.')}
            element={
              <RadioGroupFormField
                optionsConfig={{ codeGroup: CODE_GROUP['pms.company.WatermarkPosition'] }}
              />
            }
          />
        </ContentsRow>
      </FormDisplay>
      <ContentsRow>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name="isPlayerControlLimit"
            label={t('동영상 탐색바 제한')}
            value={true}
            className={dynamicFormStyles.form_item_horizontal}
            element={
              <SwitchFormField
                switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
              />
            }
          />
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isPlayerControlLimit', value: true }]}
          >
            <FormRow2
              provider={provider}
              name="playerControlLimitType"
              value={'BASIS_COMPANY'}
              element={
                <RadioGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.SettingBasisType'] }}
                />
              }
            />
          </FormDisplay>
          <div className={cn(formStyles.form_item)}>
            <FormGuideText>
              {t('회사설정 기준인 경우 과정 등록과 무관하게 회사 기준으로 제한이 됩니다.')}
            </FormGuideText>
          </div>
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name="isPlayBackRateLimit"
            label={t('동영상 배속 제한')}
            value={true}
            className={dynamicFormStyles.form_item_horizontal}
            element={
              <SwitchFormField
                switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
              />
            }
          />
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isPlayBackRateLimit', value: true }]}
          >
            <FormRow2
              provider={provider}
              name="playBackRateLimitType"
              format={'object'}
              value={'BASIS_COMPANY'}
              element={
                <RadioGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.SettingBasisType'] }}
                />
              }
            />
          </FormDisplay>
          <div className={cn(formStyles.form_item)}>
            <FormGuideText>
              {t('회사설정 기준인 경우 과정 등록과 무관하게 회사 기준으로 제한이 됩니다.')}
            </FormGuideText>
          </div>
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name="isCaptureBlockType"
            label={t('학습창 캡쳐 방지')}
            value={true}
            className={dynamicFormStyles.form_item_horizontal}
            element={
              <SwitchFormField
                switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
              />
            }
          />
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'isCaptureBlockType', value: true }]}
          >
            <FormRow2
              provider={provider}
              name="captureBlockType"
              value={'BASIS_COMPANY'}
              element={
                <RadioGroupFormField
                  optionsConfig={{ codeGroup: CODE_GROUP['pms.company.SettingBasisType'] }}
                />
              }
            />
          </FormDisplay>
          <div className={cn(formStyles.form_item)}>
            <FormGuideText>
              {t('회사설정 기준인 경우 과정 등록과 무관하게 회사 기준으로 제한이 됩니다.')}
            </FormGuideText>
          </div>
        </ContentsRowItem>
        <ContentsRowItem>
          <FormRow2
            provider={provider}
            name={'focusModeType'}
            label={t('이러닝 집중 모드')}
            value={'BASIS_COMPANY'}
            guideText={t(
              '사용 설정 시 학습창이 전체화면으로 노출되고 마우스 외부 이동이 불가합니다.',
            )}
            element={
              <RadioGroupFormField
                optionsConfig={{ codeGroup: CODE_GROUP['pms.company.SettingBasisType'] }}
              />
            }
          />
        </ContentsRowItem>
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'ipAccessControlTypeFo'}
          label={t('IP 접근 제한 설정(FO)')}
          value={'ACCESS_IN_SIDE'}
          guideText={t('학습자 사이트의 IP 접근 제한을 설정합니다.')}
          element={
            <RadioGroupFormField
              optionsConfig={{ codeGroup: CODE_GROUP['pms.company.IpAccessControlType'] }}
            />
          }
        />
        <FormRow2
          provider={provider}
          name={'ipAccessControlTypeBo'}
          label={t('IP 접근 제한 설정(BO)')}
          value={'ACCESS_IN_SIDE'}
          guideText={t('HRD 센터의 IP 접근 제한을 설정합니다.')}
          element={
            <RadioGroupFormField
              optionsConfig={{ codeGroup: CODE_GROUP['pms.company.IpAccessControlType'] }}
            />
          }
        />
      </ContentsRow>

      <FormSubTitle label={t('회사 사용 설정')} lineType="dark" />
      <ContentsRow type={'horizontal'}>
        <FormRow2
          provider={provider}
          name={'isUsed'}
          label={t('사용 여부')}
          value={true}
          guideText={t('OFF인  경우 해당 회사 사용자는 테넌트에 로그인 할 수 없습니다.')}
          element={
            <SwitchFormField
              switchConfig={{ label: (value: boolean) => (value ? t('사용') : t('미사용')) }}
            />
          }
        />
        <FormItem />
        <FormItem />
      </ContentsRow>

      <FormSubTitle label={t('담당자 정보')} />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'managerDept'}
          label={t('담당 부서')}
          value={''}
          element={<Input type="text" placeholder="" />}
        />
        <FormRow2
          provider={provider}
          name={'managerPosition'}
          label={t('직위/직책')}
          value={''}
          element={<Input type="text" placeholder="" />}
        />
        <FormRow2
          provider={provider}
          name={'managerName'}
          label={t('성명')}
          value={''}
          element={<Input type="text" placeholder="" />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'managerEmail'}
          label={t('이메일')}
          value={''}
          element={<Input type="text" placeholder="hyundai@hyundai.com" />}
          validation={{
            required: false,
            conditions: [
              {
                fn: (values: Record<string, any>) => {
                  if (!values.managerEmail || values.managerEmail.trim().length === 0) return false;
                  const pattern = new RegExp(EMAIL_REGEX, 'i');
                  return !pattern.test(values.managerEmail.trim());
                },
                message: t('이메일 형식에 맞게 입력해 주세요.'),
              },
            ],
          }}
        />
        <FormRow2
          provider={provider}
          name={'managerOfficeTel'}
          label={t('전화번호(사무실)')}
          value={''}
          element={<Input type="text" placeholder={t('전화번호 입력 (02-234-5678)')} />}
        />
        <FormRow2
          provider={provider}
          name={'managerPhone'}
          label={t('휴대폰 번호')}
          value={''}
          element={<Input type="text" placeholder={t('휴대폰번호 입력 (010-2345-6789)')} />}
        />
      </ContentsRow>
      {/* {props.mode === EnFormMode.VIEW && <ContentsHistoryInfoFormField />} */}
    </form>
  );
};

export const CompanyDetail = forwardRef(CompanyDetailComponent);
