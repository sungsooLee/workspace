import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DialogProps } from '../../../widgets/layout/ui/search-box/type';

const InputText: FC<DialogProps> = ({ control, name, label, items }) => {
  return (
    <div className="builder-dialog-container input-text">
      {label && (
        <label htmlFor={name}>
          {/*@ts-ignore*/}
          {label} {control.isFieldRequired(name) ? '*' : ''}
        </label>
      )}
      <Controller
        control={control} // React Hook Form의 control 객체 전달
        name={name} // Field 이름 설정
        render={({ field }) => {
          // Field에서 value와 onChange 함수 추출
          const { value, onChange } = field;
          // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
          const handleOnChange = (e: any) => {
            e.preventDefault();
            onChange(e.target.value);
          };
          // 렌더링할 컴포넌트에 props 전달
          return <input type={'text'} value={value} onChange={handleOnChange} />;
        }}
      />
    </div>
  );
};

export default InputText;
