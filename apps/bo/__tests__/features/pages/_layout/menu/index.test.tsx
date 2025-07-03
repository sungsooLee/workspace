import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
// 실제 LayoutComponent와 Route를 import (경로는 실제 프로젝트 구조에 맞게 조정)
import { Route } from '../../../../../src/pages/_layout/menu/index';

// @tanstack/react-router의 createFileRoute를 모킹하여 Route.component를 반환하도록 처리
vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (path: string) => (config: any) => ({ component: config.component, path }),
}));

describe('RouteComponent', () => {
  it('renders "Hello "/menu/"!"', () => {
    // @ts-expect-error Route
    render(<Route.component />);
    expect(screen.getByText('Hello "/menu/"!')).toBeInTheDocument();
  });
});
