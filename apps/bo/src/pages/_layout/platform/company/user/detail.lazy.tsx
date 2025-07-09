import { useState, useEffect } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { t } from 'i18next';
import { PageContainer, MainContents, LinkBox, ContentsButtons } from '@shared/ui';
import { Button, TableBox, Tabs } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formUtils } from '@entities/form-utils';
import { FormSubTitle } from '@shared/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

import { CompanyUserDetail } from '@features/platform-management/company';

export const Route = createLazyFileRoute('/_layout/platform/company/user/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/platform/company/user' })}
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="point" size="sm">
          {t('LABEL.button.reset')}
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <CompanyUserDetail />
      </MainContents>
    </PageContainer>
  );
}
