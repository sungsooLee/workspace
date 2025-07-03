import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { pageRouteConfig } from '../../features/auth';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
  ...pageRouteConfig({
    meta: { mobile: { showHeader: true, showFooter: true, showMainFooter: true } },
  }),
});

function HomeComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col gap-10 p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
