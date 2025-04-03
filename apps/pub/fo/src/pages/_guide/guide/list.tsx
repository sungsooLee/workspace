import { createFileRoute, Link } from '@tanstack/react-router';
import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css';

export const Route = createFileRoute('/_guide/guide/list')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">리스트 Page Component</h2>
      <p className="loc css">
        ../../../pages/_layout/course-introduction/definition-list.module.css
      </p>
      <p className="loc react">
        <Link to="/course-introduction/package">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">유의사항 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
              <dl>
                <dt>학습유형</dt>
                <dd>패키지</dd>
              </dl>
              <dl>
                <dt>카테고리</dt>
                <dd>
                  Quality &gt; Service &gt; Hydrogen/Electricity &gt; Ioniq 5 &gt; NE PE &gt;
                  Technical Information
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css'; // 예시 페이지 모듈

// 사용 예제
<div className={\`\${definitionListStyles.start} \${definitionListStyles.list}\`}>
    <dl>
      <dt>학습유형</dt>
      <dd>패키지</dd>
    </dl>
    <dl>
      <dt>카테고리</dt>
      <dd>
        Quality &gt; Service &gt; Hydrogen/Electricity &gt; Ioniq 5 &gt; NE PE &gt;
        Technical Information
      </dd>
    </dl>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
