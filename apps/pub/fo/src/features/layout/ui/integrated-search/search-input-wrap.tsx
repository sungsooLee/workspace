import { IcoNarrowRight } from '@learnway/icons';

import logoImage from '@learnway/styles/fo/assets/images/common/logo_symbol.png';

import styles from './search-input-wrap.module.css';
import { Input } from '@learnway/ui/input';
import { Button } from '@learnway/ui/button';

interface SearchInputWrapProps {
  buttonActive?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInputWrap: React.FC<SearchInputWrapProps> = ({
  buttonActive,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.search_input_wrap}>
      <img src={logoImage} alt="" className={styles.logo} />
      <Input
        borderNone={true}
        inputSize={'lg'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input_area}
      />
      <Button
        className={styles.btn_action}
        onlyIcon={true}
        icon={<IcoNarrowRight width={24} height={24} stroke={'#fff'} />}
        disabled={!buttonActive}
      />
    </div>
  );
};
