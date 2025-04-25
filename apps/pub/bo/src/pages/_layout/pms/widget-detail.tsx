import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';

/* css */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { IcoFormRequired } from '@learnway/icons';

import {
  // Button,
  ContentsRow,
  Input,
  Switch,
  Textarea,
  GridBox,
  CheckboxGroupFormField,
  RadioGroupFormField,
  Table,
} from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/widget-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  // switch : 보안콘텐츠 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  // grid
  const data: any[] = [
    {
      Number: 1,
      TenantName: '테넌트명',
      Visible: 'Y',
      Reguired: 'Y',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('Number', {
      cell: (info) => info.getValue(),
      header: 'NO.',
      size: 64,
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('TenantName', {
      cell: (info) => info.getValue(),
      header: '테넌트명',
      size: 1048,
      enableGrouping: false,
    }),
    columnHelper.accessor('Visible', {
      cell: (info) => info.getValue(),
      header: '노출여부',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('Reguired', {
      cell: (info) => info.getValue(),
      header: '필수여부',
      size: 200,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  const [selectedValue, setSelectedValue] = useState<string>('option01');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  // Table
  const data2: any[] = [
    {
      Sort: <strong>PC</strong>,
      ComponentId: <Input value={'dsbdbshjdbshbd'} />,
      ComponentSize: (
        <div className={dynamicFormStyles.size_wrap}>
          <Input
            id=""
            type="text"
            placeholder="입력"
            value="600"
            className={dynamicFormStyles.input}
            disabled
          />
          <span className={dynamicFormStyles.unit}>{'X'}</span>
          <Input
            id=""
            type="text"
            placeholder="입력"
            value="800"
            className={dynamicFormStyles.input}
            disabled
          />
        </div>
      ),
    },
    {
      Sort: <strong>Mobile</strong>,
      ComponentId: <Input value={'dsbdbshjdbshbd'} />,
      ComponentSize: (
        <div className={dynamicFormStyles.size_wrap}>
          <Input
            id=""
            type="text"
            placeholder="입력"
            value="320"
            className={dynamicFormStyles.input}
            disabled
          />
          <span className={dynamicFormStyles.unit}>{'X'}</span>
          <Input
            id=""
            type="text"
            placeholder="입력"
            value="580"
            className={dynamicFormStyles.input}
            disabled
          />
        </div>
      ),
    },
  ];

  const columns2 = [
    columnHelper.accessor('Sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('ComponentId', {
      cell: (info) => info.getValue(),
      header: '컴포넌트 ID',
      enableGrouping: false,
    }),
    columnHelper.accessor('ComponentSize', {
      cell: (info) => info.getValue(),
      header: '사이즈(가로X세로) pixel',
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-widget" className={formStyles.form_label}>
                <span className={formStyles.form_text}>위젯명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-widget"
                  type="text"
                  placeholder="입력"
                  value="공틍-My 학습현황"
                  className={formStyles.input}
                  maxLength={150}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-widget2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>위젯설명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-widget2"
                  rows={5}
                  cols={33}
                  resize="none"
                  value="개인별 학습현황을 보여주는 리스트입니다."
                  placeholder="입력"
                  maxLength={2000}
                  size={'sm'}
                />
              </div>
              <p className={cn(formStyles.guide_text)}>위젯 용도에 대해 간단하게 기재해 주세요.</p>
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-device" className={formStyles.form_label}>
                <span className={formStyles.form_text}>디바이스</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.check_wrap}>
                  <CheckboxGroupFormField
                    options={[
                      { value: 'all', label: '전체' },
                      { value: 'pc', label: 'PC' },
                      { value: 'mobile', label: 'Mobile' },
                    ]}
                    value={['all']}
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-device" className={formStyles.form_label}>
                <span className={formStyles.form_text}>사용여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.radio_wrap}>
                  <RadioGroupFormField
                    options={[
                      { value: 'type1', label: '사용' },
                      { value: 'type2', label: '사용불가' },
                    ]}
                    defaultValue={'type1'}
                    disabled
                    onValueChange={handleValueChange}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow type="horizontal">
            {/* Textarea type */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-conjugation2" className={formStyles.form_label}>
                <span className={formStyles.form_text}>보안콘텐츠 여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Switch
                  id="name-use2"
                  className={dynamicFormStyles.btn_switch}
                  label={checked[1] ? '보안 적용' : '보안 미적용'}
                  checked={checked[1]}
                  onCheckedChange={handleCheckedChange(1)}
                />
              </div>
              <p className={formStyles.guide_text}>
                보안콘텐츠 미 설정 시 학습자원의 불법 배포와 보안 위협에
                {checked[1] ? ' 강합니다.' : ' 취약합니다.'}
              </p>
            </div>
          </ContentsRow>
          {/* 퍼블수정 20240407 : 테이블 추가 */}
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-id" className={formStyles.form_label}>
                <span className={formStyles.form_text}>컴포넌트 ID</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Table data={data2} columns={columns2} tableMode={true} />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className="grid_wrap">
              <GridBox
                data={data}
                columns={columns}
                title="테넌트 정보(해당 위젯을 사용하는 테넌트)"
                showColumnSettings={false}
              />
            </div>
          </ContentsRow>
        </div>
      </PageContainer>
    </form>
  );
}
