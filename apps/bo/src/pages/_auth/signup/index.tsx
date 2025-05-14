import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { IcoArrowForward, IcoBuilding01, IcoFormRequired, IcoUser01 } from '@learnway/icons';
import { cn, SelectOption } from '@learnway/shared';
import {
  Button,
  Checkbox,
  ContentsRow,
  Input,
  InputModalSelectorFormField,
  InputTimer,
  PhoneNumber,
  RadioCard,
  Stepper,
  useModal,
} from '@learnway/ui';
import { pageRouteConfig } from '@features/auth/index';

import styles from '@features/user/signup/ui/signup-select.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { adminItems, cpItems } from '@features/user/signup/ui/signup-select';

export const Route = createFileRoute('/_auth/signup/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '관리자 회원가입',
    },
  }),
});

function RouteComponent() {
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<string>('type1');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };
  const itemsToShow = selectedValue === 'type1' ? cpItems : adminItems;

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.step_box}>
          <Stepper items={itemsToShow} variant="check" selectedStep="step1" />
        </div>

        <div className={cn(styles.signup_select, 'auth--signup-select')} role="radiogroup">
          <RadioCard
            className={styles.radio_card}
            options={[
              {
                value: 'type1',
                label: (
                  <div>
                    <IcoBuilding01 width={48} height={48} className={styles.ico1} />
                    <span>CP사 회원가입</span>
                  </div>
                ),
              },
              {
                value: 'type2',
                label: (
                  <div>
                    <IcoUser01 width={48} height={48} className={styles.ico2} />
                    <span>관리자 권한 신청</span>
                  </div>
                ),
              },
            ]}
            defaultValue={'type1'}
            onValueChange={handleValueChange}
          />
        </div>
        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button
            variant="primary"
            size="xl"
            onClick={() => {
              selectedValue === 'type1' && router.navigate({ to: '/signup/cp' });
              selectedValue === 'type2' && router.navigate({ to: '/signup/admin' });
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
