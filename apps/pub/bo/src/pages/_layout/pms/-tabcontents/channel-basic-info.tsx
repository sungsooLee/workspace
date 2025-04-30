import { FC } from 'react';
import { cn } from '@learnway/shared';
import { ContentsRow, Input } from '@learnway/ui';

/* style */
import styles from './channel-basic-info.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
const ChannelBasicInfoComponent: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-label" className={formStyles.form_label}>
            <span className={formStyles.form_text}>{'채널ID'}</span>
          </label>
          <div className={formStyles.input_box}>
            <Input
              id="name-label"
              type="text"
              placeholder="입력"
              value="러닝웨이"
              readOnly
              className={formStyles.input}
            />
            <p className={formStyles.info_text}>{'(접수ID 45785566322)'}</p>
          </div>
        </div>
      </ContentsRow>
    </div>
  );
};

ChannelBasicInfoComponent.displayName = 'ChannelBasicInfo';
export const ChannelBasicInfo = ChannelBasicInfoComponent;
