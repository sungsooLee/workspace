import { memo } from 'react';
import { Tenant } from '../../../entities/tenant';
import { Popover } from '@learnway/ui';

interface TenantsComponentProps {
  tenants: Tenant[];
  activeTenant: Tenant | null;
  onTenantSwitch: (tenant: Tenant) => void;
}

const PopoverContent = ({
  data,
  onTenantSelect,
}: {
  data?: Tenant[];
  onTenantSelect: (tenantId: Tenant) => void;
}) => {
  if (!data || !data?.length) {
    return null;
  }

  return (
    <div className="py-2">
      {data.map((tenant: Tenant, idx: number) => {
        return (
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            value={tenant.id}
            key={`TENANT${idx}`}
            onClick={() => onTenantSelect(tenant)}>
            {tenant.name}
          </li>
        );
      })}
    </div>
  );
};

const TenantComponent = ({ tenants, activeTenant, onTenantSwitch }: TenantsComponentProps) => {
  return (
    <Popover popoverContent={<PopoverContent data={tenants} onTenantSelect={onTenantSwitch} />}>
      <div className="min-w-[100px] cursor-pointer">{activeTenant?.name || '테넌트 선택'}</div>
    </Popover>
  );
};

export const Tenants = memo(TenantComponent);
