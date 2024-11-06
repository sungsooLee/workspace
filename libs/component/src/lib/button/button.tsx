import * as React from 'react';
import cn from 'clsx';

import style from './button.module.scss';

export function Button(props: any) {
  //return <button onClick={() => props.onClick()}>{props.children}</button>;
  return (
    <span className={cn(style._start)}>
      <button className={props.className ?? 'bg-secondary'}>{props.children}</button>
    </span>
  );
}

export default Button;
