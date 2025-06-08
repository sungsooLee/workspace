// BaseForm.stories.tsx
import React, { useMemo, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button, OptionCard, OptionCardItem } from '@learnway/ui';
import { IcoBuilding01 } from '@learnway/icons';
import { getRandomId } from '@learnway/shared';

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
  title: 'Bo-Components/OptionCard',
  component: OptionCard,
  tags: ['autodocs'],
  args: {
    onOptionSelect: () => null,
    onOptionsSelect: () => null,
  },
  // includeStories: [''],

  // args: {
  // variant: 'primary',
  // },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta;

// description
export const TemplateDesc: any = (args: any) => {
  const [value, setValue] = useState('value0');

  return (
    <OptionCard
      {...args}
      options={dummyDesc}
      value={value}
      onOptionSelect={(option: OptionCardItem) => setValue(option.value)}
    />
  );
};
TemplateDesc.storyName = 'Single Select Option';

// Multiple
export const TemplateMultiple: any = (args: any) => {
  const [values, setValues] = useState<string[]>();
  console.log(values);
  return (
    <OptionCard
      {...args}
      value={values}
      options={dummyDesc}
      multiple
      onOptionsSelect={(options: OptionCardItem[]) =>
        setValues(options.map((d: OptionCardItem) => d.value))
      }
    />
  );
};
TemplateMultiple.storyName = 'Multiple';

// 커스텀 노드
// export const TemplateCustom: any = (args: any) => {
//   const [value, setValue] = useState<string>();
//   const options = useMemo(
//     () =>
//       Array(5)
//         .fill(null)
//         .map((d, i) => ({
//           label: `label${i}`,
//           value: `value${i}`,
//           original: {
//             id: getRandomId(),
//             path: `https://ssss`,
//           },
//         })),
//     [],
//   );
//   return (
//     <div className={'w-[200px]'}>
//       <OptionCard
//         {...args}
//         value={value}
//         options={options}
//         cols={1}
//         itemRenderer={({ label, original }: OptionCardItem, index: number) => (
//           <div className={'flex flex-col items-center gap-3'}>
//             <span>{label}</span>
//             <span>ID : {original?.id}</span>
//             <span>PATH : {original?.path}</span>
//             <Button label={'Btn'} variant={'primary'} size={'sm'} />
//           </div>
//         )}
//         onOptionSelect={(option: OptionCardItem) => setValue(option.value)}
//       />
//     </div>
//   );
// };
// TemplateCustom.storyName = '커스텀 노드';
