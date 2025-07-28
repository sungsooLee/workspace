import { FC } from 'react';
import { cn } from '@learnway/shared';
import { Link } from '@tanstack/react-router';

/* style */
import styles from './shorts-item.module.css';
import { Badge } from '@learnway/ui';

interface Item {
  badgeLabel?: string;
  title?: string;
  imageUrl?: string;
  infoNode?: React.ReactNode;
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
            {item.infoNode && <div className={styles.info_wrap}>{item.infoNode}</div>}
            <div className={styles.title_wrap}>
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
            </div>
          </Link>
          {item.imageUrl && <img src={item.imageUrl} alt={''} className={styles.shorts_img} />}
        </div>
      ))}
    </div>
  );
};

ShortsItemComponent.displayName = 'ShortsItem';
export const ShortsItem = ShortsItemComponent;
