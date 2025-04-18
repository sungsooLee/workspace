import { FC } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button } from '@learnway/ui';
import styles from './banner-info.module.css';

const BannerInfoComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'배너 정보'}
        actionNode={
          <>
            <Button label={'초기화'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'삭제'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'미리보기'} variant={'text'} size={'sm'} className="btn_text" disabled />
            <Button label={'저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}></div>
    </div>
  );
};

BannerInfoComponent.displayName = 'BannerInfo';
export const BannerInfo = BannerInfoComponent;
