/* eslint-disable @nx/enforce-module-boundaries */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsHistoryInfoFormField } from '../../../../../../bo/src/shared/ui/form/contents-history-info-form-field';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import titleStyles from './title.module.css'; // 타이틀 css
import { cn } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';

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
  ContentsRow,
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
      <PageContainer scrollHidden={true}>
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
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
              <div className={layoutStyles.inner}>
                <div className={layoutStyles.inner_contents}></div>
              </div>
              <div className={layoutStyles.inner}>
                <div className={titleStyles.title_wrap}>
                  <h3 className={titleStyles.title}>{'상세정보'}</h3>
                  <div className={layoutStyles.btn_wrap}>
                    <Button variant="text" size="sm" className={layoutStyles.btn_text}>
                      {'추가'}
                    </Button>
                    <Button variant="save" size="sm">
                      {'저장'}
                    </Button>
                  </div>
                </div>
                <div className={layoutStyles.inner_contents}>
                  <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
                    <ContentsHistoryInfoFormField />
                  </ContentsRow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </form>
  );
}
