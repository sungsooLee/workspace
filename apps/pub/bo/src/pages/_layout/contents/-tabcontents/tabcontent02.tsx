import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from './tabcontents02.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { Button, Dropdown, Input, Divider } from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
// eslint-disable-next-line no-empty-pattern
const TabContents02Component: FC<{}> = ({}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
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
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
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
                    <Dropdown
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
                    <Dropdown
                      options={options}
                      value={selectedValues}
                      onChange={(selected) => setSelectedValues(selected)}
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
              onlyIcon
            >
              <IcoRefresh02 className={searchStyles.icon_refresh} />
            </Button>
            <Button type="button" variant="search" size="sm" className={searchStyles.btn_search}>
              <IcoSearch className={searchStyles.icon_sm_search} />
              조회
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      {/* <TransferGrid columns={[]} gridData={undefined} rowKey={''} /> */}
    </div>
  );
};

TabContents02Component.displayName = 'TabContent01';
export const TabContents02 = TabContents02Component;
