// CompanyBForm.tsx
import * as z from 'zod';
import InputForm from './InputForm';

const schema = z.object({
  name: z.string().min(2, { message: '이름은 2글자 이상 입력해주세요.' }),
  email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
  team: z.string().min(1, { message: '팀을 입력해주세요.' }),
  role: z.string().min(1, { message: '역할을 입력해주세요.' }),
});

const CompanyBForm = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <InputForm schema={schema} onSubmit={handleSubmit}>
      <InputForm.Field
        name='team'
        label='B회사 팀'
        schema={schema.shape.team}
      />
      <InputForm.Field
        name='role'
        label='B회사 역할'
        schema={schema.shape.role}
      />
    </InputForm>
  );
};

export default CompanyBForm;
