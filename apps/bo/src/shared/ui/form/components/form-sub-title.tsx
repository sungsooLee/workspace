import { FC, ReactNode } from 'react';

const FormSubTitleComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={'mb-[16px]'}>
      <strong className={'title_bo_4_b text-[var(--gray9)]'}>{children}</strong>
    </div>
  );
};

export const FormSubTitle = FormSubTitleComponent;
