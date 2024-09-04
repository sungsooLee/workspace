import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LabeledInput from '@/shared/components/Input/LabeledInput';
import { Input } from '@/shared/components/Input/input';
import CardRenderer from './Card/CardRenderer';
// import { CompanyACard, CompanyBCard } from './Card/CardSample';

const commonSchema = z.object({
  name: z.string().min(2, { message: '2글자 이상 입력하세요.' }),
  email: z
    .string()
    .min(2, { message: '2글자 이상 입력하세요.' })
    .email({ message: '이메일 형식으로 입력하세요.' }),
});

const companySchemas = {
  companyA: z.object({
    AField1: z.string().min(1, { message: '최소 1글자 이상 입력하세요' }),
    AField2: z.coerce.number().min(5, { message: '5이상 입력하세요' }), //coerce로 강제하면 type number로 해도 string 넣으라는 오류 안 뜸.
    AField3: z.boolean(),
  }),
  companyB: z.object({
    BField1: z.string().min(1, { message: '최소 1글자 이상 입력하세요' }),
    BField2: z.string(),
  }),
};

const currentCompany = 'companyA';
const companySchema = companySchemas[currentCompany];

type CompanySchema = typeof companySchema;
type CompanySchemaShape = CompanySchema['shape'];

const InputSample = () => {
  const combineSchema = commonSchema.merge(companySchema);

  type FormData = z.infer<typeof combineSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(combineSchema) });

  const renderCompanyFields = () => {
    const companyFields = [];
    for (const key in companySchema.shape) {
      const fieldType = companySchema.shape[key as keyof CompanySchemaShape];
      let inputType = 'text';
      if (fieldType instanceof z.ZodNumber) {
        inputType = 'number';
      } else if (fieldType instanceof z.ZodBoolean) {
        inputType = 'check';
      }
      // 이건 text 타입의 Input만 ....
      companyFields.push(
        <div key={key}>
          <LabeledInput
            type={inputType}
            name={key}
            register={register}
            errors={errors}
          />
        </div>
      );
    }
    return companyFields;
  };

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <>
      <div className='flex w-full justify-center'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-y-5'>
            <div>
              <LabeledInput name='name' register={register} errors={errors} />
            </div>
            <div>
              <LabeledInput name='email' register={register} errors={errors} />
            </div>
            {renderCompanyFields()}
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <hr />

      <CardRenderer
        companyType='아무거나'
        cardData={{ contents: 'API 응답 데이터' }}
      />
    </>
  );
};

export default InputSample;
