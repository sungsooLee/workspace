import { FC, useState, useEffect, useRef } from 'react';
import { DialogProps } from '../../../widgets/layout/ui/search-box/type';
import { Controller } from 'react-hook-form';
const MultiDropdown: FC<DialogProps> = ({ control, name, label, items }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen); // 드롭다운 열기/닫기

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    items && (
      <div className="builder-dialog-container" ref={dropdownRef}>
        {label && <label htmlFor={name}>{label}</label>}
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            // Field에서 value와 onChange 함수 추출
            const { value, onChange } = field;
            const selectedValues = value as string[];
            // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
            const handleOnChange = (e: any, selectedValue: string) => {
              e.preventDefault();
              if (value.includes(selectedValue)) {
                // 값이 이미 존재하면 새로운 배열에서 제거
                onChange(value.filter((item: string) => item !== selectedValue));
              } else {
                // 값이 없으면 새로운 배열에 추가
                onChange([...value, selectedValue]);
              }
            };
            return (
              <div className="multi-drop-down">
                <div className="header" onClick={toggleDropdown}>
                  {selectedValues.length > 0
                    ? selectedValues
                        .map((sv) => items.find((item) => item.value === sv)?.label)
                        .join(', ')
                    : 'Select options'}
                  <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
                </div>

                {isOpen && (
                  <div className="options">
                    {items.map((option) => (
                      <div
                        key={option.value}
                        className={`option ${selectedValues.includes(option.value) ? 'selected' : ''}`}
                        onClick={(e) => handleOnChange(e, option.value)}>
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    )
  );
};

export default MultiDropdown;
