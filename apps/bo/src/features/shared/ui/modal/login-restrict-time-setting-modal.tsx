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
import { DateRangeFormField } from '@shared/ui/search-box';
import { FormDisplay } from '@features/form/ui/form-display';
import { useDynamicForm, DynamicFormConfig, useCodeStore, CODE_GROUP } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { formUtils } from '@entities/form-utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import dayjs from 'dayjs';

const LoginRestrictTimeSettingModalComponent: FC<any> = () => {
  const { close } = useModal();
  const { getCode } = useCodeStore();

  const { provider, control, onSubmit } = useDynamicForm(formConfig);

  const watchedRestrictionType = useWatch({
    control: control,
    name: ['loginRestrictionType'],
  });

  const watchedRestrictionSettingType = useWatch({
    control: control,
    name: ['loginRestrictionSettingType'],
  });

  const [dayOfWeeksOptions, setDayOfWeeksOptions] = useState<any[]>([]);

  const [timeRestriction, setTimeRestriction] = useState<any[]>([]);
  const [restrictionType, setRestrictionType] = useState('');
  const [restrictionSettingType, setRestrictionSettingType] = useState('');
  const [settingTypeDisabled, setSettingTypeDisabled] = useState(false);
  const [timeLimitTableAreaDisabled, setTimeLimitTableAreaDisabled] = useState(false);

  const handleOnSubmit = (node: any) => {
    close(node);
  };

  const initOptionConfig = async () => {
    const options: any[] = await getCode(CODE_GROUP['cmmon.DayOfWeekType']);
    setDayOfWeeksOptions(options);
  };

  useEffect(() => {
    initOptionConfig();
  }, []);

  useEffect(() => {
    const selectRestrictionType: string = watchedRestrictionType[0];
    const selectRestrictionSettingType: string = watchedRestrictionSettingType[0];
    let isChanged = false;
    if (selectRestrictionType !== restrictionType) {
      setRestrictionType(selectRestrictionType);
      setSettingTypeDisabled(selectRestrictionType === 'NONE');
      isChanged = true;
    }
    if (selectRestrictionSettingType !== restrictionSettingType) {
      setRestrictionSettingType(selectRestrictionSettingType);
      isChanged = true;
    }
    if (isChanged)
      setTimeLimitTableAreaDisabled(
        selectRestrictionType === 'NONE' || selectRestrictionSettingType === 'HR_INFO_SETTING',
      );
  }, [watchedRestrictionType, watchedRestrictionSettingType]);

  const handleAddRowClick = () => {
    // TODO. 공통 컴포넌트 필요
    const row: any = {
      dayOfTheWeek: (
        <Dropdown
          className={dynamicFormStyles.short}
          options={dayOfWeeksOptions.map((option) => ({ ...option, label: t(option.label || '') }))}
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
              element={<DateRangeFormField />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'loginRestrictionSettingType'}
              element={<RadioGroupFormField disabled={settingTypeDisabled} />}
            />
          </ContentsRow>
          <div style={{ display: timeLimitTableAreaDisabled ? 'none' : 'block' }}>
            <TableBox
              columns={columns}
              data={timeRestriction}
              tableMode={true}
              multiple
              title={t('요일 및 시간 제한 설정')}
              showAdd
              showRemove={timeRestriction.length > 0}
              onAddClick={handleAddRowClick}
              showTotalCount={false}
              visibleRowCount={3}
            />
          </div>
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
      value: 'NONE',
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
      type: 'date-range',
      format: 'object',
      value: {
        from: formUtils.nowDate(),
        to: formUtils.nowDate({ unit: 'year', offset: 1 }),
      },
    },
    {
      name: 'loginRestrictionSettingType',
      type: 'radio-group',
      label: t('로그인 제한 설정 방식'),
      value: 'TIME_SETTING',
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
    restrictionDate: {
      required: true,
      conditions: [
        {
          fn: (values) => !values.restrictionDate?.from,
          message: t('시작 및 종료 날짜를 선택하세요'),
        },
        {
          fn: (values) => !values.restrictionDate?.from,
          message: t('시작 날짜를 선택하세요'),
        },
        {
          fn: (values) => dayjs(values.restrictionDate?.from).isBefore(formUtils.nowDate(), 'day'),
          message: t('시작 날짜는 오늘 이후로 선택하세요.'),
        },
        {
          fn: (values) => !values.restrictionDate?.to,
          message: t('종료 날짜를 선택하세요.'),
        },
        {
          fn: (values) =>
            dayjs(values.restrictionDate?.to).isBefore(dayjs(values.restrictionDate?.from), 'day'),
          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
        },
      ],
    },
  },
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
