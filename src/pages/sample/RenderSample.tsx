import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardRenderer from './Card/CardRenderer';
import { NumInput, SelectInput, TextInput } from './InputSample';
import { Button } from '@/shared/components/Button/button';

const commonSchema = z.object({
  name: z
    .string({ message: '값을 입력해주세요.' })
    .min(2, { message: '2글자 이상 입력하세요.' }),
  students: z.number().optional(),
  enum: z.nativeEnum(
    {
      Option1: 'opt1',
      Option2: 'opt2',
      Option3: 'opt3',
    },
    { message: '옵션 값을 선택해주세요.' }
  ),
});

const companySchemas = {
  A: z.object({
    AField1: z
      .string({ message: '값을 입력해주세요.' })
      .min(1, { message: '최소 1글자 이상 입력하세요' }),
  }),
  B: z.object({
    BField1: z
      .string({ message: '필수 값입니다.' })
      .min(1, { message: '최소 1글자 이상 입력하세요' }),
    BField2: z.string({ message: '필수 값입니다.' }),
  }),
};

const currentCompany = 'A';

const companySchema: any =
  currentCompany in companySchemas
    ? companySchemas[currentCompany]
    : z.object({});

const RenderSample = () => {
  const combineSchema = commonSchema.merge(companySchema);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(combineSchema),
  });

  const renderCompanyFields = () => {
    const companyFields = [];
    for (const key in companySchema.shape) {
      //String 타입이면 TextInput
      //Number 타입이면 NumInput
      //Boolean 타입이면 ...
      //배열 타입이면 Select...등
      companyFields.push(
        <div key={key}>
          <TextInput
            name={key}
            label={key}
            schema={combineSchema}
            control={control}
          />
        </div>
      );
    }
    return companyFields;
  };

  const onSubmit = handleSubmit((data) => console.log(data));
  const tmpEnum = Object.entries(combineSchema.shape.enum._def.values).map(
    ([label, value]) => ({
      value,
      label,
    })
  );

  return (
    <div className='flex flex-col space-y-20 p-10'>
      <div className='flex items-center justify-center'>
        <CardRenderer
          companyType={currentCompany}
          cardData={{ contents: 'API 응답 데이터' }}
        />
      </div>
      <div className='flex w-full justify-center'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-y-5'>
            <TextInput
              name='name'
              label='이름'
              schema={combineSchema.shape.name}
              control={control}
            />
            <SelectInput
              control={control}
              name='enum'
              label='셀렉박스'
              schema={combineSchema.shape.enum}
              options={tmpEnum}
              placeholder='선택'
            />
            <NumInput
              control={control}
              name='students'
              label='교육 정원'
              schema={combineSchema.shape.students}
              placeholder='00'
              inputSuffix='명'
            />
            {renderCompanyFields()}

            <Button type='submit'>제출</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenderSample;
