import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { NumberInput } from '@/shared/components/Input/NumberInput';
import { SelectInput } from '@/shared/components/Input/SelectInput';
import { TextInput } from '@/shared/components/Input/TextInput';
import { toast } from '@/shared/hooks/useToast';
import { useForm } from 'react-hook-form';
import { CheckboxInput } from '@/shared/components/Input/CheckboxInput';
import { RadioGroupInput } from '@/shared/components/Input/RadioGroupInputProps';
import { SwitchInput } from '@/shared/components/Input/SwitchInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import RenderSample from '../RenderSample';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { useEffect, useState } from 'react';

const inputSchemas = z.object({
  textInput: z.string().min(2, { message: '2글자 이상 입력해주세요.' }),
  numberInput: z.number().min(1, { message: '1 이상의 숫자를 입력해주세요.' }),
  selectInput: z.string({ message: '하나를 선택해야 합니다.' }),
  checkboxInput: z
    .array(z.enum(['1', '2', '3', '4']), {
      message: '최소 1개 이상을 선택해야 합니다.',
    })
    .min(1, { message: '최소 하나의 체크박스를 선택해야 합니다.' }),
  radioInput: z.string({ message: '하나를 선택해야 합니다.' }),
});
const selectOptions = [
  { label: 'Select-1', value: '1' },
  { label: 'Select-2', value: '2' },
  { label: 'Select-3', value: '3' },
  { label: 'Select-4', value: '4' },
];

const checkboxOptions = [
  { label: 'Checkbox-1', value: '1' },
  { label: 'Checkbox-2', value: '2' },
  { label: 'Checkbox-3', value: '3' },
  { label: 'Checkbox-4', value: '4' },
];

const radioGroupOptions = [
  { label: 'radio-1', value: '1' },
  { label: 'radio-2', value: '2' },
  { label: 'radio-3', value: '3' },
  { label: 'radio-4', value: '4' },
];

const InputSamplePage = () => {
  const { control: inputControl, getValues } = useForm({});
  const { control: zodControl, handleSubmit } = useForm({
    resolver: zodResolver(inputSchemas),
  });
  const [selectCompany, setSelectCompany] = useState('A');
  const getInput = () => {
    toast({
      description: JSON.stringify(getValues()),
      duration: 1000,
    });
  };

  const onSubmit = (data: any) => {
    toast({
      description: JSON.stringify(data),
      duration: 1000,
    });
  };

  useEffect(() => {
    console.log(selectCompany);
  }, [selectCompany]);

  return (
    <div className='flex h-full w-full flex-row items-center space-x-10 p-10'>
      {/* <p className='text-'>입력 샘플 페이지</p> */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className='space-y-10'>
            <TextInput name='textInput' label='텍스트' control={inputControl} />
            <NumberInput
              name='numberInput'
              label='숫자'
              control={inputControl}
            />
            <SelectInput
              name='selectInput'
              label='Select'
              control={inputControl}
              options={selectOptions}
              placeholder='선택'
            />
            <CheckboxInput
              name='checkboxInput'
              label='체크박스'
              control={inputControl}
              options={checkboxOptions}
              className='flex-row space-x-4'
            />
            <RadioGroupInput
              name='radioInput'
              label='라디오그룹'
              control={inputControl}
              options={radioGroupOptions}
              className='flex flex-row space-x-4'
            />
            <SwitchInput
              name='switchInput'
              description='switch input component'
              control={inputControl}
              label='스위치'
            />
          </CardContent>
          <CardFooter>
            <Button className='w-full' onClick={getInput}>
              확인
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Form & zod</CardTitle>
            </CardHeader>
            <CardContent className='space-y-10'>
              {/* zod를 활용한 form */}
              <TextInput name='textInput' label='텍스트' control={zodControl} />
              <NumberInput
                name='numberInput'
                label='숫자'
                control={zodControl}
              />
              <SelectInput
                name='selectInput'
                label='Select'
                control={zodControl}
                options={selectOptions}
                placeholder='선택'
              />
              <CheckboxInput
                name='checkboxInput'
                label='체크박스'
                control={zodControl}
                options={checkboxOptions}
                className='flex-row space-x-4'
              />
              <RadioGroupInput
                name='radioInput'
                label='라디오그룹'
                control={zodControl}
                options={radioGroupOptions}
                className='flex flex-row space-x-4'
              />
              <SwitchInput
                name='switchInput'
                description='switch input component'
                control={zodControl}
                label='스위치'
              />
            </CardContent>
            <CardFooter>
              <Button className='w-full' type='submit'>
                제출
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>타입에 따른 동적 렌더링</CardTitle>
          </CardHeader>
          <RadioGroup
            defaultValue={selectCompany}
            value={selectCompany}
            onValueChange={(value) => setSelectCompany(value)}
            className='mt-5 flex justify-center space-x-5'
          >
            <RadioGroupItem value='A' id='A' />
            <label htmlFor='A'>A회사</label>
            <RadioGroupItem value='B' id='B' />
            <label htmlFor='B'>B회사</label>
          </RadioGroup>
          <RenderSample companyType={selectCompany} />
        </Card>
      </div>
      {/* </div> */}
    </div>
  );
};

export default InputSamplePage;
