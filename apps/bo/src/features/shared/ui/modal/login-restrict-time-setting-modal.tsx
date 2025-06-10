import React, { FC, useState, useEffect } from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  ContentsRow,
  RadioGroupFormField,
  useGridBox,
  useGridBoxConfig,
  TableBox,
  Dropdown,
  Switch,
  TimePicker,
  DatePicker,
} from '@learnway/ui';
import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';
import { useDynamicForm, DynamicFormConfig, CODE_GROUP } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { formUtils } from '@entities/form-utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const LoginRestrictTimeSettingModalComponent: FC<any> = () => {
  const { close } = useModal();

  const { provider, control, onSubmit } = useDynamicForm(formConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig);

  const watchedRestrictionType = useWatch({
    control: control,
    name: ['loginRestrictionType'],
  });

  const [timeRestriction, setTimeRestriction] = useState<any[]>([]);
  const [restrictionType, setRestrictionType] = useState('');
  const [settingTypeDisabled, setSettingTypeDisabled] = useState(false);

  const handleOnSubmit = (node: any) => {
    close(node);
  };

  useEffect(() => {
    const selectRestrictionType: string = watchedRestrictionType[0];
    if (selectRestrictionType !== restrictionType) {
      setRestrictionType(selectRestrictionType);
      setSettingTypeDisabled(selectRestrictionType === 'NONE');
    }
  }, [watchedRestrictionType]);

  const handleAddRowClick = () => {
    const row: any = {
      dayOfTheWeek: (
        <Dropdown
          className={dynamicFormStyles.short}
          options={optionsDayOfTheWeek}
          //onChange={handleBaseLocalChange}
        />
      ),
      loginRestrictionTime: (
        <div className="select_date_wrap">
          <DatePicker displayType={'time'} size={'md'} />
          <span className="dash"></span>
          <DatePicker displayType={'time'} size={'md'} />
        </div>
      ),
      isUsed: <Switch checked={true} />,
    };
    setTimeRestriction([...timeRestriction, row]);
  };

  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
      <ModalContainer>
        <ModalTitle>{t('로그인 제한 시간 설정')}</ModalTitle>
        <ModalBody>
          <ContentsRow>
            <FormRow provider={provider} name={'loginRestrictionType'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'loginRestrictionName'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'restrictionDate'}
              element={<DateRangePickerFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'loginRestrictionSettingType'}
              element={<RadioGroupFormField disabled={settingTypeDisabled} />}
            />
          </ContentsRow>
          <TableBox
            config={gConfig}
            columns={columns}
            data={timeRestriction}
            tableMode={true}
            multiple
            title={t('요일 및 시간 제한 설정')}
            showAdd
            showRemove
            onAddClick={handleAddRowClick}
            showTotalCount={false}
          />
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => close()} />
          <Button type="submit" label={t('확인')} variant={'primary'} size={'lg'} />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const LoginRestrictTimeSettingModal = LoginRestrictTimeSettingModalComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'loginRestrictionType',
      type: 'radio-group',
      label: t('로그인 제한 구분'),
      value: '',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.LoginRestrictionType'],
      },
      guideText: t(
        '사용자가 학습자 사이트에 로그인 가능한 시간을 설정할 수 있으며, 로그인 가능 시간 경과 시 자동 로그아웃됩니다.',
      ),
    },
    {
      name: 'loginRestrictionName',
      type: 'text',
      label: t('로그인 제한명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'restrictionDate',
      label: t('기간 선택'),
      type: 'custom',
      value: {
        from: undefined,
        to: undefined,
      },
    },
    {
      name: 'loginRestrictionSettingType',
      type: 'radio-group',
      label: t('로그인 제한 설정 방식'),
      value: 'LOGIN_RESTRICTION_SETTING_TYPE_A',
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.company.LoginRestrictionSettingType'],
      },
      guideText: t(
        '근태 정보 연동 선택 시 각 사용자별 근태 정보를 기준으로 로그인 제한이 설정됩니다.',
      ),
    },
  ],
  validator: {
    loginRestrictionName: true,
    restrictionDate: true,
  },
};

const optionsDayOfTheWeek = [
  { label: t('월요일'), value: 'MON' },
  { label: t('화요일'), value: 'TUE' },
  { label: t('수요일'), value: 'WEB' },
  { label: t('목요일'), value: 'THU' },
  { label: t('금요일'), value: 'FRI' },
  { label: t('토요일'), value: 'SAT' },
  { label: t('일요일'), value: 'SUN' },
];

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
  columnHelper.accessor('dayOfTheWeek', {
    cell: (info) => info.getValue(),
    header: t('요일'),
    meta: {
      size: 'auto',
      headerAlign: 'center',
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('loginRestrictionTime', {
    cell: (info) => info.getValue(),
    header: t('로그인 제한 시간'),
    size: 557,
    meta: {
      headerAlign: 'center',
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => info.getValue(),
    header: t('사용 여부'),
    meta: {
      size: 'auto',
      headerAlign: 'center',
      cellAlign: 'center',
    },
  }),
] as ColumnDef<any, unknown>[];
