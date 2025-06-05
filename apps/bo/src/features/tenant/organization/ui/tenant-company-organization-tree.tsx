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
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { ContentsHistoryInfoFormField, FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';

import { isEqual } from 'lodash';

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/service/company-detail-tree';

import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';

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

  const { data: departmentTreeData, refetch } = useGetCompanyDepartmentTree(companyCode);

  const handleTreeAction = (events: any) => {
    switch (events.type) {
      case 'NODE_MOVE':
        break;
    }
  };

  const tabItems = [
    {
      title: '조직',
      key: EnTabKeys.organization,
      content: '조직',
    },
    {
      title: '유저',
      key: EnTabKeys.user,
      content: '유저',
    },
  ];

  useEffect(() => {
    if (departmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(departmentTreeData);
      setDeptTreeData(transformedData);
    }
  }, [departmentTreeData]);

  return (
    <SectionLayout contentsRatio={'thirty'}>
      <TreeBox
        data={deptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchKeyword
        initLevel={2}
        title={t('조직-원본')}
      />

      <div className={cn(styles.start, styles.wrap)}>
        <div className={cn(layoutStyles.inner)}>
          <FormSubTitle
            label={t('조직 대상자')}
            titleNode={'현대자동차>경영지원본부'}
            lineType={'light'}
          ></FormSubTitle>
          <div className={styles.contents_wrap}>
            <Tabs items={tabItems} type="round" size={'sm'} className={styles.tab_wrap} />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export const TenantCompanyOrganizationTree = TenantCompanyOrganizationTreeComponent;
