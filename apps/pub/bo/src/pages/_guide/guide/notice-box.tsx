/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { NoticeBox } from '../../../../../../bo/src/shared/ui/';

export const Route = createFileRoute('/_guide/guide/notice-box')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">NoticeBox Component Guide</h2>
      <p className="loc react">/src/shared/ui/notice-box/notice-box.tsx</p>
      <p className="info">
        title: '타이틀' // 타이틀
        <br />
        type: 'bullet' | 'count' // 리스트 타입(블릿,카운트)
        <br />
        iconVisible: true // 아이콘 유무
        <br />
        description // 텍스트 한줄인 경우
        <br />
        descriptions // 텍스트 멀티줄인 경우
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { NoticeBox } from '../../../../../../bo/src/shared/ui/';`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">NoticeBox 기본</h3>
        <div className="flex_box">
          <div className="desc">
            <NoticeBox
              title="타이틀"
              // description="자동 유저그룹은 인사 DB를 기준으로 특정 시간에 배치로 자동 매핑됩니다."
              descriptions={[
                '자동 유저그룹은 인사 DB를 기준으로 특정 시간에 배치로 자동 매핑됩니다.',
                '회사별로 자동 매핑되며, 유저그룹 설정 시 사용할 수 있습니다.',
              ]}
              // type="count"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
