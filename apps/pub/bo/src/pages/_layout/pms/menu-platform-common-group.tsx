import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { cn } from '@learnway/shared';

import {
  Button,
  // Tooltip,
  // DatePicker,
  // Switch,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  Input,
  Dropdown,
} from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/menu-platform-common-group')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-codeGroupNum" className={searchStyles.label}>
                        <span className={searchStyles.text}>코드그룹번호</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-codeGroupNum" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-codeGroupName" className={searchStyles.label}>
                        <span className={searchStyles.text}>코드그룹명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-codeGroupName" type="text" placeholder="입력" />
                      </div>
                    </div>
                  </div>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-use" className={searchStyles.label}>
                        <span className={searchStyles.text}>사용</span>
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
                      <label htmlFor="name-codeName" className={searchStyles.label}>
                        <span className={searchStyles.text}>코드명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input id="name-codeName" type="text" placeholder="입력" />
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
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <div className={cn(boxStyles.start, boxStyles.inner)}></div>
        </div>
      </PageContainer>
    </form>
  );
}
