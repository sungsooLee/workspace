import { FC, ReactNode } from 'react';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

const FormGroupComponent: FC<{ children: ReactNode; required?: boolean; title?: string }> = ({
  children,
  title = '',
  required = false }) => {
  return (
    <div className={styles.form_contents_wrap}>
      {title && (
        <strong className={styles.tit_sub}>
          {t(title)}
          {/* 필수 케이스 */}
          {required && (
            <span className={cn(styles.status, styles.required)}>
              <IcoFormRequired width={12} height={12} />
            </span>
          )}
        </strong>
      )}
      <div className={styles.form_contents}>{children}</div>
    </div>
  );
};

export const FormGroup = FormGroupComponent;
