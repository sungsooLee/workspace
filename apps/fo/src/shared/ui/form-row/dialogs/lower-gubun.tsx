import { FC, useEffect, useMemo } from 'react';
import { Button, FormRadioGroup, Input } from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';

const LowerGubunComponent: FC<any> = ({
  onFormChange,
  watch,
  value,
  onChange,
  formData,
  onFocus,
  testName,
}) => {
  const urlDisabled = useMemo<boolean>(() => value.gubun !== '02', [value]);
  const title = watch('title');
  const handleChannelNameChange = () => {
    onFormChange({ channel: '채널명을 변경했습니다..' });
  };

  const handleFocusChange = () => {
    onFocus('channel');
  };
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <FormRadioGroup
        value={value.gubun}
        options={[
          {
            value: '01',
            label: '사내',
          },
          {
            value: '02',
            label: '사외',
          },
        ]}
        onChange={(newValue: any) =>
          onChange({
            ...value,
            gubun: newValue,
            select: [],
            url: '',
          })
        }
      />
      (
      <FormCheckboxGroup
        disabled={urlDisabled}
        value={value.select}
        options={[
          {
            value: '01',
            label: '사내',
          },
          {
            value: '02',
            label: '사외',
          },
        ]}
        onChange={(newValue: any) =>
          onChange({
            ...value,
            select: newValue,
          })
        }
      />
      <Input
        value={value.url}
        disabled={urlDisabled}
        onChange={(newValue: any) =>
          onChange({
            ...value,
            url: newValue,
          })
        }
      />
      )
      <Button type="button" variant="point" size="sm" onClick={handleChannelNameChange}>
        채널 값 변경
      </Button>
      <Button type="button" variant="point" size="sm" onClick={handleFocusChange}>
        포커스
      </Button>
      <span>제목에 정답 입력시 출력되는 문구 : {title === '정답' && '정답이 입력되었습니다.'}</span>
      <span>{formData.title}</span>
    </div>
  );
};

export const LowerGubun = LowerGubunComponent;
