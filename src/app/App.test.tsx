import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import { describe } from "node:test";
import App from './App';
import { it, describe } from 'vitest';
import { expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('App', () => {
  it('App 컴포넌트를 렌더링 한다.', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('로그인')).toBeInTheDocument();
    });
  });
});
