import { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { TabItemProps, Tabs } from '@learnway/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';

interface SegmentedControlFormFieldProps extends BaseFormFieldProps<string> {
  items: TabItemProps[];
}

const SegmentedControlFormFieldComponent = forwardRef<
  HTMLDivElement,
  SegmentedControlFormFieldProps
>(({ value, onChange, items }, ref) => {
  const handleOnTabChange = (tabKey: string) => {
    onChange?.(tabKey);
  };

  return (
    <div ref={ref} className={formStyles.input_box}>
      <div className={dynamicFormStyles.segment_wrap}>
        <Tabs
          items={items}
          type="segment"
          size="sm"
          className={styles.tab_select}
          selectedTabKey={value}
          onTabChange={handleOnTabChange}
        />
      </div>
    </div>
  );
});

SegmentedControlFormFieldComponent.displayName = 'SegmentedControlFormField';

export const SegmentedControlFormField = SegmentedControlFormFieldComponent;
