import { cn } from '@learnway/shared';
import { Button, ContentsRow, DynamicFormField, TreeBox, TreeNode } from '@learnway/ui';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { FormRow, FormSubTitle } from '../../../../shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { ScopeRadioGroup } from './scope-radio-group';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';
import { useState } from 'react';
import { roleTreeMockData } from '../../../../entities/mock/role';
import { useFetchRole, useFetchRoles } from '../../../../entities/role/service/role-manage.hook';

const FORM_MODE = {
  NONE: 'NONE',
  VIEW: 'VIEW',
  ADD: 'ADD',
};

//type fo , bo
const TenantDetailLearningRoleTreeComponent = ({ type: roleScope }: any) => {
  const { provider, onSubmit, clearFormError, fetchData } = useDynamicForm(formConfig);
  const getRoles = () => roleTreeMockData;
  const { data } = useFetchRoles();

  const [formMode, setFormMode] = useState(FORM_MODE.NONE);
  const [selectedRoleId, setSelectedRoleId] = useState<any>(null);

  const clearAllFormErrors = () => {
    formConfig.builders.forEach((item) => clearFormError(item.name));
  };

  const handleOnSubmit = async (formData: any) => {
    console.log(formData);
  };

  const renderNodeButtons = (node: TreeNode, level: number) => {
    return (
      <div className={'gap-10px flex'}>
        <div className={'flex items-center'}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addNode(node);
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
  };

  // handle 역할 트리 노드 클릭
  const handleRoleSelect = (node: TreeNode) => {
    console.log(node);
    setSelectedRoleId(node);
    if (formMode !== FORM_MODE.VIEW) setFormMode(FORM_MODE.VIEW);
  };

  // 추가 버튼
  const addNode = (node: any) => {
    clearAllFormErrors();
    const initData: { [key: string]: any } = {};
    formConfig.builders.forEach((item) => {
      initData[item.name] = item.value;
    });
    fetchData({
      ...initData,
    });
    setFormMode(FORM_MODE.ADD);
  };

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={data}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        title={'역할 목록'}
        renderNodeButtons={renderNodeButtons}
        handleSelectedNodeChange={handleRoleSelect}
        clientTree
        type={'DRAG_DROP'}
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
                    disabled={formMode === FORM_MODE.NONE}
                  />
                  <Button
                    label={'삭제'}
                    variant={'text'}
                    size={'sm'}
                    className="btn_text"
                    disabled={formMode !== FORM_MODE.VIEW}
                  />
                  <Button
                    label={'저장'}
                    variant={'save'}
                    size={'sm'}
                    type="submit"
                    disabled={formMode === FORM_MODE.NONE}
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
                  <DynamicFormField name={'roleCd'} disabled={true} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField
                    name={'roleName'}
                    maxLength={40}
                    disabled={formMode === FORM_MODE.NONE}
                  />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField
                    name={'roleDesc'}
                    maxLength={300}
                    disabled={formMode === FORM_MODE.NONE}
                  />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'tenantScopes'} disabled={formMode === FORM_MODE.NONE} />
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'companyScopes'} disabled={formMode === FORM_MODE.NONE}>
                    <ScopeRadioGroup
                      options={[
                        {
                          value: 'all',
                          label: t('모든 회사'),
                        },
                        {
                          value: '2',
                          label: t('소속 회사'),
                        },
                        {
                          value: '3',
                          label: t('직접 선택'),
                        },
                      ]}
                    />
                  </DynamicFormField>
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'channelScopes'} disabled={formMode === FORM_MODE.NONE}>
                    <ScopeRadioGroup
                      options={[
                        {
                          value: 'all',
                          label: t('모든 채널'),
                        },
                        {
                          value: '2',
                          label: t('소속 채널'),
                        },
                        {
                          value: '3',
                          label: t('소속 채널(하위 채널 포함)'),
                        },
                        {
                          value: '4',
                          label: t('직접 선택'),
                        },
                      ]}
                    />
                  </DynamicFormField>
                </FormRow>
              </ContentsRow>
              <ContentsRow>
                <FormRow provider={provider}>
                  <DynamicFormField name={'teamScopes'} disabled={formMode === FORM_MODE.NONE}>
                    <ScopeRadioGroup
                      options={[
                        {
                          value: 'all',
                          label: t('모든 팀'),
                        },
                        {
                          value: '2',
                          label: t('소속 팀'),
                        },
                        {
                          value: '3',
                          label: t('소속 팀(하위 팀 포함)'),
                        },
                        {
                          value: '4',
                          label: t('직접 선택'),
                        },
                      ]}
                    />
                  </DynamicFormField>
                </FormRow>
              </ContentsRow>
            </div>
          </form>
        </div>
      </div>
    </SectionLayout>
  );
};

export const TenantDetailLearningRoleTree = TenantDetailLearningRoleTreeComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'roleId',
      type: 'text',
      label: t('역할 ID'),
      value: '',
    },
    {
      name: 'roleCd',
      type: 'text',
      label: t('역할 코드'),
      value: '',
    },
    {
      name: 'roleName',
      type: 'text',
      label: t('역할명'),
      value: '',
    },
    {
      name: 'roleDesc',
      type: 'textarea',
      label: t('역할 설명'),
      value: '',
    },
    {
      name: 'tenantScopes',
      type: 'radio-group',
      label: t('테넌트 적용 범위'),
      value: 'all',
      options: [
        {
          value: 'all',
          label: t('모든 테넌트'),
        },
      ],
    },
    {
      name: 'companyScopes',
      type: 'custom',
      label: t('회사 적용 범위'),
      value: 'all',
    },
    {
      name: 'channelScopes',
      type: 'custom',
      label: t('채널 적용 범위'),
      value: 'all',
    },
    {
      name: 'teamScopes',
      type: 'custom',
      label: t('팀 적용 범위'),
      value: 'all',
    },
  ],
  validator: {
    roleName: {
      required: true,
    },
  },
};
