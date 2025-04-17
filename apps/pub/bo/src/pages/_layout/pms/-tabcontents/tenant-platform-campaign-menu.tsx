import { FC } from 'react';
import { SectionLayout } from '../../-components/section-layout';

/* contents */
import { BannerList } from '../-contents/banner-list';
import { BannerInfo } from '../-contents/banner-info';

const TenantPlatformCampaignMenuComponent: FC<{}> = ({}) => {
  return (
    <SectionLayout>
      <BannerList />
      <BannerInfo />
    </SectionLayout>
  );
};

TenantPlatformCampaignMenuComponent.displayName = 'TenantPlatformCampaignMenu';
export const TenantPlatformCampaignMenu = TenantPlatformCampaignMenuComponent;
