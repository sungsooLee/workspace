import { Button } from '../button/button';
import styles from './tree.module.css'; // Tree module CSS
import { IcoXclose } from '@learnway/icons';
import { t } from 'i18next';

export const ChipsForTreeShuttle = ({
  title,
  selectedItems,
  handleRemoveItem,
}: {
  title: string;
  selectedItems: any[];
  handleRemoveItem: (node: any) => void;
}) => {
  return (
    <div className={styles.data_wrap}>
      {selectedItems.length === 0 ? (
        <div className={styles.no_data}>{t('LABEL.noData', { type: t('LABEL.selected') })}</div>
      ) : (
        selectedItems.map((item) => (
          <div key={item.key} className={styles.selected_item}>
            <div className="flex items-center gap-2">
              <span className={styles.selected_text}>{item.label}</span>
            </div>
            <Button onClick={() => handleRemoveItem(item)} className={styles.btn_close}>
              <IcoXclose width={20} height={20} stroke="#131C30" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
};
