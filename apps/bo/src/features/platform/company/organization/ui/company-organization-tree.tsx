import React, { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

import styles from '@learnway/styles/bo/features/role/role-info.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  Input,
  RadioGroupFormField,
  TextareaFormField,
  TreeBox,
  Tabs,
  TreeType,
  TreeNode,
  useModal,
} from '@learnway/ui';
import {
  useSearchBox,
  SearchBoxConfig,
  CODE_GROUP,
  useDynamicForm,
  DynamicFormConfig,
} from '@learnway/hooks';

import { ContentsHistoryInfoFormField, FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';

import { isEqual } from 'lodash';

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/organization/service/company-organization.service';
import { findOrganizationPathById } from '@features/platform/company';

import {
  useGetCompanyDepartmentDetail,
  useGetCompanyHmgDepartmentTree,
  useGetCompanyDepartmentTree,
  useCreateDepartment,
  useUpdateDepartment,
  DepartmentService,
  useDeleteDepartment,
} from '@entities/department';

import { CompanyOrganizationInfoList } from './company-organization-info-list';
import { CompanyOrganizationUserList } from './company-organization-info-user';

import { EnFormMode } from '@types';
import { DuplicateState, DuplicateCheckInputFormField } from '@features/form';
import { UserChoiceModal } from '@features/shared';
import CompaniesService from '@entities/companies/api/companies';
export enum EnOrganizationShowType {
  check = 'check',
  origin = 'origin',
  platform = 'platform',
}
enum EnTabKeys {
  organization = 'organization',
  user = 'user',
}
/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직
 * @returns
 */
const TenantCompanyOrganizationTreeComponent = ({
  companyCode,
  showType,
}: {
  companyCode: string;
  showType: string;
}) => {
  const router = useRouter();
  const { confirm: openConfirm, alert: openAlert } = useModal();

  const [deptTreeData, setDeptTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState<any>();
  const [viewNode, setViewNode] = useState<any>();

  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [pathString, setPathString] = useState<string>();
  const [disableEditing, setDisableEditing] = useState(false);
  const [company, setCompany] = useState<any>();

  const { provider, fetchData, onSubmit, onFormChange, getValues, getInitByBuilders, control } =
    useDynamicForm(formConfig);

  const { data: departmentTreeData, refetch } = useGetCompanyDepartmentTree(
    showType === EnOrganizationShowType.platform ? [companyCode] : [],
  );
  const { data: hmgDepartmentTreeData } = useGetCompanyHmgDepartmentTree(
    showType === EnOrganizationShowType.origin ? [companyCode] : [],
  );
  const { data: departmentData } = useGetCompanyDepartmentDetail(viewNode?.key);

  const { create: createDepartment } = useCreateDepartment({
    onSuccess: () => {
      openAlert({
        title: t('저장되었습니다.'),
        onClose: () => {
          refetch();
        },
      });
    },
  });
  const { update: updateDepartment } = useUpdateDepartment({
    onSuccess: () => {
      openAlert({
        title: t('저장되었습니다.'),
        onClose: () => {
          refetch();
        },
      });
    },
  });
  const { delete: deleteDepartment } = useDeleteDepartment({
    onSuccess: () => {
      openAlert({
        title: t('삭제되었습니다.'),
        onClose: () => {
          setFormMode(EnFormMode.EMPTY);
          refetch();
          fetchData(getInitByBuilders());
        },
      });
    },
  });

  const watchedDepartment = useWatch({
    control: control,
    name: 'managerEmployeeNumber',
  });

  const handleSelectedNodeChange = (node: any) => {
    console.log('##### handleSelectedNodeChange', node);
    if (node.key !== 'root' && node.parentKey !== 'root') {
      const location = findOrganizationPathById(deptTreeData, node.key);
      setPathString(location);
      setSelectedNode(undefined);
      setViewNode(node);
      setFormMode(EnFormMode.VIEW);
    }
  };

  const handleNodeCustomButton = (node: TreeNode, level: number) => {
    setSelectedNode(node);
    setViewNode(null);
    setFormMode(EnFormMode.NONE);
  };

  const handleAppendSubOrganization = (node: TreeNode, level: number) => {
    console.log('### node', node);
    const initdata = getInitByBuilders();
    initdata.deptLoc = findOrganizationPathById(deptTreeData, node.key);
    initdata.parentName = node.title;
    initdata.parentDeptCode = node.deptCode ?? '';
    initdata.deptName = {
      fieldValue: '',
      checkState: DuplicateState.needInput,
    };
    initdata.parentDeptId = node.deptId ? node.deptId.toString() : '';
    console.log('### initdata', initdata);
    fetchData(initdata);
    setSelectedNode(node);
    setViewNode(null);
    setFormMode(EnFormMode.ADD);
  };

  const duplicateDeptNameCheck = async (deptName: string) => {
    const payload: any = { deptName: deptName };
    if (formMode === EnFormMode.VIEW) payload.deptId = getValues().deptId;
    const result: boolean = await DepartmentService.existDepartmentName(payload);

    if (result) return DuplicateState.duplicated;
    else return DuplicateState.ok;
  };

  const renderTabOrganizationContent = () => {
    return (
      <CompanyOrganizationInfoList
        companyCode={companyCode}
        showType={showType}
        deptId={selectedNode?.deptId}
        companyHrInfoManageType={company?.hrInfoManageType}
      />
    );
  };

  const renderTabUserContent = () => {
    return (
      <CompanyOrganizationUserList
        companyCode={companyCode}
        deptId={selectedNode?.deptId}
        showType={showType}
      />
    );
  };

  useEffect(() => {
    // 부서 수정/삭제 시 회사의 인사 데이터 수동 관리 유형을 확인하기 위해 조회
    const init = async () => {
      const data: any[] = await CompaniesService.fetch(companyCode);
      setCompany({ ...data });
    };
    init();
  }, []);

  useEffect(() => {
    if (viewNode) {
      const location = findOrganizationPathById(deptTreeData, viewNode.key);
      setPathString(location);
    }
    if (selectedNode) {
      const location = findOrganizationPathById(deptTreeData, selectedNode.key);
      setPathString(location);
    }
  }, [viewNode, selectedNode]);

  useEffect(() => {
    if (showType === EnOrganizationShowType.platform && departmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(
        departmentTreeData,
        t('러닝웨이 - 조직'),
      );
      setDeptTreeData(transformedData);
      if (transformedData?.length > 0) {
        const root = transformedData[0];
        const company = root?.children[0];
        setSelectedNode(company);
      }
    }
  }, [departmentTreeData]);

  useEffect(() => {
    if (showType === EnOrganizationShowType.origin && hmgDepartmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(
        hmgDepartmentTreeData,
        t('조직'),
      );
      setDeptTreeData(transformedData);
      if (transformedData?.length > 0) {
        const root = transformedData[0];
        const company = root?.children[0];
        setSelectedNode(company);
      }
    }
  }, [hmgDepartmentTreeData]);

  useEffect(() => {
    if (departmentData) {
      console.log('### departmentData', departmentData);
      const parentDept = departmentData.parentDeptList.find(
        (item: any) => item.deptId === departmentData.parentDeptId,
      );
      console.log('### parentDept', parentDept);
      const managerEmployeeNumber = [];
      if (departmentData.managerEmployeeNumber && departmentData.managerEmployeeNumberUuid) {
        managerEmployeeNumber.push({
          employeeNumber: departmentData.managerEmployeeNumber,
          uuid: departmentData.managerEmployeeNumberUuid,
          name: departmentData.managerName,
        });
      }

      const data = {
        ...departmentData,
        deptLoc: findOrganizationPathById(deptTreeData, departmentData.deptId.toString()),
        managerEmployeeNumber: managerEmployeeNumber,
        deptName: {
          fieldValue: departmentData.deptName,
          checkState: DuplicateState.okStart,
        },
        parentName: parentDept?.deptName ?? '',
        parentDeptCode: parentDept?.deptCode ?? '',
        deptId: departmentData.deptId.toString(),
        parentDeptId: departmentData.parentDeptId ? departmentData.parentDeptId.toString() : '',
        deptDesc: departmentData.deptDesc ?? '',
      };
      console.log('### fetchData', data);
      fetchData(data);
      setDisableEditing(
        company.hrInfoManageType === 'AUTO_MANAGE' ||
          departmentData.hrInfoManageType === 'AUTO_MANAGE',
      );
      console.log('### company', company);
      console.log('#### company.hrInfoManageType', company.hrInfoManageType);
      console.log('#### departmentData.hrInfoManageType', departmentData.hrInfoManageType);
    }
  }, [departmentData]);

  useEffect(() => {
    const selectManagerEmployeeNumber = watchedDepartment;
    if (selectManagerEmployeeNumber.length > 0) {
      console.log('#### selectManagerEmployeeNumber', selectManagerEmployeeNumber);
      onFormChange({
        managerName: selectManagerEmployeeNumber[0].name,
      });
    } else {
      onFormChange({ managerName: '' });
    }
  }, [watchedDepartment]);

  const tabItems = [
    {
      title: t('조직'),
      key: EnTabKeys.organization,
      content: renderTabOrganizationContent(),
    },
    {
      title: t('유저'),
      key: EnTabKeys.user,
      content: renderTabUserContent(),
    },
  ];

  const handleOnSubmit = async (data: any) => {
    console.log('### handleOnSubmit', data);
    const payload: any = {
      companyCode: companyCode,
      parentDeptId: data.parentDeptId,
      sortOrder: 1,
      managerEmployeeNumberUuid: data.managerEmployeeNumber[0]?.uuid,
      deptName: data.deptName.fieldValue,
      deptDesc: data.deptDesc,
    };
    if (formMode === EnFormMode.ADD) {
      if (await openConfirm('저장 하시겠습니까?')) {
        createDepartment(payload);
      }
    } else if (formMode === EnFormMode.VIEW) {
      if (await openConfirm('저장 하시겠습니까?')) {
        payload.deptId = data.deptId;
        updateDepartment(payload);
      }
    }
  };

  const handleDeleteDeparment = async () => {
    const deptId = getValues().deptId;
    if (deptId && formMode === EnFormMode.VIEW) {
      if (await openConfirm('삭제 하시겠습니까?')) {
        const payload = {
          companyCode: companyCode,
          deptIdList: [deptId],
        };
        deleteDepartment(payload);
      }
    }
  };

  const renderTreeCustomButtonNode = (node: TreeNode, level: number) => {
    if (level === 0) return;

    if (showType === EnOrganizationShowType.origin) {
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              onClick={(e) => {
                handleNodeCustomButton(node, level);
              }}
              variant={node?.key === selectedNode?.key ? 'primary' : 'gray2'}
              size="xs"
              type="button"
              label={t('선택')}
            />
          </div>
        </div>
      );
    } else if (showType === EnOrganizationShowType.platform) {
      return (
        <div className={'gap-10px flex'}>
          <div className={'flex items-center'}>
            <Button
              label={t('하위 조직 추가')}
              variant={
                node?.key === selectedNode?.key && formMode === EnFormMode.ADD ? 'primary' : 'gray2'
              }
              size="xs"
              type="button"
              stopPropagation
              onClick={(e) => {
                handleAppendSubOrganization(node, level);
              }}
            />
            <Button
              label={t('선택')}
              variant={
                node?.key === selectedNode?.key && formMode === EnFormMode.NONE
                  ? 'primary'
                  : 'gray2'
              }
              size="xs"
              type="button"
              stopPropagation
              onClick={(e) => {
                handleNodeCustomButton(node, level);
              }}
            />
          </div>
        </div>
      );
    }
  };
  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={deptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchKeyword
        initLevel={2}
        title={showType === EnOrganizationShowType.origin ? t('조직-원본') : t('조직-플랫폼')}
        selectedNode={viewNode}
        handleSelectedNodeChange={handleSelectedNodeChange}
        renderNodeButtons={renderTreeCustomButtonNode}
      />
      {formMode === EnFormMode.NONE && (
        <div className={cn(styles.start, styles.wrap)}>
          <div className={cn(layoutStyles.inner)}>
            <FormSubTitle
              label={t('조직 대상자')}
              titleNode={pathString}
              lineType="light"
            ></FormSubTitle>
            <div className={styles.contents_wrap}>
              <Tabs items={tabItems} type="round" size="sm" className={styles.tab_wrap} />
            </div>
          </div>
        </div>
      )}
      {/**추가 상태인 경우 입력 화면 적용 */}
      {formMode !== EnFormMode.NONE && (
        <div className={cn(styles.start, styles.wrap)}>
          <div className={cn(layoutStyles.inner)}>
            <form onSubmit={onSubmit(handleOnSubmit)}>
              <FormSubTitle
                label={t('조직 대상자')}
                titleNode={pathString}
                lineType="light"
                actionNode={
                  <>
                    <Button
                      label={t('초기화')}
                      variant={'text'}
                      size={'sm'}
                      disabled={formMode === EnFormMode.EMPTY || disableEditing}
                      onClick={() => onFormChange()}
                    />
                    <Button
                      label={t('삭제')}
                      variant={'text'}
                      size={'sm'}
                      disabled={
                        formMode === EnFormMode.ADD ||
                        formMode === EnFormMode.EMPTY ||
                        disableEditing
                      }
                      onClick={() => handleDeleteDeparment()}
                    />
                    <Button
                      type="submit"
                      label={t('저장')}
                      variant={'save'}
                      size={'sm'}
                      disabled={formMode === EnFormMode.EMPTY || disableEditing}
                    />
                  </>
                }
              ></FormSubTitle>
              <div className={styles.contents_wrap}>
                <ContentsRow>
                  <FormRow provider={provider} name="deptLoc" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="parentName"
                    element={<Input disabled={true} />}
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="parentDeptCode"
                    element={<Input disabled={true} />}
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="deptCode"
                    element={<Input disabled={true} />}
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="deptName"
                    element={
                      <DuplicateCheckInputFormField
                        onDuplicationCheck={duplicateDeptNameCheck}
                        disabled={formMode === EnFormMode.EMPTY}
                      />
                    }
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="managerEmployeeNumber"
                    element={
                      <ChipListModalSelectorFormField
                        chipList={{
                          labelField: 'employeeNumber',
                          valueField: 'uuid',
                          hideBorder: true,
                          visibleCount: 1,
                        }}
                        modalConfig={{
                          title: '',
                          width: 'xl',
                          content: <UserChoiceModal />,
                        }}
                        selectOnlyOne
                        disabled={formMode === EnFormMode.EMPTY}
                      />
                    }
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="managerName"
                    element={<Input disabled={true} />}
                  />
                </ContentsRow>
                <ContentsRow>
                  <FormRow
                    provider={provider}
                    name="deptDesc"
                    element={
                      <TextareaFormField resize={'none'} disabled={formMode === EnFormMode.EMPTY} />
                    }
                  />
                </ContentsRow>
                {formMode === EnFormMode.VIEW && <ContentsHistoryInfoFormField />}
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};

export const TenantCompanyOrganizationTree = TenantCompanyOrganizationTreeComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'deptLoc',
      type: 'text',
      label: t('위치'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'parentName',
      type: 'text',
      label: t('상위 조직명'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'parentDeptCode',
      type: 'text',
      label: t('상위 조직코드'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'deptCode',
      type: 'text',
      label: t('조직코드'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'deptName',
      type: 'custom',
      label: t('조직명'),
      value: { fieldValue: '', checkState: DuplicateState.needInput },
      format: 'object',
      maxLength: 20,
      placeholder: ' ',
    },
    {
      name: 'managerEmployeeNumber',
      type: 'custom',
      label: t('조직장 사번'),
      format: 'array',
      value: [],
    },
    {
      name: 'managerName',
      type: 'text',
      label: t('조직장 이름'),
      value: '',
      placeholder: ' ',
    },
    {
      name: 'deptDesc',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 50,
      placeholder: ' ',
    },
    { name: 'deptId', type: 'hidden', label: '', value: '' },
    { name: 'parentDeptId', type: 'hidden', label: '', value: '' },
  ],
  validator: {
    deptName: {
      format: 'object',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.deptName.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('조직명') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.deptName.checkState === DuplicateState.check ||
            values.deptName.checkState === DuplicateState.needInput,
          message: t('LABEL.form.validation.check', { code: t('조직명') }),
        },
        {
          fn: (values: Record<string, any>) =>
            values.deptName.checkState === DuplicateState.duplicated,
          message: t('LABEL.form.validation.duplicated', { code: t('조직명') }),
        },
      ],
    },
  },
};
