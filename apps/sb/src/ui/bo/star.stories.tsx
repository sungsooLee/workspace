import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Star, StarProps } from '@learnway/ui';

export default {
  title: 'Bo-Components/Star',
  component: Star,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} as Meta<typeof Star>;

type Story = StoryObj<typeof Star>;

// 기본 사용법
const DefaultComponent = (args: StarProps) => {
  const [rating, setRating] = useState(args.value || 0);

  return (
    <div style={{ padding: '20px' }}>
      <h3>기본 Star 컴포넌트</h3>
      <div>
        <p style={{ marginBottom: '10px', color: '#666' }}>현재 별점: {rating}점</p>
        <Star {...args} value={rating} onChange={setRating} />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args: StarProps) => <DefaultComponent {...args} />,
  args: {
    value: 3,
    size: 24,
    total: 5,
  },
};

// 크기별 예시
export const Sizes: Story = {
  render: function SizeStory() {
    const [ratings, setRatings] = useState({ small: 2, medium: 3, large: 4 });

    return (
      <div style={{ padding: '20px' }}>
        <h3>크기별 Star</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4>Small (16px)</h4>
            <Star
              size={16}
              value={ratings.small}
              onChange={(value: number) => setRatings((prev) => ({ ...prev, small: value }))}
            />
          </div>

          <div>
            <h4>Medium (24px)</h4>
            <Star
              size={24}
              value={ratings.medium}
              onChange={(value: number) => setRatings((prev) => ({ ...prev, medium: value }))}
            />
          </div>

          <div>
            <h4>Large (32px)</h4>
            <Star
              size={32}
              value={ratings.large}
              onChange={(value: number) => setRatings((prev) => ({ ...prev, large: value }))}
            />
          </div>

          <div>
            <h4>Extra Large (48px)</h4>
            <Star size={48} value={3} />
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
      <h3>읽기 전용 Star</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <span style={{ marginRight: '10px' }}>1점:</span>
          <Star value={1} readonly size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>2점:</span>
          <Star value={2} readonly size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>3점:</span>
          <Star value={3} readonly size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>4점:</span>
          <Star value={4} readonly size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>5점:</span>
          <Star value={5} readonly size={24} />
        </div>
      </div>
    </div>
  ),
};

// 다양한 색상
export const Colors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h3>다양한 색상의 Star</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <span style={{ marginRight: '10px' }}>기본 색상:</span>
          <Star value={3} size={24} activeColor="#FFB800" inactiveColor="#E5E5E5" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>빨간색:</span>
          <Star value={3} size={24} activeColor="#FF5252" inactiveColor="#FFCDD2" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>파란색:</span>
          <Star value={3} size={24} activeColor="#2196F3" inactiveColor="#BBDEFB" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>녹색:</span>
          <Star value={3} size={24} activeColor="#4CAF50" inactiveColor="#C8E6C9" />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>보라색:</span>
          <Star value={3} size={24} activeColor="#9C27B0" inactiveColor="#E1BEE7" />
        </div>
      </div>
    </div>
  ),
};

// 별 개수
export const NumberOfStars: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h3>다양한 별 개수</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <span style={{ marginRight: '10px' }}>3개 별:</span>
          <Star total={3} value={2} size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>5개 별 (기본):</span>
          <Star total={5} value={3} size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>7개 별:</span>
          <Star total={7} value={4} size={24} />
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>10개 별:</span>
          <Star total={10} value={6} size={24} />
        </div>
      </div>
    </div>
  ),
};

// 인터랙티브 예제
export const Interactive: Story = {
  render: function InteractiveStory() {
    const [value, setValue] = useState(3);

    return (
      <div style={{ padding: '20px' }}>
        <h3>인터랙티브 Star</h3>
        <p style={{ marginBottom: '10px', color: '#666' }}>별을 클릭해서 평가해보세요.</p>
        <p style={{ marginBottom: '10px', color: '#666' }}>현재 값: {value}점</p>
        <Star value={value} onChange={setValue} size={32} />
      </div>
    );
  },
};
