import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { t } from 'i18next';
import { useCreation } from 'ahooks';

import {
  ContentsRow,
  DynamicFormField,
  Button,
  useModal,
  Stepper,
  SelectOption,
  RadioCard,
} from '@learnway/ui';
import { z, cn } from '@learnway/shared';
import { useDynamicForm } from '@learnway/hooks';
import { IcoOverseasDealer, IcoBuilding01 } from '@learnway/icons';

import { FormRow, NoticeBox } from '../../../shared/ui';
import { MEMBER_TYPE } from '@learnway/auth/types';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

//type MEMBER_TYPE = (typeof MEMBER_TYPE)[keyof typeof MEMBER_TYPE];

export const Route = createFileRoute('/_auth/signup/member-type')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const stepperItems = useCreation(
    () => [
      { label: '회원유형선택', subLabel: '', value: 'step1' },
      { label: '사업자 정보 조회', subLabel: '', value: 'step2' },
      { label: '회원정보입력', subLabel: '', value: 'step3' },
    ],
    [],
  );

  const [memberType, setMemberType] = useState<MEMBER_TYPE>('GENERAL');

  const handleChange = (event: SelectOption) => {
    console.log(event);
  };

  const handleOk = () => {
    router.navigate({ to: '/signup/company-info', state: { memberType } });
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.signup_info}>
          <div className={styles.step_box}>
            <Stepper
              items={stepperItems}
              onChange={handleChange}
              variant="check"
              selectedStep="step1"
            />
          </div>

          <div className={cn('auth--signup-select')} role="radiogroup">
            <RadioCard
              options={[
                {
                  value: 'GENERAL',
                  label: (
                    <div>
                      <IcoBuilding01 width={48} height={48} className="ico1" />
                      <span>{t('LABEL.common.generalMember')}</span>
                    </div>
                  ),
                },
                {
                  value: 'HTA',
                  label: (
                    /* 퍼블수정 20250317 : ico2 추가 */
                    <div>
                      <IcoOverseasDealer width={48} height={48} className="ico2" />
                      <span>{t('LABEL.common.HTA/HTACVUsers')}</span>
                    </div>
                  ),
                },
              ]}
              value={memberType}
              onChange={(value: any) => setMemberType(value)}
            />
          </div>

          <NoticeBox title={t('LABEL.common.caution')} className={styles.signup_noti}>
            <dd>{t('MESSAGE.CAUTION_MEMBER_TYPE_01')}</dd>
            <dd>{t('MESSAGE.CAUTION_MEMBER_TYPE_02')}</dd>
          </NoticeBox>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              {t('LABEL.common.cancel')}
            </Button>
            <Button variant="primary" size="xl" onClick={() => handleOk()}>
              {t('LABEL.OK')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
