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
    })
  }

  return (
    <div className={cn('flex flex-col gap-10 p-2', styles._start)}>
      <h3>Welcome Home!</h3>
      {/**primary */}
      <div className="flex w-10 gap-5">
        <div className="min-w-32">Primary lg~xs</div>

        <Button size="lg" className={styles._button} onClick={onClickToast}>
          작성완료 2
        </Button>

        <Button>작성완료</Button>

        <Button size="sm">작성완료</Button>

        <Button size="xs">작성완료</Button>
      </div>
      <div className="flex w-10 gap-5">
        <div className="min-w-32">Primary (disabled)</div>

        <Button size="lg" disabled>
          작성완료
        </Button>

        <Button disabled>작성완료</Button>

        <Button size="sm" disabled>
          작성완료
        </Button>

        <Button size="xs" disabled>
          작성완료
        </Button>
      </div>
      {/**outline */}
      <div className="flex gap-5">
        <div className="min-w-32">Outline lg~xs</div>
        <Button size="lg" variant={'outline'}>
          작성완료
        </Button>
        <Button size="md-1" variant={'outline'}>
          작성완료
        </Button>

        <Button size="sm" variant={'outline'}>
          작성완료
        </Button>
        <Button size="xs" variant={'outline'}>
          작성완료
        </Button>
      </div>
      <div className="flex gap-5">
        <div className="min-w-32">Outline (disabled)</div>
        <Button size="lg" variant={'outline'} disabled>
          작성완료
        </Button>
        <Button size="md-1" variant={'outline'} disabled>
          작성완료
        </Button>

        <Button size="sm" variant={'outline'} disabled>
          작성완료
        </Button>
        <Button size="xs" variant={'outline'} disabled>
          작성완료
        </Button>
      </div>
      {/**gray-outline */}
      <div className="flex gap-5">
        <div className="min-w-32">gray lg~xs</div>
        <Button size="lg" variant={'gray-outline'}>
          작성완료
        </Button>

        <Button variant={'gray-outline'}>작성완료</Button>

        <Button variant={'gray-outline'} size="sm">
          작성완료
        </Button>

        <Button variant={'gray-outline'} size="xs">
          작성완료
        </Button>
      </div>
      <div className="flex gap-5">
        <div className="min-w-32">gray (disabled)</div>
        <Button size="lg" variant={'gray-outline'} disabled>
          작성완료
        </Button>

        <Button variant={'gray-outline'} disabled>
          작성완료
        </Button>

        <Button variant={'gray-outline'} size="sm" disabled>
          작성완료
        </Button>

        <Button variant={'gray-outline'} size="xs" disabled>
          작성완료
        </Button>
      </div>
    </div>
  );
}
