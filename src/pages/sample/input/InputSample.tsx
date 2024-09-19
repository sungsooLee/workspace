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

const inputSchemas = {
  // textInput :
};
const tmpSelectOptions = [
  { label: 'Select-1', value: 1 },
  { label: 'Select-2', value: 2 },
  { label: 'Select-3', value: 3 },
  { label: 'Select-4', value: 4 },
];

const tmpCheckboxOptions = [
  { label: 'Checkbox-1', value: 1 },
  { label: 'Checkbox-2', value: 2 },
  { label: 'Checkbox-3', value: 3 },
  { label: 'Checkbox-4', value: 4 },
];

const InputSamplePage = () => {
  const { control: inputControl, getValues } = useForm({});
  // const {control}

  const getInput = () => {
    toast({
      description: JSON.stringify(getValues()),
      duration: 1000,
    });
  };

  return (
    <div className='flex h-full w-full'>
      {/* <p className='text-'>입력 샘플 페이지</p> */}
      <div className='w-1/2 items-center space-y-10 p-10'>
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
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
              options={tmpSelectOptions}
              placeholder='선택'
            />
            <CheckboxInput
              name='checkboxInput'
              label='체크박스'
              control={inputControl}
              options={tmpCheckboxOptions}
            />
          </CardContent>
          <CardFooter>
            <Button className='w-full' onClick={getInput}>
              확인
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Form & zod</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button className='w-full'>제출</Button>
          </CardFooter>
        </Card>
        {/* </div> */}
      </div>
    </div>
  );
};

export default InputSamplePage;
