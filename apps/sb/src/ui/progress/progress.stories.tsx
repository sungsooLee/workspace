// BaseForm.stories.tsx
import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressCheck, ProgressDonut } from '@learnway/ui';

export default {
  title: 'Components/Progress',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof ProgressBar>;

// Progress (bar)
export const TemplateBar: any = (args: any) => {
  return <ProgressBar progress={50} />;
};
TemplateBar.storyName = 'Progress (bar)';

// Progress (donut)
export const TemplateDonut: any = (args: any) => {
  return <ProgressDonut progress={50} />;
};
TemplateDonut.storyName = 'Progress (donut)';

// Progress (check)
export const TemplateCheck: any = (args: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 의존성 배열을 빈 배열로 두어 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  return <ProgressCheck progress={progress} />;
};
TemplateCheck.storyName = 'Progress (check)';
