import { cloneElement, FC } from 'react';
import { icons } from '../../config/icon.config';
import { IconKey } from './type';

/**
 * svg 컴포넌트를 동적으로 불러오다보니 함번더 감싸서 JSX 에서 컴포넌트 형식으로 사용할 수 있게 만듬
 * @param icon
 * @param className
 * @constructor
 */
const Icon: FC<{ icon: IconKey; className?: string }> = ({ icon, className = '' }) => {
  return cloneElement(icons[icon], {
    className: `${className}`,
  });
};

export default Icon;
