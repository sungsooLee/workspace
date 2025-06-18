import { forwardRef, useEffect, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef, Table } from '@tanstack/react-table';
import { UseFormGetValues, FieldValues } from 'react-hook-form';
import { t } from 'i18next';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  GridBox,
  TreeBox,
  TreeNode,
  useGridBox,
  useModal,
  Input,
  Dropdown,
  TreeContainer,
} from '@learnway/ui';
import { IcoFormRequired, IcoMinus, IcoPlus } from '@learnway/icons';
import { DynamicFormConfig, useDynamicForm, useSearchBox } from '@learnway/hooks';

import { FormRow, FormSubTitle, ContentsHistoryInfoFormField } from '@shared/ui';

import { SearchBox } from '@shared/ui/search-box';

import {
  getAllTreeKeys,
  getFirstExpandKeys,
  transformRoleApiDataToTreeData,
} from '../service/tenant-detail-tree.service';
import {
  useFetchRole,
  useFetchRoleTree,
  useRoleManager,
  useGetRoleUserGroups,
} from '@entities/role/service/role-manage.hook';

import { UserChoiceModal, UserShuttleModal } from '@features/shared';

import { TenantDetailLearningRoleGrantRangeModal } from './tenant-detail-learning-role-grant-range-modal';
import { TenantDetailLearningRoleGrantUserShuttleModal } from './tenant-detail-learning-role-grant-user-shuttle-modal';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';
import { useSaveUsers } from '@entities/role/service/role-manage.hook';
import { EnFormMode } from '@types';

/**
 * 화면번호:
 * NLP_BO_TMS_1003_04_02(학습역할부여), NLP_BO_TMS_1003_04_05(HRD역할메뉴부여),
 * NLP_BO_PMS_1103 (플렛품 학습역할부여), NLP_BO_PMS_1106 (플렛폼 HRD역할부여),
 * @param param0
 * @param ref
 * @returns
 */
const TenantDetailLearningRoleGrantComponent = ({ roleInfo, siteScope }: any, ref: any) => {
  const routerState = useRouterState();
  const { open: openModal } = useModal();

  const [roleTree, setRoleTree] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [formMode, setFormMode] = useState<EnFormMode>(EnFormMode.NONE);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [roleGroup, setRoleGroup] = useState([]);
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const gridConfig = {
    query: roleManagerQueryOptions.getRoleUserList,
    columns: [],
    data: [],
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      totalRows: 2,
    },
  };

  const getGridParams = () => {
    const fetchOption: any = { roleId: selectedRole.roleId };
    if (searchKeyword) {
      fetchOption[searchColumn] = searchKeyword;
    }

    return fetchOption as FieldValues;
  };

  // const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { provider, onSubmit, clearFormError, fetchData, onFormChange } =
    useDynamicForm(formConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getGridParams);

  const { data: roleData } = useFetchRoleTree(tenantId, siteScope);
  const { data: roleGroupData, refetch: roleGroupRefetch } = useGetRoleUserGroups(
    selectedRole?.roleId,
  );
  const { saveUsersRole: saveRoleUsers } = useSaveUsers({});

  const handleOnSearch = () => {
    if (formMode === EnFormMode.VIEW) {
      gridFetch(getGridParams());
    }
  };

  const handleRoleSelect = (node: TreeNode) => {
    if (node.key !== 'root') {
      setSelectedRole(node);
      //검색 영역 초기회
      setSearchKeyword('');
      setSearchColumn('');
      gridFetch({ roleId: node.roleId });
      setFormMode(EnFormMode.VIEW);
      roleGroupRefetch();
    }
  };
  const handleUserAddButtonClick = async () => {
    if (selectedRole) {
      const data = await openModal({
        content: <TenantDetailLearningRoleGrantUserShuttleModal roleId={selectedRole.roleId} />,
        width: 'xl',
      });
      handleOnSearch();
    }
  };

  const handleBatchClick = async () => {
    const data = await openModal({ content: <TenantDetailLearningRoleGrantRangeModal /> });
    handleOnSearch();
  };

  const handleDeleteButtonClick = () => {
    const deleteRows = tableInstance?.getSelectedRowModel().rows;
    if (deleteRows) {
      const payload = {
        roleId: selectedRole.roleId,
        body: {
          removeUserUuids: deleteRows.map((item) => item.original.userUuid),
        },
      };
      saveRoleUsers(payload, {
        onSuccess: () => {
          handleOnSearch();
        },
      });
    }
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
      setRoleGroup(roleGroupData);
    }
  }, [roleGroupData]);

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeContainer>
        <TreeBox
          data={roleTree}
          initLevel={2}
          treeId={'1'}
          showSearchKeyword
          title={'역할 목록'}
          selectedNode={selectedRole}
          handleSelectedNodeChange={handleRoleSelect}
        />
      </TreeContainer>
      <div className={cn(styles.start, styles.wrap)}>
        <FormSubTitle label={t('역할 정보')} lineType="light" />
        <div className={styles.contents_wrap}>
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label} style={{ marginBottom: 20 }}>
              <span className={formStyles.form_text}>{t('개별사용자 역할부여')}</span>
              {/* 필수 케이스 */}
              {/* <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span> */}
            </label>
            <GridBox
              config={config}
              columns={columns}
              title={t('사용자 목록')}
              showTotalCount
              multiple
              showNumberingColumn
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
              showAdd
              onAddClick={handleUserAddButtonClick}
              showRemove
              onRemoveClick={handleDeleteButtonClick}
              customButtonNode={
                <>
                  <Dropdown
                    value={searchColumn}
                    options={[
                      { label: t('선택'), value: '' },
                      { label: t('회사'), value: 'companyName' },
                      { label: t('사용자ID'), value: 'userId' },
                      { label: t('이름'), value: 'userName' },
                    ]}
                    disabled={formMode === EnFormMode.NONE}
                    onChange={setSearchColumn}
                  />
                  <Input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder={t('검색')}
                    showSearchIcon={true}
                    searchIconType="search"
                    disabled={searchColumn === '' || formMode === EnFormMode.NONE}
                    onEnterKeyDown={handleOnSearch}
                  />
                  <Button
                    label={t('일괄적용')}
                    variant="text"
                    size="sm"
                    className="btn_text"
                    stopPropagation
                    disabled={EnFormMode.NONE === formMode}
                    onClick={handleBatchClick}
                  />
                </>
              }
            />
            <div className={styles.contents_wrap} style={{ marginTop: 20 }}>
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
      label: t('유저그룹 역할부여'),
      format: 'array',
      value: [],
    },
  ],
  validator: {},
};

// 셀렉박스의 경우에 공통 코드 ?? 아니면 선택할 수 있는 셀렉 박스?
// const searchConfig: any = {
//   builders: [
//     [
//       {
//         name: 'companyName',
//         type: 'text',
//         label: t('회사이름'),
//         format: 'string',
//         value: '',
//       },
//       {
//         name: 'deptName',
//         type: 'text',
//         label: t('조직명'),
//         format: 'string',
//         value: '',
//       },
//       {
//         name: 'userName',
//         type: 'text',
//         label: t('이름'),
//         format: 'string',
//         value: '',
//       },
//     ],
//   ],
// };
//const chipListOptions: ChipListComponentProps = { options: new Array() };

const gridConfig = {
  query: roleManagerQueryOptions.getRoleUserList,
  columns: [],
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
  columnHelper.accessor('isInHouse', {
    // id: 'isInHouse',
    cell: (info) => (info.getValue() ? '사내' : '사외'),
    header: t('구분'),
    size: 60,
  }),
  columnHelper.accessor('companyName', {
    // id: 'companyName',
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 80,
  }),
  columnHelper.accessor('deptName', {
    // id: 'deptName',
    cell: (info) => info.getValue(),
    header: t('조직'),
    size: 90,
  }),
  columnHelper.accessor('userId', {
    // id: 'userId',
    cell: (info) => info.getValue(),
    header: t('사용자ID'),
    size: 60,
  }),
  columnHelper.accessor('userName', {
    // id: 'userName',
    cell: (info) => info.getValue(),
    header: t('이름'),
    size: 80,
  }),
  columnHelper.accessor('isUsed', {
    // id: 'isUsed',
    cell: (info) => (info.getValue() ? 'Y' : 'N'),
    header: t('사용여부'),
    size: 60,
  }),
  columnHelper.accessor('startDate', {
    // id: 'startDate',
    cell: (info) => getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATE),
    header: t('역할 시작일'),
    size: 140,
  }),
  columnHelper.accessor('endDate', {
    // id: 'endDate',
    cell: (info) => getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATE),
    header: t('역할 종료일'),
    size: 140,
  }),
  // columnHelper.accessor('9', {
  //   header: '데이터 접근 범위',
  //   size: 232,
  //   cell: (info) => {
  //     return (
  //       <>
  //         <Button
  //           onClick={() => {
  //             const rowData = info.row.original;
  //             // const currentApiList = getValues('apiMappingMenuList') || [];
  //             // const updatedApiList = currentApiList.filter(
  //             //   (item: any) => item.apiId !== rowData.apiId,
  //             // );
  //             // fetchData({ ...getValues(), apiMappingMenuList: updatedApiList });
  //           }}
  //           variant="gray2"
  //           size={'xs'}
  //           type={'button'}
  //         >
  //           회사
  //         </Button>
  //         <Button variant="gray2" size={'xs'} type={'button'}>
  //           채널
  //         </Button>
  //         <Button variant="gray2" size={'xs'} type={'button'}>
  //           팀
  //         </Button>
  //       </>
  //     );
  //   },
  // }),
];
