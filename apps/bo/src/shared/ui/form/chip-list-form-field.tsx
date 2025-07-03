import { forwardRef } from 'react';
import { ChipList, ChipListComponentProps } from '@learnway/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';
import { isString } from 'lodash';

export interface ChipListFormFieldProps extends BaseFormFieldProps<string[]> {
  /** 입력 제한에 대한 안내 문구입니다. 예: "최대 {limitSize}개까지 입력 가능". */
  limitPlaceholder?: string;
  /** 각 칩 앞에 표시할 접두사 문자입니다. */
  prefixCharacter?: string;
  /** 허용되는 최대 칩 개수입니다. `limitPlaceholder`에 사용될 수 있습니다. */
  limitSize?: number;
  /** `<ChipList>` 컴포넌트에 전달할 추가적인 설정 객체입니다. */
  chipListConfig?: ChipListComponentProps;
}

/**
 * 공통 ChipListFormField
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChipListFormFieldComponent = forwardRef<HTMLDivElement, ChipListFormFieldProps>(
  (
    { value = [], onChange, placeHolder, limitPlaceholder, limitSize = 200, chipListConfig },
    ref,
  ) => {
    /**
     * 입력 필드에서 Enter 키를 눌렀을 때 호출되는 함수입니다.
     * 입력된 텍스트가 기존 값 배열에 중복되지 않는 경우, 새로운 칩을 추가하고 `onChange` 콜백 함수를 호출합니다.
     * value 가 Array<string> 형태만 해당 함수 사용 해야함
     * @function handleAddInputEnterKeyDown
     * @param {string} text - 입력된 텍스트 값
     * @returns {void}
     */
    const handleAddInputEnterKeyDown = (text: string) => {
      // 중복 아닌 경우
      if (!value?.includes(text)) {
        const newValue = [...value, text];
        onChange(newValue);
      }
    };

    /**
     * 칩의 삭제 버튼을 클릭했을 때 호출되는 함수입니다.
     * 삭제할 칩의 값 또는 객체를 받아, `value` 배열에서 해당 칩을 제거하고 `onChange` 콜백 함수를 호출합니다.
     * `chipListConfig`에 `valueField`가 설정되어 있다면 객체 형태로 된 칩을 삭제 처리합니다.
     * @function handlerChipDelete
     * @param {string | any} option - 삭제할 칩의 값 (string) 또는 객체
     * @returns {void}
     */
    const handlerChipDelete = (option: any) => {
      const valueField = chipListConfig?.valueField || 'value';
      const newValue = isString(option)
        ? value?.filter((d: string) => d !== option)
        : value?.filter((d: any) => d[valueField] !== option?.[valueField]);
      onChange(newValue);
    };

    return (
      <div ref={ref} className={formStyles.tag_wrap}>
        <ChipList
          {...chipListConfig}
          className={formStyles.chips_wrap}
          options={value}
          // options={value.map((val) => ({ value: val, label: val }))}
          placeholder={placeHolder}
          hideBorder
          onAddInputEnterKeyDown={handleAddInputEnterKeyDown}
          onChipDeleteClick={handlerChipDelete}
        />
        {limitPlaceholder && (
          <p className={formStyles.text_limit}>
            {limitPlaceholder},<em className={formStyles.num}>{value?.length || 0}개</em>/
            {limitSize}개
          </p>
        )}
      </div>
    );
  },
);
export const ChipListFormField = ChipListFormFieldComponent;
