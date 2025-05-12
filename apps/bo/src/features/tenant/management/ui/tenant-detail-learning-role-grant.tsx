import { Button, GridBox, TreeBox, TreeNode } from '@learnway/ui';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';
import { roleTreeMockData } from '../../../../entities/mock/role';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../shared/ui';
import { DynamicFormConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../shared/ui/search-box';
import { IcoFormRequired, IcoMinus, IcoPlus } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

const columnHelper = createColumnHelper<any>();

// 속성명 변경 필요
const columns = [
  columnHelper.accessor('1', {
    cell: (info) => info.getValue(),
    header: '분류',
  }),
  columnHelper.accessor('2', {
    cell: (info) => info.getValue(),
    header: '회사',
  }),
  columnHelper.accessor('3', {
    cell: (info) => info.getValue(),
    header: '조직',
  }),
  columnHelper.accessor('4', {
    cell: (info) => info.getValue(),
    header: '이름',
  }),
  columnHelper.accessor('5', {
    cell: (info) => info.getValue(),
    header: '사용자ID',
  }),
  columnHelper.accessor('6', {
    cell: (info) => info.getValue(),
    header: '사용',
  }),
  columnHelper.accessor('7', {
    cell: (info) => info.getValue(),
    header: '권한시작일',
  }),
  columnHelper.accessor('8', {
    cell: (info) => info.getValue(),
    header: '권한종료일',
  }),
  columnHelper.accessor('1', {
    cell: (info) => info.getValue(),
    header: '데이터 접근 범위',
  }),
];

const TenantDetailLearningRoleGrantComponent = ({ type: roleScope }: any) => {
  const { provider: sProvider } = useSearchBox(searchConfig);
  const roles = () => roleTreeMockData;
  const [selectedRoleId, setSelectedRoleId] = useState<any>(null);

  const handleRoleSelect = (node: TreeNode) => {
    console.log(node);
    setSelectedRoleId(node);
  };

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={roles()}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        title={'역할 목록'}
        handleSelectedNodeChange={handleRoleSelect}
      />
      <div className={cn(styles.start, styles.wrap)}>
        <FormSubTitle
          label={'역할 정보'}
          actionNode={<Button label={'저장'} variant={'save'} size={'sm'} />}
          underLine={true}
        />
        <div className={styles.contents_wrap}>
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'개별사용자 역할부여'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <SearchBox provider={sProvider} onSearch={(data: any) => console.log(data)} />
            <GridBox
              data={[]}
              columns={columns}
              title={t('사용자 목록')}
              showTotalCount={true}
              multiple={true}
              showNumberingColumn={true}
              customButtonNode={
                <>
                  <Button label={'일괄적용'} variant={'text'} size={'sm'} className="btn_text" />

                  <Button variant={'text'} size={'sm'} className="btn_text">
                    <IcoMinus width={16} height={16} stroke={'#131C30'} />
                    삭제
                  </Button>
                  <Button variant={'text'} size={'sm'} className="btn_text">
                    <IcoPlus width={16} height={16} stroke={'#131C30'} />
                    추가
                  </Button>
                </>
              }
            />
            <div>유저 그룹 역할 부여 컴포넌트...</div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export const TenantDetailLearningRoleGrant = TenantDetailLearningRoleGrantComponent;
const formConfig: DynamicFormConfig = {
  builders: [
    // {
    //     name: ''
    // }
  ],
};

// 셀렉박스의 경우에 공통 코드 ?? 아니면 선택할 수 있는 셀렉 박스?
const searchConfig: any = {
  builders: [
    [
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        options: [{ value: '', label: t('선택') }],
        optionsConfig: {
          //
        },
      },
      {
        name: 'dept',
        type: 'dropdown',
        label: t('조직'),
        value: '',
        options: [{ value: '', label: t('선택') }],
        optionsConfig: {
          //
        },
      },
      {
        name: 'dept2',
        type: 'dropdown',
        label: t('호칭'),
        value: '',
        options: [{ value: '', label: t('선택') }],
        optionsConfig: {
          //
        },
      },
      {
        name: 'name',
        type: 'text',
        label: t('이름'),
        value: '',
      },
    ],
  ],
};
