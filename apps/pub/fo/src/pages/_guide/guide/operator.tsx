import { createFileRoute, Link } from '@tanstack/react-router';

import operatorStyles from '../../../pages/_layout/course-introduction/operator.module.css';
import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css';

export const Route = createFileRoute('/_guide/guide/operator')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">프로필 Page Component</h2>
      <p className="loc css">
        ../../../pages/_layout/course-introduction/operator.module.css
        <br />
        ../../../pages/_layout/course-introduction/definition-list.module.css
      </p>
      <p className="loc react">
        <Link to="/course-introduction/package">예제링크</Link>
      </p>

      <div className="group">
        <h3 className="guide_tit3">프로필 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${operatorStyles.start} ${operatorStyles.operator}`}>
              <div className={operatorStyles.avatar}>
                <span>김</span>
              </div>
              <div className={operatorStyles.txt_box}>
                <div className={operatorStyles.profile}>
                  <strong>김지민 책임</strong>
                  <div>
                    <span>현대오토에버</span>
                    <span>L&D플랫폼팀</span>
                  </div>
                </div>
                <div className={operatorStyles.definition_list}>
                  {/* definition list */}
                  <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                    <dl>
                      <dt>이메일</dt>
                      <dd>abc@hyundai.conm</dd>
                    </dl>
                    <dl>
                      <dt>전화</dt>
                      <dd>02-555-2323</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import operatorStyles from '../../../pages/_layout/course-introduction/operator.module.css';
import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css'; // 예시 페이지 모듈
    
// 사용 예제
<div className={\`\${operatorStyles.start} \${operatorStyles.operator}\`}>
    <div className={operatorStyles.avatar}>
      <span>김</span>
    </div>
    <div className={operatorStyles.txt_box}>
      <div className={operatorStyles.profile}>
        <strong>김지민 책임</strong>
        <div>
          <span>현대오토에버</span>
          <span>L&D플랫폼팀</span>
        </div>
      </div>
      <div className={operatorStyles.definition_list}>
        {/* definition list */}
        <div className={\`\${definitionListStyles.start} \${definitionListStyles.list}\`}>
          <dl>
            <dt>이메일</dt>
            <dd>abc@hyundai.conm</dd>
          </dl>
          <dl>
            <dt>전화</dt>
            <dd>02-555-2323</dd>
          </dl>
        </div>
      </div>
    </div>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
