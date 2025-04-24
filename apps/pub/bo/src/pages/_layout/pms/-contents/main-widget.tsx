/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button, List } from '@learnway/ui';
import styles from './main-widget.module.css';

const menuLength = 5;
const menuOptions = Array(menuLength)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `메뉴명${i}`,
  }));

const MainWidgetComponent: FC<{}> = ({}) => {
  const [myOptions, setMyOptions] = useState(menuOptions);
  const [value, setValue] = useState<any>();
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'위젯'}
        actionNode={
          <>
            <Button label={'메인위젯 미리보기'} variant={'text'} size={'sm'} className="btn_text" />
            <Button label={'위젯추가'} variant={'text'} size={'sm'} className="btn_text" />
            <Button label={'저장'} variant={'save'} size={'sm'} />
          </>
        }
        underLine={true}
      />
      <div className={styles.menu_wrap}>
        <List
          options={myOptions}
          value={value}
          valueField={'id'}
          draggable
          hideBorder
          disabledActive
          itemRenderer={(option: any) => (
            <div className={styles.menu_box}>
              <p className={styles.menu_name}>{option.name}</p>
            </div>
          )}
          onOptionsOrderChange={(newOptions: any) => setMyOptions(newOptions)}
        />
      </div>
    </div>
  );
};

MainWidgetComponent.displayName = 'MainWidget';
export const MainWidget = MainWidgetComponent;
