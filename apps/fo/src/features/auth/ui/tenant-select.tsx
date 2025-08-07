import { useRouter } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser, useUpdateTenantRoleLastSelect } from '@learnway/auth/entities';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css'; // 폼모듈
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
// import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';
import authTitleStyles from '@learnway/styles/fo/pages/_auth/auth-title.module.css';

import { MobileContainerFooter } from '@shared/m.ui';
import styles from './tenant-select.module.css';

const TenantSelectComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: authUser } = useFetchAuthUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();

  const [tenantvalues, setTenantValues] = useState<OptionCardItem>();

  // 테넌트 목록
  const tenantOptions = useMemo(() => {
    if (!authUser?.tenants) return [];

    return authUser?.tenants?.map?.((tenant) => ({
      label: tenant.tenantName,
      value: String(tenant.tenantId),
      original: { ...tenant },
    }));
  }, [authUser?.tenants]);

  const handleButton = async () => {
    await updateTenantRole(
      { lastVisitedFoTenantId: tenantvalues?.value },
      {
        onSuccess: (data: any) => {
          router.navigate({ to: '/' });
        },
      },
    );
  };

  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.tenant_select}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <BrowserView>
            <div className={authTitleStyles.start}>
              <h2>
                <span className={authTitleStyles.title}>{t('테넌트 선택')}</span>
                <span className={authTitleStyles.info}>{t('입장하실 테넌트를 선택하세요')}</span>
              </h2>
            </div>
          </BrowserView>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <OptionCard
                  value={tenantvalues}
                  cols={2}
                  options={tenantOptions}
                  onOptionSelect={(option: OptionCardItem) => {
                    setTenantValues(option);
                  }}
                />
              </div>
            </ContentsRow>
          </div>

          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="primary" size="xl" disabled={!tenantvalues} onClick={handleButton}>
                {t('확인')}
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button variant="primary" size="xl" onClick={handleButton}>
                {t('확인')}
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </form>
  );
};

/**
 * @description 로그인 테넌트 선택 : NLP_FO_LOG_MR2001, NLP_FO_LOG_2001
 */
export const TenantSelect = TenantSelectComponent;
