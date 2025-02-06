import { FC, useEffect, useRef, useState } from 'react';
import { DialogItem, DialogProps } from '../../../widgets/layout/ui/search-box/type';
import { Controller } from 'react-hook-form';
import { useFetchCodeGroups } from '../../../entities/system';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useClickOutside } from '@reactuses/core';
const DropDown: FC<DialogProps> = ({
  control,
  name,
  label,
  items = [],
  value = '',
  itemsConfig,
  config,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItems, setCurrentItems] = useState<DialogItem[]>(items);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<{ onChange?: (value: string) => void }>({});
  const { data } = useFetchCodeGroups();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const watchedValue =
    itemsConfig && itemsConfig.type === 'target' ? config.watch(itemsConfig.target) : null;
  const toggleDropdown = (e: any) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const initItems = async () => {
    if (itemsConfig && itemsConfig.type === 'self') {
      if (itemsConfig.codeGroup) {
        const codes = (data as any)[itemsConfig.codeGroup].codes;
        setCurrentItems([...items, ...codes]);
      } else if (itemsConfig.api) {
        const result = await queryClient.fetchQuery(itemsConfig.api());
        if (itemsConfig.callback) {
          setCurrentItems([...items, ...itemsConfig.callback(result)]);
        } else if (Array.isArray(result)) {
          setCurrentItems([...items, ...result]);
        } else {
          console.error('The response is not an array; a callback function is required.');
        }
      } else {
        console.error('Only codeGroup and api are supported as item types.');
      }
    }
  };

  const changeItems = async () => {
    if (itemsConfig && watchedValue && fieldRef.current.onChange && itemsConfig.type === 'target') {
      if (itemsConfig.codeGroup) {
        const parentCodes = (data as any)[itemsConfig.codeGroup];
        const findParent =
          parentCodes.codes.find((pc: any) => pc.code === watchedValue)?.codes || [];
        if (findParent) {
          setCurrentItems([...items, ...findParent]);
          fieldRef.current.onChange(value);
        }
      } else if (itemsConfig.api) {
        const result = await queryClient.fetchQuery(itemsConfig.api(watchedValue));
        if (itemsConfig.callback) {
          setCurrentItems([...items, ...itemsConfig.callback(result)]);
        } else if (Array.isArray(result)) {
          setCurrentItems([...items, ...result]);
        } else {
          console.error('The response is not an array; a callback function is required.');
        }
        fieldRef.current.onChange(value);
      } else {
        console.error('Only codeGroup and api are supported as item types.');
      }
    }
  };

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (itemsConfig && itemsConfig.type === 'target') {
      changeItems();
    }
  }, [watchedValue, fieldRef]);

  useEffect(() => {
    if (itemsConfig && itemsConfig.type === 'self') {
      initItems();
    }
  }, [itemsConfig]);
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
                  {t(
                    currentItems.find((item) => item.code.trim() === value)?.name ||
                      'Select an option',
                  )}
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
                      {t(item.name)}
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
