import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, InputTimer } from '@learnway/ui';
import { useState } from 'react';
import { cn } from '../../../../../libs/shared/src';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { IcoFormRequired } from '../../../../../libs/icons/src';

const meta: Meta<typeof Input> = {
  title: 'Bo-Components/TextField',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Input 컴포넌트는 다양한 타입의 사용자 입력을 받는 폼 요소입니다.

**주요 기능**:
- 다양한 타입 지원 (text, number, mask, password, tel, file)
- 숫자 천단위 구분자 지원
- 마스크 패턴 지원
- 검색 아이콘 기능
- 글자수 제한 및 표시
- 에러 상태 표시
- 단위 텍스트 표시
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'mask', 'password', 'tel', 'file'],
      description: 'Input의 타입',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: '읽기 전용 상태',
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    maxLength: {
      control: { type: 'number' },
      description: '최대 입력 가능 글자수',
    },
    unitText: {
      control: { type: 'text' },
      description: '단위 텍스트',
    },
    showSearchIcon: {
      control: { type: 'boolean' },
      description: '검색 아이콘 표시 여부',
    },

    onChange: {
      action: 'changed',
      table: { disable: true },
    },
    onFocus: {
      action: 'focused',
      table: { disable: true },
    },
    onBlur: {
      action: 'blurred',
      table: { disable: true },
    },
    onEnterKeyDown: {
      action: 'enter-pressed',
      table: { disable: true },
    },
    onKeyDown: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    mask: {
      control: false,
      description: '마스크 패턴 (mask 타입에서 사용)',
    },
    format: {
      control: false,
      description: '포맷 패턴 (mask 타입에서 사용)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 Interactive 스토리
export const Interactive: Story = {
  args: {
    type: 'text',
    placeholder: '값을 입력하세요.',
  },
};
const InputWrapper = ({
  initialValue = '',
  label = 'label',
  required = false,
  errorMessage = '',
  guideText = '',
  showError = false,
  tooltip = false,
  type = 'text',
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [hasError, setHasError] = useState(showError);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (required) {
      setHasError(newValue.length === 0);
    }
  };

  return (
    <div className={cn(styles.form_item)}>
      {label && (
        <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
          <span className={styles.form_text}>{label}</span>
          {required && (
            <span
              className={cn(styles.status, {
                [styles.error]: showError, // 에러 발생 시 에러 스타일 적용
                [styles.required]: !showError, // 에러가 없으면 필수 스타일 적용
              })}
            >
              <IcoFormRequired width={8} height={8} />
            </span>
          )}
        </label>
      )}

      <Input
        {...props}
        type={type as 'text' | 'number' | 'mask' | 'password' | 'tel' | 'file'}
        value={value}
        onChange={handleChange}
        error={hasError || showError}
      />

      {(hasError || showError) && errorMessage && (
        <p className={cn(styles.guide_text, styles.error, 'dynamic-form-field-error')}>
          {errorMessage}
        </p>
      )}
      {!hasError && !showError && guideText && <p className={cn(styles.guide_text)}>{guideText}</p>}
    </div>
  );
};

export const DefaultStateMatrix: Story = {
  render: () => {
    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">상태: Default</h2>

        {/* 설명 */}
        <div className="mb-6 text-sm text-gray-600">
          <ul className="list-inside list-disc space-y-1">
            <li>Text Field는 Input Text, 또는 Placeholder가 노출된다.</li>
            <li>
              Text Field 외 영역, Placeholder를 클릭하면 입력 필드에는 Placeholder는 사라진다.
            </li>
            <li>안내문은 Text Field 하단에 배치한다.</li>
            <li>Text Field에 1자 이상 입력 시, Focus내 최 우측에 전체 삭제 아이콘을 노출된다.</li>
            <li>입력 중인 Text Field 영역보다 길게 입력되는 경우, 앞 글자부터 숨겨진다.</li>
            <li>입력 완료 후 앞 글자부터 보여지며, 숨겨진 뒷 글자는 '...'으로 표기한다.</li>
            <li>입력 후 입력값을 삭제할 수 있는 삭제 버튼이 노출되지 않는다.</li>
          </ul>
        </div>

        <div className="mb-4 grid grid-cols-5 gap-4">
          <div className="text-center font-semibold">Type</div>
          <div className="text-center font-semibold">입력 전</div>
          <div className="text-center font-semibold">입력 후</div>
          <div className="text-center font-semibold">안내문이 있을 경우</div>
        </div>

        <div className="mb-4 grid grid-cols-5 items-center gap-4">
          <div className="font-medium">Text</div>
          <div>
            <InputWrapper type="text" label="label" placeholder="Text" />
          </div>
          <div>
            <InputWrapper type="text" initialValue="Text" />
          </div>
          <div>
            <InputWrapper
              type="text"
              placeholder="Text"
              initialValue="Text"
              maxLength={20}
              guideText="가이드 텍스트 입니다."
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-5 items-center gap-4">
          <div className="font-medium">Long Text</div>
          <div>
            <InputWrapper type="text" placeholder="텍스트를 입력하세요" />
          </div>
          <div>
            <InputWrapper type="text" initialValue="매우 긴 텍스트가 입력된 경우의 예시입니다" />
          </div>
          <div>
            <InputWrapper
              type="text"
              initialValue="매우 긴 텍스트가 입력된 경우의 예시입니다"
              maxLength={50}
              guideText="가이드 텍스트 입니다."
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 Input을 다양한 입력 상황별로 보여줍니다.',
      },
    },
  },
};

export const ErrorStateMatrix: Story = {
  render: () => {
    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">상태: Error</h2>

        <div className="mb-6 text-sm text-gray-600">
          <ul className="list-inside list-disc space-y-1">
            <li>
              입력 값에 해당하는 검색값을 찾으면 해당 List에 적용 할 수 없을 때 해당 오류를
              노출한다.
            </li>
            <li>
              Error 발생 시 아래 안내를 받은 후 버튼을 차량의 키보드는 적색, 폰 UI 붙인 Value로 강조
              표시된다.
            </li>
            <li>
              더 많이 받는 안내를 받은 모든 버튼의 값이 Error 발생 시 Text Field는 초기화된다.
            </li>
            <li>할 해당 텍스트 후 에러 Error 발생 시 첫 번째 Error Text Field가 Selected된다.</li>
          </ul>
        </div>

        <div className="mb-4 grid grid-cols-4 gap-4">
          <div className="text-center font-semibold">Type</div>
          <div className="text-center font-semibold">Error 입력 전</div>
          <div className="text-center font-semibold">Error 표시</div>
        </div>

        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          <div className="font-medium">Text Error</div>
          <div>
            <InputWrapper type="text" value="" showError={true} />
          </div>
          <div className="space-y-2">
            <InputWrapper
              type="text"
              initialValue="Error"
              showError={true}
              errorMessage="에러 메시지가 표시됩니다"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          <div className="font-medium">Number Error</div>
          <div>
            <InputWrapper
              type="number"
              placeholder="숫자를 입력하세요"
              initialValue=""
              showError={true}
            />
          </div>
          <div className="space-y-2">
            <InputWrapper
              type="number"
              initialValue="잘못된숫자"
              showError={true}
              errorMessage="에러 메시지가 표시됩니다"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '에러 상태의 Input을 다양한 상황별로 보여줍니다. error prop을 true로 설정하면 빨간 테두리가 표시됩니다.',
      },
    },
  },
};

export const RequiredStateMatrix: Story = {
  render: () => {
    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">상태: Required</h2>

        <div className="mb-6 text-sm text-gray-600">
          <p>
            타 항목과의 확실한 구분을 위해 필수 입력 항목의 Label 우측에 ‘*’를 노출하는 것을
            원칙으로 한다.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <InputWrapper type="text" placeholder="Text" initialValue="" required={true} />
          </div>
          <div>
            <InputWrapper type="text" placeholder="Text" initialValue="Text" required={true} />
          </div>
          <div>
            <InputWrapper
              type="text"
              placeholder="Text"
              initialValue=""
              showError={true}
              required={true}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const TemplateTimer: any = (args: any) => {
  const [value, setValue] = useState('');
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const [startTimer, setStartTimer] = useState(0);
  return (
    <>
      <div className={'mb-5 flex flex-row gap-3'}>
        <Button
          label={'타이머 시작'}
          variant={'point'}
          size={'sm'}
          onClick={() => setStartTimer((prev) => prev + 1)}
        />
        <Button
          label={'타이머 종료'}
          variant={'point'}
          size={'sm'}
          onClick={() => setStartTimer(0)}
        />
      </div>
      <InputTimer
        {...args}
        value={value}
        startTimer={startTimer}
        initialTime={300}
        onTimerEnd={() => alert('End Timer')}
        onChange={handleChange}
      />
    </>
  );
};

// Field 내 텍스트 (단위, 타이머 등)
export const FieldTextMatrix: Story = {
  render: () => {
    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Field 내 텍스트</h2>

        <div className="mb-6 text-sm text-gray-600">
          <p>필드 내 관련 텍스트가 필요할 경우 필드 안에 배치한다.</p>
        </div>

        <div className="flex flex-col">
          <div>
            <InputWrapper
              type="number"
              label="Unit Text"
              placeholder="0"
              initialValue="1000"
              unitText="원"
            />
          </div>
          <div>
            <InputWrapper type="text" label="Unit Text" placeholder="0" unitText="코드" />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input 필드 내에 표시되는 다양한 텍스트와 아이콘들을 보여줍니다.',
      },
    },
  },
};

export const TypeExamples: Story = {
  render: () => {
    return (
      <div className="space-y-8 p-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">다양한 Input 타입</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <InputWrapper
                label={'Text Input'}
                type="text"
                placeholder="텍스트를 입력하세요"
                maxLength={20}
              />
            </div>

            <div>
              <InputWrapper
                label={'Number Input '}
                type="number"
                placeholder="숫자를 입력하세요"
                thousandSeparator={true}
              />
            </div>

            <div>
              <InputWrapper
                label={'Password Input'}
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div>
              <InputWrapper
                label={'Mask Input (전화번호)'}
                type="mask"
                format="###-####-####"
                mask="_"
                placeholder="010-0000-0000"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 타입의 Input 사용 예시입니다.',
      },
    },
  },
};

export const StateComparison: Story = {
  render: () => {
    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">모든 상태 비교</h2>

        <div className="mb-4 grid grid-cols-5 gap-4">
          <div className="text-center font-semibold">상태</div>
          <div className="text-center font-semibold">Normal</div>
          <div className="text-center font-semibold">Disabled</div>
          <div className="text-center font-semibold">Error</div>
        </div>

        <div className="mb-4 grid grid-cols-5 items-center gap-4">
          <div className="font-medium">Default</div>
          <InputWrapper type="text" placeholder="Normal" value="" />
          <InputWrapper type="text" placeholder="Disabled" value="" disabled />
          <InputWrapper type="text" placeholder="Error" value="" showError />
        </div>

        <div className="mb-4 grid grid-cols-5 items-center gap-4">
          <div className="font-medium">With Value</div>
          <InputWrapper type="text" initialValue="Sample Text" />
          <InputWrapper type="text" initialValue="Sample Text" disabled />
          <InputWrapper type="text" initialValue="Sample Text" showError />
        </div>

        <div className="mb-4 grid grid-cols-5 items-center gap-4">
          <div className="font-medium">Read Only</div>
          <InputWrapper type="text" initialValue="Read Only" readOnly />
          <InputWrapper type="text" initialValue="Read Only" readOnly disabled />
          <InputWrapper type="text" initialValue="Read Only" readOnly showError />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모든 Input 상태를 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
