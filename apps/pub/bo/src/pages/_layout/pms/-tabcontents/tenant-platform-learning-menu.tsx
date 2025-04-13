/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { ContentsHistoryInfoFormField } from '../../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
// style
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '../title.module.css'; // 타이틀 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import {
  Button,
  ContentsRow,
  Textarea,
  Switch,
  Input,
  Tooltip,
  CheckboxGroupFormField,
  Grid,
  TreeView,
  TreeNode,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

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
          { key: '1-1-1', title: 'Grandchild 1', isUsed: true },
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

const TenantPlatformLearningMenuComponent: FC<{}> = ({}) => {
  // switch : 보안콘텐츠 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false, // Hidden 메뉴
    2: false, // 개인정보
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  // grid
  const data: any[] = [
    {
      Sort: 'Common API',
      API: <Button className="link">API 1</Button>,
      Delete: (
        <Button size="xs" variant="gray2" disabled>
          삭제
        </Button>
      ),
    },
    {
      Sort: 'Common API2',
      API: <Button className="link">API 2</Button>,
      Delete: (
        <Button size="xs" variant="gray2" disabled>
          삭제
        </Button>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('Sort', {
      cell: (info) => info.getValue(),
      header: '분류',
      size: 300,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('API', {
      cell: (info) => info.getValue(),
      header: 'API',
      size: 310,
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

  // tree
  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'테넌트 메뉴 목록'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'전체펼침'}
            </Button>
            <Button variant="text" size="sm" className={layoutStyles.btn_text}>
              {'전체닫기'}
            </Button>
            <Button variant="save" size="sm">
              {'메뉴 맵핑'}
            </Button>
          </div>
        </div>
        <div className={layoutStyles.inner_contents}>
          <TreeView treeId="source" data={sourceData} />
        </div>
      </div>
      <div className={cn(layoutStyles.inner, layoutStyles.type_progress)}>
        <div className={titleStyles.title_wrap}>
          <h3 className={titleStyles.title}>{'메뉴 정보'}</h3>
          <div className={layoutStyles.btn_wrap}>
            <Button variant="text" size="sm" className={layoutStyles.btn_text} disabled>
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
                <span className={formStyles.form_text}>{'메뉴 위치'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu"
                  type="text"
                  placeholder="메뉴 위치를 입력하세요."
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
                <span className={formStyles.form_text}>{'상위 메뉴명'}</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu2"
                  type="text"
                  placeholder="상위 메뉴명을 입력하세요."
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
                <span className={formStyles.form_text}>{'메뉴 코드'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menu2"
                  type="text"
                  placeholder="메뉴 코드를 입력하세요."
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
                <span className={formStyles.form_text}>{'메뉴명'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menuName"
                  type="text"
                  placeholder="메뉴명을 입력하세요."
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
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-menuUrl" className={formStyles.form_label}>
                <span className={formStyles.form_text}>{'메뉴 URL'}</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-menuUrl"
                  type="text"
                  placeholder="메뉴 URL을 입력하세요."
                  value="URL"
                  className={formStyles.input}
                  hideInputLength={false}
                  maxLength={10}
                  readOnly
                />
              </div>
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
          {/* Switch 영역 */}
          <ContentsRow>
            <div className={dynamicFormStyles.switch_wrap}>
              <p className={dynamicFormStyles.title}>
                {'Hidden 메뉴'}

                <Tooltip
                  className={formStyles.tooltip}
                  side="right"
                  align="start"
                  content={
                    'Hidden 메뉴 적용 시 메뉴에 API가 매칭 되나, 메뉴 자체는 화면에서 숨김처리가 됩니다.'
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
                label={checked[1] ? '적용' : '미적용'}
                checked={checked[1]}
                onCheckedChange={handleCheckedChange(1)}
                disabled
              />
            </div>
          </ContentsRow>
          <ContentsRow>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-device" className={formStyles.form_label}>
                <span className={formStyles.form_text}>디바이스 노출 여부</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.check_wrap}>
                  <CheckboxGroupFormField
                    options={[
                      { value: 'pc', label: 'PC' },
                      { value: 'mobile', label: '모바일' },
                    ]}
                  />
                </div>
              </div>
            </div>
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
                label={checked[2] ? '사용' : '미사용'}
                checked={checked[2]}
                onCheckedChange={handleCheckedChange(2)}
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

TenantPlatformLearningMenuComponent.displayName = 'TenantPlatformLearningMenu';
export const TenantPlatformLearningMenu = TenantPlatformLearningMenuComponent;
