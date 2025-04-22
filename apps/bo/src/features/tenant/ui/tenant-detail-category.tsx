import { FC, useState } from 'react';
import { t } from 'i18next';
import {
  Button,
  ContentsRow,
  Textarea,
  Switch,
  Tooltip,
  Input,
  TreeView,
  TreeNode,
  DynamicFormField,
} from '@learnway/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';

const TenantDetailCategoryComponent: FC<any> = ({ menuScope }) => {
  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  // switch : 보안콘텐츠 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false, // Hidden메뉴
    2: false, // 개인정보
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'테넌트 카테고리 목록'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'전체펼침'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'전체닫기'}
            </Button>
            <Button variant="save" size="sm">
              {'카테고리 맵핑'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeView treeId="source" data={sourceData} />
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress2)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'카테고리 정보'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'초기화'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'삭제'}
            </Button>
            <Button variant="save" size="sm">
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
              <DynamicFormField name={'categoryCode'} disabled={true} />
              <Button variant="gray" size="sm" disabled>
                {'중복'}
              </Button>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'categoryName'} disabled={true} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <div className={dynamicFormStyles.switch_wrap}>
              <p className={dynamicFormStyles.title}>
                {'사용여부'}

                <Tooltip
                  className={formStyles.tooltip}
                  side="right"
                  align="start"
                  content={'테넌트 - 카테고리 관리에서 사용할 카테고리를 선택할 수 있습니다.'}
                >
                  <Button onlyIcon>
                    <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                  </Button>
                </Tooltip>
              </p>
              <Switch
                id="name-use2"
                className={dynamicFormStyles.btn_switch}
                label={'미사용'}
                // label={true ? '미사용' : '사용'}
                checked={false}
              />
            </div>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'categoryDesc'} disabled={true} />
            </FormRow>
          </ContentsRow>

          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuContents" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'설명'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-menuContents"
                  rows={5}
                  cols={33}
                  resize="none"
                  value=""
                  placeholder="메뉴 설명을 입력하세요."
                  size={'sm'}
                  maxLength={50}
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </div>
      </div>
    </div>
  );
};

export const TenantDetailCategory = TenantDetailCategoryComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'path',
      type: 'text',
      label: t('카테고리 위치'),
      value: '',
      placeholder: '',
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('상위 카테고리명'),
      value: '',
      placeholder: '',
    },
    {
      name: 'categoryCode',
      type: 'text',
      label: t('카테고리 코드'),
      value: '',
      placeholder: '',
      maxLength: 15,
    },
    {
      name: 'categoryName',
      type: 'text',
      label: t('카테고리명'),
      value: '',
      placeholder: '',
      maxLength: 10,
    },
    {
      name: 'isUsable',
      type: 'switch',
      label: t('사용 여부'),
      value: false,
    },
    {
      name: 'categoryDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
    },
  ],
  validator: {
    categoryCode: { required: true },
    categoryName: { required: true },
  },
};

// tree
const sampleData: TreeNode[] = [
  {
    key: '1',
    title: '러닝웨이 1',
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
            children: [
              { key: '1-1-1-1', title: 'Grandchild 1', isUsed: true },
              { key: '1-1-1-2', title: 'Grandchild 2', isUsed: false },
              { key: '1-1-1-3', title: 'Grandchild 3', isUsed: false },
            ],
          },
          { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
        ],
      },
      { key: '1-2', title: 'Child 2', isUsed: true },
    ],
  },
  {
    key: '2',
    title: '러닝웨이 2',
    isUsed: false,
    children: [
      { key: '2-1', title: 'Child 3', isUsed: false },
      { key: '2-2', title: 'Child 4', isUsed: false },
    ],
  },
  {
    key: '3',
    title: '러닝웨이 3',
    isUsed: false,
    children: [
      { key: '3-1', title: 'Child 5', isUsed: false },
      { key: '3-2', title: 'Child 6', isUsed: false },
    ],
  },
  {
    key: '4',
    title: '러닝웨이 4',
    isUsed: false,
    children: [
      { key: '4-1', title: 'Child 7', isUsed: false },
      { key: '4-2', title: 'Child 8', isUsed: false },
    ],
  },
];
