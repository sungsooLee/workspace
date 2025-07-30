import { cn } from '@learnway/shared';
import { Button, Input } from '@learnway/ui';
import { IcoNarrowRight } from '@learnway/icons';

import logoImage from '@learnway/styles/fo/assets/images/common/logo_symbol.png';

import styles from './search-input-wrap.module.css';

interface SearchInputWrapProps {
  buttonActive?: boolean;
  placeholder?: string;
}

export const SearchInputWrap: React.FC<SearchInputWrapProps> = ({ buttonActive, placeholder }) => {
  return (
    <div className={styles.search_input_wrap}>
      <img src={logoImage} alt="" className={styles.logo} />
      <Input
        borderNone={true}
        inputSize={'lg'}
        placeholder={placeholder}
        className={styles.input_area}
      />
      <Button
        className={cn(styles.btn_action, buttonActive && styles.active)}
        onlyIcon={true}
        icon={<IcoNarrowRight width={24} height={24} stroke={'#fff'} />}
      />
    </div>
  );
};
