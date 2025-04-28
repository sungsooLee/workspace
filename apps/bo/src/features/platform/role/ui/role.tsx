import { cn } from '@learnway/shared';
import { Button, ContentsRow, DynamicFormField, TreeBox, TreeNode } from '@learnway/ui';
import { t } from 'i18next';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import { FormRow } from '../../../../shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { ScopeRadioGroup } from './scope-radio-group';

const sampleData: TreeNode[] = [
  {
    key: '1',
    title: 'Root Node 1',
    isUsed: false,
    children: [
      {
        key: '1-1',
        title: 'Child 1',
        isUsed: true,
        children: [
          {
            key: '1-1-1',
            title: 'Grandchild 1',
            isUsed: true,
            children: [{ key: '1-1-1-1', title: 'Grandchild 1-1', isUsed: false }],
          },
          { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
        ],
      },
      { key: '1-2', title: 'Child 2', isUsed: true },
    ],
  },
  {
    key: '2',
    title: 'Root Node 2',
    isUsed: false,
    children: [
      { key: '2-1', title: 'Child 3', isUsed: false },
      { key: '2-2', title: 'Child 4', isUsed: false },
    ],
  },
];

const Role = () => {
  const { provider, onSubmit } = useDynamicForm(formConfig);
  const handleOnSubmit = async (formData: any) => {
    console.log(formData);
  };
  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <TreeBox data={sampleData} initLevel={2} treeId={'1'} showSearchKeyword />
      <div className={cn(layoutStyles.inner)}>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <div className={titleStyles.title_wrap}>
            <h3 className={titleStyles.title}>{'역할 정보'}</h3>
            <div className={layoutStyles.btn_wrap}>
              <Button variant="text" size="sm" className={layoutStyles.btn_text}>
                {t('초기화')}
              </Button>
              <Button variant="text" size="sm" className={layoutStyles.btn_text}>
                {t('삭제')}
              </Button>
              <Button variant="save" size="sm">
                {t('저장')}
              </Button>
            </div>
          </div>
          <div className={layoutStyles.inner_contents}>
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
                <DynamicFormField name={'roleName'} maxLength={40} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'roleDesc'} maxLength={300} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'tenantScopes'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'companyScopes'}>
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
                <DynamicFormField name={'channelScopes'}>
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
                <DynamicFormField name={'teamScopes'}>
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
  );
};

export { Role };

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
