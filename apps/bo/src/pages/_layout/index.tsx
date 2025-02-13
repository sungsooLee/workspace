import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Button, useToast } from '@learnway/ui';

import styles from './index.module.css';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { t, i18n } = useTranslation();
  const { open } = useToast();

  const onClickToast = () => {
    open({
      title: 'title a',
      description: 'desc a',
    });
  };

  return (
    <div className={cn('flex flex-col gap-10 p-2', styles._start)}>
      <h3>Welcome Home!</h3>
      {/**primary */}
    </div>
  );
}
