import { FC, useState } from 'react';
import { cn, getRandomId } from '@learnway/shared';

import { FormSubTitle } from '@shared/ui/form';
import { Button, List } from '@learnway/ui';
import styles from './banner-list.module.css';

const menuLength = 15;
const menuOptions = Array(menuLength)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `배너${i}`,
  }));

const TenantDetailBannerListComponent: FC<{}> = ({}) => {
  const [myOptions, setMyOptions] = useState(menuOptions);
  const [value, setValue] = useState<any>();
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'배너 목록'}
        actionNode={
          <>
            <Button label={'추가'} variant={'text'} size={'sm'} className="btn_text" />
            <Button label={'순서 저장'} variant={'save'} size={'sm'} disabled />
          </>
        }
        underLine={true}
      />
      <div className={styles.contents_wrap}>
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

export const TenantDetailBannerList = TenantDetailBannerListComponent;
