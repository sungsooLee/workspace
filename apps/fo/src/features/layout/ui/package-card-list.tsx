import { cn } from '@learnway/shared';
import { PackageCard } from '../../../features/layout';

import styles from '@learnway/styles/fo/features/layout/ui/package-card-list.module.css';

interface PackageCardListData {
  label?: string;
  imgSrc: string;
  text: string;
}

interface PackageCardListProps {
  cardListData: PackageCardListData[];
  className?: string;
}

const PackageCardListComponent = ({ className, cardListData }: PackageCardListProps) => {
  return (
    <div className={cn(styles.start, styles.card_list, className)}>
      {cardListData.map((cardItems, index) => (
        <PackageCard key={index} cardData={cardItems} />
      ))}
    </div>
  );
};

export const PackageCardList = PackageCardListComponent;
