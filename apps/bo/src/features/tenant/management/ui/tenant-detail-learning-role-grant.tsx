import { forwardRef, useEffect, useState } from 'react';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  GridBox,
  TreeBox,
  TreeNode,
  useGridBox,
  useModal,
} from '@learnway/ui';

import { ContentsHistoryInfoFormField, FormRow, FormSubTitle } from '@shared/ui';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';
import { useRouterState } from '@tanstack/react-router';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { DynamicFormConfig, useDynamicForm, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '@shared/ui/search-box';
import { IcoFormRequired, IcoMinus, IcoPlus } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { createColumnHelper } from '@tanstack/react-table';
import { transformRoleApiDataToTreeData } from '../service/tenant-detail-tree.service';
import { useFetchRoleTree, useGetRoleUserGroups } from '@entities/role/service/role-manage.hook';
import { UserChoiceModal } from '@features/shared';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';
import { EnFormMode } from '@types';

const TenantDetailLearningRoleGrantComponent = ({ roleInfo, siteScope }: any, ref: any) => {
  const routerState = useRouterState();
  const { open: openModal } = useModal();

  const [roleTree, setRoleTree] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);

  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { provider, onSubmit, clearFormError, fetchData, onFormChange } =
    useDynamicForm(formConfig);
  const { config, gridFetch } = useGridBox(gridConfig);

  const { data: roleData } = useFetchRoleTree(tenantId, siteScope);
  const { data: roleGroupData, refetch: roleGroupRefetch } = useGetRoleUserGroups(
    selectedRole?.roleCode,
  );

  const handleOnSearch = (data: any) => {
    if (formMode === EnFormMode.VIEW) {
      gridFetch({ ...data, roleCode: selectedRole.roleCode });
    }
  };

  const handleRoleSelect = (node: TreeNode) => {
    if (node.key !== 'root') {
      setFormMode(EnFormMode.VIEW);
      setSelectedRole(node);
      gridFetch({ ...getValues(), roleCode: node.roleCode });
      roleGroupRefetch();
    }
  };
  const handleUserAddButtonClick = async () => {
    const data = await openModal({
      content: <UserChoiceModal />,
      width: 'xl',
    });
    console.log('hand', data);
    // 받은 자료로 유저그룹 역할 부여 처리
  };

  useEffect(() => {
    if (roleData) {
      const transformedData = transformRoleApiDataToTreeData(roleData);
      setRoleTree(transformedData);
    }
  }, [roleData]);

  useEffect(() => {
    if (roleGroupData) {
      console.log('roleGroupData', roleGroupData);
    }
  }, [roleGroupData]);

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
              showTotalCount
              multiple
              showNumberingColumn
              customButtonNode={
                <>
                  <Button label={t('일괄적용')} variant="text" size="sm" className="btn_text" />

                  <Button variant="text" size="sm" className="btn_text">
                    <IcoMinus width="16" height="16" stroke="#131C30" />
                    삭제
                  </Button>
                  <Button
                    variant="text"
                    size="sm"
                    className="btn_text"
                    stopPropagation
                    onClick={handleUserAddButtonClick}
                  >
                    <IcoPlus width="16" height="16" stroke="#131C30" />
                    추가
                  </Button>
                </>
              }
            />
            <div className={styles.contents_wrap}>
              <div className={formStyles.form_item}>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="userGroup"
                    element={
                      <ChipListModalSelectorFormField
                        showAddButton
                        chipList={{
                          labelField: 'name',
                          valueField: 'value',
                          wordwrap: true,
                        }}
                        modalConfig={{
                          title: '',
                          width: 'xl',
                          content: '유저그룹 팝업 필요',
                        }}
                        actionNode={<Button variant="text" label={t('대상자')} />}
                      />
                    }
                  />
                </ContentsRow>
                <ContentsHistoryInfoFormField />
              </div>
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
      name: 'userGroup',
      type: 'custom',
      label: t('유적그룹 역할부여'),
      format: 'array',
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
        name: 'companyName',
        type: 'text',
        label: t('회사이름'),
        format: 'string',
        value: '',
      },
      {
        name: 'deptName',
        type: 'text',
        label: t('조직명'),
        format: 'string',
        value: '',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        format: 'string',
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

const columnHelper = createColumnHelper<any>();

// 속성명 변경 필요
const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: '구분',
    size: 60,
  }),
  columnHelper.accessor('2', {
    cell: (info) => info.getValue(),
    header: '회사',
    size: 80,
  }),
  columnHelper.accessor('3', {
    cell: (info) => info.getValue(),
    header: '조직',
    size: 90,
  }),
  columnHelper.accessor('4', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 60,
  }),
  columnHelper.accessor('5', {
    cell: (info) => info.getValue(),
    header: '사용자ID',
    size: 80,
  }),
  columnHelper.accessor('6', {
    cell: (info) => info.getValue(),
    header: '사용',
    size: 60,
  }),
  columnHelper.accessor('7', {
    cell: (info) => info.getValue(),
    header: '권한시작일',
    size: 140,
  }),
  columnHelper.accessor('8', {
    cell: (info) => info.getValue(),
    header: '권한종료일',
    size: 140,
  }),
  columnHelper.accessor('9', {
    header: '데이터 접근 범위',
    size: 232,
    cell: (info) => {
      return (
        <>
          <Button
            onClick={() => {
              const rowData = info.row.original;
              // const currentApiList = getValues('apiMappingMenuList') || [];
              // const updatedApiList = currentApiList.filter(
              //   (item: any) => item.apiId !== rowData.apiId,
              // );
              // fetchData({ ...getValues(), apiMappingMenuList: updatedApiList });
            }}
            variant="gray2"
            size={'xs'}
            type={'button'}
          >
            회사
          </Button>
          <Button variant="gray2" size={'xs'} type={'button'}>
            채널
          </Button>
          <Button variant="gray2" size={'xs'} type={'button'}>
            팀
          </Button>
        </>
      );
    },
  }),
];
