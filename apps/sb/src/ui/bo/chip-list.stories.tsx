// BaseForm.stories.tsx
import { getMockOption, getRandomId } from '@learnway/shared';
import { Button, ChipList } from '@learnway/ui';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Bo-Components/ChipList',
  component: ChipList,
  tags: ['autodocs'],
  args: {
    onOptionSelect: () => null,
    onOptionsSelect: () => null,
  },
  // includeStories: [''],

  // args: {
  // variant: 'primary',
  // },
} as Meta;

// ChipList
export const Template: any = (args: any) => {
  const [options, setOptions] = useState<Array<any>>(getMockOption(20));
  return (
    <div className="space-y-5">
      <Button label={'초기화'} variant={'point'} size={'sm'} onClick={() => setOptions([])} />
      <Button
        label={'추가'}
        variant={'point'}
        size={'sm'}
        onClick={() =>
          setOptions((state) => [...state, { value: getRandomId(), label: `added label` }])
        }
      />
      <ChipList
        {...args}
        options={options}
        wordWrap
        isOptionInvalid={(option) => option.label === 'label1'} // value 2 invalid 처리
        isOptionHideCloseButton={(option) => option.label === 'label2'} // value 1 은 삭제 버튼 감추기
        isOptionDisabled={(option) => option.label === 'label3'} // value 3 은 비활성화 처리
        onChipDeleteClick={(option) => setOptions(options.filter((d) => d.value !== option.value))}
      />
    </div>
  );
};
Template.storyName = 'ChipList';

// ChipList (한줄)
export const TemplateSingleRow: any = (args: any) => {
  const [options, setOptions] = useState<Array<any>>(getMockOption(5));
  return (
    <div className="space-y-5">
      <Button label={'초기화'} variant={'point'} size={'sm'} onClick={() => setOptions([])} />
      <Button
        label={'추가'}
        variant={'point'}
        size={'sm'}
        onClick={() =>
          setOptions((state) => [...state, { value: getRandomId(), label: `added label` }])
        }
      />
      <ChipList
        {...args}
        options={options}
        onChipDeleteClick={(option) => setOptions(options.filter((d) => d.value !== option.value))}
      />
    </div>
  );
};
TemplateSingleRow.storyName = 'ChipList (한줄)';

// ChipList (키워드 입력)
export const TemplateInput: any = (args: any) => {
  const [options, setOptions] = useState<Array<any>>(getMockOption(5, 'tagName', 'tagId'));
  return (
    <div className="space-y-5">
      <Button label={'초기화'} variant={'point'} size={'sm'} onClick={() => setOptions([])} />
      <Button
        label={'추가'}
        variant={'point'}
        size={'sm'}
        onClick={() =>
          setOptions((state) => [...state, { tagId: getRandomId(), tagName: `added label` }])
        }
      />
      <Button
        label={'Option 확인'}
        variant={'point'}
        size={'sm'}
        onClick={() => console.log(options)}
      />
      <ChipList
        {...args}
        options={options}
        showInput
        labelField={'tagName'}
        valueField={'tagId'}
        onAddInputEnterKeyDown={(newOption) => {
          setOptions((state) => [...state, newOption]);
        }}
        onChipDeleteClick={(option) => setOptions(options.filter((d) => d.tagId !== option.tagId))}
      />
    </div>
  );
};
TemplateInput.storyName = 'ChipList (키워드 입력)';
