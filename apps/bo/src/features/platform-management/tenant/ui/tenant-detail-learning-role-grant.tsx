import { useSaveRoleUserGroups, useSaveUsers } from '@entities/role';
import { useFetchRoleTree } from '@entities/role/service/role-manage.hook';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';
import { transformRoleApiDataToTreeData } from '@features/platform-management/tenant/service/tenant-detail-tree.service';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Dropdown,
  FormSubTitle,
  GridBox,
  Input,
  TreeBox,
  TreeContainer,
  TreeNode,
  useGridBox,
  useModal, useToast,
} from '@learnway/ui';
import { FormRow, SectionLayout, UserGroupTabsChoiceModal } from '@shared/ui';
import { useRouterState } from '@tanstack/react-router';
import { createColumnHelper, Table } from '@tanstack/react-table';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';
import { TenantDetailLearningRoleGrantRangeModal } from './tenant-detail-learning-role-grant-range-modal';
import { TenantDetailLearningRoleGrantUserShuttleModal } from './tenant-detail-learning-role-grant-user-shuttle-modal';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import RoleManagerService from '@entities/role/api/role-manager';

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
  const { open: openModal, alert, confirm: openConfirm } = useModal();
  const { open: openToast } = useToast();

  const userGroupRef = useRef<any>(null);

  const [roleTree, setRoleTree] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [formMode, setFormMode] = useState<EnFormMode>(EnFormMode.NONE);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isRoleUserGroup, setIsRoleUserGroup] = useState<boolean>(true);

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

  const { provider, onSubmit, clearFormError, updateFormData, onFormChange, getValues, formState, watch } =
    useDynamicForm(formConfig());
  const { config, gridFetch } = useGridBox(gridConfig, getGridParams);
  const userGroupWatch = useWatch({ control: provider.control, name: 'userGroup' });

  const { data: roleData } = useFetchRoleTree(tenantId, siteScope);
  const { saveUsersRole: saveRoleUsers } = useSaveUsers({});
  const { saveRoleUserGroups } = useSaveRoleUserGroups({})

  const handleOnSearch = () => {
    if (formMode === EnFormMode.VIEW) {
      gridFetch(getGridParams());
    }
  };

  const handleRoleSelect = async (node: TreeNode) => {
    if (node.key !== 'root') {
      setSelectedRole(node);
      //검색 영역 초기회
      setSearchKeyword('');
      setSearchColumn('');
      gridFetch({ roleId: node.roleId });
      setFormMode(EnFormMode.VIEW);

      const userGroupData = await RoleManagerService.fetchRoleUserGroups(node.roleId);

      const newValue = getValues();
      newValue.userGroup = userGroupData;
      userGroupRef.current = newValue;
      updateFormData(newValue);
    }
  };
  const handleUserAddButtonClick = async () => {
    if (selectedRole) {
      const data = await openModal({
        content: <TenantDetailLearningRoleGrantUserShuttleModal roleId={selectedRole.roleId} />,
        width: 'xl',
        height: 'fix',
      });
      handleOnSearch();
    } else {
      alert(t('역할을 선택하세요.'));
    }
  };

  const handleBatchClick = async () => {
    const batchRows = tableInstance?.getSelectedRowModel().rows.map((item: any) => item.original);
    if (batchRows && batchRows.length > 0) {
      const data = await openModal({
        width: 'xl',
        height: 'fix',
        content: (
          <TenantDetailLearningRoleGrantRangeModal
            roleId={selectedRole.roleId}
            userList={batchRows}
          />
        ),
      });
      handleOnSearch();
    } else {
      alert('사용자를 선택하세요.');
    }
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
    if( selectedRole && userGroupWatch ) {
      if( userGroupWatch.length > 0 ) setIsRoleUserGroup(false);
      else setIsRoleUserGroup(true);
      const sortingArrayByGroupId = (arr: any[]) => [...arr].sort( (x, y) => x.groupId - y.groupId);
      const isEqual =
        JSON.stringify(sortingArrayByGroupId(userGroupRef.current.userGroup)) === JSON.stringify(sortingArrayByGroupId(userGroupWatch));
      if( !isEqual ) {
        const payload = {
          roleId: selectedRole?.roleId,
          body: {
            groups: userGroupWatch,
          }
        }
        console.log('payload => ', payload);
        saveRoleUserGroups(payload, {
          onSuccess: () => {
            openToast({ title: '유저그룹 역할부여 추가 했습니다.', type: 'success', });
          }
        })
      }
    }
  }, [userGroupWatch])

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
        <FormSubTitle label={t('역할 정보')} lineType="dark" />
        <div className={styles.contents_wrap}>
          <div className={formStyles.form_item}>
            <label htmlFor="name-id" className={formStyles.form_label} style={{ marginBottom: 20 }}>
              <span className={formStyles.form_text}>{t('개별사용자 역할부여')}</span>
            </label>
            <GridBox
              config={config}
              columns={columns()}
              title={t('사용자 목록')}
              showTotalCount
              multiple
              showNumberingColumn
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
              onRowSelect={(row) => {
                if (row) {
                  setIsDisabled(true);
                } else {
                  setIsDisabled(false);
                }
              }}
              customButtonNode={
                <>
                  <Dropdown
                    value={searchColumn}
                    options={[
                      { label: t('선택'), value: '' },
                      { label: t('회사'), value: 'companyName' },
                      { label: t('조직'), value: 'deptName' },
                      { label: t('사번'), value: 'employeeNumber' },
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
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
                    label={t('LABEL.grid.header.add', '추가')}
                    onClick={handleUserAddButtonClick}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    label={t('LABEL.grid.header.remove', '삭제')}
                    icon={<IcoMinus width={16} height={16} stroke={'#131C30'} />}
                    disabled={!isDisabled}
                    onClick={(e) => {
                      openConfirm({
                        title: t('삭제'),
                        content: t('선택한 정보는 삭제됩니다.'),
                        onClose: handleDeleteButtonClick
                      });
                    }}
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
                          labelField: 'pathValue',
                          valueField: 'pathKey',
                          wordwrap: true,
                        }}
                        modalConfig={{
                          title: '',
                          width: 'xl',
                          height: 'fix',
                          content: <UserGroupTabsChoiceModal tenantIds={[tenantId]} />,
                        }}
                        actionNode={
                          <Button
                            variant="text"
                            label={t('대상자')}
                            disabled={isRoleUserGroup}
                          />
                        }
                      />
                    }
                  />
                </ContentsRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
export const TenantDetailLearningRoleGrant = forwardRef(TenantDetailLearningRoleGrantComponent);
const formConfig = (): DynamicFormConfig => ({
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
});

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
const columns = () => [
  columnHelper.accessor('companyName', {
    // id: 'companyName',
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 80,
    meta: { sortKey: 'userEntity.companyEntity.name' },
  }),
  columnHelper.accessor('deptName', {
    // id: 'deptName',
    cell: (info) => info.getValue(),
    header: t('조직'),
    size: 90,
    meta: { sortKey: 'userEntity.deptEntity.deptName' },
  }),
  columnHelper.accessor('employeeNumber', {
    // id: 'userId',
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 60,
    meta: { sortKey: 'userEntity.employeeNumber' },
  }),
  columnHelper.accessor('userName', {
    // id: 'userName',
    cell: (info) => info.getValue(),
    header: t('이름'),
    size: 80,
    meta: { sortKey: 'userEntity.name' },
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
];
