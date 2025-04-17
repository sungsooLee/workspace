import { FC, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { Button, List } from '@learnway/ui';
import styles from './banner-info.module.css';

const menuLength = 5;
const menuOptions = Array(menuLength)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `배너${i}`,
  }));

const BannerInfoComponent: FC<{}> = ({}) => {
  const [myOptions, setMyOptions] = useState(menuOptions);
  const [value, setValue] = useState<any>();
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

BannerInfoComponent.displayName = 'BannerInfo';
export const BannerInfo = BannerInfoComponent;
