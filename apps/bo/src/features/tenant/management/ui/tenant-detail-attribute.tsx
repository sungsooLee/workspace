import { FC, useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { useRouterState } from '@tanstack/react-router';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';
import { TenantDetailAttributeCompany } from './tenant-detail-attribute-company';
/** Hook 정의 */
import { useTenantAttributeCompany } from '@entities/tenant/service/tenant-attribute.hook';

const TenantDetailAttributeComponent = (props: any, ref: any) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const [companyTabItem, setCompaynTabItem] = useState<any>([]);
  const [attributeRawData, setAttributeRawData] = useState<any>();

  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId;
  const tenantName = routerState.location.state?.tenantName;

  const formRef = useRef(null);
  const { data, refetch } = useTenantAttributeCompany(tenantId);

  useImperativeHandle(ref, () => ({
    saveData() {
      const form: any = formRef.current;
      if (form) {
        form.saveData();
      }
    },
    clearForm() {
      const form: any = formRef.current;
      if (form) {
        form.clearForm();
      }
    },
  }));
  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  const handleOnUpdateComplate = () => {
    refetch();
  };

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
        onUpdateComplete={handleOnUpdateComplate}
        ref={formRef}
      />
    );
  };

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
      if (selectedTabKey) {
        setSelectedTabKey(`tab_${companyId}`);
      }
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

export const TenantDetailAttribute = forwardRef(TenantDetailAttributeComponent);
