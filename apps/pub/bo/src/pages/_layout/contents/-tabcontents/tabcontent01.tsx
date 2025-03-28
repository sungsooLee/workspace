import { FC } from 'react';
import { cn } from '@learnway/shared';
import styles from './tabcontents01.module.css';
import titleStyles from './title.module.css'; // 타이틀 style
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import {
  // Button,
  // // Tooltip,
  // DatePicker,
  // // Switch,
  // Select,
  // // ThumbnailImageUpload,
  // // ChipList,
  // // SelectOption,
  Input,
} from '@learnway/ui';
// eslint-disable-next-line no-empty-pattern
const TabContents01Component: FC<{}> = ({}) => {
  return (
    <div className={cn(styles.start)}>
      {/* title */}
      <strong className={titleStyles.line_title}>{'타이틀'}</strong>
      {/* search-box */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label2" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label2" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label3" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label3" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* search-box */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label-1" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label-1" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label-2" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label-2" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label-3" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <strong className={titleStyles.line_title}>{'타이틀'}</strong>
      {/* search-box */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label-3" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label-3" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label-3" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-label3" className={searchStyles.label}>
                    <span className={searchStyles.text}>{'Label'}</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-label3" type="text" placeholder="해당정보를 입력해주세요" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TabContents01Component.displayName = 'TabContent01';
export const TabContents01 = TabContents01Component;
