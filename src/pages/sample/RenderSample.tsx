import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardRenderer from '../../shared/components/sample/card/CardRenderer';
import { Button } from '@/shared/components/ui/button';
import InputFormRenderer from '../../shared/components/sample/InputForm/InputFormRenderer';

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

const currentCompany = 'B';

const companySchema: any =
  currentCompany in companySchemas
    ? companySchemas[currentCompany]
    : z.object({});

const RenderSample = () => {
  const combineSchema = commonSchema.merge(companySchema);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(combineSchema),
  });

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
            <Button type='submit'>제출</Button>
          </div>
        </form>
      </div>
      <InputFormRenderer companyType={currentCompany} />
    </div>
  );
};

export default RenderSample;
