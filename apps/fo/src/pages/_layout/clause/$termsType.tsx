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
import { SelectOption } from '@learnway/ui/type';

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
  const [termsId, setTermsId] = useState<number>();
  const [options, setOptions] = useState<SelectOption[]>([]);

  const termsTypeCode = findTermsType(params.termsType);

  const { data } = useFetchTerms(termsTypeCode, termsId, authUser?.locale);
  const { data: versions } = useFetchTermsVersions(
    termsTypeCode,
    authUser?.activeTenant?.tenantId,
    authUser?.locale,
  );

  // paramter 변경 시 상태 초기화
  useEffect(() => {
    //console.log(params?.termsType);
    setTermsId(undefined);
  }, [termsTypeCode]);

  useEffect(() => {
    if (!versions) return;
    const options = versions.map((version) => ({
      value: version.termsId,
      label: version.termsVersion,
    }));
    setOptions(options);
  }, [versions]);

  return (
    <div className={styles.start} key={termsTypeCode}>
      <div className={styles.title_box}>
        <h2>
          {termsTypeCode === TermsTypeCode.PRIVACY_POLICY ? t('개인정보처리방침') : t('이용약관')}
        </h2>

        <Dropdown
          value={termsId}
          size="lg"
          options={options}
          onChange={(value) => {
            setTermsId(value);
          }}
          placeholder={t('이전 {{type}}', {
            type:
              termsTypeCode === TermsTypeCode.PRIVACY_POLICY
                ? t('개인정보처리방침')
                : t('이용약관'),
          })}
          className={styles.select}
        />
      </div>
      <HtmlContent className={styles.details}>
        {!data && t('약관 정보가 없습니다.')}
        {data && data?.translation?.termsContents}
      </HtmlContent>
    </div>
  );
}
