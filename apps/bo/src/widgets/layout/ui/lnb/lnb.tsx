import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@learnway/ui';

import { useActiveMenuDepthState } from '../../../../features/layout';

import { Accordion } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { Link } from '@tanstack/react-router';

import styles from './lnb.module.css';

function LNBComponent() {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const [isActive, setActive] = useState<boolean>(false); // LNB 최상단 타이틀 active
  const buttonClass = `${isActive ? styles.active : styles.inactive}`; // LNB 최상단 타이틀 active 클래스 적용

  // if (!activeMenuDepth?.[0]) {
  //   return <></>;
  // }

  return (
    // <div className={cn(styles.start, 'nlp--lnb')}>
    //   <div className={styles.lnb_wrap}>
    //     <h2 className={styles.lnb_title}>
    //       <span>{activeMenuDepth[0].title}</span>
    //     </h2>
    //     {activeMenuDepth[0]?.children && (
    //       <AccordionMenu
    //         menus={activeMenuDepth[0]?.children}
    //         depth={2}
    //         className={styles._depth2}
    //       />
    //     )}
    //   </div>
    // </div>
    <div className={`${styles.start} nlp--lnb`}>
      <div className={styles.lnb_wrap}>
        <h2 className={styles.lnb_title}>
          <button
            type="button"
            className={cn(styles.lnb_title_btn, buttonClass)}
            onClick={() => setActive(!isActive)}>
            <span className={styles.lnb_title_text}>{'activeMenuDepth[0].title'}</span>
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
          </button>
        </h2>
        <Accordion
          items={[
            {
              key: 'q45p7j237v9',
              title: '메뉴 타이틀A',
              children: (
                <Accordion
                  className={styles.accordion_depth2}
                  items={[
                    {
                      key: 'q45p7j237v0',
                      title: '메뉴 타이틀A-1',
                      children: (
                        <Accordion
                          className={styles.accordion_depth3}
                          items={[
                            {
                              key: 'q45p7j237v01',
                              title: '메뉴 타이틀A-1-1',
                              children: '',
                            },
                            {
                              key: 'q45p7j237v12',
                              title: '메뉴 타이틀A-2-2',
                              children: (
                                <Accordion
                                  items={[
                                    {
                                      key: 'q45p7j237v03',
                                      title: '메뉴 타이틀A-3-1',
                                      children: '',
                                    },
                                    {
                                      key: 'q45p7j237v14',
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
                      key: 'q45p7j237v1',
                      title: '메뉴 타이틀A-2',
                      children: (
                        <Accordion
                          className={styles.accordion_depth2}
                          items={[
                            {
                              key: 'q45p7j237v03',
                              title: '메뉴 타이틀A-2-1',
                              children: '',
                            },
                            {
                              key: 'q45p7j237v14',
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
              key: 'q45p7j237v2',
              title: <Link to={'/'}>메뉴 타이틀B</Link>,
              children: '',
            },
            {
              key: 'q45p7j237v3',
              title: '메뉴 타이틀C',
              children: (
                <Accordion
                  items={[
                    {
                      key: 'q45p7j237v4',
                      title: '메뉴 타이틀C-1',
                      children: '',
                    },
                    {
                      key: 'q45p7j237v5',
                      title: '메뉴 타이틀C-2',
                      children: '',
                    },
                  ]}></Accordion>
              ),
            },
          ]}></Accordion>
      </div>
    </div>
  );
}

export const LNB = memo(LNBComponent);
