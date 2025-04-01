import { createFileRoute } from '@tanstack/react-router';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/notice')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">유의사항 Component</h2>
      <p className="loc css">@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css</p>
      <div className="info">
        위아래 여백은 각 모듈 css에서 정의 styles.signup_noti (이름변경 가능)
      </div>
      <div className="group">
        <h3 className="guide_tit3">유의사항 미리보기</h3>
        <div className="flex_box">
          <div className="desc">
            <div className={`${noticeBoxStyles.start} \${styles.signup_noti}`}>
              <dl className={noticeBoxStyles.check_point}>
                <dt>
                  <IcoCaution width={16} height={16} stroke="#6F798B" />
                  유의사항
                </dt>
                <dd>
                  영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.
                </dd>
                <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>

                <dd>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</dd>
                <dd>
                  생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.
                </dd>
                <dd>
                  3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의
                  문자는 입력하실 수 없습니다.
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`// 기본 호출방법
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css'; // notice 관련 css
import { IcoCaution } from '@learnway/icons';
import styles from './test.module.css'; // 예시 페이지 모듈

// 사용 예제
<div className={\`\${noticeBoxStyles.start} \${styles.signup_noti}\`}>
  <dl className={noticeBoxStyles.check_point}>
    <dt>
      <IcoCaution width={16} height={16} stroke="#6F798B" />
      유의사항
    </dt>
    <dd>
      영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.
    </dd>
    <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>

    <dd>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</dd>
    <dd>
      생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.
    </dd>
    <dd>
      3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는
      입력하실 수 없습니다.
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
