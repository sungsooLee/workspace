import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css

import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  RadioGroupFormField,
  Switch,
  TextareaFormField,
  TreeBox,
  TreeContainer,
  TreeNode,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm, CODE_GROUP } from '@learnway/hooks';

import { ContentsHistoryInfoFormField, FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';

import {
  useFetchRole,
  useFetchRoleTree,
  useMovePosition,
  useRoleManager,
} from '@entities/role/service/role-manage.hook';
import {
  moveRoleCheck,
  transformRoleApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import { FormDisplay } from '@features/form/ui/form-display';
import { EnChannelScope, EnCompanyScope, EnDeptScope, EnFormMode, EnTenantScope } from '@types';
import {
  ChannelChoiceModal,
  ChannelListChoiceModal,
  CompanyShuttleModal,
  UserGroupChoiceModal,
} from '@features/shared';
import { DropdownFormField } from '@features/form';

/**
 * 화면번호:
 * NLP_BO_TMS_1003_04(학습역할), NLP_BO_TMS_1003_04_03(HRD역할),
 * NLP_BO_PMS_1100 (플렛폼 학습역할), NLP_BO_PMS_1104 (플렛폼 HRD역할)
 * @param param0
 * @param ref
 * @returns
 */
const TenantDetailLearningRoleTreeComponent = ({ roleInfo, siteScope }: any, ref: any) => {
  const routerState = useRouterState();
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [selectedRoleNode, setSelectedRoleNode] = useState<any>(null);
  const [roleTreeData, setRoleTreeData] = useState([]);

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
  const { updatePosition } = useMovePosition({
    onSuccess: () => {
      refetch();
    },
  });

  const { provider, onSubmit, clearFormError, fetchData, onFormChange } =
    useDynamicForm(formConfig);
  const { data, refetch } = useFetchRoleTree(tenantId, siteScope);
  const { data: roleDetail } = useFetchRole(selectedRoleNode?.roleId || undefined);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  useImperativeHandle(ref, () => ({
    showAlertModify: () => {
      console.log('tree ' + siteScope);
      return true;
    },
  }));

  const handleOnSubmit = async (formData: any) => {
    const parentRoleId = formData.parentRoleId === 'root' ? undefined : formData.parentRoleId;

    const payload = {
      ...formData,
      tenantId: tenantId,
      siteScope: siteScope,
      parentRoleId: parentRoleId,
    };
    if (payload.companyScope !== EnCompanyScope.MANUAL) payload.companyIds = [];
    if (payload.channelScope !== EnChannelScope.MANUAL) payload.channelUuids = [];
    if (payload.deptScope !== EnDeptScope.MANUAL) payload.deptIds = [];

    switch (formMode) {
      case EnFormMode.ADD:
        createRole(payload);
        break;

      case EnFormMode.VIEW:
        updateRole(payload);
        break;
    }
  };

  const handleTreeAction = (events: any) => {
    switch (events.type) {
      case 'NODE_MOVE':
        {
          const payload = moveRoleCheck(events);
          console.log('event', events);
          console.log('payload', payload);
          if (payload) {
            updatePosition(payload);
          }
        }
        break;
    }
  };

  // handle 역할 트리 노드 클릭
  const handleRoleSelect = (node: TreeNode) => {
    if (node.key !== 'root') {
      setSelectedRoleNode(node);
      if (formMode !== EnFormMode.VIEW) setFormMode(EnFormMode.VIEW);
    }
  };

  // 추가 버튼
  const handlerAddButionClick = (node: any) => {
    clearAllFormErrors();
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });
    const sortOrder = node.children.length + 1;
    fetchData({
      ...initData,
      parentRoleId: node.key.toString(),
      sortOrder: sortOrder,
    });
    setSelectedRoleNode(node);
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
    }
  }, [data]);

  useEffect(() => {
    if (roleDetail) {
      console.log('roleDetail', roleDetail);
      const parentRoleId = roleDetail.parentRoleId ? roleDetail.parentRoleId.toString() : 'root';
      fetchData({
        ...roleDetail,
        parentRoleId: parentRoleId,
        companyIds: roleDetail.companies.map((item: any) => ({
          companyId: item.id,
          name: item.name,
        })),
        channelUuids: roleDetail.channels.map((item: any) => ({
          channelUuid: item.uuid,
          channelName: item.name,
        })),
        deptIds: roleDetail.depts.map((item: any) => ({ deptId: item.id, deptName: item.name })),
      });

      setFormMode(EnFormMode.VIEW);
    }
  }, [roleDetail]);

  const renderNodeButtons = (node: TreeNode, level: number) => {
    if (roleInfo)
      return (
        <div className="gap-10px flex">
          <div className="flex items-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handlerAddButionClick(node);
              }}
              variant={
                formMode === EnFormMode.ADD && selectedRoleNode.key === node.key
                  ? 'primary'
                  : 'gray2'
              }
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
      <TreeContainer>
        <TreeBox
          data={roleTreeData}
          treeId="1"
          type="SAME_PARENT_ONLY"
          showSearchKeyword
          initLevel={2}
          title={t('역할 목록')}
          onAction={handleTreeAction}
          selectedNode={selectedRoleNode}
          renderNodeButtons={renderNodeButtons}
          handleSelectedNodeChange={handleRoleSelect}
        />
      </TreeContainer>
      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <form onSubmit={onSubmit(handleOnSubmit)}>
            <FormSubTitle
              label={t('역할 정보')}
              actionNode={
                <>
                  <Button
                    label={t('초기화')}
                    variant="text"
                    size="sm"
                    className="btn_text"
                    disabled={formMode === EnFormMode.NONE}
                    onClick={() => onFormChange()}
                  />
                  <Button
                    label={t('삭제')}
                    variant="text"
                    size="sm"
                    className="btn_text"
                    disabled={
                      !roleInfo ||
                      formMode !== EnFormMode.VIEW ||
                      selectedRoleNode?.key === 'root' ||
                      selectedRoleNode?.children.length > 0
                    }
                    onClick={handleDeleteButtonClick}
                  />
                  <Button
                    label={t('저장')}
                    variant="save"
                    size="sm"
                    type="submit"
                    disabled={formMode === EnFormMode.NONE}
                  />
                </>
              }
              lineType="light"
            />
            <div className={styles.contents_wrap}>
              <ContentsRow>
                <FormRow provider={provider} name="roleId" element={<Input disabled={true} />} />
                <FormRow
                  provider={provider}
                  name="roleType"
                  element={
                    <DropdownFormField disabled={formMode !== EnFormMode.ADD || !roleInfo} />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name="name"
                  element={
                    <Input maxLength={40} disabled={formMode === EnFormMode.NONE || !roleInfo} />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name="description"
                  element={
                    <TextareaFormField
                      maxLength={300}
                      disabled={formMode === EnFormMode.NONE || !roleInfo}
                    />
                  }
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name="tenantScope"
                  element={<RadioGroupFormField disabled={formMode === EnFormMode.NONE} />}
                />
              </ContentsRow>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name="companyScope"
                  element={<RadioGroupFormField disabled={formMode === EnFormMode.NONE} />}
                />
              </ContentsRow>
              <FormDisplay
                provider={provider}
                dependencies={[{ name: 'companyScope', value: EnCompanyScope.MANUAL }]}
              >
                <div className="chiplist_modal_wrap">
                  <FormRow
                    provider={provider}
                    name="companyIds"
                    element={
                      <ChipListModalSelectorFormField
                        modalConfig={{
                          content: <CompanyShuttleModal />,
                          title: '',
                          width: 'xl',
                        }}
                        chipList={{
                          labelField: 'name',
                          valueField: 'companyId',
                          wordwrap: true,
                        }}
                      />
                    }
                  />
                </div>
              </FormDisplay>

              <ContentsRow>
                <FormRow
                  provider={provider}
                  name="deptScope"
                  element={<RadioGroupFormField disabled={formMode === EnFormMode.NONE} />}
                />
              </ContentsRow>
              <FormDisplay
                provider={provider}
                dependencies={[{ name: 'deptScope', value: EnDeptScope.MANUAL }]}
              >
                <div className="chiplist_modal_wrap">
                  <FormRow
                    provider={provider}
                    name="deptIds"
                    element={
                      <ChipListModalSelectorFormField
                        chipList={{
                          labelField: 'deptName',
                          valueField: 'deptId',
                          hideBorder: true,
                        }}
                        modalConfig={{
                          title: '',
                          width: 'xl',
                          content: <UserGroupChoiceModal />,
                        }}
                      />
                    }
                  />
                </div>
              </FormDisplay>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name="channelScope"
                  element={<RadioGroupFormField disabled={formMode === EnFormMode.NONE} />}
                />
              </ContentsRow>
              <FormDisplay
                provider={provider}
                dependencies={[{ name: 'channelScope', value: EnChannelScope.MANUAL }]}
              >
                <div className="chiplist_modal_wrap">
                  <FormRow
                    provider={provider}
                    name="channelUuids"
                    element={
                      <ChipListModalSelectorFormField
                        chipList={{
                          labelField: 'channelName',
                          valueField: 'channelUuid',
                          hideBorder: true,
                        }}
                        modalConfig={{
                          title: '',
                          width: 'xl',
                          content: <ChannelListChoiceModal />,
                        }}
                      />
                    }
                  />
                </div>
              </FormDisplay>

              <ContentsRow type="horizontal">
                <FormRow
                  provider={provider}
                  name="isUsed"
                  element={<SwitchFormField disabled={formMode === EnFormMode.NONE} />}
                />
              </ContentsRow>
            </div>
          </form>
        </div>
      </div>
    </SectionLayout>
  );
};

export const TenantDetailLearningRoleTree = forwardRef(TenantDetailLearningRoleTreeComponent);

const formBaseConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantScope',
      type: 'radio-group',
      label: t('테넌트 적용 범위'),
      value: EnTenantScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.TenantScope'],
      },
    },
    {
      name: 'parentRoleId',
      label: '',
      type: 'hidden',
      value: '',
      format: 'string',
    },
    {
      name: 'roleId',
      type: 'text',
      format: 'number',
      label: t('역할 번호'),
      value: '',
    },
    {
      name: 'roleType',
      type: 'dropdown',
      label: t('역할 타입'),
      value: '',
      presetOptionLabel: t('LABEL.form.label.select'),
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.RoleType'],
      },
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
      label: t('회사 접근 범위'),
      value: EnCompanyScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.CompanyScope'],
      },
    },
    {
      name: 'companyIds',
      label: '',
      type: 'array',
      format: 'array',
      value: [],
    },
    {
      name: 'channelScope',
      type: 'radio-group',
      label: t('채널 접근 범위'),
      value: EnChannelScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.ChannelScope'],
      },
    },
    {
      name: 'channelUuids',
      label: '',
      type: 'custom',
      format: 'array',
      value: [],
    },
    {
      name: 'deptScope',
      type: 'radio-group',
      label: t('조직 접근 범위'),
      value: EnDeptScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.DeptScope'],
      },
    },
    {
      name: 'deptIds',
      label: '',
      type: 'custom',
      format: 'array',
      value: [],
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('역할 사용 여부'),
      value: false,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용함') : t('사용안함')),
      },
    },
    {
      name: 'sortOrder',
      label: '',
      type: 'number',
      value: 0,
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
    roleType: true,
    companyIds: {
      required: {
        fn: (value) => {
          return value.companyScope === EnCompanyScope.MANUAL && value.companyIds?.length <= 0;
        },
        message: t('회사를 선택 하세요.'),
      },
    },
    channelIds: {
      required: {
        fn: (value) => {
          return value.channelScope === EnChannelScope.MANUAL && value.channelIds?.length <= 0;
        },
        message: t('채널을 선택 하세요.'),
      },
    },
    deptIds: {
      required: {
        fn: (value) => {
          return value.deptScope === EnDeptScope.MANUAL && value.deptIds?.length <= 0;
        },
        message: t('팀을 선택 하세요.'),
      },
    },
  },
};
