import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { useToast, ToastWrapper, Button } from '@learnway/ui';

// Toast 테스트를 위한 래퍼 컴포넌트
const ToastTester = ({
  swipeDirection,
  duration,
  toastTitle = 'Toast 제목',
  toastDescription = 'Toast 설명입니다.',
  toastSize = 'medium',
  autoTrigger = false,
  showCloseButton = true,
}: {
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  toastTitle?: string;
  toastDescription?: string;
  toastSize?: 'small' | 'medium' | 'large';
  autoTrigger?: boolean;
  showCloseButton?: boolean;
}) => {
  const { open, closeAll } = useToast();

  const handleShowToast = () => {
    const config = {
      title: toastTitle,
      description: toastDescription,
      size: toastSize,
      showCloseButton,
    };

    open(config);
  };

  useEffect(() => {
    if (autoTrigger) {
      closeAll();
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Button onClick={handleShowToast} variant="primary" size="lg">
          Toast 표시
        </Button>
      </div>

      <ToastWrapper swipeDirection={swipeDirection} duration={duration} />
    </div>
  );
};

const meta = {
  title: 'Bo-Components/Toast',
  component: ToastTester,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Toast 컴포넌트입니다. 다양한 위치, 크기, 타입을 테스트할 수 있습니다.',
      },
    },
  },
  argTypes: {
    swipeDirection: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'],
      description: 'Toast가 스와이프되어 사라지는 방향',
    },
    duration: {
      control: { type: 'range', min: 1000, max: 10000, step: 500 },
      description: 'Toast 자동 사라짐 시간 (밀리초)',
    },

    toastTitle: {
      control: { type: 'text' },
      description: 'Toast 제목',
    },
    toastDescription: {
      control: { type: 'text' },
      description: 'Toast 설명',
    },
    toastSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Toast 크기',
    },
    autoTrigger: {
      control: { type: 'boolean' },
      description: '스토리 로드 시 자동으로 Toast 표시',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: '닫기 버튼 표시 여부',
    },
  },
} satisfies Meta<typeof ToastTester>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Toast
export const Default: Story = {
  args: {
    swipeDirection: 'down',
    duration: 3000,
    toastTitle: '성공!',
    toastDescription: '작업이 성공적으로 완료되었습니다.',
    toastSize: 'medium',
    autoTrigger: false,
    showCloseButton: true,
  },
};

// 크기별 Toast
export const SmallSize: Story = {
  args: {
    ...Default.args,
    toastSize: 'small',
    toastTitle: '작은 Toast',
    toastDescription: '작은 크기의 Toast입니다.',
    autoTrigger: true,
  },
};

export const MediumSize: Story = {
  args: {
    ...Default.args,
    toastSize: 'medium',
    toastTitle: '보통 Toast',
    toastDescription: '보통 크기의 Toast입니다.',
    autoTrigger: true,
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    toastSize: 'large',
    toastTitle: '큰 Toast',
    toastDescription: '큰 크기의 Toast입니다. 더 많은 내용을 포함할 수 있습니다.',
    autoTrigger: true,
  },
};

// 지속 시간 테스트
export const ShortDuration: Story = {
  args: {
    ...Default.args,
    duration: 1500,
    toastTitle: '짧은 지속시간',
    toastDescription: '1.5초 후 자동으로 사라집니다.',
    autoTrigger: true,
  },
};

export const LongDuration: Story = {
  args: {
    ...Default.args,
    duration: 8000,
    toastTitle: '긴 지속시간',
    toastDescription: '8초 후 자동으로 사라집니다.',
    autoTrigger: true,
  },
};

// 닫기 버튼 없는 Toast
export const WithoutCloseButton: Story = {
  args: {
    ...Default.args,
    showCloseButton: false,
    toastTitle: '닫기 버튼 없음',
    toastDescription: '닫기 버튼이 없는 Toast입니다.',
    autoTrigger: true,
  },
};
