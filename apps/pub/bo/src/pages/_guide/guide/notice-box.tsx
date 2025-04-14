/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { NoticeBox } from '../../../../../../bo/src/shared/ui/';

export const Route = createFileRoute('/_guide/guide/notice-box')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <NoticeBox
        // title="타이틀"
        // description="자동 유저그룹은 인사 DB를 기준으로 특정 시간에 배치로 자동 매핑됩니다."
        descriptions={[
          '자동 유저그룹은 인사 DB를 기준으로 특정 시간에 배치로 자동 매핑됩니다.',
          '회사별로 자동 매핑되며, 유저그룹 설정 시 사용할 수 있습니다.',
        ]}
        type="count"
      />
    </div>
  );
}
