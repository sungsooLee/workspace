import React, { FC, ReactNode } from 'react';

/**
 * form row 영역 info area 영역을 위해 사용
 * @param children
 * @constructor
 */
const FormInfoAreaComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
FormInfoAreaComponent.displayName = 'FormInfoArea';
export const FormInfoArea = FormInfoAreaComponent;
