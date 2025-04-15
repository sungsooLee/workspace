import { createFileRoute, Link } from '@tanstack/react-router';
import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css';
import bulletStyles from '../../../shared/ui/list/bullet.module.css';

export const Route = createFileRoute('/_guide/guide/list')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">리스트 Page Component</h2>

      {/* definition list */}
      <p className="loc css">
        ../../../pages/_layout/course-introduction/definition-list.module.css
      </p>
      <p className="loc react">
        <Link to="/course-introduction/package">예제링크</Link>
      </p>

      <div className="info">css 경로는 변경 될 수 있습니다.</div>

      <div className="group">
        <h3 className="guide_tit3">용어 리스트 미리보기</h3>
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

      {/* bullet list */}
      <p className="loc css">../../../shared/ui/list/bullet.module.css</p>
      <p className="loc react">
        <Link to="/course-introduction/detail">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">bullet 리스트 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
              <ul>
                <li>
                  본 과정은 다양한 OPIC 문제에 대한 답변 연습을 통해 고급영어 말하기를 완성할 수
                  있도록 도와주는 과정입니다.
                </li>
                <li>
                  OPIC IH 이상의 등급을 받는 데 도움을 받을 수 있는 과정이며 다양한 OPIC 문제에 대한
                  답변 연습을 통해 고급 영어 말하기 능력을 키울 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import bulletStyles from '../../../shared/ui/list/bullet.module.css'; 예시 페이지 모듈

// 사용 예제
<div className={\`\${bulletStyles.start} \${bulletStyles.list}\`}>
  <ul>
    <li>
      본 과정은 다양한 OPIC 문제에 대한 답변 연습을 통해 고급영어 말하기를 완성할 수
      있도록 도와주는 과정입니다.
    </li>
    <li>
      OPIC IH 이상의 등급을 받는 데 도움을 받을 수 있는 과정이며 다양한 OPIC 문제에 대한
      답변 연습을 통해 고급 영어 말하기 능력을 키울 수 있습니다.
    </li>
  </ul>
</div>
`}</code>
          </pre>
        </div>
      </div>

      {/* number list */}
      <p className="loc css">../../../shared/ui/list/bullet.module.css</p>
      <p className="loc react">
        <Link to="/course-introduction/detail">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">number 리스트 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${bulletStyles.start} ${bulletStyles.list_number}`}>
              <ol>
                <li>
                  본 과정은 다양한 OPIC 문제에 대한 답변 연습을 통해 고급영어 말하기를 완성할 수
                  있도록 도와주는 과정입니다.
                </li>
                <li>
                  OPIC IH 이상의 등급을 받는 데 도움을 받을 수 있는 과정이며 다양한 OPIC 문제에 대한
                  답변 연습을 통해 고급 영어 말하기 능력을 키울 수 있습니다.
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import bulletStyles from '../../../shared/ui/list/bullet.module.css'; 예시 페이지 모듈

// 사용 예제
<div className={\`\${bulletStyles.start} \${bulletStyles.list_number}\`}>
  <ol>
    <li>
      본 과정은 다양한 OPIC 문제에 대한 답변 연습을 통해 고급영어 말하기를 완성할 수
      있도록 도와주는 과정입니다.
    </li>
    <li>
      OPIC IH 이상의 등급을 받는 데 도움을 받을 수 있는 과정이며 다양한 OPIC 문제에 대한
      답변 연습을 통해 고급 영어 말하기 능력을 키울 수 있습니다.
    </li>
  </ol>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
