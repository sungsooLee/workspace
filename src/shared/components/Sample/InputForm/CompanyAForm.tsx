// CompanyAForm.tsx
import * as z from 'zod';
import InputForm from './InputForm';

const schema = z.object({
  name: z.string().min(2, { message: '이름은 2글자 이상 입력해주세요.' }),
  email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
  department: z.string().min(1, { message: '부서를 입력해주세요.' }),
  position: z.string().min(1, { message: '직책을 입력해주세요.' }),
});

const CompanyAForm = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <InputForm schema={schema} onSubmit={handleSubmit}>
      <InputForm.Field
        name='department'
        label='A회사 부서'
        schema={schema.shape.department}
      />
      <InputForm.Field
        name='position'
        label='A회사 직책'
        schema={schema.shape.position}
      />
    </InputForm>
  );
};

export default CompanyAForm;
