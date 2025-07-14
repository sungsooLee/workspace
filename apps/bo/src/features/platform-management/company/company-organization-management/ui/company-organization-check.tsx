import { SectionLayout } from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { TreeBox } from '@learnway/ui';

import { transformDepartmentApiDataToTreeData } from '@features/platform-management/company/company-organization-management/service/company-organization.service';

import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';
import { useGetCompanyHmgDepartmentTree } from '@entities/department/service/hmg-department.hook';
/**
 * 화면번호: NLP_BO_TMS_1111_02 테넌트-회사조직 확인
 * @returns
 */
const CompanyOrganizationCheckComponent = ({ companyCode }: { companyCode: string }) => {
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
      const transformedData = transformDepartmentApiDataToTreeData(
        departmentTreeData,
        t('러닝웨이 - 조직'),
      );
      setDeptTreeData(transformedData);
    }
  }, [departmentTreeData]);

  useEffect(() => {
    if (hmgDepartmentTreeData) {
      const transformedData = transformDepartmentApiDataToTreeData(
        hmgDepartmentTreeData,
        t('조직'),
      );
      setHmgDeptTreeData(transformedData);
    }
  }, [hmgDepartmentTreeData]);

  return (
    <SectionLayout contentsRatio={'half'}>
      <TreeBox
        data={hmgDeptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchLabel={t('조직')}
        showSearchKeyword
        initLevel={2}
        title={t('조직-원본')}
      />
      <TreeBox
        data={deptTreeData}
        treeId="1"
        type="SHUTTLE_LIST"
        showSearchLabel={t('조직')}
        showSearchKeyword
        initLevel={2}
        title={t('조직-플랫폼')}
      />
    </SectionLayout>
  );
};

export const CompanyOrganizationCheck = CompanyOrganizationCheckComponent;
