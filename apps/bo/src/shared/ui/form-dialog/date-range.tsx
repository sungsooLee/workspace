import { FC, useCallback, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { DialogProps } from '../../../widgets/layout/ui/search-box/type';

const DateRange: FC<DialogProps> = ({ control, name, label }) => {
  const [value, setValue] = useState('|');
  const [startDate, endDate] = useMemo(() => [value.split('|')[0], value.split('|')[1]], [value]);

  // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결

  return (
    <div className={'builder-dialog-container date-range'}>
      {label && <label>{label}</label>}

      <Controller
        control={control} // React Hook Form의 control 객체 전달
        render={({ field }) => {
          // Field에서 value와 onChange 함수 추출
          const { value, onChange } = field;
          const [startDate, endDate] = [value.split('|')[0], value.split('|')[1]];

          const handleOnChange = (e: any, type: 'start' | 'end') => {
            if (type === 'start') {
              onChange(`${e.target.value}|${endDate}`);
            } else {
              onChange(`${startDate}|${e.target.value}`);
            }
          };

          // 렌더링할 컴포넌트에 props 전달
          return (
            <div className={'date-range-group'}>
              <input type="text" onChange={(e) => handleOnChange(e, 'start')} value={startDate} />
              <span>~</span>
              <input type="text" onChange={(e) => handleOnChange(e, 'end')} value={endDate} />
            </div>
          );
        }}
        name={name} // Field 이름 설정
      />
    </div>
  );
};

export default DateRange;
