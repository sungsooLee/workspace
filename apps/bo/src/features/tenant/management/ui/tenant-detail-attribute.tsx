import { FC, useState, useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';
import { TenantDetailAttributeCompany } from './tenant-detail-attribute-company';
/** Hook 정의 */
import { useTenantAttributeCompany } from '@entities/tenant/service/tenant-attribute.hook';

const TenantDetailAttributeComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const [companyTabItem, setCompaynTabItem] = useState<any>([]);
  const [attributeRawData, setAttributeRawData] = useState<any>();

  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const renderTabContent = (companyId: string) => {
    console.log('companyId', companyId);
    if (!attributeRawData || !attributeRawData.companyTenantList) return '';
    const attributeData = attributeRawData.companyTenantList.find(
      (i: any) => i.companyId == companyId,
    );
    console.log('attributeData', attributeData);
    return (
      <TenantDetailAttributeCompany
        tenantId={tenantId}
        attributeData={attributeData}
        companyId={companyId}
        tenantName={tenantName}
      />
    );
  };
  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const { data } = useTenantAttributeCompany(tenantId);

  useEffect(() => {
    if (data) {
      setAttributeRawData(data);
    }
  }, [data]);

  useEffect(() => {
    if (attributeRawData) {
      let companyId: any = null;
      const tabItems = attributeRawData.companyTenantList.map((item: any) => {
        if (!companyId) companyId = item.companyId;
        return {
          title: item.companyName,
          key: `tab_${item.companyId}`,
          content: renderTabContent(`${item.companyId}`),
        };
      });
      setCompaynTabItem(tabItems);
      setSelectedTabKey(`tab_${companyId}`);
    }
  }, [attributeRawData]);

  return (
    <Tabs
      items={companyTabItem}
      type="line"
      size={'sm'}
      className={styles.tab_wrap}
      selectedTabKey={selectedTabKey}
      onTabChange={handleTabChange}
    />
  );
};

export const TenantDetailAttribute = TenantDetailAttributeComponent;
