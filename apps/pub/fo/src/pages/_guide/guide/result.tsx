import { createFileRoute } from '@tanstack/react-router';

import { IcoComplete } from '@learnway/icons';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';

export const Route = createFileRoute('/_guide/guide/result')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">결과 Page Component</h2>
      <p className="loc css">@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css</p>
      <div className="info">
        위아래 여백은 각 모듈 css에서 정의 styles.success_info (이름변경 가능)
      </div>
      <div className="group">
        <h3 className="guide_tit3">결과 영역 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={proccessResultStyles.start}>
              <i className={proccessResultStyles.ico}>
                {/* 정상처리 */}
                <IcoComplete className={proccessResultStyles.ico1} />
              </i>
              <h3 className={proccessResultStyles.title}>
                {/* 정상처리 */}
                입력하신 정보로 가입된 아이디는 아래와 같습니다.
              </h3>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';
import { IcoCaution } from '@learnway/icons';
import styles from './test.module.css'; // 예시 페이지 모듈

// 사용 예제
<div className={\`\${proccessResultStyles.start} \${styles.success_info}\`}>
  <i className={proccessResultStyles.ico}>
    {/* 아이콘 변경가능 */}
    <IcoComplete className={proccessResultStyles.ico1} />
   
  </i>
  <h3 className={proccessResultStyles.title}>
    입력하신 정보로 가입된 아이디는 아래와 같습니다.
  </h3>
</div>
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
