import React, { FC, ReactNode } from 'react';

/**
 * form row 영역 guide text 영역을 위해 사용
 * @param children
 * @constructor
 */
const FormGuideTextComponent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
FormGuideTextComponent.displayName = 'FormGuideText';
export const FormGuideText = FormGuideTextComponent;
