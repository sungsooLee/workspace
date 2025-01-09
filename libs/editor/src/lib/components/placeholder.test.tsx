import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Placeholder from './placeholder';

describe('Placeholder 컴포넌트', () => {
  it('기본 플레이스홀더 텍스트가 올바르게 렌더링되는지 확인', () => {
    render(<Placeholder />);
    const placeholderElement = screen.getByText('Start typing...');
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveStyle({ color: '#aaa' });
  });

  it('전달된 placeholder 텍스트가 올바르게 렌더링되는지 확인', () => {
    const customPlaceholder = 'Custom Placeholder';
    render(<Placeholder placeholder={customPlaceholder} />);
    const placeholderElement = screen.getByText(customPlaceholder);
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveStyle({ color: '#aaa' });
  });
});
