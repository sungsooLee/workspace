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

import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';
import { useGetCompanyHmgDepartmentTree } from '@entities/department/service/hmg-department.hook';
/**
 * 화면번호: NLP_BO_TMS_1111_02 테넌트-회사조직 확인
 * @returns
 */
const TenantCompanyOrganizationCheckComponent = ({ companyCode }: { companyCode: string }) => {
  const router = useRouter();

  const [deptTreeData, setDeptTreeData] = useState([]);
  const [hmgDeptTreeData, setHmgDeptTreeData] = useState([]);

  const { data: departmentTreeData, refetch } = useGetCompanyDepartmentTree([companyCode]);
  const { data: hmgDepartmentTreeData } = useGetCompanyHmgDepartmentTree([companyCode]);

  const handleTreeAction = (events: any) => {
    switch (events.type) {
      case 'NODE_MOVE':
        break;
    }
  };

  useEffect(() => {
    if (departmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(departmentTreeData);
      setDeptTreeData(transformedData);
    }
  }, [departmentTreeData]);

  useEffect(() => {
    if (hmgDepartmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(hmgDepartmentTreeData);
      setHmgDeptTreeData(transformedData);
    }
  }, [hmgDepartmentTreeData]);

  return (
    <SectionLayout contentsRatio={'half'}>
      <TreeBox
        data={hmgDeptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchKeyword
        initLevel={2}
        title={t('조직-원본')}
      />
      <TreeBox
        data={deptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchKeyword
        initLevel={2}
        title={t('조직-플랫폼')}
      />
    </SectionLayout>
  );
};

export const TenantCompanyOrganizationCheck = TenantCompanyOrganizationCheckComponent;
