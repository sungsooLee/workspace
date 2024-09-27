import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { it } from 'vitest';
import { describe } from 'vitest';
import { TextInput } from '../TextInput';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { userEvent } from '@storybook/test';

describe('TextInput 컴포넌트', () => {
  it('컴포넌트가 제대로 렌더링 된다', () => {
    const Wrapper = () => {
      const methods = useForm();

      return (
        <FormProvider {...methods}>
          <TextInput
            name='testInput'
            label='테스트 입력'
            control={methods.control}
          />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    expect(screen.getByLabelText('테스트 입력')).toBeInTheDocument();
  });

  it('필수 필드 미입력시 오류가 발생한다', async () => {
    const user = userEvent.setup();

    const Wrapper = () => {
      const methods = useForm({
        mode: 'onChange',
        defaultValues: { testInput: '' },
      });

      return (
        <FormProvider {...methods}>
          <TextInput
            name='testInput'
            label='테스트 입력'
            control={methods.control}
            required={true}
            rules={{ required: '이 필드는 필수입니다' }}
          />
          <button type='submit'>제출</button>
        </FormProvider>
      );
    };

    render(<Wrapper />);

    const input = screen.getByLabelText(/테스트 입력/);
    await user.clear(input);
    const submitButton = screen.getByText('제출');
    await user.click(submitButton);
    // expect(submitButton).toBeInTheDocument();

    expect(screen.getByText('이 필드는 필수입니다')).toBeInTheDocument();
  });
});
