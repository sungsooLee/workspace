import { Fragment, ReactNode } from 'react';
import { Popover } from './popover';

interface Props {
  childrenOnly?: boolean;
  children?: ReactNode;
}
/**
 * @description 팝오버 닫는 Popover.Close 컴포넌트를 조건에 따라 랜더링 처리
 * @param childrenOnly
 * @returns ReactNode
 */
const PopoverCloseWrapperComponent = ({ childrenOnly = false, children }: Props) => {
  // children만 렌더
  if (childrenOnly) {
    return <Fragment>{children}</Fragment>;
  }

  return <Popover.Close asChild>{children}</Popover.Close>;
};

export const PopoverCloseWrapper = PopoverCloseWrapperComponent;
