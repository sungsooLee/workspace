import { FC } from 'react';
import { DialogProps } from '../../../widgets/layout/ui/search-box/type';
import { Controller } from 'react-hook-form';

const InputRadioGroup: FC<DialogProps> = ({ control, name, label, items }) => {
  return (
    <div className={'builder-dialog-container check-group'}>
      {label && <label htmlFor={name}>{label}</label>}
      {items && (
        <Controller
          control={control} // React Hook Form의 control 객체 전달
          name={name} // Field 이름 설정
          render={({ field }) => {
            // Field에서 value와 onChange 함수 추출
            const { value, onChange } = field;
            // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
            const handleOnChange = (e: any, selectedValue: string) => {
              e.preventDefault();
              onChange(selectedValue);
            };
            // 렌더링할 컴포넌트에 props 전달
            return (
              <div className={'group'}>
                {items.map((item) => (
                  <div
                    key={item.value}
                    className={'input-radio'}
                    onClick={(e) => handleOnChange(e, item.value)}>
                    <input type={'radio'} readOnly checked={value === item.value} />
                    <span className={'custom-radio'}></span>
                    <span className={'custom-radio-label'}>{item.label}</span>
                  </div>
                ))}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputRadioGroup;
