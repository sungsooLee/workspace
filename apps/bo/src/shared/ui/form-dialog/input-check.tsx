import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DialogProps } from '../search-box/type';

const InputCheck: FC<DialogProps> = ({ control, name, label }) => {
  return (
    <div className={'builder-dialog-container'}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control} // React Hook Form의 control 객체 전달
        name={name} // Field 이름 설정
        render={({ field }) => {
          // Field에서 value와 onChange 함수 추출
          const { value, onChange } = field;
          // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
          const handleOnChange = (e: any) => {
            e.preventDefault();
            onChange(value === 'Y' ? 'N' : 'Y');
          };
          // 렌더링할 컴포넌트에 props 전달
          return (
            <div className={'input-check'} onClick={handleOnChange}>
              <input id={name} readOnly type={'checkbox'} checked={value === 'Y'} />
              <span className={'custom-check'}></span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default InputCheck;
