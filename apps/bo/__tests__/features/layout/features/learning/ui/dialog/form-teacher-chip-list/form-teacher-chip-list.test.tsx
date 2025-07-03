import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { FormTeacherChipList } from '../../../../../../../../src/features/learning/ui/dialog/form-teacher-chip-list/form-teacher-chip-list';

describe('FormTeacherChipList', () => {
  const onChangeMock = vi.fn();

  const initValue = [{ name: 'Test' }];

  it('FormTeacherChipList 이 렌더링 되어야 한다.', () => {
    render(<FormTeacherChipList value={initValue} onChange={onChangeMock} />);
  });
});
