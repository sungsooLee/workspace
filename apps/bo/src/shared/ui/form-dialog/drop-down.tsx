import { FC, useState, useRef, useEffect } from 'react';
import { DialogItem, DialogProps } from '../../../widgets/layout/ui/search-box/type';
import { Controller } from 'react-hook-form';
import { useFetchCodeGroups } from '../../../entities/system';
import { CODE_GROUP } from '@learnway/config';

const DropDown: FC<DialogProps> = ({
  control,
  name,
  label,
  items = [],
  value = '',
  dependency,
  config,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItems, setCurrentItems] = useState<DialogItem[]>(items);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<{ onChange?: (value: string) => void }>({});
  const watchedValue = dependency ? config.watch(dependency) : null;
  const { data } = useFetchCodeGroups();
  const toggleDropdown = (e: any) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
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

  useEffect(() => {
    if (dependency && watchedValue && fieldRef.current.onChange) {
      console.log('dependency => ', dependency, 'watchedValue => ', watchedValue, 'name=>', name);
      const parentCodes = (data as any)[CODE_GROUP.LANGUAGE_CODE];
      const findParent = parentCodes.codes.find((pc: any) => pc.code === watchedValue)?.codes || [];
      if (findParent) {
        setCurrentItems([...items, ...findParent]);
        fieldRef.current.onChange(value);
      }
    }
  }, [dependency, watchedValue, data, items, name, value]);

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
            console.log(`name => ${name} selectedValue => ${selectedValue}  value=> ${value}`);
            onChange(selectedValue);
            setIsOpen(false);
          };
          // onChange를 ref에 저장 (외부에서 접근 가능)
          fieldRef.current.onChange = onChange;
          // 렌더링할 컴포넌트에 props 전달
          return (
            <>
              {/* Selected Option */}
              <button
                type={'button'}
                id={name}
                className="dropdown-selected"
                onClick={toggleDropdown}>
                <span>
                  {currentItems.find((item) => item.code.trim() === value)?.name ||
                    'Select an option'}
                </span>
                <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown Options */}
              {isOpen && (
                <div className="dropdown-menu">
                  {currentItems.map((item, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${value === item.code ? 'selected' : ''} ${item.code} ${value}`}
                      onClick={() => handleOnChange(item.code)}>
                      {item.name}
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
