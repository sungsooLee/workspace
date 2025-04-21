import { FC } from 'react';
import { cn } from '@learnway/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button } from '@learnway/ui';
/* style */
import styles from './role-info.module.css';

const RoleInfoComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'역할 목록'}
        actionNode={
          <>
            <Button label={'초기화'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'삭제'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}></div>
    </div>
  );
};

RoleInfoComponent.displayName = 'RoleInfo';
export const RoleInfo = RoleInfoComponent;
