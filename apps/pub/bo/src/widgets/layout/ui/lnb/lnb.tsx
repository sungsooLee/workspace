import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { Accordion, Button } from '@learnway/ui';
import { IcoArrowDown, IcoArrowBackward } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from './lnb.module.css';

function LNBComponent() {
  const [isActive, setActive] = useState<boolean>(true); // LNB 최상단 타이틀 active
  const buttonClass = `${isActive ? styles.open : styles.close}`; // LNB 최상단 타이틀 active 클래스 적용

  const [isOpen, setIsOpen] = useState<boolean>(true);
  // const lnbRef = useRef<HTMLDivElement>(null);

  const toggleLnb = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.start} nlp--lnb ${isOpen ? `${styles.open}` : `${styles.close}`}`}>
      <div className={styles.lnb_wrap}>
        <h2 className={styles.lnb_title}>
          <Button
            className={cn(styles.lnb_title_btn, buttonClass)}
            onClick={() => setActive(!isActive)}>
            <span className={styles.lnb_title_text}>{'activeMenuDepth[0].title'}</span>
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
          </Button>
        </h2>
        <Accordion
          type={'multiple'}
          items={[
            {
              value: 'q45p7j237v9',
              title: '메뉴 타이틀A',
              children: (
                <Accordion
                  type={'multiple'}
                  className={styles.depth2}
                  items={[
                    {
                      value: 'q45p7j237v0',
                      title: '메뉴 타이틀A-1',
                      children: (
                        <Accordion
                          type={'multiple'}
                          className={styles.depth3}
                          items={[
                            {
                              value: 'q45p7j237v01',
                              title: '메뉴 타이틀A-1-1',
                              children: '',
                            },
                            {
                              value: 'q45p7j237v12',
                              title: '메뉴 타이틀A-2-2',
                              children: (
                                <Accordion
                                  type={'multiple'}
                                  className={styles.depth4}
                                  items={[
                                    {
                                      value: 'q45p7j237v03',
                                      title: '메뉴 타이틀A-3-1',
                                      children: '',
                                    },
                                    {
                                      value: 'q45p7j237v14',
                                      title: '메뉴 타이틀A-3-2',
                                      children: '',
                                    },
                                  ]}></Accordion>
                              ),
                            },
                          ]}></Accordion>
                      ),
                    },
                    {
                      value: 'q45p7j237v1',
                      title: '메뉴 타이틀A-2',
                      children: (
                        <Accordion
                          type={'multiple'}
                          className={styles.depth3}
                          items={[
                            {
                              value: 'q45p7j237v03',
                              title: '메뉴 타이틀A-2-1',
                              children: '',
                            },
                            {
                              value: 'q45p7j237v14',
                              title: '메뉴 타이틀A-2-2',
                              children: '',
                            },
                          ]}></Accordion>
                      ),
                    },
                  ]}></Accordion>
              ),
            },
            {
              value: 'q45p7j237v2',
              title: <Link to={'/'}>메뉴 타이틀B</Link>,
              children: '',
            },
            {
              value: 'q45p7j237v3',
              title: '메뉴 타이틀C',
              children: (
                <Accordion
                  type={'multiple'}
                  items={[
                    {
                      value: 'q45p7j237v4',
                      title: '메뉴 타이틀C-1',
                      children: '',
                    },
                    {
                      value: 'q45p7j237v5',
                      title: '메뉴 타이틀C-2',
                      children: '',
                    },
                  ]}></Accordion>
              ),
            },
          ]}></Accordion>
      </div>
      {/* lnb toggle button */}
      <Button className={styles.btn_toggle} onlyIcon aria-expanded={isOpen} onClick={toggleLnb}>
        <IcoArrowBackward width={20} height={20} />
      </Button>
    </div>
  );
}

export const LNB = memo(LNBComponent);
