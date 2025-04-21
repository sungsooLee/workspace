import { FC } from 'react';
import { cn } from '@learnway/shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button } from '@learnway/ui';
/* style */
import styles from './role-list.module.css';

const RoleListComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'역할 정보'}
        actionNode={
          <>
            <Button label={'전체펼침'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'전체닫기'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}></div>
    </div>
  );
};

RoleListComponent.displayName = 'RoleList';
export const RoleList = RoleListComponent;
