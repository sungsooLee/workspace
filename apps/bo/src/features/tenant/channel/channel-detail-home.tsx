import { useRouterState, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, Panel } from '@learnway/ui';
import { NoticeBox, ContentsHistoryInfoFormField, FormSubTitle } from '@shared/ui';
import { ChannelDetailHomeContent } from './channel-detail-home-content';

import { cn } from '@learnway/shared';
import styles from './channel-detail-base.module.css';

const ChannelDetailHomeComponent = () => {
  const router = useRouter();
  const routerState = useRouterState();
  const channelId = routerState.location.state?.channelId || 1;

  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'홈 설정'}
        actionNode={
          <>
            <Button
              variant={'gray2'}
              size={'sm'}
              label={'목록'}
              onClick={() => router.navigate({ to: '/tenant/channel' })}
            />
            <Button variant={'gray2'} size={'sm'} label={'초기화'} />
            <Button variant={'line'} size={'sm'} label={'저장'} />
          </>
        }
      />
      <Panel type="rounded" hideHeaderUnderline>
        <div className="p-10">
          <NoticeBox
            iconVisible={true}
            descriptions={[
              '채널 홈의 각 영역을 변경하고, 상단의 저장 버튼을 클릭해야 정상적으로 저장이 되며, 변경한 내용이 채널 홈에 반영됩니다.',
            ]}
            type="bullet"
          />
        </div>
      </Panel>
      <ChannelDetailHomeContent
        title={t('추천 콘텐츠 설정')}
        tableTitle={t('추천 콘텐츠 목록')}
        useSetting={false}
        max={3}
      />
      <ChannelDetailHomeContent title={t('과정 설정')} tableTitle={t('과정 목록')} max={12} />
      <ChannelDetailHomeContent
        title={t('학습 패키지 설정')}
        tableTitle={t('학습 패키지 목록')}
        max={12}
      />
      <ChannelDetailHomeContent title={t('숏츠')} tableTitle={t('숏츠 목록')} max={12} />
      <ContentsHistoryInfoFormField />
    </div>
  );
};

export const ChannelDetailHome = ChannelDetailHomeComponent;
