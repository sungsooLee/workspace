import { memo, useState } from 'react';
import { ModalBody, ModalContainer, ModalFooter, Button, Dropdown } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './category-filter-popup-m.module.css';

const CategoryFilterPopupMComponent = () => {
  const [filter01, setFilter01] = useState<string[]>(['대분류']);
  const [filter02, setFilter02] = useState<string[]>(['중분류']);
  const [filter03, setFilter03] = useState<string[]>(['소분류']);
  return (
    <ModalContainer>
      <ModalBody>
        <div className={cn(styles.start, styles.filter_wrap)}>
          <div></div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'}>
          취소
        </Button>
        <Button variant={'primary'} size={'lg'}>
          확인
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CategoryFilterPopupM = memo(CategoryFilterPopupMComponent);
