import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button } from '@learnway/ui';
import { FormSubTitle } from '@shared/ui';
import { ChannelDetail } from '@features/tenant/channel/channel-detail';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';

export const Route = createFileRoute('/_layout/tenant/channel/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <FormSubTitle
          label={'채널 정보'}
          underLine
          actionNode={
            <>
              <p className="info_text">{`접수ID : ${45785566322}`}</p>
              <Button variant={'gray2'} size={'sm'} label={'채널 접수정보 불러오기 '} />
            </>
          }
        />
        <ChannelDetail mode="add" />
      </MainContents>
    </PageContainer>
  );
}
