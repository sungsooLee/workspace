import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { TeacherList } from '../../../../../../../../src/features/learning/ui/dialog/form-teacher-chip-list/teacher-list';

describe('FormTeacherChipList', () => {
  it('TeacherList 이 렌더링 되어야 한다.', () => {
    render(<TeacherList />);
  });
});
