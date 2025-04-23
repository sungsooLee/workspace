import React, { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';
import { FormTranslationBox } from '@features/platform/ui/platform/system/translation/form-translation-box';

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
  GridBox,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
/** Hook 정의 */
import {
  useCreateMenu,
  useDeleteMenu,
  useMenuManageFetchTree,
  useMoveMenu,
  useUpdateMenu,
} from '@entities/menu/service/menu-manage.hook';
import {
  useMenuTenantManageDetail,
  useMenuTenantMangeFetchTrees,
} from '@entities/menu/service/menu-tenant-manage.hook';
import { findMenuPathById, transformApiDataToTreeData } from '@features/menu/service/menu.service';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

const handleExpandAll = (treeData: TreeNode[]) => {
  const getAllKeys = (nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllKeys(node.children));
      }

      return keys;
    }, []);
  };
  return getAllKeys(treeData);
};

const getFirstExpandKeys = (treeData: TreeNode[]) => {
  if (treeData && treeData.length > 0) {
    const firstLevelKeys = treeData.map((node: TreeNode) => node.key);
    return firstLevelKeys;
  }
};
const tenantId = '1';

const TenantDetailMenuTreeComponent: FC<any> = ({ menuScope }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isInitMode, setIsInitMode] = useState(true);

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);

  // fetch data
  const { data: detailData } = useMenuTenantManageDetail(selectedNode?.menuId || '');
  const { data: menuData, refetch } = useMenuTenantMangeFetchTrees(tenantId, menuScope);
  const prevDataRef = React.useRef(null);

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };
  const handleSelectedNodeChange = (node: TreeNode | null) => {
    setSelectedNode(node);
    if (node) {
      setFormMode(FORM_MODE.VIEW);
    } else {
      setFormMode(FORM_MODE.NONE);
    }
  };

  useEffect(() => {
    if (menuData) {
      prevDataRef.current = menuData;
      console.log(menuData);
      const transformedData = transformApiDataToTreeData(menuData);
      console.log(transformedData);
      setTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [menuData]);

  useEffect(() => {
    if (detailData) {
      console.log(detailData);
      const parentNode = findParentNode(treeData, detailData?.menuId.toString());
      const location = findMenuPathById(treeData, detailData?.menuId);
      const deviceNames = [];
      if (detailData.isWebExposed) {
        deviceNames.push('PC');
      }
      if (detailData.isMobileExposed) {
        deviceNames.push('Mobile');
      }
      fetchData({
        ...detailData,
        deviceNames: deviceNames,
        location: location,
      });
      setFormMode(FORM_MODE.VIEW);
    }
  }, [detailData]);

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{t('테넌트 메뉴 목록')}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                if (treeData) {
                  const allKeys = handleExpandAll(treeData);
                  handleExpandChange(allKeys);
                }
              }}
            >
              {t('전체펼침')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => {
                const firstKeys = getFirstExpandKeys(treeData);
                handleExpandChange(firstKeys || []);
              }}
            >
              {t('전체닫기')}
            </Button>
            <Button variant="save" size="sm">
              {t('메뉴 맵핑')}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <TreeView2
              treeId="tenant-menu-tree"
              type={'DRAG_DROP'}
              data={treeData}
              selectedNode={selectedNode}
              expandedKeys={expandedKeys}
              onExpandedKeysChange={handleExpandChange}
              onSelectedNodeChange={handleSelectedNodeChange}
            />
          </TreeContainer>
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'메뉴 정보'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled={true}>
              {t('초기화')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              disabled={FORM_MODE.NONE === formMode}
            >
              {t('삭제')}
            </Button>
            <Button variant="save" size="sm" disabled={FORM_MODE.NONE === formMode}>
              {t('저장')}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'location'} disabled={true} />
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
                {t('중복')}
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
              <DynamicFormField name={'path'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'menuDesc'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'isHiddenMenu'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={`deviceNames`} disabled={FORM_MODE.NONE === formMode}>
                <FormTranslationBox />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider}>
              <DynamicFormField name="isPersoninfoInclusion" disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'apiMappingMenuList'}>
                <GridBox
                  data={getValues('apiMappingMenuList') || []}
                  columns={columns}
                  showTotalCount={true}
                  hideColumnSettings={true}
                  title={t('API')}
                />
              </DynamicFormField>
            </FormRow>
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

// Form 구조 정의
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'location',
      type: 'text',
      label: t('위치'),
      value: '',
    },
    {
      name: 'path',
      type: 'text',
      label: t('메뉴 위치'),
      value: '',
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
      name: 'menuDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
    },
    {
      name: 'isHiddenMenu',
      tooltip: t(
        'Hidden메뉴 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.',
      ),
      type: 'switch',
      label: t('Hidden 메뉴'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('적용') : t('미적용')),
      },
    },
    {
      name: 'deviceNames',
      type: 'checkbox-group',
      label: t('디바이스 노출 여부'),
      value: [],
      options: [
        { label: t('PC'), value: 'PC' },
        { label: t('모바일'), value: 'Mobile' },
      ],
    },
    {
      name: 'isPersoninfoInclusion',
      type: 'switch',
      label: t('게인정보'),
      tooltip: t('개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.'),
      switchConfig: { label: (value: boolean) => (value ? t('사용') : t('미사용')) },
      value: false,
    },
    {
      name: 'apiMappingMenuList',
      type: 'custom',
      value: [],
    },
  ],
  validator: {
    menuCode: { required: true },
    deviceNames: { required: true },
  },
};

//Column Helper 정의
const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('Sort', {
    cell: (info) => info.getValue(),
    header: t('분류'),
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

const gridData: any[] = [
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
