import { FC, ReactNode } from 'react';

const FormSubTitleComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={'title_wrap'}>
      <strong className={'title'}>{children}</strong>
    </div>
  );
};

export const FormSubTitle = FormSubTitleComponent;
