import React, { FC, useEffect, useState } from 'react';
import { useRouterState, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import {
  Button,
  CheckboxGroupFormField,
  ContentsRow,
  DynamicFormField,
  GridBox,
  Input,
  TextareaFormField,
  TreeContainer,
  TreeNode,
  TreeView,
  useModal,
} from '@learnway/ui';

import { cn } from '@learnway/shared';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { ContentsHistoryInfoFormField, FormRow, SwitchFormField } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { EnFormMode } from '@types';
import { TenantDetailMenuMappingModal } from './tenant-detail-menu-mapping-modal';
import { ApiInfoModal } from '@features/platform/menu/ui/api-info-modal';
/** Hook 정의 */
import {
  useChangeMenuTenentDnd,
  useDeleteMenuTenent,
  useFetchMenuTenantDetail,
  useFetchMenuTenantMappingTree,
  useUpdateMenuTenant,
} from '@entities/menu/service/tenant-menu-manage.hook';
/** method import */
import { findMenuPathById } from '@features/platform/menu/service/menu.service';
import {
  getAllTreeKeys,
  getFirstExpandKeys,
  moveTenantMenuNodeCheck,
  transformMenuApiDataToTreeData,
} from '../service/tenant-detail-tree.service';

import { EnDeviceType } from '@types';

//Column Helper 정의
const columnHelper = createColumnHelper<any>();
/**
 * 화면번호:
 * NLP_BO_TMS_1002_01 (플랫폼-학습자메뉴), NLP_BO_TMS_1002_01_01 (플랫폼-학습자메뉴-상세), NLP_BO_TMS_1002_01_03 (플랫폼-HRD메뉴),NLP_BO_TMS_1002_01_04 (플랫폼-HRD메뉴-상세),
 * NLP_BO_TMS_1003_02 (테넌트-학습자메뉴), NLP_BO_TMS_1003_02_01 (테넌트-학습자메뉴-상세), NLP_BO_TMS_1003_02_02 (테넌트-HRD메뉴),NLP_BO_TMS_1003_02_02 (테넌트-HRD메뉴-상세)
 * @param param0
 * @returns
 */
const TenantDetailMenuTreeComponent: FC<any> = ({ menuScope, roleInfo }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [apiMappingMenuList, setApiMappingMenuList] = useState([]);

  const tenantId = routerState.location.state?.tenantId;

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);
  const prevDataRef = React.useRef(null);
  const { alert, open: openModal, confirm: openConfirm } = useModal();

  // fetch data
  const { data: detailData, refetch: refetchDetail } = useFetchMenuTenantDetail(
    selectedNode?.tenantMappingMenuId || undefined,
  );

  const { data: menuData, refetch: refetchMenuTree } = useFetchMenuTenantMappingTree(
    tenantId,
    menuScope,
  );

  //
  const { delete: deleteMenuTenent } = useDeleteMenuTenent(tenantId, menuScope, {
    onSuccess: () => {
      refetchMenuTree();
    },
  });
  const { update: updateMenuTenent } = useUpdateMenuTenant(tenantId, menuScope, {});
  const { change: changeMenuPosition } = useChangeMenuTenentDnd(tenantId, menuScope, {
    onSuccess: () => {
      refetchMenuTree();
    },
  });

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };
  const handleSelectedNodeChange = (node: TreeNode | null) => {
    if (node && node.key !== '1') {
      setSelectedNode(node);
      if (node) {
        setFormMode(EnFormMode.VIEW);
      } else {
        setFormMode(EnFormMode.NONE);
      }
    }
  };
  const handleTreeAction = (events: any) => {
    switch (events.type) {
      case 'NODE_MOVE':
        {
          const payload = moveTenantMenuNodeCheck(events);
          if (payload) {
            payload.menuScopeCode = menuScope;
            changeMenuPosition(payload);
          }
        }
        break;
    }
  };
  const handleTenantDetailMenuMapping = async () => {
    const modalScope = menuScope;
    const modalTenantId = tenantId;
    await openModal({
      content: <TenantDetailMenuMappingModal menuScopeCode={modalScope} tenantId={modalTenantId} />,
      width: 'xl',
    });
  };

  const handleDeleteMenuTenant = () => {
    openConfirm({
      title: t('삭제 하시겠습니까?'),
      content: (
        <>
          <p>{t('하위 메뉴 존재 시 모두 삭제되며,')}</p>
          <p>{t('삭제 후 복구할 수 없습니다.')}</p>
        </>
      ),
      onClose: (value: boolean) => {
        if (value) {
          const payload = { ...selectedNode };
          console.log('delete!', payload);
          deleteMenuTenent(payload);
          setFormMode(EnFormMode.NONE);
        }
      },
    });
  };

  const handleUpdateMenuTenant = () => {
    openConfirm({
      title: t('저장 하시겠습니까?'),
      content: <p>{t('입력한 정보로 저장됩니다.')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          const payload = { ...getValues() };
          payload.isWebExposed = payload.deviceNames.includes(EnDeviceType.isPc);
          payload.isMobileExposed = payload.deviceNames.includes(EnDeviceType.isMobile);
          payload.tenantId = tenantId;
          payload.parentMenuId = payload.parentId;
          payload.menuScope = menuScope;
          updateMenuTenent(payload, {
            onSuccess: () => {
              refetchDetail();
            },
          });
        }
      },
    });
  };

  useEffect(() => {
    if (menuData) {
      prevDataRef.current = menuData;
      console.log(menuData);
      const transformedData = transformMenuApiDataToTreeData(menuData, menuScope);
      setTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [menuData]);

  useEffect(() => {
    if (detailData) {
      const location = findMenuPathById(treeData, detailData?.menuId);
      const deviceNames = [];
      if (detailData.isWebExposed) {
        deviceNames.push(EnDeviceType.isPc);
      }
      if (detailData.isMobileExposed) {
        deviceNames.push(EnDeviceType.isMobile);
      }
      setApiMappingMenuList(detailData.apiMappingMenuList);
      fetchData({
        ...detailData,
        deviceNames: deviceNames,
        location: location,
      });
      setFormMode(EnFormMode.VIEW);
    }
  }, [detailData]);

  const columns = [
    columnHelper.accessor('apiName', {
      id: 'apiName',
      cell: (info: any) => {
        return (
          <Button
            className="link"
            onClick={() =>
              openModal({
                content: <ApiInfoModal apiId={info.row.original.apiUuid} />,
                width: 's',
                closeOnOutsideClick: true,
              })
            }
            label={info.getValue()}
          />
        );
      },
      header: 'API',
      size: 612,
    }),
    columnHelper.accessor('Delete', {
      cell: (info) => {
        return (
          <Button disabled={true} variant="gray2" size={'xs'} type={'button'}>
            {t('삭제')}
          </Button>
        );
      },
      header: t('삭제'),
      size: 100,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <SectionLayout contentsRatio={'thirty'}>
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
                  const allKeys = getAllTreeKeys(treeData);
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
            {roleInfo === 'PLATFORM' && (
              <Button variant="save" size="sm" onClick={() => handleTenantDetailMenuMapping()}>
                {t('메뉴 맵핑')}
              </Button>
            )}
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeContainer>
            <TreeView
              treeId="tenant-menu-tree"
              type={'DRAG_DROP'}
              data={treeData}
              selectedNode={selectedNode}
              expandedKeys={expandedKeys}
              onAction={handleTreeAction}
              onExpandedKeysChange={handleExpandChange}
              onSelectedNodeChange={handleSelectedNodeChange}
            />
          </TreeContainer>
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{t('메뉴 정보')}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              onClick={() => onFormChange()}
              disabled={EnFormMode.NONE === formMode}
            >
              {t('초기화')}
            </Button>
            <Button
              variant="text"
              size="sm"
              className={layoutStyles.btn_text}
              disabled={EnFormMode.VIEW !== formMode}
              onClick={handleDeleteMenuTenant}
            >
              {t('삭제')}
            </Button>
            <Button
              variant="save"
              size="sm"
              disabled={EnFormMode.NONE === formMode}
              onClick={handleUpdateMenuTenant}
            >
              {t('저장')}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <ContentsRow>
            <FormRow provider={provider} name="location" element={<Input disabled={true} />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="parentName" element={<Input disabled={true} />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="menuCode" element={<Input disabled={true} />}>
              <Button variant="gray" size="sm" disabled>
                {t('중복')}
              </Button>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="menuName"
              element={<Input disabled={formMode === EnFormMode.NONE} />}
            >
              <Button
                type="button"
                variant="gray"
                size="sm"
                disabled={formMode !== EnFormMode.VIEW}
                onClick={() => {
                  const menuCode = getValues('tenantMenuCode');
                  const menuName = getValues('menuName');
                  router.navigate({
                    to: '/platform/system/multilingual',
                    state: {
                      keyType: menuScope === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
                      multilingualKey: menuCode,
                      translation: menuName,
                    },
                  });
                }}
              >
                {t('다국어 관리')}
              </Button>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name="path" element={<Input disabled={true} />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="menuUrlParam"
              element={<Input disabled={EnFormMode.NONE === formMode} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="menuDesc"
              element={<TextareaFormField disabled={EnFormMode.NONE === formMode} />}
            />
          </ContentsRow>
          <ContentsRow type="horizontal">
            <FormRow
              provider={provider}
              name="isHiddenMenu"
              element={<SwitchFormField disabled={true} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="deviceNames"
              element={<CheckboxGroupFormField disabled={EnFormMode.NONE === formMode} />}
            />
          </ContentsRow>
          <ContentsRow type="horizontal">
            <FormRow
              provider={provider}
              name="isPersoninfoInclusion"
              element={<SwitchFormField disabled={true} />}
            />
          </ContentsRow>
          <ContentsRow type="horizontal">
            <FormRow
              provider={provider}
              name="tenantIsUsed"
              element={
                <SwitchFormField disabled={EnFormMode.NONE === formMode || !getValues('isUsed')} />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name="apiMappingMenuList"
              element={
                <GridBox
                  data={getValues('apiMappingMenuList') || []}
                  columns={columns}
                  showTotalCount={true}
                  title={t('API')}
                />
              }
            />
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </div>
    </SectionLayout>
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
      label: t('메뉴 URL'),
      value: '',
      size: 10,
    },
    {
      name: 'parentId',
      type: 'hidden',
      format: 'number',
      value: 0,
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
      maxLength: 150,
    },
    {
      name: 'menuUrlParam',
      type: 'text',
      label: t('메뉴URL파라미터'),
      value: '',
      maxLength: 150,
    },
    {
      name: 'menuDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 150,
    },
    {
      name: 'isHiddenMenu',
      tooltip: t(
        '메뉴숨기기 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.',
      ),
      type: 'switch',
      label: t('메뉴숨기기'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('적용') : t('미적용')),
      },
    },
    {
      name: 'isUsed',
      type: 'hidden',
      label: '',
      value: true,
    },
    {
      name: 'tenantIsUsed',
      type: 'switch',
      label: t('사용여부'),
      value: true,
      tooltip: t('사용여부 툴팁'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      name: 'deviceNames',
      type: 'checkbox-group',
      label: t('적용 디바이스'),
      value: [],
      options: [
        { label: t('PC'), value: EnDeviceType.isPc },
        { label: t('모바일'), value: EnDeviceType.isMobile },
      ],
    },
    {
      name: 'isPersoninfoInclusion',
      type: 'switch',
      label: t('게인정보포함'),
      tooltip: t('개인정보를 사용하는 경우 엑셀 다운로드 시 사유를 입력해야 합니다.'),
      switchConfig: { label: (value: boolean) => (value ? t('사용') : t('미사용')) },
      value: false,
    },
    {
      name: 'apiMappingMenuList',
      type: 'custom',
      value: [],
    },
    { name: 'tenantMenuCode', type: 'custom', value: '' },
  ],
  validator: {
    menuCode: { required: true },
    deviceNames: { required: true },
  },
};
