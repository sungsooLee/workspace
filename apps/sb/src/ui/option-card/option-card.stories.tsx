// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { OptionCard, OptionCardItem } from '@learnway/ui';
import { IcoBuilding01 } from '@learnway/icons';

const dummy = Array(5)
  .fill(null)
  .map((d, i) => ({
    value: `value${i}`,
    label: `label${i}`,
    description: `description${i}`,
    icon: <IcoBuilding01 width={48} height={48} stroke="#131C30" />,
  }));

const dummyOptions = dummy.map(({ value, label, icon }) => ({ value, label, icon }));
const dummyDesc = dummy.map(({ value, label, icon, description }) => ({
  value,
  label,
  icon,
  description,
}));
const dummyLabel = dummy.map(({ value, label }) => ({ value, label }));

export default {
  title: 'Components/OptionCard',
  component: OptionCard,
  tags: ['autodocs'],
  args: {
    onOptionSelect: () => null,
    onOptionsSelect: () => null,
  },
  // args: {
  // variant: 'primary',
  // },
} as Meta;

// Value Control
export const Template: any = (args: any) => {
  const [value, setValue] = useState();
  console.log(value);
  return (
    <OptionCard
      {...args}
      options={dummyOptions}
      value={value}
      onOptionSelect={(option: OptionCardItem) => setValue(option.value)}
    />
  );
};
Template.storyName = 'Option Card';

// description
export const TemplateDesc: any = (args: any) => {
  return (
    <OptionCard {...args} options={dummyDesc} onOptionSelect={(option) => console.log(option)} />
  );
};
TemplateDesc.storyName = 'description';

// only label
export const TemplateOnlyLabel: any = (args: any) => {
  return (
    <OptionCard {...args} options={dummyLabel} onOptionSelect={(option) => console.log(option)} />
  );
};
TemplateOnlyLabel.storyName = 'only label';

// Multiple
export const TemplateMultiple: any = (args: any) => {
  const [values, setValues] = useState<string[]>();
  console.log(values);
  return (
    <OptionCard
      {...args}
      value={values}
      options={dummyOptions}
      multiple
      onOptionsSelect={(options: OptionCardItem[]) =>
        setValues(options.map((d: OptionCardItem) => d.value))
      }
    />
  );
};
TemplateMultiple.storyName = 'Multiple';
