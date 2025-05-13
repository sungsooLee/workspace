/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui';

import styles from './test-detail.module.css';

const TestInfoComponent: FC<{}> = ({}) => {
  return (
    <div className={styles.wrap}>
      <div>
        <FormSubTitle label={'역할 정보'} />
      </div>
    </div>
  );
};

TestInfoComponent.displayName = 'TestInfo';
export const TestInfo = TestInfoComponent;
