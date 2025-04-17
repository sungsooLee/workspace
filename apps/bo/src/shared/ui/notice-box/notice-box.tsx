/* eslint-disable no-redeclare */
import { cn } from '@learnway/shared';
import styles from './notice-box.module.css';
import { IcoAnnouncement03 } from '@learnway/icons';
import { FC } from 'react';

interface NoticeComponentProps {
  title?: string;
  description?: string;
  descriptions?: string[];
  className?: string;
  iconVisible?: boolean;
  type?: 'bullet' | 'count';
}

const NoticeBoxComponent: FC<NoticeComponentProps> = ({
  title,
  description,
  descriptions,
  iconVisible = true,
  type = 'bullet',
  className,
}: NoticeComponentProps) => {
  return (
    <div className={cn(styles.start, styles.notice, 'notice', className)}>
      {/* 📢 아이콘 영역 */}
      {iconVisible && (
        <div className={styles.icon_wrap}>
          <IcoAnnouncement03 width="32" height="32" stroke="#07287E" />
        </div>
      )}

      {/* 📝 텍스트 영역 */}
      <div className={styles.text_wrap}>
        {/* 제목 */}
        {title && <strong className={styles.title}>{title}</strong>}

        {/* 단일 설명 */}
        {description && <p className={styles.text}>{description}</p>}

        {/* 여러 줄 설명 */}
        {!!descriptions?.length && (
          <ul className={cn(styles.text_list, type && styles[type])}>
            {descriptions.map((d, i) => (
              <li key={`${d}-${i}`} className={styles.list}>
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const NoticeBox = NoticeBoxComponent;
