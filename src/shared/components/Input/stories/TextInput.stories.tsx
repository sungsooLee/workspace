import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@/shared/components/Input/TextInput';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

const meta = {
  title: 'Input/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      const methods = useForm();
      const [submittedData, setSubmittedData] = useState(null);

      const onSubmit = (data: any) => {
        console.log('Form submitted:', data);
        setSubmittedData(data);
      };

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Story args={{ ...context.args, control: methods.control }} />
            {/* <button type='submit'>제출</button> */}
          </form>
          {submittedData && (
            <div style={{ marginTop: '20px' }}>
              <h3>제출된 데이터:</h3>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </FormProvider>
      );
    },
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'textInput',
    label: '텍스트',
    // control: control,
  },
};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: '입력하세요...',
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
    rules: { required: '이 필드는 필수입니다' },
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => {
    const { control, setError } = useForm();
    setError('textInput', {
      type: 'manual',
      message: 'Error Message with Storybook',
    });
    return <TextInput {...args} control={control} />;
  },
};
