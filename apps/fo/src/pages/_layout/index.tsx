import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@learnway/ui';

import { usePageMetaState } from '../../entities/platform';

import { metaConfig } from '../../features/auth';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
  ...metaConfig({ mobile: { showFooter: true } }),
});

function HomeComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col gap-10 p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
