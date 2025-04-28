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

  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId || '1';

  const renderTabContent = (companyId: string) => {
    return <TenantDetailAttributeCompany tenantId={tenantId} companyId={companyId} />;
  };
  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const { data } = useTenantAttributeCompany(tenantId);

  useEffect(() => {
    if (data) {
      const tabItems = [];
      let tabNo = 1;
      tabItems.push({
        title: '현대자동차',
        key: 'tab' + tabNo,
        content: renderTabContent('companyId'),
      });
      tabNo++;
      tabItems.push({
        title: '기아자동차',
        key: 'tab' + tabNo,
        content: renderTabContent('companyId'),
      });
      setCompaynTabItem(tabItems);
      setSelectedTabKey('tab1');
    }
  }, [data]);

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
