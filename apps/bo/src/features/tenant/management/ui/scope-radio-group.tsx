import { forwardRef } from 'react';
import { RadioGroup } from '@learnway/ui';
import { EnFormMode, EnTenantScope, EnCompanyScope, EnChannelScope, EnDeptScope } from '@types';

export const ScopeRadioGroup = forwardRef<HTMLDivElement, any>(
  ({ value, name, onChange, options, ...props }, ref) => {
    //직접 선택 값 확인...(개선 필요해보임)
    const isDirect =
      (name === 'companyScope' && value === EnCompanyScope.MANUAL) ||
      (name === 'channelScope' && value === EnChannelScope.MANUAL) ||
      (name === 'deptScope' && value === EnDeptScope.MANUAL);
    const renderSelectionComponent = () => {
      if (!isDirect) return null;

      switch (name) {
        case 'companyScope':
          return <>회사 선택 컴포넌트</>;
        case 'channelScope':
          return <>채널 선택 컴포넌트</>;
        case 'deptScope':
          return <>팀 선택 컴포넌트</>;
      }
    };

    return (
      <div
        className="flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <RadioGroup
          ref={ref}
          value={value}
          name={name}
          defaultValue={value}
          onValueChange={onChange}
          options={options.map((item: any) => ({ value: item.value, label: item.label }))}
          {...props}
        />
        <div>{renderSelectionComponent()}</div>
      </div>
    );
  },
);
