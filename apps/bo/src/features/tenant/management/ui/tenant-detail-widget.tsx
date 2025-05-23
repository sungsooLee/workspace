import { FC, useState, useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { cn, getRandomId } from '@learnway/shared';
import {
  Button,
  List,
  Input,
  TableBox,
  CheckboxGroupFormField,
  ContentsRow,
  ChipListModalSelectorFormField,
  useModal,
} from '@learnway/ui';
import { NoticeBox, FormSubTitle } from '@shared/ui';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { ContentsHistoryInfoFormField, FormRow, SwitchFormField } from '@shared/ui';

import styles from './main-widget-detail.module.css';
import dataWrapStyles from './data-wrap.module.css';

import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { CompanyShuttleModal, ChannelChoiceModal, ChannelListChoiceModal } from '@features/shared';
import { EnFormMode, EnDeviceType } from '@types';
import { useAllTenantWidget, useMoveTenantWidget } from '@entities/widgets/service/widgets.hook';
import { TenantDetailWidgetMappingModal } from './tenant-detail-widget-mapping-modal';

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
const TenantDetailWidgetComponent: FC<any> = () => {
  const routerState = useRouterState();
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [myOptions, setMyOptions] = useState<any[]>([]);
  const [tableData, setTableDat] = useState<any[]>([...defaultRow]);
  const [value, setValue] = useState<any>();

  const tenantId = routerState.location.state?.tenantId;

  const { open: openModal, confirm: openConfirm } = useModal();

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);
  const { data: widgetsData, refetch } = useAllTenantWidget(tenantId);
  const { moveTenantWidget } = useMoveTenantWidget({
    onSuccess: () => {
      refetch();
    },
  });

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
  };

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
              value={value}
              valueField={'id'}
              draggable
              hideBorder
              disabledActive
              itemRenderer={(option: any) => (
                <div className={styles.menu_box}>
                  <p className={cn(styles.menu_name, option.isUsed && styles.used)}>
                    {option?.label}
                  </p>
                  {option?.isUsed && (
                    <Button type={'button'} variant={'gray2'} label={'선택'} size={'ts'} />
                  )}
                </div>
              )}
              onOptionsOrderChange={handleOptionsOrderChange}
            />
          </div>
        </div>
        <div className={cn(styles.start, styles.wrap)}>
          <FormSubTitle
            label={'위젯 상세'}
            actionNode={
              <>
                <Button label={'삭제'} variant={'text'} size={'sm'} />
                <Button label={'저장'} variant={'save'} size={'sm'} />
              </>
            }
            underLine={true}
          />
          <div className={styles.form_wrap}>
            <ContentsRow>
              <FormRow provider={provider} name="widgetName" element={<Input disabled={true} />} />
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
                name="userGroups"
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
                element={<CheckboxGroupFormField disabled={EnFormMode.NONE === formMode} />}
              />
            </ContentsRow>
            <div className={styles.table_wrap}>
              <TableBox data={tableData} columns={columns} tableMode={true} title={'컴포넌트 ID'} />
            </div>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export const TenantDetailWidget = TenantDetailWidgetComponent;

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
      name: 'userGroups',
      type: 'custom',
      label: t('유저그룹 설정'),
      format: 'array',
      value: [],
    },
    {
      name: 'device',
      type: 'checkbox-group',
      label: t('디바이스'),
      value: [],
      options: [
        { label: t('PC'), value: EnDeviceType.isPc },
        { label: t('Mobile'), value: EnDeviceType.isMobile },
      ],
    },
    {
      name: 'isUsed',
      type: 'textarea',
      label: t('사용여부'),
      value: '',
      size: 50,
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
  columnHelper.display({
    id: 'c1',
    cell: (prop: any) => {
      return <strong>{prop.row.original.c1}</strong>;
    },
    header: '구분',
    enableGrouping: false,
    size: 100,
    meta: {
      headerAlign: 'center', // 헤더 정렬
      cellAlign: 'left', // 셀 정렬
    },
  }),
  columnHelper.display({
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
    meta: {
      headerAlign: 'center', // 헤더 정렬
      cellAlign: 'left', // 셀 정렬
    },
  }),
] as ColumnDef<any, unknown>[];
