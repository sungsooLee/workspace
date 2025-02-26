import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { FormManagerInputButton } from '../../../../../../../../src/features/learning/ui/dialog/form-manager-input-button/form-manager-input-button';

// ManagerList는 단순한 더미 컴포넌트로 모킹 (실제 내용은 테스트 대상이 아님)
vi.mock('../../../../src/components/manager-list', () => ({
  ManagerList: () => <div data-testid="manager-list">Manager List</div>,
}));
let onChangeMock: ReturnType<typeof vi.fn>;

describe('FormContactNumber', () => {
  beforeEach(() => {
    onChangeMock = vi.fn();
  });
  const initValue = { name: 'Test' };

  it('FormManagerInputButton 이 렌더링 되어야 한다.', () => {
    render(<FormManagerInputButton value={initValue} onChange={onChangeMock} />);
  });
});
