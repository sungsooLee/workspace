import { forwardRef, useEffect } from 'react';
import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

export const DuplicateCodeGuideText = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  (
    {
      name,
      value,
      onChange,
      getValues,
      clearFormError,
      onFormChange,
      checkExists,
      isSuccess,
      disabled,
      codeCheckState,
      handleCodeChange,
      setFormError,
    },
    ref,
  ) => {
    const { onChangeGuideText } = useDynamicFormContext();
    useEffect(() => {
      switch (codeCheckState) {
        case 'success':
          onChangeGuideText(<span style={{ color: 'blue' }}>사용할 수 있는 메뉴 코드입니다.</span>);
          break;
        case 'duplicate':
          onChangeGuideText(<span style={{ color: 'red' }}>이미 사용 중인 메뉴 코드입니다.</span>);
          break;
        case 'error':
          onChangeGuideText(
            <span style={{ color: 'red' }}>중복 확인 중 오류가 발생했습니다.</span>,
          );
          break;
        // case 'none':
        // default:
        //   onChangeGuideText('코드 입력 후 중복 버튼을 눌러 중복 확인을 해주세요.');
      }
    }, [codeCheckState, onChangeGuideText]);

    useEffect(() => {
      return () => {
        onChangeGuideText('');
      };
    }, [onChangeGuideText]);

    return (
      <div className="flex w-full gap-x-2" ref={ref}>
        <Input
          value={value}
          onChange={(e: any) => {
            onChange(e.target.value);
            handleCodeChange(e.target.value);
            // if (onFormChange) {
            //   onFormChange({ isDuplicateMenuCode: false });
            //   setCodeCheckState('none');
            // }
          }}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="gray"
          size="sm"
          disabled={disabled}
          onClick={() => {
            const { code, parentKey } = getValues();

            // Validate code before checking
            if (!code) {
              clearFormError(name);
              setFormError?.('code', '메뉴 코드를 입력해주세요.');
              return;
            }

            const data = {
              menuCode: code,
              parentId: parentKey,
            };

            // Clear any existing errors and perform the check
            clearFormError && clearFormError(name);
            checkExists?.(data);
          }}
        >
          중복
        </Button>
      </div>
    );
  },
);
