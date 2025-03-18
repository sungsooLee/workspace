/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import {
  // Spinner,
  // Textarea,
  Button,
  // Tooltip,
  DatePicker,
  // Switch,
  Select,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  Input,
  DropdownList,
  DropdownOption,
} from '@learnway/ui';
import { IcoArrowDownDouble, IcoRefresh02, IcoSearch } from '@learnway/icons';
import styles from './page-content.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import wrapStyles from './wrap-box.module.css'; // box style
import { cn } from '@/libs/shared/src';

export const Route = createFileRoute('/_layout/learning/learningSearch')({
  component: RouteComponent,
});

function RouteComponent() {
  // expand btn
  const [isExpanded, setIsExpanded] = useState(false);

  // Date picker
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate2 = (value: any) => {
    setDate2(value);
  };

  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
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
          {/* 퍼블수정 20240317 : search 영역 수정 */}
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
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
                    <label htmlFor="name-owner" className={searchStyles.label}>
                      <span className={searchStyles.text}>담당자</span>
                    </label>
                    <div className={searchStyles.box}>
                      <Input id="name-owner" type="text" placeholder="담당자명으로 조회하세요." />
                    </div>
                  </div>
                </div>
                {/* 확장영역 */}
                {isExpanded && (
                  <div className={searchStyles.form_display}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-term" className={searchStyles.label}>
                          <span className={searchStyles.text}>공유기간</span>
                        </label>
                        <div className={searchStyles.box}>
                          <DatePicker
                            onChange={handleDate}
                            value={date}
                            className={searchStyles.datepicker_item}
                          />
                          <span className={searchStyles.dash}></span>
                          <DatePicker
                            onChange={handleDate2}
                            value={date2}
                            className={searchStyles.datepicker_item}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-owner2" className={searchStyles.label}>
                          <span className={searchStyles.text}>담당자</span>
                        </label>
                        <div className={searchStyles.box}>
                          <div className={searchStyles.half}>
                            <Input
                              id="name-owner2"
                              type="text"
                              placeholder="담당자명을 입력하세요."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={searchStyles.btn_box}>
                <Button
                  type="button"
                  className={cn(searchStyles.btn_expand, isExpanded ? searchStyles.active : '')}
                  variant="search"
                  size="sm"
                  onlyIcon
                  onClick={() => setIsExpanded(!isExpanded)}>
                  <IcoArrowDownDouble className={searchStyles.ico_expand} />
                </Button>
                <Button
                  type="button"
                  className={searchStyles.btn_refresh}
                  variant="search"
                  size="sm"
                  onlyIcon>
                  <IcoRefresh02 className={searchStyles.icon_refresh} />
                </Button>
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}>
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          <div className={cn(searchStyles.start, wrapStyles.inner)}></div>
        </div>
      </PageContainer>
    </form>
  );
}
