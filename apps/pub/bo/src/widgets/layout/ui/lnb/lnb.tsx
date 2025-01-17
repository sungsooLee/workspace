import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { Accordion } from '@learnway/ui';

import styles from './lnb.module.css';

function LNBComponent() {
  return (
    <div className={(styles.start, 'nlp--lnb')}>
      <div className={styles.lnb_wrap}>
        <h2 className={styles.lnb_title}>{'activeMenuDepth[0].title'}</h2>
        <Accordion
          items={[
            {
              key: 'q45p7j237v9',
              title: '메뉴 타이틀A',
              children: (
                <Accordion
                  items={[
                    {
                      key: 'q45p7j237v0',
                      title: '메뉴 타이틀A-1',
                      children: (
                        <Accordion
                          items={[
                            {
                              key: 'q45p7j237v01',
                              title: '메뉴 타이틀A-1-1',
                              children: '',
                            },
                            {
                              key: 'q45p7j237v12',
                              title: '메뉴 타이틀A-2-2',
                              children: '',
                            },
                          ]}></Accordion>
                      ),
                    },
                    {
                      key: 'q45p7j237v1',
                      title: '메뉴 타이틀A-2',
                      children: (
                        <Accordion
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
