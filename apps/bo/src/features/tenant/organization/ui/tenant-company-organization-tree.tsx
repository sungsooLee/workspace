import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
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

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/service/company-detail-tree';
import { findOrganizationPathById } from '@features/tenant/organization/service/tenant-company-organization.service';
import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';
import { useGetCompanyHmgDepartmentTree } from '@entities/department/service/hmg-department.hook';
import { TenantCompanyOrganizationInfoList } from './tenant-company-organization-info-list';
import { TenantCompanyOrganizationUserList } from './tenant-company-organization-info-user';

import { EnFormMode } from '@types';
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

  const [companyDeparmentTree, setCompanyDepartmentTree] = useState<any>();
  const [deptTreeData, setDeptTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState<any>();
  const [formMode, setFormMode] = useState(EnFormMode.NONE);
  const [pathString, setPathString] = useState<string>();

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, control } =
    useDynamicForm(formConfig);

  const { data: departmentTreeData, refetch } = useGetCompanyDepartmentTree([companyCode]);
  const { data: hmgDepartmentTreeData } = useGetCompanyHmgDepartmentTree([companyCode]);

  const handleSelectedNodeChange = (node: any) => {
    if (node.key !== 'root' && node.parentKey !== 'root') {
      const location = findOrganizationPathById(deptTreeData, node.key);
      console.log('location', location, node);
      setPathString(location);
      setSelectedNode(node);
    }
  };
  const renderTabOrganizationContent = () => {
    return (
      <TenantCompanyOrganizationInfoList
        companyCode={companyCode}
        showType={showType}
        deptId={selectedNode?.deptId}
      />
    );
  };

  const renderTabUserContent = () => {
    return (
      <TenantCompanyOrganizationUserList companyCode={companyCode} deptId={selectedNode?.deptId} />
    );
  };

  useEffect(() => {
    if (showType === EnOrganizationShowType.platform && departmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(departmentTreeData);
      setDeptTreeData(transformedData);
    }
  }, [departmentTreeData]);

  useEffect(() => {
    if (showType === EnOrganizationShowType.origin && departmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(departmentTreeData);
      setDeptTreeData(transformedData);
    }
  }, [hmgDepartmentTreeData]);

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
  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={deptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchKeyword
        initLevel={2}
        title={showType === EnOrganizationShowType.origin ? t('조직-원본') : t('조직-플랫폼')}
        selectedNode={selectedNode}
        handleSelectedNodeChange={handleSelectedNodeChange}
      />
      {formMode !== EnFormMode.ADD && (
        <div className={cn(styles.start, styles.wrap)}>
          <div className={cn(layoutStyles.inner)}>
            <FormSubTitle
              label={t('조직 대상자')}
              titleNode={pathString}
              lineType={'light'}
            ></FormSubTitle>
            <div className={styles.contents_wrap}>
              <Tabs items={tabItems} type="round" size={'sm'} className={styles.tab_wrap} />
            </div>
          </div>
        </div>
      )}
      {/**추가 상태인 경우 입력 화면 적용 */}
      {formMode === EnFormMode.ADD && (
        <div className={cn(styles.start, styles.wrap)}>
          <div className={cn(layoutStyles.inner)}>
            <FormSubTitle
              label={t('조직 대상자')}
              titleNode={'현대자동차>경영지원본부'}
              lineType="light"
            ></FormSubTitle>
            <div className={styles.contents_wrap}>
              <form>
                <ContentsRow>
                  <FormRow provider={provider} name="c1" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c2" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c3" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c4" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c5" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c6" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c7" element={<Input disabled={true} />} />
                </ContentsRow>
                <ContentsRow>
                  <FormRow provider={provider} name="c8" />
                </ContentsRow>
              </form>
            </div>
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
      name: 'c1',
      type: 'text',
      label: t('위치'),
      value: '',
    },
    {
      name: 'c2',
      type: 'text',
      label: t('상위 조직명'),
      value: '',
      size: 10,
    },
    {
      name: 'c3',
      type: 'text',
      label: t('상위 조직코드'),
      value: '',
    },
    {
      name: 'c4',
      type: 'text',
      label: t('조직코드'),
      value: '',
    },
    {
      name: 'c5',
      type: 'text',
      label: t('조직명'),
      value: '',
    },
    {
      name: 'c6',
      type: 'custom',
      label: t('조직장 사번'),
      format: 'array',
      value: [],
    },
    {
      name: 'c7',
      type: 'text',
      label: t('조직장 이름'),
      value: '',
    },
    {
      name: 'c8',
      type: 'textarea',
      label: t('설명'),
      value: '',
      maxLength: 50,
    },
  ],
  validator: {
    c5: { required: true },
  },
};
