// Placeholder 컴포넌트
import { FC } from 'react';

const Placeholder: FC<{ placeholder?: string }> = ({ placeholder = 'Start typing...' }) => {
  return <div style={{ color: '#aaa' }}>{placeholder}</div>;
};

export default Placeholder;
