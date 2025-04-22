import { FC, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  findNodePath,
  findParentNode,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
  TreeView2,
  Switch,
  Tooltip,
  Grid,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { FormRow, FormGroup, ContentsHistoryInfoFormField } from '@shared/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const data: any[] = [
  {
    Sort: 'Common API',
    API: <Button className="link">API 1</Button>,
    Delete: (
      <Button size="xs" variant="gray2">
        삭제
      </Button>
    ),
  },
];

const TenantDetailMenuTreeComponent: FC<any> = ({ menuScope }) => {
  const [treeData, setTreeData] = useState([]);

  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('Sort', {
      cell: (info) => info.getValue(),
      header: '분류',
      size: 120,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('API', {
      cell: (info) => info.getValue(),
      header: 'API',
      size: 490,
      enableGrouping: false,
    }),
    columnHelper.accessor('Delete', {
      cell: (info) => info.getValue(),
      header: '삭제',
      size: 100,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'테넌트 메뉴 목록'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'전체펼침'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'전체닫기'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <TreeView2 data={treeData} treeId="tenant-menu-tree" />
          </TreeContainer>
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'메뉴 정보'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'초기화'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
              {'삭제'}
            </Button>
            <Button variant="save" size="sm" disabled>
              {'저장'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'path'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'parentName'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'menuCode'} disabled={true} />
              <Button variant="gray" size="sm" disabled>
                {'중복'}
              </Button>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'menuName'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'menuUrl'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'menuDesc'} disabled={true} />
            </FormRow>
          </ContentsRow>
          {/* Switch 영역 */}
          <ContentsRow>
            <div className={dynamicFormStyles.switch_wrap}>
              <p className={dynamicFormStyles.title}>
                {'Hidden메뉴'}

                <Tooltip
                  className={formStyles.tooltip}
                  side="right"
                  align="start"
                  content={
                    'Hidden메뉴 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.'
                  }
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </p>
              <Switch
                id="name-use2"
                className={dynamicFormStyles.btn_switch}
                label={'적용'}
                // label={true ? '적용' : '미적용'}
                checked={false}
              />
            </div>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'showDevice'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <div className={dynamicFormStyles.switch_wrap}>
              <p className={dynamicFormStyles.title}>
                {'개인정보'}

                <Tooltip
                  className={dynamicFormStyles.tooltip}
                  side="right"
                  align="start"
                  content={'개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.'}
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </p>
              <Switch
                id="name-use2"
                className={dynamicFormStyles.btn_switch}
                label={'사용'}
                checked={true}
                // onCheckedChange={handleCheckedChange(2)}
                disabled
              />
            </div>
          </ContentsRow>
          <ContentsRow>
            <Grid
              data={data}
              columns={columns}
              showTotalCount={true}
              hideColumnSettings={true}
              title="API"
            />
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </div>
    </div>
  );
};

export const TenantDetailMenuTree = TenantDetailMenuTreeComponent;
// fullPath
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'path',
      type: 'text',
      label: t('메뉴 위치'),
      value: '',
      placeholder: '메뉴 코드를 입력하세요.',
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('상위메뉴명'),
      value: '',
    },
    {
      name: 'menuCode',
      type: 'text',
      label: t('메뉴코드'),
      value: '',
    },
    {
      name: 'menuName',
      type: 'text',
      label: t('메뉴명'),
      value: '',
    },
    {
      name: 'menuUrl',
      type: 'text',
      label: t('메뉴URL'),
      value: '',
    },
    {
      name: 'menuDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
    },
    {
      name: 'isHiddenMenu',
      type: 'switch',
      label: t('Hidden 메뉴'),
      value: false,
    },
    {
      name: 'showDevice',
      type: 'checkbox',
      label: t('디바이스 노출 여부'),
      value: 'isMobileExposed',
      optios: [
        { label: t('PC'), value: 'isWebExposed' },
        { label: t('모바일'), value: 'isMobileExposed' },
      ],
    },
    {
      name: 'isPersoninfoInclusion',
      type: 'switch',
      label: t('게인정보'),
      value: false,
    },
  ],
  validator: {
    menuCode: { required: true },
  },
};
