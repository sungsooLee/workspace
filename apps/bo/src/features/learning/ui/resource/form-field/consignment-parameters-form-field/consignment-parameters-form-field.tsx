import React, { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './consignment-parameters-form-field.module.css';
import { useTranslation } from 'react-i18next';

interface ConsignmentParameterProp {
  name: string;
  value: string;
  fixed?: boolean;
}

interface ConsignmentParametersFormFieldPros
  extends BaseFormFieldProps<ConsignmentParameterProp[]> {
  dummy?: string;
}

const ConsignmentParametersFormFieldComponent = forwardRef<
  HTMLDivElement,
  ConsignmentParametersFormFieldPros
>(({ value, onChange }, ref) => {
  const { t } = useTranslation();
  const parameters = mergeValueIntoFixedParameters(value, fixedParameters);

  const handleAddButtonClick = () => {
    const newValue = [...parameters, { name: '', value: '' }];
    onChange(newValue);
  };

  const handleInputChange = (index: number, key: keyof ConsignmentParameterProp, text: string) => {
    const newValue = [...parameters];
    newValue[index] = { ...newValue[index], [key]: text };
    onChange(newValue);
  };

  return (
    <div ref={ref} className={cn(styles.start)}>
      {/* 고정 parameters */}
      {parameters.map((d: ConsignmentParameterProp, index: number) => (
        <div key={index} className={'flex w-full flex-row gap-2'}>
          <Input
            value={d.name}
            disabled={d.fixed}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, 'name', event.target.value)
            }
          />
          <Input
            value={d.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, 'value', event.target.value)
            }
          />
        </div>
      ))}
      {/* 추가 버튼 */}
      <Button variant={'point'} size={'lg'} label={t('추가')} onClick={handleAddButtonClick} />
      {/* 삭제버튼 기획에 없음  */}
    </div>
  );
});

export const ConsignmentParametersFormField = ConsignmentParametersFormFieldComponent;

const mergeValueIntoFixedParameters = (
  value: ConsignmentParameterProp[],
  fixedParameters: ConsignmentParameterProp[],
) => {
  const parameters = fixedParameters.map((d: ConsignmentParameterProp) => {
    const valueItem = value?.find((v: ConsignmentParameterProp) => v.name === d.name);
    const newItem = valueItem || d;
    return {
      ...newItem,
      fixed: true,
    };
  });
  const userParameters = value?.filter((d: ConsignmentParameterProp) => !d.fixed);
  return [...parameters, ...userParameters];
};

// 고정 parameter 어디서 받을지 논의
const fixedParameters = [
  { name: '업체과정코드', value: '', fixed: true },
  { name: '아이디', value: '', fixed: true },
  { name: '사번', value: '', fixed: true },
  { name: '이름', value: '', fixed: true },
  { name: '회사코드', value: '', fixed: true },
  { name: '과정코드', value: '', fixed: true },
  { name: '학습시작일', value: '', fixed: true },
  { name: '교육그룹', value: '', fixed: true },
  { name: '수강신청 이메일', value: '', fixed: true },
  { name: '수강신청 연락처', value: '', fixed: true },
  { name: '파라미터명', value: '', fixed: true },
];
