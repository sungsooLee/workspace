import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Editor from './editor';
import { userEvent } from '@storybook/testing-library';

describe('Editor 컴포넌트', () => {
  it('툴바가 올바르게 렌더링되는지 확인', () => {
    render(<Editor />);
    const toolbar = screen.getByText('hello');
    expect(toolbar).toBeInTheDocument();
  });

  it('에디터의 플레이스홀더가 렌더링되는지 확인', () => {
    render(<Editor />);
    const placeholder = screen.getByText('Start typing...');
    expect(placeholder).toBeInTheDocument();
  });
});


