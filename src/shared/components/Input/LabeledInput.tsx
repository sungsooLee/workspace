import { ErrorMessage } from '@hookform/error-message';
import { Input } from './input';

const LabeledInput = ({ name, register, type, ...props }: any) => {
  return (
    <>
      <Input type={type} placeholder={name} {...register(name)} />
      <ErrorMessage
        errors={props.errors}
        name={name}
        render={({ message }) => <p className='text-red-600'>{message}</p>}
      />
    </>
  );
};

export default LabeledInput;
