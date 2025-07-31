import { IcoArrowBackward, IcoClose02 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button, Popover } from '@learnway/ui';
import styles from './pop-header-actions.module.css';

interface ButtonProps {
  onBack?: () => void;
}

export const PopHeaderActions: React.FC<ButtonProps> = ({ onBack }) => {
  return (
    <div className={cn(styles.start, styles.pop_header_actions)}>
      <Button
        label={'이전'}
        icon={<IcoArrowBackward />}
        iconAlign={'left'}
        className={styles.btn_back}
        onClick={onBack}
      />
      <Popover.Close>
        <IcoClose02 className={styles.icon_close} />
      </Popover.Close>
    </div>
  );
};
