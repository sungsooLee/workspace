import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, ContentsRow, Panel, DatePicker } from '@learnway/ui';
import { IcoPlus } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './licenses-history.module.css';
import searchBoxStyles from './search-box.module.css';
import bulletStyles from '../../../../shared/ui/list/bullet.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';

const LicensesHistoryComponent = () => {
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
            <ContentsRow>
              <div className={formStyles.form_item}>
                <DatePicker displayType={'day'} size={'lg'} />
              </div>
            </ContentsRow>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export const LicensesHistory = LicensesHistoryComponent;
