import React, { FC, useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  TreeBox,
  TreeNode,
  ChipListModalSelectorFormField,
} from '@learnway/ui';
import { t } from 'i18next';
import { useRouterState } from '@tanstack/react-router';
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { FormRow, ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import {
  useFetchRole,
  useFetchRoleTree,
  useRoleManager,
} from '@entities/role/service/role-manage.hook';
import {
  getAllTreeKeys,
  getFirstExpandKeys,
  moveNodeCheck,
  transformRoleApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import { FormDisplay } from '@features/form/ui/form-display';
import { EnFormMode, EnTenantScope, EnCompanyScope, EnChannelScope, EnDeptScope } from '@types';
import { CompanyShuttleModal, ChannelChoiceModal } from '@features/shared';

//type fo , bo
const TenantDetailLearningRoleTreeComponent: FC<any> = ({ roleInfo, siteScope }: any) => {
  const routerState = useRouterState();
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [selectedRoleNode, setSelectedRoleNode] = useState<any>(null);
  const [roleTreeData, setRoleTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const formConfig = { ...formBaseConfig };

  formConfig.builders.push({
    name: 'tenantScope',
    type: 'radio-group',
    label: t('테넌트 적용 범위'),
    value: EnTenantScope.ALL,
    options: [
      {
        value: EnTenantScope.ALL,
        label: t('모든 테넌트'),
      },
      {
        value: EnTenantScope.CURRENT_TENANT,
        label: tenantName,
      },
    ],
  });

  const { createRole, updateRole, deleteRole } = useRoleManager({
    onRoleDeleteSuccess: () => {
      refetch();
    },
    onRoleCreateSuccess: () => {
      refetch();
    },
    onRoleUpdateSuccess: () => {
      refetch();
    },
  });
  const { provider, onSubmit, clearFormError, fetchData } = useDynamicForm(formConfig);
  const { data, refetch } = useFetchRoleTree(tenantId, siteScope);
  const { data: roleDetail } = useFetchRole(selectedRoleNode?.roleCode || undefined);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  const handleOnSubmit = async (formData: any) => {
    const parentRoleId = formData.parentRoleId === 'root' ? undefined : formData.parentRoleId;
    const payload = {
      ...formData,
      tenantId: tenantId,
      siteScope: siteScope,
      parentRoleId: parentRoleId,
    };
    console.log(payload);
    switch (formMode) {
      case EnFormMode.ADD:
        createRole(payload);
        break;

      case EnFormMode.VIEW:
        updateRole(payload);
        break;
    }
  };

  // handle 역할 트리 노드 클릭
  const handleRoleSelect = (node: TreeNode) => {
    setSelectedRoleNode(node);
    if (formMode !== EnFormMode.VIEW) setFormMode(EnFormMode.VIEW);
  };

  // 추가 버튼
  const handlerAddButionClick = (node: any) => {
    clearAllFormErrors();
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });

    fetchData({
      ...initData,
      parentRoleId: node.key.toString(),
    });
    setFormMode(EnFormMode.ADD);
  };

  const handleDeleteButtonClick = () => {
    setFormMode(EnFormMode.NONE);
    setSelectedRoleNode(null);
    deleteRole(selectedRoleNode.roleCode);
  };

  useEffect(() => {
    if (data) {
      const transformedData = transformRoleApiDataToTreeData(data);
      setRoleTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [data]);

  useEffect(() => {
    if (roleDetail) {
      const parentRoleId = roleDetail.parentRoleId ? roleDetail.parentRoleId.toString() : 'root';
      fetchData({ ...roleDetail, parentRoleId: parentRoleId });
      setFormMode(EnFormMode.VIEW);
    }
  }, [roleDetail]);

  const renderNodeButtons = (node: TreeNode, level: number) => {
    if (roleInfo)
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handlerAddButionClick(node);
              }}
              variant="gray2"
              size={'xs'}
              type={'button'}
            >
              {level === 0 ? '역할 추가' : '하위 역할 추가'}
            </Button>
          </div>
        </div>
      );
    return '';
  };

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={roleTreeData}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        title={'역할 목록'}
        renderNodeButtons={renderNodeButtons}
        handleSelectedNodeChange={handleRoleSelect}
        clientTree
        type={'DEFAULT'}
      />
      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <form onSubmit={onSubmit(handleOnSubmit)}>
            <FormSubTitle
              label={'역할 정보'}
              actionNode={
                <>
                  <Button
                    label={'초기화'}
                    variant={'text'}
                    size={'sm'}
                    className="btn_text"
                    disabled={formMode === EnFormMode.NONE}
                  />
                  <Button
                    label={'삭제'}
                    variant={'text'}
                    size={'sm'}
                    className="btn_text"
                    disabled={
                      formMode !== EnFormMode.VIEW ||
                      selectedRoleNode?.key === 'root' ||
                      selectedRoleNode?.children.length > 0
                    }
                    onClick={handleDeleteButtonClick}
                  />
                  <Button
                    label={'저장'}
                    variant={'save'}
                    size={'sm'}
                    type="submit"
                    disabled={formMode === EnFormMode.NONE}
                  />
                </>
              }
              underLine={true}
            />
            <div className={styles.contents_wrap}>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'roleId'} disabled={true} />
                </FormRow>

                <FormRow provider={provider}>
                  <DynamicFormField name={'roleCode'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField
                    name={'name'}
                    maxLength={40}
                    disabled={formMode === EnFormMode.NONE}
                  />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField
                    name={'description'}
                    maxLength={300}
                    disabled={formMode === EnFormMode.NONE}
                  />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'tenantScope'} disabled={formMode === EnFormMode.NONE} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'companyScope'} disabled={formMode === EnFormMode.NONE} />
                </FormRow>
              </ContentsRow>
              {/* <FormDisplay
                provider={provider}
                dependencies={[{ name: 'companyScope', value: EnCompanyScope.MANUAL }]}
              > */}
              <div className="chiplist_modal_wrap">
                <FormRow provider={provider}>
                  <DynamicFormField name={'companyIds'}>
                    <ChipListModalSelectorFormField
                      modalConfig={{
                        content: <CompanyShuttleModal />,
                        title: '',
                        width: 'xl',
                      }}
                      chipList={{
                        labelField: 'company',
                        valueField: 'id',
                        wordwrap: true,
                      }}
                    />
                  </DynamicFormField>
                </FormRow>
              </div>
              {/* </FormDisplay> */}
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'channelScope'} disabled={formMode === EnFormMode.NONE} />
                </FormRow>
              </ContentsRow>
              <FormDisplay
                provider={provider}
                dependencies={[{ name: 'channelScope', value: EnChannelScope.MANUAL }]}
              >
                <div className="chiplist_modal_wrap">
                  <FormRow provider={provider}>
                    <DynamicFormField name={'channelIds'}>
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
                      />
                    </DynamicFormField>
                  </FormRow>
                </div>
              </FormDisplay>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField
                    name={'deptScope'}
                    disabled={formMode === EnFormMode.NONE}
                  ></DynamicFormField>
                </FormRow>
              </ContentsRow>
              <FormDisplay
                provider={provider}
                dependencies={[{ name: 'deptScope', value: EnDeptScope.MANUAL }]}
              >
                <div className="chiplist_modal_wrap">
                  <FormRow provider={provider}>
                    <DynamicFormField name={'deptIds'}>
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
                      />
                    </DynamicFormField>
                  </FormRow>
                </div>
              </FormDisplay>
              <ContentsRow type={'horizontal'}>
                <FormRow provider={provider}>
                  <DynamicFormField name={'isUsed'} disabled={formMode === EnFormMode.NONE} />
                </FormRow>
              </ContentsRow>
              <ContentsHistoryInfoFormField />
            </div>
          </form>
        </div>
      </div>
    </SectionLayout>
  );
};

export const TenantDetailLearningRoleTree = TenantDetailLearningRoleTreeComponent;

const formBaseConfig: DynamicFormConfig = {
  builders: [
    { name: 'parentRoleId', type: 'hidden', value: '', format: 'string' },
    {
      name: 'roleId',
      type: 'text',
      format: 'number',
      label: t('역할 ID'),
      value: '',
    },
    {
      name: 'roleCode',
      type: 'text',
      label: t('역할 코드'),
      value: '',
    },
    {
      name: 'name',
      type: 'text',
      label: t('역할명'),
      value: '',
    },
    {
      name: 'description',
      type: 'textarea',
      label: t('역할 설명'),
      value: '',
    },
    {
      name: 'companyScope',
      type: 'radio-group',
      label: t('회사 적용 범위'),
      value: EnCompanyScope.ALL,
      options: [
        {
          value: EnCompanyScope.ALL,
          label: t('모든 회사'),
        },
        {
          value: EnCompanyScope.CURRENT_COMPANY,
          label: t('소속 회사'),
        },
        {
          value: EnCompanyScope.MANUAL,
          label: t('직접 선택'),
        },
      ],
    },
    {
      name: 'companyIds',
      type: 'custom',
      format: 'array',
      value: [{ company: 'aa', id: '21' }],
      placeholder: '',
    },
    {
      name: 'channelScope',
      type: 'radio-group',
      label: t('채널 적용 범위'),
      value: EnChannelScope.ALL,
      options: [
        {
          value: EnChannelScope.ALL,
          label: t('모든 채널'),
        },
        {
          value: EnChannelScope.CURRENT_COMPANY,
          label: t('소속 채널'),
        },
        {
          value: EnChannelScope.CURRENT_COMPANY_INCLUSIVE,
          label: t('소속 채널(하위 채널 포함)'),
        },
        {
          value: EnChannelScope.MANUAL,
          label: t('직접 선택'),
        },
      ],
    },
    { name: 'channelIds', type: 'custom', value: [] },
    {
      name: 'deptScope',
      type: 'radio-group',
      label: t('팀 적용 범위'),
      value: EnDeptScope.ALL,
      options: [
        {
          value: EnDeptScope.ALL,
          label: t('모든 팀'),
        },
        {
          value: EnDeptScope.CURRENT_TEAM,
          label: t('소속 팀'),
        },
        {
          value: EnDeptScope.CURRENT_TEAM_INCLUSIVE,
          label: t('소속 팀(하위 팀 포함)'),
        },
        {
          value: EnDeptScope.MANUAL,
          label: t('직접 선택'),
        },
      ],
    },
    { name: 'deptIds', type: 'custom', value: [] },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용함') : t('사용안함')),
      },
    },
  ],
  validator: {
    parentRoleId: {
      required: {
        fn: (values) => {
          return false;
        },
      },
    },
    name: {
      required: true,
    },
    tenantScope: { required: true },
    companyScope: { required: true },
    channelScope: { required: true },
    deptScope: { required: true },
  },
};
