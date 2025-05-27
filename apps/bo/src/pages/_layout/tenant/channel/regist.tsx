import { t } from 'i18next';
import { createFileRoute, useRouterState, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button } from '@learnway/ui';
import { FormSubTitle } from '@shared/ui';
import { ChannelDetail } from '@features/tenant/channel/channel-detail';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

export const Route = createFileRoute('/_layout/tenant/channel/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const method = routerState.location.state?.method;
  const channelRequestUuid = routerState.location.state?.channelRequestUuid;
  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/tenant/channel' })}
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>

        <Button type="submit" variant="primary" size="sm">
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <ChannelDetail mode="add" method={method} requestId={channelRequestUuid} />
      </MainContents>
    </PageContainer>
  );
}
