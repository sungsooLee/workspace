import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StarRating } from '@learnway/ui';
import { IcoStar, IcoStar02 } from '@learnway/icons';

export default {
  title: 'Bo-Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} as Meta<typeof StarRating>;

type Story = StoryObj<typeof StarRating>;

// 아이콘 테스트
export const IconTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h3>아이콘 테스트:</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <IcoStar style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
        <IcoStar02 style={{ width: '20px', height: '20px', color: '#d1d5db' }} />
        <span>아이콘이 표시되나요?</span>
      </div>
      <div>
        <h4>StarRating 컴포넌트:</h4>
        <StarRating value={3} size="md" />
      </div>
    </div>
  ),
};

// 기본 사용법
const DefaultComponent = (args: any) => {
  const [rating, setRating] = useState(args.value || 0);

  return (
    <div style={{ padding: '20px' }}>
      <h3>기본 StarRating</h3>
      <div>
        <p style={{ marginBottom: '10px', color: '#666' }}>현재 별점: {rating}점</p>
        <StarRating {...args} value={rating} onChange={setRating} />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DefaultComponent {...args} />,
  args: {
    value: 0,
    size: 'md',
    animated: true,
  },
};

// 크기별 예시
export const Sizes: Story = {
  render: () => {
    const [ratings, setRatings] = useState({ sm: 2, md: 3, lg: 4 });

    return (
      <div style={{ padding: '20px' }}>
        <h3>크기별 StarRating</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4>Small (sm)</h4>
            <StarRating
              size="sm"
              value={ratings.sm}
              onChange={(value) => setRatings((prev) => ({ ...prev, sm: value }))}
            />
          </div>

          <div>
            <h4>Medium (md)</h4>
            <StarRating
              size="md"
              value={ratings.md}
              onChange={(value) => setRatings((prev) => ({ ...prev, md: value }))}
            />
          </div>

          <div>
            <h4>Large (lg)</h4>
            <StarRating
              size="lg"
              value={ratings.lg}
              onChange={(value) => setRatings((prev) => ({ ...prev, lg: value }))}
            />
          </div>
        </div>
      </div>
    );
  },
};

// 읽기 전용 모드
export const ReadOnly: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h3>읽기 전용 StarRating</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <span style={{ marginRight: '10px' }}>1점:</span>
          <StarRating value={1} readonly size="md" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>2점:</span>
          <StarRating value={2} readonly size="md" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>3점:</span>
          <StarRating value={3} readonly size="md" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>4점:</span>
          <StarRating value={4} readonly size="md" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>5점:</span>
          <StarRating value={5} readonly size="md" />
        </div>
      </div>
    </div>
  ),
};
