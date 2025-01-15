import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@learnway/ui';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log('page index i18n.language', i18n.language);
  }, [i18n.language]);

  return <div>레이아웃 샘플화면</div>;
}
