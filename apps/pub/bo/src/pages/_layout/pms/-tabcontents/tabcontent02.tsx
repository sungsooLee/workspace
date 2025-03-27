import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './tabcontents02.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import {
  // Button,
  // // Tooltip,
  // DatePicker,
  // // Switch,
  // Select,
  // // ThumbnailImageUpload,
  // // ChipList,
  // // SelectOption,
  Select,
  Button,
  DropdownList,
  DropdownOption,
  Input,
  TransferGrid,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
// eslint-disable-next-line no-empty-pattern
const TabContents02Component: FC<{}> = ({}) => {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  return (
    <div className={cn(styles.start)}>
      {/* search box */}
      <div className={cn(searchStyles.start, searchStyles.wrap)}>
        <div className={searchStyles.contents}>
          <div className={searchStyles.item_row}>
            <div className={searchStyles.item_wrap}>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-select1" className={searchStyles.label}>
                    <span className={searchStyles.text}>테넌트</span>
                  </label>
                  <div className={searchStyles.box}>
                    <DropdownList
                      options={options}
                      value={selectedOptions}
                      onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-channel" className={searchStyles.label}>
                    <span className={searchStyles.text}>채널</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Select
                      className={searchStyles.select_option}
                      options={[
                        { value: 'type1', label: '전체' },
                        { value: 'type2', label: '항목' },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-type" className={searchStyles.label}>
                    <span className={searchStyles.text}>유형</span>
                  </label>
                  <div className={searchStyles.box}>
                    <DropdownList
                      options={options}
                      value={selectedOptions}
                      onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                      variant="default"
                      size={'sm'}
                    />
                  </div>
                </div>
              </div>
              <div className={searchStyles.inner}>
                <div className={searchStyles.item}>
                  <label htmlFor="name-course" className={searchStyles.label}>
                    <span className={searchStyles.text}>과정</span>
                  </label>
                  <div className={searchStyles.box}>
                    <Input id="name-course" type="text" placeholder="과정명으로 조회하세요." />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={searchStyles.btn_box}>
            <Button
              type="button"
              className={searchStyles.btn_refresh}
              variant="search"
              size="sm"
              onlyIcon>
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
          {/* 퍼블수정 20240318 : item_row 추가, btn_box 위치 수정 E */}
        </div>
      </div>
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <TransferGrid columns={[]} gridData={undefined} rowKey={''} />
      </div>
    </div>
  );
};

TabContents02Component.displayName = 'TabContent01';
export const TabContents02 = TabContents02Component;
