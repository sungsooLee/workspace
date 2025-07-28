import { FC } from 'react';
import { cn } from '@learnway/shared';
import { Link } from '@tanstack/react-router';

/* style */
import styles from './shorts-item.module.css';
import { Badge } from '@learnway/ui';
import { IcoEye } from '@learnway/icons';

interface Item {
  badgeLabel?: string;
  title?: string;
  imageUrl?: string;
  countView?: number;
  link?: string;
}

interface Itemprops {
  items: Item[];
}

const ShortsItemComponent: FC<Itemprops> = ({ items }) => {
  return (
    <div className={cn(styles.start, styles.shorts_item)}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <Link to={item.link} className={styles.item_info_wrap}>
            {item.countView && (
              <div className={styles.view_wrap}>
                <IcoEye width={16} height={16} stroke="#fff" />
                <span
                  className={styles.count}
                >{`${new Intl.NumberFormat().format(item.countView)}`}</span>
                {'시청'}
              </div>
            )}
            {item.badgeLabel && (
              <Badge
                variant="outline"
                status="gray"
                size="xs"
                option={{ label: item.badgeLabel, value: index }}
                className={styles.badge}
              />
            )}
            {item.title && <strong className={styles.title}>{item.title}</strong>}
          </Link>
          {item.imageUrl && <img src={item.imageUrl} alt={''} className={styles.shorts_img} />}
        </div>
      ))}
    </div>
  );
};

ShortsItemComponent.displayName = 'ShortsItem';
export const ShortsItem = ShortsItemComponent;
