import { createFileRoute } from '@tanstack/react-router';
import { MobileView, BrowserView } from 'react-device-detect';
import { AuthTitle } from '../../features/auth';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoCaution } from '@learnway/icons';
import styles from './tenant-select.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css'; // 폼모듈
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';
import { Button, ContentsRow, OptionCard, OptionCardItem } from '@learnway/ui';

export const Route = createFileRoute('/_auth/tenant-select')({
  component: RouteComponent,
});

function RouteComponent() {
  const dummyOptions = [
    { label: '현대자동차 그룹', value: 'a' },
    { label: '플랫폼 테넌트', value: 'b' },
  ];
  const [values, setValues] = useState<string[]>();
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.tenant_select}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <AuthTitle />
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <OptionCard
                  value={values}
                  cols={2}
                  options={dummyOptions}
                  onOptionSelect={(option: OptionCardItem) => setValues(option.value)}
                />
              </div>
            </ContentsRow>
          </div>

          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="primary" size="xl">
                확인
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button variant="primary" size="xl">
                확인
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </form>
  );
}
