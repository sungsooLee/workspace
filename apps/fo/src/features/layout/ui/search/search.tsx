import { memo } from 'react';
import { Button, Input } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';
import styles from './search.module.css';

const SearchCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.search}`}>
      <Input placeholder="현대 자동차" type="text" />
      <Button aria-label="search">
        <IcoSearch width={20} height={20} stroke="#131C30" />
      </Button>
    </div>
  );
};

export const Search = memo(SearchCompoment);
