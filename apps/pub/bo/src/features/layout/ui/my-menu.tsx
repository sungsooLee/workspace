import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './my-menu.module.css';
import { ChipList, Popover, SelectOption, Button } from '@learnway/ui';
import { IcoStar, IcoClock01 } from '@learnway/icons';
import { cn } from '@learnway/shared';

// import { useFetchAuthUser } from '../../../entities/user';

const PopoverContent = () => {
  // const { t } = useTranslation();

  const options: SelectOption[] = [
    { label: '학습운영', value: 'A' },
    { label: '수강신청/현황', value: 'B' },
    { label: '대리 결재자 지정', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
    { label: '현대자동차 G', value: 'G' },
    { label: '현대자동차 H', value: 'H' },
    { label: '현대자동차 I', value: 'I' },
  ];
  const handleChange = (event: SelectOption[]) => {
    console.log(event);
  };
  return (
    <div className={cn(styles.start, styles.mymenu_wrap)}>
      <strong className={styles.tit}>{'최근 메뉴'}</strong>
      <div className={styles.word_contents}>
        {/* 최근 자주 사용한 메뉴 없는 경우 */}
        {options.length === 0 ? (
          <div className={styles.empty}>
            <IcoClock01 className={styles.icon_menu} width={48} height={48} stroke="#8C97AE" />
            <p className={styles.text}>
              최근 자주 사용한 메뉴를
              <br />
              최대 10개 까지 볼 수 있습니다.
            </p>
          </div>
        ) : (
          <div className={styles.word_wrap}>
            <ChipList options={options} onChange={handleChange} size="sm" />
          </div>
        )}
      </div>
      <strong className={styles.tit}>{'즐겨찾기'}</strong>
      <div className={styles.empty}>
        <IcoStar className={styles.icon_menu} width={48} height={48} stroke="#8C97AE" />
        <p className={styles.text}>
          업무 화면에서 별아이콘을 클릭하면
          <br />
          즐겨찾기에 메뉴가 추가됩니다.
        </p>
      </div>
    </div>
  );
};

const MyMenuCompoment = () => {
  const { t } = useTranslation();

  // const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      {
        <span className={styles.btn_menu}>
          <IcoStar width={18} height={18} stroke="#FFB902" fill="#FFB902" />
          <span className={styles.btn_text}>{t('My menu')}</span>
        </span>
      }
    </Popover>
  );
};

export const MyMenu = memo(MyMenuCompoment);
