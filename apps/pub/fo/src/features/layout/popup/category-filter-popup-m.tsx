import { memo, useState } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button, Dropdown } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './notification-popup-m.module.css';

const CategoryFilterPopupMComponent = () => {
  const [divisionValues, setDivisionValues] = useState<string[]>(['분류선택']);
  return (
    <ModalContainer>
      <ModalTitle>
        <></>
      </ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.alarm_wrap)}>
          <Dropdown
            className={styles.select}
            options={[
              { value: 'a', label: '분류선택' },
              { value: 'b', label: 'ST1' },
              { value: 'c', label: '아이오닉 6' },
              { value: 'd', label: '아이오닉 5' },
              { value: 'e', label: '코나' },
              { value: 'f', label: '넥쏘' },
              { value: 'g', label: '포터' },
              { value: 'h', label: '캐스퍼' },
            ]}
            value={divisionValues}
            onChange={(selected) => setDivisionValues(selected)}
          />
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
