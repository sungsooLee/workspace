// BaseForm.stories.tsx
import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressCheck, ProgressDonut, Spinner } from '@learnway/ui';

export default {
  title: 'Bo-Components/Progress',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Progress Indicator
**주요 기능**:
- 동작이 즉각 실행되지 못하고 일정 시간 이상 걸릴 경우, 대기를 위한 피드백을 제공하기 위해 사용한다.
- 파일 및 데이터를 불러올 때 사용되며, 진행 상태를 시각적으로 표현한다. 
- Linear의 경우 세부정보는 상단 좌측, circle의 경우 하단 중앙에 추가 가능하다.
- 진행상태에 따라 컬러 변경을 통해 구분이 필요하다. 기본색(blue), 전체의 90% 이상 도달시 색 변경(red), 100% 도달시 색 변경(green)

        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof ProgressBar>;

// Progress (bar)
export const TemplateBar: any = (args: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <ProgressBar progress={progress} isFailed={args.isFailed} label={args.label} />
      <ProgressBar {...args} />
    </>
  );
};
TemplateBar.storyName = 'Progress (bar)';
TemplateBar.args = {
  progress: 50,
  isFailed: false,
  label: 'Progress (bar)',
};

// Spinner
export const TemplateDonut: any = (args: any) => {
  return <Spinner isLoading={true} />;
};
TemplateDonut.storyName = 'Spinner';
TemplateDonut.args = {
  progress: 80,
  isFailed: false,
  size: 50,
  label: 'Spinner',
};

// Progress (check)
export const TemplateCheck: any = (args: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <ProgressCheck progress={progress} {...args} />;
};
TemplateCheck.storyName = 'Progress (check)';
TemplateCheck.args = {
  isFailed: false,
  size: 50,
  label: 'Progress (check)',
};
