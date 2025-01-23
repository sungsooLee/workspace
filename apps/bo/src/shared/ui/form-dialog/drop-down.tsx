import { FC, useState, useRef, useEffect } from 'react';
import { DialogItem, DialogProps } from '../../../widgets/layout/ui/search-box/type';
import { Controller } from 'react-hook-form';

const DropDown: FC<DialogProps> = ({ control, name, label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DialogItem>({
    value: '',
    label: '선택하세요',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: DialogItem) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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

  return items ? (
    <div className="builder-dialog-container dropdown" ref={dropdownRef}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          // Field에서 value와 onChange 함수 추출
          const { value, onChange } = field;
          // onChange 이벤트를 핸들링하여 커스텀 컴포넌트와 연결
          const handleOnChange = (selectedValue: string) => {
            onChange(selectedValue);
            setIsOpen(false);
          };
          // 렌더링할 컴포넌트에 props 전달
          return (
            <>
              {/* Selected Option */}
              <button id={name} className="dropdown-selected" onClick={toggleDropdown}>
                <span>
                  {items.find((item) => item.value === value)?.label || 'Select an option'}
                </span>
                <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown Options */}
              {isOpen && (
                <div className="dropdown-menu">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${value === item.value ? 'selected' : ''}`}
                      onClick={() => handleOnChange(item.value)}>
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  ) : null;
};

export default DropDown;
