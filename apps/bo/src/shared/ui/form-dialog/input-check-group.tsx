import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DialogProps } from '../../../widgets/layout/ui/search-box/type';
import { Logo } from '../../../features/layout';

const InputCheckGroup: FC<DialogProps> = ({ control, name, label, items }) => {
  function toggleValue(arr: string[], value: string) {
    if (arr.includes(value)) {
      // 값이 이미 존재하면 새로운 배열에서 제거
      return arr.filter((item) => item !== value);
    } else {
      // 값이 없으면 새로운 배열에 추가
      return [...arr, value];
    }
  }

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
            const checkValues = value as string[];
            // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
            const handleOnChange = (e: any, checkedValue: string) => {
              e.preventDefault();
              if (value.includes(checkedValue)) {
                // 값이 이미 존재하면 새로운 배열에서 제거
                onChange(value.filter((item: string) => item !== checkedValue));
              } else {
                // 값이 없으면 새로운 배열에 추가
                onChange([...value, checkedValue]);
              }
            };
            // 렌더링할 컴포넌트에 props 전달
            return (
              <div className={'group'}>
                {items.map((item) => (
                  <div
                    key={item.value}
                    className={'input-check'}
                    onClick={(e) => handleOnChange(e, item.value)}>
                    <input
                      type={'checkbox'}
                      readOnly
                      checked={checkValues.indexOf(item.value) > -1}
                    />
                    <span className={'custom-check'}></span>
                    <span className={'custom-check-label'}>{item.label}</span>
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

export default InputCheckGroup;
