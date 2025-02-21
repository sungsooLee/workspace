import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Guide Info</h2>
      <h3 className="guide_tit3">소개</h3>
      <div className="group">
        <div className="info">리액트,테일윈드,module.css로 진행한다.</div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import signupStyles from './signup.module.css'

// 사용 예제
<div className={styles.test}></div>
`}</code>
          </pre>
        </div>

        <div className="group">
          <h3 className="guide_tit3">Module CSS (기본)</h3>
          <ul className="info_ul">
            <li>기본적으로 파일 생성후 같은 파일명으로 모듈 css를 같은 위치에 import한다.</li>
            <li>
              같은 형태의 디자인과 페이지에서는 여러 모듈 css를 생성할 필요없이 하나만 만들어서
              사용가능하다. (함수명 체크)
            </li>
          </ul>
          <div className="code_example">
            <pre className="code_block">
              <code>{`import styles from './signup.module.css'

// 사용 예제
<div className={styles.test}></div>`}</code>
            </pre>
          </div>
          <div className="info">
            주의 : 모듈 css에서는 className 지정시 '-' 대신 '_' 를 사용해야하며, <br />
            두개 사용시 백틱 ` 으로 묶어서 사용한다. 그리고 styles을 앞에 꼭 작성해야 적용이 된다.
          </div>

          <h3 className="guide_tit3">Module CSS (응용)</h3>

          <div className="code_example">
            <pre className="code_block">
              <code>{`import signupStyles from './signup.module.css' // 여러페이지에서 하나의 css를 호출해서 사용하는 방법
              
// 사용 예제
<div className={signupStyles.test}></div>`}</code>
            </pre>
          </div>

          <h3 className="guide_tit3">Module CSS (반응형)</h3>

          <div className="code_example">
            <pre className="code_block">
              <code>{`
// 반응형 일때
ex) test.module.css

:global(body.mobile) {
  @screen mobile {
    .start {
      @apply hidden;
    }
  }
}`}</code>
            </pre>
          </div>
          <div className="info">0~767px(mobile), 768px이상부터 pc화면으로 노출된다.</div>

          <h3 className="guide_tit3">모바일 분기처리</h3>

          <div className="code_example">
            <pre className="code_block">
              <code>{`// 분기처리 import
import { isMobile } from 'react-device-detect';

{isMobile ? 'mobile 내용' : 'PC 내용'}`}</code>
            </pre>
          </div>

          <h3 className="guide_tit3">Global CSS</h3>
          <p className="loc css">
            파일 위치 : /apps/pub/fo/src/assets/styles/<strong>global.css</strong>
          </p>
          <ul className="info_ul">
            <li>
              공통 콤퍼넌트에서 색상이나 스타일이 변경될때 global.css를 통해 '오버라이드' 한다.
            </li>
            <li>
              오버라이드해야할 콤포넌트는 /components 에 파일 추가 후 index.css에서 import한다.
            </li>

            <li>기본 스타일이나 변수 (ex._color.css)등 전역적인 스타일은 global.css를 활용한다.</li>
          </ul>
          <div className="code_example">
            <pre className="code_block">
              <code>{`.nlp--input {
오버라이드할 스타일(class명이 없을경우 선택자 활용)
}`}</code>
            </pre>
          </div>
          <div className="info">
            주의 : 모듈 css에서는 className 지정시 '-' 대신 '_' 를 사용해야하며, <br />
            두개 사용시 백틱 ` 으로 묶어서 사용한다. 그리고 styles을 앞에 꼭 작성해야 적용이 된다.
          </div>
        </div>
      </div>
    </div>
  );
}
