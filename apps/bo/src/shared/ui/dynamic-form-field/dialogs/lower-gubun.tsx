import { FC, useMemo } from 'react';
import { FormRadioGroup, Input } from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';

const LowerGubunComponent: FC<any> = ({ name, value, onChange }) => {
  const urlDisabled = useMemo<boolean>(() => value.gubun !== '02', [value]);
  return (
    <div style={{ display: 'flex' }}>
      <FormRadioGroup
        value={value.gubun}
        options={[
          {
            value: '01',
            label: '사내',
          },
          {
            value: '02',
            label: '사외',
          },
        ]}
        onChange={(newValue: any) =>
          onChange({
            ...value,
            gubun: newValue,
            select: [],
            url: '',
          })
        }
      />
      (
      <FormCheckboxGroup
        disabled={urlDisabled}
        value={value.select}
        options={[
          {
            value: '01',
            label: '사내',
          },
          {
            value: '02',
            label: '사외',
          },
        ]}
        onChange={(newValue: any) =>
          onChange({
            ...value,
            select: newValue,
          })
        }
      />
      <Input
        value={value.url}
        disabled={urlDisabled}
        onChange={(newValue: any) =>
          onChange({
            ...value,
            url: newValue,
          })
        }
      />
      )
    </div>
  );
};

export const LowerGubun = LowerGubunComponent;
