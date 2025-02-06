import { FC, useEffect, useCallback, useRef, useState } from 'react';
import { DialogItem, DialogProps } from '../search-box/type';
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

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 아이템 초기화 및 업데이트 함수 (self, target 둘 다 처리)
  const loadItems = useCallback(async () => {
    try {
      if (!itemsConfig) return;

      let newItems: DialogItem[] = [...items]; // 기본 아이템 유지

      if (itemsConfig.type === 'self') {
        // self 타입의 경우: codeGroup 또는 API 처리
        if (itemsConfig.codeGroup) {
          const codes = ((data as any)[itemsConfig.codeGroup]?.codes || []) as DialogItem[];
          newItems = [
            ...newItems,
            ...codes.map((lang) => ({
              ...lang,
              name: t(lang.name || ''),
            })),
          ];
        } else if (itemsConfig.api) {
          const result = await queryClient.fetchQuery(itemsConfig.api());

          // callback이 있으면 적용, 없으면 그대로 추가
          newItems = itemsConfig.callback
            ? [...newItems, ...itemsConfig.callback(result)]
            : Array.isArray(result)
              ? [...newItems, ...result]
              : (() => {
                  console.error('The response is not an array; a callback function is required.');
                  return newItems;
                })();
        }
      } else if (itemsConfig.type === 'target' && watchedValue) {
        // target 타입의 경우: watchedValue에 따라 아이템 변경
        if (itemsConfig.codeGroup) {
          const parentCodes = (data as any)[itemsConfig.codeGroup]?.codes || [];
          const findParent = parentCodes.find((pc: any) => pc.code === watchedValue)?.codes || [];
          newItems = [...newItems, ...findParent];
        } else if (itemsConfig.api) {
          const result = await queryClient.fetchQuery(itemsConfig.api(watchedValue));

          // callback이 있으면 적용, 없으면 그대로 추가
          newItems = itemsConfig.callback
            ? [...newItems, ...itemsConfig.callback(result)]
            : Array.isArray(result)
              ? [...newItems, ...result]
              : (() => {
                  console.error('The response is not an array; a callback function is required.');
                  return newItems;
                })();
        }
      }

      setCurrentItems(newItems);

      // 처음 로드 시, 첫 번째 값을 기본값으로 설정 (onChange 호출)
      if (fieldRef.current.onChange) {
        fieldRef.current.onChange(newItems[0]?.code || '');
      }
    } catch (error) {
      console.error('Failed to load items:', error);
    }
  }, [itemsConfig, items, data, watchedValue, t, queryClient]);

  // `itemsConfig` 초기 세팅 로직
  useEffect(() => {
    loadItems();
  }, [itemsConfig, watchedValue]);

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
