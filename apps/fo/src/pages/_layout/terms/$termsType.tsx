import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCreation } from 'ahooks';

import { useCurrentRoute } from '@learnway/config';
import { Dropdown, HtmlContent } from '@learnway/ui';

import { pageRouteConfig } from '../../../features/auth';

import { useFetchTermsVersions, useFetchTerms } from '../../../entities/terms';
import type { TermsType } from '../../../types';

import styles from '@learnway/styles/fo/pages/_layout/terms/terms.module.css';

export const Route = createFileRoute('/_layout/terms/$termsType')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateParam: {
      termsType: {
        format: 'string',
        default: 'TERMS_OF_SERVICE',
        conditions: [
          {
            fn: (values: any) => !['TERMS_OF_SERVICE', 'PRIVACY_POLICY'].includes(values.termsType),
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
  const ttt = useCurrentRoute();
  console.log('useCurrentRoute', ttt);
  const { termsType } = Route.useParams();

  const [termsId, setTermsId] = useState<number | undefined>();

  const { data } = useFetchTerms(termsType as TermsType, termsId);
  const { data: versions } = useFetchTermsVersions(termsType as TermsType);

  const options = useCreation(() => {
    if (!versions) {
      return [];
    }
    return versions.map((version) => ({
      value: version.termsId,
      label: version.termsVersion,
    }));
  }, [versions]);

  return (
    <div className={styles.start}>
      <div className={styles.title_box}>
        <h2>{t(`CODE.TERMS_TYPE.${termsType}`)}</h2>

        <Dropdown
          value={termsId}
          size="lg"
          options={options}
          onChange={(value: number) => {
            setTermsId(value);
          }}
          placeholder={t('LABEL.PREVIOUS_TERMS', {
            type: t(`CODE.TERMS_TYPE.${termsType}`),
          })}
        />
      </div>
      <HtmlContent className={styles.details}>{data?.translation?.termsContents}</HtmlContent>
    </div>
  );
}
