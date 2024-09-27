import React from 'react';
import { useForm, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/shared/components/ui/button';
import CommonCard from '../card/CommonCard';
import {
  withInputField,
  WithInputFieldProps,
} from '../../Input/withInputField';

interface InputFormProps {
  schema: z.ZodObject<any>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

const commonSchema = z.object({
  name: z.string().min(2, { message: '이름은 2글자 이상 입력해주세요.' }),
  email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
});

interface CommonFieldsProps {
  control: Control<any>;
}

export const CommonFields = ({ control }: CommonFieldsProps) => {
  return (
    <>
      <InputForm.Field
        name='name'
        label='이름'
        schema={commonSchema.shape.name}
        control={control}
      />
      <InputForm.Field
        name='email'
        label='이메일'
        schema={commonSchema.shape.email}
        control={control}
      />
    </>
  );
};

const InputForm = ({ schema, onSubmit, children }: InputFormProps) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <CommonCard>
      <CommonCard.Title>Renderer</CommonCard.Title>
      <CommonCard.Contents>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommonFields control={control} />
          {React.Children.map(children, (child) => {
            if (React.isValidElement<InputFieldProps>(child)) {
              return React.cloneElement(child, {
                control,
              });
            }
            return child;
          })}
          <CommonCard.Buttons>
            <Button type='submit'>제출</Button>
          </CommonCard.Buttons>
        </form>
      </CommonCard.Contents>
    </CommonCard>
  );
};

type InputFieldProps = WithInputFieldProps<z.ZodType<any, z.ZodTypeDef, any>>;

const InputField = withInputField(
  ({ className, ...props }: InputFieldProps) => (
    <input type='text' className={`${className}`} {...props} />
  )
);

InputForm.Field = InputField;

export default InputForm;
