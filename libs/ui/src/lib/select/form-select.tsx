import React from 'react';
import { Select } from './select';

const FormSelectComponent: FC<any> = ({ itemsConfig, watch, options }) => {
  const watchedValue =
    itemsConfig && itemsConfig.type === 'target' ? watch(itemsConfig.target) : null;

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

  return (
    <Select
      selectedValue={''}
      onChange={() => {}}
      options={[
        {
          label: 'label0',
          value: 'value0',
        },
        {
          label: 'label1',
          value: 'value1',
        },
        {
          label: 'label2',
          value: 'value2',
        },
        {
          label: 'label3',
          value: 'value3',
        },
        {
          label: 'label4',
          value: 'value4',
        },
      ]}
    />
  );
};

export const FormSelect = FormSelectComponent;
