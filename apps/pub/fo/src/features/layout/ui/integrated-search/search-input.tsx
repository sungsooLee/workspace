import styles from './search-before.module.css';
import { cn } from '@learnway/shared';
import { Button, Input } from '@learnway/ui';
import { IcoNarrowRight } from '@learnway/icons';

import searchImage from '@learnway/styles/fo/assets/images/common/logo_symbol.png';

export const SearchBefore: React.FC = () => {
  return (
    <div className={styles.search_input_wrap}>
      <img src={searchImage} alt="" className={styles.logo} />
      <Input borderNone={true} />
      <Button onlyIcon={true} icon={<IcoNarrowRight width={24} height={24} stroke="#fff" />} />
    </div>
  );
};
