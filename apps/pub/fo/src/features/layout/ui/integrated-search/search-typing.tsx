import { IcoClose02, IcoNarrowRight, IcoNudge05, IcoNudge10, IcoSearch } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

/* styles */
import styles from './search-typing.module.css';

type wordListProps = {
  label: React.ReactNode;
  link?: string;
  showDeleteBtn?: boolean;
};

export const SearchTyping: React.FC = () => {
  const [items, setItems] = useState<wordListProps[]>([
    {
      label: (
        <span className={styles.label}>
          <em className={styles.point}>{'리더십'}</em> 소통 유형
        </span>
      ),
      link: '/',
      showDeleteBtn: true,
    },
    {
      label: <span className={styles.label}>마케팅 전략</span>,
      link: '/',
      showDeleteBtn: true,
    },
    {
      label: (
        <span className={styles.label}>
          신임 리더 생존 패키지 <em className={styles.point}>{'리더십'}</em> 올리기 강좌
        </span>
      ),
      link: '/',
      showDeleteBtn: true,
    },
  ]);
  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const items2: wordListProps[] = [
    {
      label: (
        <span className={styles.label}>
          <em className={styles.point}>{'리더십'}</em> 강의 추천
        </span>
      ),
      link: '/',
    },
    {
      label: (
        <span className={styles.label}>
          일을 성장으로 바꾸는 법, 강의 추천 <em className={styles.point}>{'리더십'}</em>
        </span>
      ),
      link: '/',
    },
    {
      label: (
        <span className={styles.label}>
          신임 리더 생존 패키지 <em className={styles.point}>{'리더십'}</em> 올리기 강좌
        </span>
      ),
      link: '/',
    },
  ];
  return (
    <div className={cn(styles.start, styles.search_typing)}>
      {/* title */}
      <div className={styles.title_wrap}>
        <IcoNudge10 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>{'최근 검색어'}</strong>
      </div>
      {/* word list */}
      {items.length > 0 && (
        <ul className={styles.word_list}>
          {items.map((item, index) => (
            <li key={index}>
              <IcoSearch className={styles.icon_search} />
              <Link to={item.link}>{item.label}</Link>
              {item.showDeleteBtn && (
                <Button
                  onlyIcon={true}
                  icon={<IcoClose02 />}
                  className={styles.btn_delete}
                  onClick={() => handleDelete(index)}
                />
              )}
              <IcoNarrowRight className={styles.icon_arrow} />
            </li>
          ))}
        </ul>
      )}
      {/* title */}
      <div className={styles.title_wrap}>
        <IcoNudge05 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>
          <span className={styles.point}>{'리더십'}</span> 관련 추천 검색
        </strong>
      </div>
      {/* word list */}
      {items2.length > 0 && (
        <ul className={styles.word_list}>
          {items2.map((item, index) => (
            <li key={index}>
              <IcoSearch className={styles.icon_search} />
              <Link to={item.link}>{item.label}</Link>
              <IcoNarrowRight className={styles.icon_arrow} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
