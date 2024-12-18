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

  return (
    <div className="flex gap-10 p-2 flex-col">
      <h3>Welcome Home!</h3>
      {/**primary */}
      <div className="flex gap-5 w-10">
        <div className="min-w-32">Primary lg~xs</div>

        <Button size="lg">작성완료</Button>

        <Button>작성완료</Button>

        <Button size="sm">작성완료</Button>

        <Button size="xs">작성완료</Button>
      </div>
      <div className="flex gap-5 w-10">
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
