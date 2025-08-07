import { memo, useState } from 'react';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/features/layout/popup/category-depth-popup-m.module.css';
import { Button } from '@learnway/ui/button';
import { Dropdown } from '@learnway/ui/dropdown';
import { ModalBody, ModalContainer, ModalFooter, useModal } from '@learnway/ui/modal';

interface CategoryDepthPopupMProps {
  nodes: any;
}

const CategoryDepthPopupMComponent = ({nodes}: CategoryDepthPopupMProps) => {
  const [depth01, setDepth01] = useState<string[]>(['대분류']);
  const [depth02, setDepth02] = useState<string[]>(['중분류']);
  const [depth03, setDepth03] = useState<string[]>(['소분류']);

  const { closeModal } = useModal();

  const [option, setOption] = useState<any>();

  const handleOnClose = () => {
    closeModal();
  };

  const handleOnConfirm = () => {
    if (!option) return;
    closeModal(option);
  };

  return (
    <ModalContainer>
      <ModalBody>
        <div className={cn(styles.start, styles.depth_wrap)}>
          <Dropdown
            size="lg"
            options={[
              { value: 'a', label: '대분류' },
              { value: 'b', label: 'ST1' },
              { value: 'c', label: '아이오닉 6' },
              { value: 'd', label: '아이오닉 5' },
              { value: 'e', label: '코나' },
              { value: 'f', label: '넥쏘' },
              { value: 'g', label: '포터' },
              { value: 'h', label: '캐스퍼' },
            ]}
            value={depth01}
            onChange={(selected) => setDepth01(selected)}
          />

          <Dropdown
            size="lg"
            options={[
              { value: 'a', label: '중분류' },
              { value: 'b', label: 'NE PE(2024)' },
              { value: 'c', label: 'NE(2021)' },
            ]}
            value={depth02}
            onChange={(selected) => setDepth02(selected)}
          />

          <Dropdown
            size="lg"
            options={[
              { value: 'a', label: '소분류' },
              { value: 'b', label: '상품정보' },
              { value: 'c', label: '기술정보' },
            ]}
            value={depth03}
            onChange={(selected) => setDepth03(selected)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'} onClick={handleOnClose}>
          취소
        </Button>
        <Button variant={'primary'} size={'lg'} onClick={handleOnConfirm}>
          확인
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CategoryDepthPopupM = memo(CategoryDepthPopupMComponent);
