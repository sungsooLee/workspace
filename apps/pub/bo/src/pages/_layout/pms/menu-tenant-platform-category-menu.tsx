/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import pageStyles from './tenant-menu-management.module.css';
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css'; // 타이틀 css
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { DndTreeView, Tabs, TreeContainer } from '@learnway/ui';
import { cn } from '@learnway/shared';
import {
  Button,
  ContentsRow,
  Textarea,
  Switch,
  Tooltip,
  Input,
  TreeView,
  TreeNode,
} from '@learnway/ui';

import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';

export const Route = createFileRoute('/_layout/pms/menu-tenant-platform-category-menu')({
  component: RouteComponent,
});

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

function RouteComponent() {
  const menuItems = [
    {
      title: '1. 테넌트 기본 정보',
      key: 'menu01',
      content: '',
    },
    {
      title: '2. 테넌트 메뉴 매핑',
      key: 'menu02',
      content: '',
    },
    {
      title: '3. 테넌트 카테고리 매핑',
      key: 'menu03',
      content: '',
    },
    {
      title: '4. 테넌트 역할 생성',
      key: 'menu04',
      content: '',
    },
  ];

  // switch : 보안콘텐츠 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false, // Hidden메뉴
    2: false, // 개인정보
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  // tree
  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={cn(styles.main_contents, pageStyles.start)}>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu03'}
        />
        <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.contents_category)}>
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
              <TreeContainer>
                <DndTreeView treeId="source" data={sourceData} />
              </TreeContainer>
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
                {/* form_item */}
                <div className={formStyles.form_item}>
                  <label htmlFor="name-menu" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>{'카테고리 위치'}</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-menu"
                      type="text"
                      placeholder="카테고리 위치를 입력하세요."
                      value="러닝웨이"
                      readOnly
                      className={formStyles.input}
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                {/* form_item */}
                <div className={formStyles.form_item}>
                  <label htmlFor="name-menu2" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>{'상위 카테고리명'}</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-menu2"
                      type="text"
                      placeholder="상위 카테고리명을 입력하세요."
                      value="러닝웨이"
                      readOnly
                      className={formStyles.input}
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                {/* form_item */}
                <div className={formStyles.form_item}>
                  <label htmlFor="name-code" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>{'카테고리 코드'}</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-menu2"
                      type="text"
                      placeholder="카테고리 코드를 입력하세요."
                      value="1932267687686"
                      className={formStyles.input}
                      hideInputLength={false}
                      maxLength={15}
                      readOnly
                    />
                    <Button variant="gray" size="sm" disabled>
                      {'중복'}
                    </Button>
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                {/* form_item */}
                <div className={formStyles.form_item}>
                  <label htmlFor="name-menuName" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>{'카테고리명'}</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name-menuName"
                      type="text"
                      placeholder="카테고리명을 입력하세요."
                      value="러닝웨이"
                      hideInputLength={false}
                      maxLength={10}
                      readOnly
                      className={formStyles.input}
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                <div className={dynamicFormStyles.switch_wrap}>
                  <p className={dynamicFormStyles.title}>
                    {'사용여부'}
                    {/* 필수 케이스 */}
                    <span className={cn(dynamicFormStyles.status, dynamicFormStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
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
                    id="name-useabled"
                    className={dynamicFormStyles.btn_switch}
                    label={checked[1] ? '사용' : '미사용'}
                    checked={checked[1]}
                    onCheckedChange={handleCheckedChange(1)}
                  />
                </div>
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
      </div>
    </PageContainer>
  );
}
