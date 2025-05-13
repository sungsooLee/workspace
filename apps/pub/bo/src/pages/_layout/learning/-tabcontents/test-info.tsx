/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { FormSubTitle, NoticeBox } from '../../../../../../../bo/src/shared/ui';

import styles from './test-detail.module.css';

const TestInfoComponent: FC<{}> = ({}) => {
  return (
    <div className={styles.wrap}>
      <NoticeBox
        iconVisible={false}
        descriptions={[
          '해당 시험지는 과정에서 사용 중입니다. 일부 정보만 변경할 수 있고, 삭제는 할 수 없습니다.',
        ]}
      />
      <div className={styles.row_wrap}>
        <div className={styles.main_container}>
          <FormSubTitle label={'역할 정보'} />
        </div>
        <div className={styles.sub_container}>
          <FormSubTitle label={'시험지'} />
        </div>
      </div>
    </div>
  );
};

TestInfoComponent.displayName = 'TestInfo';
export const TestInfo = TestInfoComponent;
