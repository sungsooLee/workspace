import { memo, useEffect, useState } from 'react';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/features/layout/popup/category-depth-popup-m.module.css';
import { Button } from '@learnway/ui/button';
import { Dropdown } from '@learnway/ui/dropdown';
import { ModalBody, ModalContainer, ModalFooter, useModal } from '@learnway/ui/modal';
import { collectDepths } from '@features/category';
import { t } from 'i18next';

interface CategoryDepthPopupMProps {
  nodes: any;
}

type TopOptionsType = { label: string; value: number; }
type MiddleOptionsType = { parentId?: number; label: string; value: number; };

const CategoryDepthPopupMComponent = ({nodes}: CategoryDepthPopupMProps) => {
  const [topOptions, setTopOptions] = useState<TopOptionsType[]>([]);
  const [topOptionValue, setTopOptionValue] = useState<TopOptionsType|null>();
  const [middleOptions, setMiddleOptions] = useState<MiddleOptionsType[]>([]);
  const [middleOptionValue, setMiddleOptionValue] = useState<MiddleOptionsType|null>();
  const [option, setOption] = useState<any[]|null>(null);

  const { closeModal } = useModal();

  const handleOnClose = () => {
    closeModal();
  };

  const handleOnConfirm = () => {
    if (!option ) return;
    closeModal(option)
  };

  const handleShowDepthSelector = (nodeId: number) => {
    if( nodeId === 0 ) {
      setTopOptionValue(null);
      setMiddleOptions([])
      setMiddleOptionValue(null)
      setOption(null)
    } else {
      const { depth4, depth5 } = collectDepths(nodes);
      const value: TopOptionsType[] = depth4.flat().filter((row: TopOptionsType) => row.value === nodeId);
      setTopOptionValue(value[0])
      setOption(value)
      const isChild = depth5.flat().filter((value: MiddleOptionsType) => (value.parentId && value.parentId === nodeId))
      if( isChild.length > 0 ) {
        setMiddleOptions(depth5)
      } else {
        setMiddleOptions([])
        setMiddleOptionValue(null)
      }
    }
  }

  const handleChangeSelector = (nodeId: number) => {
    if( nodeId === 0 ) {
      setMiddleOptionValue(null)
      setOption([option![0]])
    } else {
      const { depth5 } = collectDepths(nodes);
      const value = depth5.flat().filter((row: TopOptionsType) => row.value === nodeId);
      setMiddleOptionValue(value[0])
      setOption((prev:any[]|null) => {
        return [...prev!, value[0]]
      })
    }
  }

  useEffect(() => {
    if( nodes ) {
      const { depth4 } = collectDepths(nodes)
      setTopOptions(depth4)
    }
  }, [nodes]);

  return (
    <ModalContainer>
      <ModalBody>
        <div className={cn(styles.start, styles.depth_wrap)}>
          <Dropdown
            size="lg"
            options={topOptions}
            value={topOptionValue?.value}
            placeholder={t('대분류')}
            onChange={handleShowDepthSelector}
          />
          <Dropdown
            size="lg"
            options={middleOptions}
            value={middleOptionValue?.value}
            placeholder={t('소분류')}
            onChange={handleChangeSelector}
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
