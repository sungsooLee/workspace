import { memo, useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { Accordion, AccordionItem } from '@learnway/ui';

import styles from './accordion-menu.module.css';
import { useCreation } from 'ahooks';

const AccordionMenuComponent = () => {
  return <div></div>;
  /*
  return (
    <Accordion
      items={items}
      className={cn(styles._start, className)}
      value={value}
      onValueChange={(e) => handleValueChange(e as string)}></Accordion>
  );
  */
};

export const AccordionMenu = memo(AccordionMenuComponent);
