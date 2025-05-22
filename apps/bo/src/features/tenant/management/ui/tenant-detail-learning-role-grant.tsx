import { useState, useEffect, forwardRef, useCallback } from 'react';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import {
  Button,
  GridBox,
  TreeBox,
  TreeNode,
  useGridBox,
  ChipList,
  ChipListComponentProps,
} from '@learnway/ui';

import {
  FormInfoArea,
  FormRow,
  ContentsHistoryInfoFormField,
  ChipListFormField,
  SwitchFormField,
} from '@shared/ui';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { useRouterState } from '@tanstack/react-router';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';

import { FormSubTitle } from '@shared/ui';
import { DynamicFormConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../shared/ui/search-box';
import { IcoFormRequired, IcoMinus, IcoPlus } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { createColumnHelper } from '@tanstack/react-table';
import {
  getAllTreeKeys,
  getFirstExpandKeys,
  moveNodeCheck,
  transformRoleApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import {
  useFetchRole,
  useFetchRoleTree,
  useRoleManager,
} from '@entities/role/service/role-manage.hook';
import { EnFormMode } from '@types';

import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';

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

const TenantDetailLearningRoleGrantComponent = ({ roleInfo, siteScope }: any, ref: any) => {
  const routerState = useRouterState();

  const [roleTree, setRoleTree] = useState<any>(null);
  const [roleTreeExpandedKeys, setRoleTreeExpandedKeys] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);

  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { data: roleData } = useFetchRoleTree(tenantId, siteScope);

  const { config, gridFetch } = useGridBox(gridConfig);

  const handleOnSearch = useCallback((data: any) => {
    if (formMode === EnFormMode.VIEW) {
      gridFetch({ ...data, roleCode: selectedRole.roleCode });
    }
  }, []);

  const handleRoleSelect = (node: TreeNode) => {
    if (node.key !== 'root') {
      setSelectedRole(node);
      gridFetch({ ...getValues(), roleCode: node.roleCode });
    }
  };

  useEffect(() => {
    if (roleData) {
      const transformedData = transformRoleApiDataToTreeData(roleData);
      setRoleTree(transformedData);
      if (transformedData && transformedData.length > 0 && roleTreeExpandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: TreeNode) => node.key);
        setRoleTreeExpandedKeys(firstLevelKeys);
      }
    }
  }, [roleData]);

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={roleTree}
        initLevel={2}
        treeId={'1'}
        showSearchKeyword
        title={'역할 목록'}
        selectedNode={selectedRole}
        handleSelectedNodeChange={handleRoleSelect}
      />
      <div className={cn(styles.start, styles.wrap)}>
        <FormSubTitle label={'역할 정보'} underLine={true} />
        <div className={styles.contents_wrap}>
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>{'개별사용자 역할부여'}</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <SearchBox provider={sProvider} onSearch={handleOnSearch} />
            <GridBox
              config={config}
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
            <div className={styles.contents_wrap}>
              {/* <ChipList options={[]} /> */}
              {/* <ChipListFormField placeHolder /> */}
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export const TenantDetailLearningRoleGrant = forwardRef(TenantDetailLearningRoleGrantComponent);
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'location',
      type: 'custom',
      label: t('위치'),
      value: [],
    },
  ],
  validator: {},
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
//const chipListOptions: ChipListComponentProps = { options: new Array() };

const gridConfig = {
  query: roleManagerQueryOptions.getRoleUserList,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 1,
    totalRows: 2,
  },
};
