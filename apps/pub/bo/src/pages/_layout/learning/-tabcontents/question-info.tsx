/* eslint-disable @nx/enforce-module-boundaries */
import { FC } from 'react';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../../bo/src/shared/ui/form';
import { ContentsRow, Tabs } from '@learnway/ui';

/* styles */
import styles from './test-detail.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

const QuestionInfoComponent: FC<{}> = ({}) => {
  const items = [
    {
      title: '선택형 문항',
      key: 'option01',
      content: '',
    },
    {
      title: '랜덤형 문항',
      key: 'option02',
      content: '',
    },
  ];
  return (
    <div className={styles.wrap}>
      <FormSubTitle label={'기본정보'} />
      <div className={cn(tableStyles.start, tableStyles.wrap)}>
        <table>
          <caption>{'기본정보'}</caption>
          <colgroup>
            <col style={{ width: '240px' }} />
            <col />
            <col style={{ width: '240px' }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope={'row'}>{'테넌트'}</th>
              <td>{'테넌트명'}</td>
              <th scope={'row'}>{'채널'}</th>
              <td>{'채널명'}</td>
            </tr>
            <tr>
              <th scope={'row'}>{'유형'}</th>
              <td>{'시험지'}</td>
              <th scope={'row'}>{'학습자원명'}</th>
              <td>{'학습자원명'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <FormSubTitle label={'문항정보'} />
      <ContentsRow>
        {/* form_item */}
        <div className={formStyles.form_item}>
          <label htmlFor="name-type" className={formStyles.form_label}>
            <span className={formStyles.form_text}>문항 출제유형</span>
          </label>
          <div className={formStyles.input_box}>
            <div className={dynamicFormStyles.segment_wrap}>
              <Tabs
                items={items}
                type="segment"
                size="sm"
                selectedTabKey={'option01'}
                className={styles.tab_select}
              />
            </div>
          </div>
        </div>
      </ContentsRow>
    </div>
  );
};

QuestionInfoComponent.displayName = 'QuestionInfo';
export const QuestionInfo = QuestionInfoComponent;
