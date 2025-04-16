import { FC } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button } from '@learnway/ui';
import styles from './main-widget.module.css';

const MainWidgetDetailComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'위젯 상세'}
        actionNode={
          <>
            <Button label={'삭제'} variant={'text'} size={'sm'} />
            <Button label={'저장'} variant={'save'} size={'sm'} />
          </>
        }
        underLine={true}
      />
    </div>
  );
};

MainWidgetDetailComponent.displayName = 'MainWidgetDetail';
export const MainWidgetDetail = MainWidgetDetailComponent;
