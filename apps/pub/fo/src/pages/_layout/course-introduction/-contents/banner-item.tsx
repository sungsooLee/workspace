import { FC } from 'react';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Link } from '@tanstack/react-router';

/* style */
import styles from './banner-item.module.css';
import { IcoArrowForward } from '@learnway/icons';

interface Item {
  title?: string;
  text?: string;
  buttonLabel?: string;
  imageUrl?: string;
  link?: string;
}

interface Itemprops {
  items: Item[];
}

const BannerItemComponent: FC<Itemprops> = ({ items }) => {
  return (
    <div className={cn(styles.start, styles.banner_item)}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <Link to={item.link} className={styles.item_info_wrap}>
            {item.title && <strong className={styles.title}>{item.title}</strong>}
            {item.text && <strong className={styles.text}>{item.text}</strong>}
            {item.buttonLabel && (
              <Button
                variant={'secondary'}
                label={item.buttonLabel}
                icon={<IcoArrowForward width={16} height={16} stroke={'#131416'} />}
                iconAlign={'right'}
                size={'sm'}
                className={styles.banner_btn}
              />
            )}
          </Link>
          {item.imageUrl && <img src={item.imageUrl} alt={''} className={styles.banner_img} />}
        </div>
      ))}
    </div>
  );
};

BannerItemComponent.displayName = 'BannerItem';
export const BannerItem = BannerItemComponent;
