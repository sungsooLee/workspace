import { memo } from 'react';
import { Tenant, useFetchTenantByUser } from '../../../entities/tenant';
import { useFetchAuthUser } from '../../../entities/user';

import { Popover } from '@learnway/ui';

const PopoverContent = ({ data }: { data?: Tenant[] }) => {
  if (!data || !data?.length) {
    return <></>;
  }

  return (
    <div>
      {data.map((tenant: Tenant, idx: number) => {
        return (
          <li value={tenant.id} key={`TENANT${idx}`} onClick={() => console.log(tenant.id)}>
            {tenant.name}
          </li>
        );
      })}
    </div>
  );
};

const TenantComponent = () => {
  const { data } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(data?.accountId);
  console.log(tenants);
  if (!tenants) return;
  return <Popover popoverContent={<PopoverContent data={tenants} />}>{tenants[0]?.name}</Popover>;
};

export const Tenants = memo(TenantComponent);
