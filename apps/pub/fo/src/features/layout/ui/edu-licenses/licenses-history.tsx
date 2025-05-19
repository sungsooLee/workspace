import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, ContentsRow, Panel, DatePicker, Dropdown, Input } from '@learnway/ui';
import { IcoPlus } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './licenses-history.module.css';
import searchBoxStyles from './search-box.module.css';
import bulletStyles from '../../../../shared/ui/list/bullet.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';

const LicensesHistoryComponent = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
  ];
  return (
    <div className={`${styles.start} ${styles.history_wrap}`}>
      <div className={styles.list_flex}>
        <div className={`${bulletStyles.start} ${bulletStyles.list} ${styles.list_info}`}>
          <ul>
            <li>자격증 취득 이력을 등록할 수 있으며, 승인 현황을 조회할 수 있습니다.</li>
          </ul>
        </div>
        <Button variant="line" size="lg" className={styles.btn}>
          <IcoPlus />
          취득이력등록
        </Button>
      </div>

      <Panel
        hideHeaderUnderline
        className={`${searchBoxStyles.start} ${styles.search_date}`}
        type="rounded_fill"
      >
        <div className={searchBoxStyles.search_box}>
          <div className={styles.form_content}>
            <ContentsRow className={styles.content_row}>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>취득일자</span>
                </label>
                <div className={formStyles.input_box}>
                  <DatePicker displayType={'day'} size={'lg'} placeholder="0000.00.00" />
                </div>
              </div>

              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>승인상태</span>
                </label>
                <div className={formStyles.input_box}>
                  <Dropdown
                    options={options}
                    value={selectedValues}
                    onChange={(selected) => setSelectedValues(selected)}
                    placeholder="선택"
                    variant="default"
                    isMulti={false}
                    size={'lg'}
                  />
                </div>
              </div>

              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>자격증 종목</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="nameSearch"
                    type="text"
                    value=""
                    placeholder="입력"
                    className="lg"
                    showSearchIcon
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export const LicensesHistory = LicensesHistoryComponent;
