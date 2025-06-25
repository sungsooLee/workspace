import { createFileRoute, Link } from '@tanstack/react-router';

import dataNoticeStyles from '../../../shared/ui/data-display/notice.module.css';
import { IcoSymbol } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/data-display')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">data-notice Page Component</h2>
      <p className="loc css">../../../shared/ui/data-display/notice.module.css</p>
      <p className="loc react">
        <Link to="/course-introduction/detail">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">프로필 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${dataNoticeStyles.start} ${dataNoticeStyles.notice}`}>
              <div className={dataNoticeStyles.tit}>
                <IcoSymbol width={20} height={20} />
                AI가 요약한 과정 핵심내용
              </div>
              <p className={dataNoticeStyles.txt}>
                본 과정에서는 데이터 자동화, 보고서 생성, 반복 업무 최적화 등 실무에 바로 적용
                가능한 파이썬 활용을 손쉽게 해결하는 방법을 단계별로 배웁니다. 비전공자도 이해할 수
                있도록 단계별로 구성되어 있어 실무 문제 해결 역량 향상을 목표로 합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import dataNoticeStyles from '../../../shared/ui/data-display/notice.module.css';
    
// 사용 예제
<div
              className={\`\${dataNoticeStyles.start} \${dataNoticeStyles.notice}\ \${styles.notice}\`}
            >
              <div className={dataNoticeStyles.tit}>
                <IcoSymbol width={20} height={20} />
                AI가 요약한 과정 핵심내용
              </div>
              <p className={dataNoticeStyles.txt}>
                본 과정에서는 데이터 자동화, 보고서 생성, 반복 업무 최적화 등 실무에 바로 적용
                가능한 파이썬 활용을 손쉽게 해결하는 방법을 단계별로 배웁니다. 비전공자도 이해할 수
                있도록 단계별로 구성되어 있어 실무 문제 해결 역량 향상을 목표로 합니다.
              </p>
            </div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
