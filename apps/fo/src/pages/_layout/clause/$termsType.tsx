import { createFileRoute } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCurrentRoute } from '@learnway/hooks';
import { HtmlContent } from '@learnway/ui/html-content';

import { pageRouteConfig } from '../../../features/auth';

import {
  findTermsType,
  TermsType,
  TermsTypeCode,
  useFetchTerms,
  useFetchTermsVersions,
} from '@entities/terms';

import styles from '@learnway/styles/fo/pages/_layout/terms/terms.module.css';
import { Dropdown } from '@learnway/ui/dropdown';
import { useFetchAuthUser } from '@learnway/auth/entities';

export const Route = createFileRoute('/_layout/clause/$termsType')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateParam: {
      termsType: {
        format: 'string',
        default: 'terms-of-service',
        conditions: [
          {
            fn: (values: any) => !['terms-of-service', 'privacy-policy'].includes(values.termsType),
          },
        ],
      },
    },
    meta: {
      title: '',
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const { params } = useCurrentRoute(Route);

  const { data: authUser } = useFetchAuthUser();

  const termsType = findTermsType(params.termsType);

  const [termsId, setTermsId] = useState<string | undefined>();

  const { data } = useFetchTerms(termsType, Number(termsId));
  const { data: versions } = useFetchTermsVersions(
    termsType,
    authUser?.activeTenant?.tenantId,
    authUser?.locale,
  );

  // paramter 변경 시 상태 초기화
  useEffect(() => {
    //console.log(params?.termsType);
    setTermsId(undefined);
  }, [termsType]);

  const options = useCreation(() => {
    if (!versions) {
      return [];
    }
    return versions.map((version) => ({
      value: String(version.termsId),
      label: version.termsVersion,
    }));
  }, [versions]);

  return (
    <div className={styles.start} key={termsType}>
      <div className={styles.title_box}>
        <h2>
          {termsType === TermsTypeCode.PRIVACY_POLICY ? t('개인정보처리방침') : t('이용약관')}
        </h2>

        <Dropdown
          value={termsId}
          size="lg"
          options={options}
          onChange={(value: string) => {
            setTermsId(value);
          }}
          placeholder={t('이전 {{type}}', {
            type:
              termsType === TermsTypeCode.PRIVACY_POLICY ? t('개인정보처리방침') : t('이용약관'),
          })}
          className={styles.select}
        />
      </div>
      <HtmlContent className={styles.details}>{data?.translation?.termsContents}</HtmlContent>
    </div>
  );
}
