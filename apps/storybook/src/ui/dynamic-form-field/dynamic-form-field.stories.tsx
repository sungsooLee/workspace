// DynamicFormField.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { FieldType } from '@learnway/ui';
import { DynamicFormField } from '@learnway/ui';
import { Button } from '@learnway/ui';

export default {
  title: 'Components/DynamicFormField',
  component: DynamicFormField,
  tags: ['autodocs'],
} as Meta;

const schemas: any = {
  [FieldType.TEXT]: z.object({
    name: z.string().min(2, {
      message: '최소 2글자 이상 입력하세요.',
    }),
  }),

  [FieldType.NUMBER]: z.object({
    name: z
      .number()
      .min(0, { message: '0 이상의 숫자를 입력하세요.' })
      .max(100, { message: '100 이하의 숫자를 입력하세요.' }),
  }),

  [FieldType.SELECT]: z.object({
    type: z.string({
      required_error: '옵션을 선택해주세요!',
    }),
  }),

  [FieldType.MULTI_SELECT]: z.object({
    categories: z.array(z.string()).min(1, '최소 1개를 선택해주세요').default([]),
  }),

  [FieldType.RADIO]: z.object({
    notificationType: z.enum(['all', 'mentions', 'none'], {
      required_error: '선택해주세요.',
    }),
  }),

  [FieldType.CHECKBOX]: z.object({
    checkbox: z.boolean().default(false),
  }),

  [FieldType.SWITCH]: z.object({
    switch: z.boolean().default(false),
  }),

  [FieldType.DATE]: z.object({
    date: z.date({ required_error: '값을 입력하세요' }),
  }),
};

type Story = StoryObj<typeof DynamicFormField>;

const Template = (args: any) => {
  const selectedSchema = schemas[args.type] || z.object({});

  const methods = useForm({
    resolver: zodResolver(selectedSchema),
  });

  const onSubmit = (data: z.infer<typeof selectedSchema>) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DynamicFormField {...args} />

        <Button className="mt-10" type="submit">
          로그인
        </Button>
      </form>
    </FormProvider>
  );
};

export const Text: Story = {
  args: {
    name: 'name',
    label: '이름',
    type: FieldType.TEXT,
    placeholder: 'Enter your name',
  },
  render: (args) => <Template {...args} />,
};

export const Select: Story = {
  args: {
    name: 'type',
    label: 'Select',
    type: FieldType.SELECT,
    options: [
      {
        value: 'category1',
        label: 'form.categories.category1',
      },
      {
        value: 'category2',
        label: 'form.categories.category2',
      },
    ],
  },
  render: (args) => <Template {...args} />,
};

export const MultiSelect: Story = {
  args: {
    name: 'categories',
    label: 'MultiSelect',
    type: FieldType.MULTI_SELECT,
    options: [
      {
        value: 'category1',
        label: 'form.categories.category1',
      },
      {
        value: 'category2',
        label: 'form.categories.category2',
      },
    ],
  },
  render: (args) => <Template {...args} />,
};

export const Radio: Story = {
  args: {
    name: 'notificationType',
    label: 'Radio',
    type: FieldType.RADIO,
    options: [
      {
        value: 'all',
        label: 'form.notificationType.all',
        description: 'form.notificationType.allDescription',
      },
      {
        value: 'mentions',
        label: 'form.notificationType.mentions',
        description: 'form.notificationType.mentionsDescription',
      },
      {
        value: 'none',
        label: 'form.notificationType.none',
      },
    ],
  },
  render: (args) => <Template {...args} />,
};

export const CheckBox: Story = {
  args: {
    name: 'checkbox',
    label: 'checkbox',
    checkboxLabel: 'Checkbox label',
    type: FieldType.CHECKBOX,
  },
  render: (args) => <Template {...args} />,
};

export const Switch: Story = {
  args: {
    name: 'switch',
    label: 'switch',
    formLabel: 'switch label',
    type: FieldType.SWITCH,
  },
  render: (args) => <Template {...args} />,
};

export const Date: Story = {
  args: {
    name: 'date',
    label: 'date',
    type: FieldType.DATE,
  },
  render: (args) => <Template {...args} />,
};
