import { cn } from '@learnway/shared';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { Panel } from '@learnway/ui';
import { EnButtonLayout } from '@pages/_layout/tenant/channel/management/detail.lazy';
import { NoticeBox } from '@shared/ui';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { forwardRef, useEffect } from 'react';
import styles from './channel-detail-base.module.css';
import { ChannelDetailHomeContent } from './channel-detail-home-content';

interface ChannelDetailHomeProps {
  onButtonLayoutChange: (layout: EnButtonLayout) => void;
}

const ChannelDetailHomeComponent = (props: ChannelDetailHomeProps, ref: any) => {
  const router = useRouter();
  const routerState = useRouterState();
  const channelId = routerState.location.state?.channelId || 1;

  useEffect(() => {
    props.onButtonLayoutChange && props.onButtonLayoutChange(EnButtonLayout.NONE);
  }, []);

  return (
    <div className={cn(styles.start, styles.wrap)}>
      <Panel type="fill" hideHeaderUnderline={true}>
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
      <div className={cn(boxStyles.start, boxStyles.inner)}>
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
        <div className="pt-10">{/* <ContentsHistoryInfoFormField /> */}</div>
      </div>
    </div>
  );
};

export const ChannelDetailHome = forwardRef(ChannelDetailHomeComponent);
