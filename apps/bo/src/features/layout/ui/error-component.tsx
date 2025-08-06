import { useTranslation } from 'react-i18next';

import { ERROR } from '@learnway/config';
import { cn } from '@learnway/shared';
import pageStyles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import { Button } from '@learnway/ui/button';
import { EmptyText } from '@learnway/ui/empty-text';
import { useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

export const ErrorComponent = ({ error }: { error: any }) => {
  console.log('### ErrorComponent', error);

  const { t } = useTranslation();
  const router = useRouter();

  const { text, errorText } = useMemo(() => {
    let text = '';
    let errorText = '';

    switch (error) {
      case ERROR.PAGE_ACCESS_DENIED: {
        text = t('페이지 접근 권한이 없습니다.');
        errorText = '';
        break;
      }
      default: {
        text = t('페이지 오류가 발생 했습니다.');
        errorText = error;
        break;
      }
    }

    return {
      text,
      errorText,
    };
  }, [error]);

  return (
    <div className={cn(pageStyles.start, pageStyles.contents, '!pb-0')}>
      <div className={cn(pageStyles.inner, '!pb-0')}>
        <div className={cn('flex h-screen flex-col items-center justify-center overflow-hidden')}>
          <div>
            <EmptyText
              text={text}
              description={`${errorText}`}
              footer={
                <>
                  {/* <Button
                    variant={'gray'}
                    size={'md'}
                    label={t('action 1')}
                    onClick={() => {
                      router.navigate({ to: '/' });
                    }}
                  /> */}
                  <Button
                    variant={'primary'}
                    size={'md'}
                    label={t('action 2')}
                    onClick={() => {
                      router.navigate({ to: '/' });
                    }}
                  >
                    {t('홈')}
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
