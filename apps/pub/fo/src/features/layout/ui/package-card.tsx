import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './package-card.module.css';

interface PackageCardData {
  label?: string;
  imgSrc?: string;
  text?: string;
}

interface PackageCardProps {
  cardData: PackageCardData;
  className?: string;
}

const PackageCardComponent = ({ className, cardData }: PackageCardProps) => {
  const { label, imgSrc, text } = cardData;
  return (
    <Button className={cn(styles.start, styles.package_card, className)}>
      <div className={styles.img_box}>
        {label && <span>{label}</span>}
        <div className={styles.img}>
          <img src={imgSrc} alt="" />
        </div>
      </div>
      <p>{text}</p>
    </Button>
  );
};

export const PackageCard = PackageCardComponent;
