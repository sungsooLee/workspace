import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

/**
 * label, guideText만 노출하는 form_item
 * 두 props 모두 없는 경우, 빈 칸을 대체하는 form_item
 */
interface FormItemComponentProp {
  label?: string;
  guideText?: string;
}

const FormItemComponent = ({ label, guideText }: FormItemComponentProp) => {
  return (
    <div className={formStyles.form_item}>
      {label && (
        <label className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
          <span className={styles.form_text}> {label}</span>
        </label>
      )}
      {guideText && <p className={formStyles.guide_text}>{guideText}</p>}
    </div>
  );
};

export const FormItem = FormItemComponent;
