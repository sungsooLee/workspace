import { FC, useState, useEffect, forwardRef } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { cn } from '@learnway/shared';
import {
  Button,
  CheckboxGroupFormField,
  RadioGroupFormField,
  TextareaFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  List,
  TableBox,
  useModal,
} from '@learnway/ui';
import { FormRow, NoticeBox, FormSubTitle, SwitchFormField, FormInfoArea } from '@shared/ui';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import styles from './main-widget.module.css';
import dataWrapStyles from './data-wrap.module.css';
import {
  DynamicFormConfig,
  useDynamicForm,
  BaseFormFieldProps,
  useDynamicFormContext,
} from '@learnway/hooks';
import { CompanyShuttleModal, ChannelChoiceModal, ChannelListChoiceModal } from '@features/shared';
import { EnFormMode, EnDeviceType } from '@types';
import {
  useAllTenantWidget,
  useMoveTenantWidget,
  useUpdateTenantWidget,
} from '@entities/widgets/service/widgets.hook';

import { TenantDetailWidgetMappingModal } from './tenant-detail-widget-mapping-modal';
import { WidgetPreviewButton } from '@features/platform'; // const menuLength = 5;

// const menuLength = 5;
// const menuOptions = Array(menuLength)
//   .fill(null)
//   .map((d, i) => ({
//     id: getRandomId(),
//     label: `메뉴명${i}`,
//     original: {},
//   }));

const defaultRow = [
  {
    c1: 'PC',
    componentId: '',
    width: '',
    height: '',
  },
  {
    c1: 'Mobile',
    componentId: '',
    width: '',
    height: '',
  },
];
/**
 * 화면번호: NLP_BO_TMS_1003_05
 * @returns
 */
const TenantDetailWidgetComponent: FC<any> = () => {
  const routerState = useRouterState();
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [myOptions, setMyOptions] = useState<any[]>([]);
  const [tableData, setTableDat] = useState<any[]>([...defaultRow]);
  const [selectedOption, setSelectedOption] = useState<any>();

  const tenantId = routerState.location.state?.tenantId;

  const { open: openModal, confirm: openConfirm } = useModal();

  const { provider, fetchData, getValues, onFormChange } = useDynamicForm(formConfig);

  // data hook
  const { data: widgetsData, refetch } = useAllTenantWidget(tenantId);
  const { moveTenantWidget } = useMoveTenantWidget({
    onSuccess: () => {
      refetch();
    },
  });
  const { updateTenantWidget } = useUpdateTenantWidget({
    onSuccess: () => {
      refetch();
    },
  });

  // handle 함수 정의
  const handleTenantDetailWidgetMapping = async () => {
    const modalTenantId = tenantId;
    await openModal({
      content: <TenantDetailWidgetMappingModal tenantId={modalTenantId} />,
      width: 'xl',
    });
    refetch();
  };

  const handleOptionsOrderChange = (newOptions: any[]) => {
    console.log('newOptions', newOptions);
    for (let i = 0; i < newOptions.length; i++) {
      if (myOptions[i].id !== newOptions[i].id) {
        const id = newOptions[i].original.tenantWidgetId;
        const payload = { tenantWidgetId: id, sortOrder: i + 1 };
        moveTenantWidget(payload);
        break;
      }
    }
    setMyOptions(newOptions);
  };
  const handleSelectButtonClick = (option: any) => {
    const widgetType = option.original.widgetType;
    const tableData = [
      {
        c1: 'PC',
        componentId: widgetType.componentPcId,
        width: widgetType.pcWidth,
        height: widgetType.pcHeight,
      },
      {
        c1: 'Mobile',
        componentId: widgetType.componentMobileId,
        width: widgetType.mobileWidth,
        height: widgetType.mobileHeight,
      },
    ];

    setSelectedOption(option.original);
    setTableDat(tableData);
    const fetchInfo = { ...option.original.widgetType };
    const device = [];
    fetchInfo.isWebExposed && device.push(EnDeviceType.isPc);
    fetchInfo.isMobileExposed && device.push(EnDeviceType.isMobile);
    fetchInfo.device = device;
    fetchData(fetchInfo);
    setFormMode(EnFormMode.VIEW);
  };

  const handleSaveButtonClick = () => {
    openConfirm({
      title: t('저장 하시겠습니까?'),
      content: <p>{t('입력한 정보로 저장됩니다.')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          console.log('selectedOption', selectedOption);
          const body = { ...getValues() };
          body.isWebExposed = body.device.includes(EnDeviceType.isPc);
          body.isMobileExposed = body.device.includes(EnDeviceType.isMobile);
          body.userGroupList = body.userGroupList.map((item: any) => item.userGroupId);
          const payload = { tenantWidgetId: selectedOption.tenantWidgetId, body: body };
          updateTenantWidget(payload);
        }
      },
    });
  };

  // useEffect정의

  useEffect(() => {
    if (widgetsData) {
      const options = widgetsData.map((item: any) => ({
        id: item.sortOrder,
        label: item.widgetType.widgetName,
        isUsed: item.widgetType.isUsed,
        original: item,
      }));

      console.log('widgetsData', options);
      setMyOptions(options);
    }
  }, [widgetsData]);

  return (
    <>
      <NoticeBox
        iconVisible={false}
        descriptions={[
          t('위젯을 추가 등록하려면 위젯추가 버튼을 클릭해 주세요.'),
          t(
            '위젯 순서 변경은 드래그앤드랍으로 변경하며, 노출 여부는 우측에서 스위치 버튼으로 설정할 수 있습니다.',
          ),
          t('위젯 순서 변경 후에 저장 버튼을 클릭해야 저장됩니다.'),
        ]}
        type="bullet"
      />
      <SectionLayout isLineVisible={true}>
        <div className={cn(styles.start, styles.wrap)}>
          <FormSubTitle
            label={t('위젯')}
            actionNode={
              <>
                <Button
                  label={t('메인위젯 미리보기')}
                  variant={'text'}
                  size={'sm'}
                  className="btn_text"
                />
                <Button
                  label={'+ ' + t('위젯추가')}
                  variant={'text'}
                  size={'sm'}
                  className="btn_text"
                  onClick={handleTenantDetailWidgetMapping}
                />
              </>
            }
            underLine={true}
          />
          <div className={styles.menu_wrap}>
            <List
              options={myOptions}
              valueField={'id'}
              draggable
              hideBorder
              disabledActive
              itemRenderer={(option: any) => (
                <div className={styles.menu_box}>
                  <p className={cn(styles.menu_name, !option.isUsed && styles.used)}>
                    {option?.label}
                  </p>
                  {option?.isUsed && (
                    <Button
                      type="button"
                      variant="gray2"
                      label={t('선택')}
                      size="ts"
                      onClick={() => {
                        handleSelectButtonClick(option);
                      }}
                    />
                  )}
                </div>
              )}
              onOptionsOrderChange={handleOptionsOrderChange}
            />
          </div>
        </div>
        <div className={cn(styles.start, styles.wrap)}>
          <FormSubTitle
            label={t('위젯 상세')}
            actionNode={
              <>
                <Button
                  label={t('초기화')}
                  variant="text"
                  size="sm"
                  onClick={() => onFormChange()}
                  disabled={EnFormMode.NONE === formMode}
                />
                <Button
                  label={'-' + t('삭제')}
                  variant="text"
                  size="sm"
                  disabled={EnFormMode.NONE === formMode}
                />
                <Button
                  label={t('저장')}
                  variant="save"
                  size="sm"
                  onClick={handleSaveButtonClick}
                  disabled={EnFormMode.NONE === formMode}
                />
              </>
            }
            underLine={true}
          />
          <div className={styles.form_wrap}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="widgetName"
                element={
                  <WidgetNameAndButton
                    widget={selectedOption.widgetType}
                    disabled={EnFormMode.NONE === formMode}
                  />
                }
              ></FormRow>
            </ContentsRow>
            <ContentsRow type="horizontal">
              <FormRow
                provider={provider}
                name="isVisible"
                element={<SwitchFormField disabled={EnFormMode.NONE === formMode} />}
              />
            </ContentsRow>
            <ContentsRow type="horizontal">
              <FormRow
                provider={provider}
                name="isRequired"
                element={<SwitchFormField disabled={EnFormMode.NONE === formMode} />}
              />
            </ContentsRow>
            <ContentsRow type="horizontal">
              <FormRow
                provider={provider}
                name="isSecureContent"
                element={<SwitchFormField disabled={EnFormMode.NONE === formMode} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="userGroupList"
                element={
                  <ChipListModalSelectorFormField
                    chipList={{
                      labelField: 'name',
                      valueField: 'value',
                      hideBorder: true,
                    }}
                    modalConfig={{
                      title: '',
                      width: 'xl',
                      content: <ChannelChoiceModal />,
                    }}
                    disabled={EnFormMode.NONE === formMode}
                  />
                }
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="device"
                element={<CheckboxGroupFormField disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="isUsed"
                element={<RadioGroupFormField disabled={true} />}
              />
            </ContentsRow>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="widgetDesc"
                element={<TextareaFormField disabled={true} />}
              />
            </ContentsRow>

            <div className={styles.table_wrap}>
              <TableBox
                data={tableData}
                columns={columns}
                tableMode={true}
                title={t('컴포넌트 ID')}
              />
            </div>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export const TenantDetailWidget = TenantDetailWidgetComponent;

const WidgetNameAndButton = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  ({ disabled, value, onChange, widget }) => {
    return (
      <>
        <Input disabled={true} value={value} onChange={(e: any) => onChange(e.target.value)} />
        <WidgetPreviewButton disabled={disabled} widget={widget} />
      </>
    );
  },
);

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'widgetName',
      type: 'text',
      label: t('위젯명'),
      value: '',
    },
    {
      name: 'isVisible',
      type: 'switch',
      label: t('노출여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('노출') : t('비노촐')),
      },
    },
    {
      name: 'isRequired',
      type: 'switch',
      label: t('필수 여부'),
      format: 'boolean',
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('필수') : t('미필수')),
      },
    },
    {
      name: 'isSecureContent',
      type: 'switch',
      label: t('보안콘텐츠 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('보안적용') : t('미적용')),
      },
    },
    {
      name: 'userGroupList',
      type: 'custom',
      label: t('유저그룹 설정'),
      format: 'array',
      value: [],
    },
    {
      name: 'device',
      type: 'checkbox-group',
      label: t('디바이스'),
      value: [EnDeviceType.isPc, EnDeviceType.isMobile],
      options: [
        { label: t('PC'), value: EnDeviceType.isPc },
        { label: t('Mobile'), value: EnDeviceType.isMobile },
      ],
    },
    {
      name: 'isUsed',
      type: 'radio-group',
      label: t('사용여부'),
      value: true,
      options: [
        { value: true, label: t('사용') },
        { value: false, label: t('사용부가') },
      ],
    },
    {
      name: 'widgetDesc',
      type: 'text-area',
      label: t('위젯 설명'),
      value: '',
    },
  ],
  validator: {
    isVisible: { required: true },
    isRequired: { required: true },
    isSecureContent: { required: true },
  },
};

//Column Helper 정의
const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('c1', {
    id: 'c1',
    cell: (prop: any) => {
      return <strong>{prop.row.original.c1}</strong>;
    },
    header: '구분',
    enableGrouping: false,
    size: 50,
    maxSize: 50,
    minSize: 50,
    meta: {
      headerAlign: 'center',
      cellAlign: 'left',
    },
  }),
  columnHelper.accessor('c2', {
    id: 'c2',
    cell: (props: any) => {
      console.log('props', props);
      return (
        <div className={cn(dataWrapStyles.wrap)}>
          <Input value={props.row.original.componentId} disabled />
          <span
            className={dataWrapStyles.guide_text}
          >{`가로*세로 ${new Intl.NumberFormat().format(props.row.original.width)}*${new Intl.NumberFormat().format(props.row.original.height)}`}</span>
        </div>
      );
    },
    header: '컴포넌트 ID',
    enableGrouping: false,
    size: 300,
    meta: {
      headerAlign: 'center', // 헤더 정렬
      cellAlign: 'left', // 셀 정렬
    },
  }),
] as ColumnDef<any, unknown>[];
