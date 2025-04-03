import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './my-menu.module.css';
import { ChipList, Popover, SelectOption, List, Button } from '@learnway/ui';
import { IcoStar, IcoStar02, IcoClock01 } from '@learnway/icons';
import { cn, getRandomId } from '@learnway/shared';

// import { useFetchAuthUser } from '../../../entities/user';

// 메뉴 갯수
const menuLength = 5;
const menuOptions = Array(menuLength)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `메뉴명${i}`,
  }));

const PopoverContent = () => {
  // const { t } = useTranslation();

  // chips 리스트
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

  const [isFavorites, setIsFavorites] = useState<boolean[]>([true, true, true, true, true]);
  const handleToggle = (index: number) => {
    // 버튼의 상태 배열 복사 후 해당 인덱스만 반전시킴
    setIsFavorites((prevState) => {
      const newToggled = [...prevState];
      newToggled[index] = !newToggled[index];
      return newToggled;
    });
  };
  const [myOptions, setMyOptions] = useState(menuOptions);
  const [value, setValue] = useState<any>();
  return (
    <div className={cn(styles.start, styles.mymenu_wrap)}>
      <strong className={styles.tit}>{'최근 본 메뉴'}</strong>
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
            <ChipList options={options} size="sm" hideBorder />
          </div>
        )}
      </div>
      <strong className={styles.tit}>{'즐겨찾기'}</strong>
      <div className={styles.menu_list}>
        <List
          options={myOptions}
          value={value}
          valueField={'id'}
          draggable
          hideBorder
          disabledActive
          itemRenderer={(option: any, index: number) => (
            <div className={styles.menu_box}>
              <Button
                className={cn(styles.btn_favorites, isFavorites[index] ? styles.active : '')}
                onClick={() => handleToggle(index)}
                onlyIcon
              >
                <IcoStar
                  width={16}
                  height={16}
                  stroke="#FFB902"
                  fill="#FFB902"
                  className={styles.icon_star}
                />
              </Button>
              <span className={styles.menu_name}>{option.name}</span>
            </div>
          )}
          onOptionsOrderChange={(newOptions: any) => setMyOptions(newOptions)}
        />
      </div>
      <div className={styles.empty}>
        <IcoStar02 className={styles.icon_menu} width={48} height={48} stroke="#8C97AE" />
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
