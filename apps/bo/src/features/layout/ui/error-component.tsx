import { useTranslation } from 'react-i18next';

import { Button, EmptyText } from '@learnway/ui';
import { cn } from '@learnway/shared';
import pageStyles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import { useRouter } from '@tanstack/react-router';

export const ErrorComponent = ({ error }: { error: any }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={cn(pageStyles.start, pageStyles.contents, '!pb-0')}>
      <div className={cn(pageStyles.inner, '!pb-0')}>
        <div className={cn('flex h-screen flex-col items-center justify-center overflow-hidden')}>
          <div>
            <EmptyText
              description={'Default Description'}
              footer={
                <>
                  <Button
                    variant={'gray'}
                    size={'md'}
                    label={t('action 1')}
                    onClick={() => {
                      router.navigate({ to: '/' });
                    }}
                  />
                  <Button
                    variant={'primary'}
                    size={'md'}
                    label={t('action 2')}
                    onClick={() => {
                      router.navigate({ to: '/' });
                    }}
                  />
                </>
              }
            />
            <div>{`${error}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
