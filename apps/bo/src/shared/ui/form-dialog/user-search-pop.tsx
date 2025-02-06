import { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { DialogProps } from '../../../widgets/layout/ui/search-box/type';

const UserSearchPop: FC<DialogProps> = ({ control, name, label }) => {
  const [customerNo, setCustomerNo] = useState('');
  return (
    <div className={'builder-dialog-container user-search-pop'}>
      {label && <label>{label}</label>}
      <Controller
        control={control} // React Hook Form의 control 객체 전달
        render={({ field }) => {
          // Field에서 value와 onChange 함수 추출
          const { value, onChange } = field;
          // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
          const handleOnChange = (e: any) => {
            e.preventDefault();
            onChange(e.target.value);
          };
          // 렌더링할 컴포넌트에 props 전달
          return (
            <div className={'inner'}>
              <input
                type="text"
                value={value}
                className={'builder-dialog-input'}
                onChange={handleOnChange}
              />
              <button type={'button'} className={'btn'}>
                검색
              </button>
            </div>
          );
        }}
        name={name} // Field 이름 설정
      />
    </div>
  );
};

export default UserSearchPop;
