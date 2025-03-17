import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Checkbox, Select } from '@learnway/ui';
import styles from './agreement.module.css'; // 페이지 모듈
import legalContentStyles from './legal-content.module.css'; // 이용약관, 개인정보처리방침 공통모듈

export const Route = createFileRoute('/_auth/agreement')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={legalContentStyles.start}>
      <div className={legalContentStyles.title_box}>
        <h2>이용약관</h2>
        <Select
          size="lg"
          options={[
            { value: 'type1', label: '약관 명 YYYY-MM-DD' },
            { value: 'type2', label: '약관 명 YYYY-MM-DD' },
          ]}
        />
      </div>

      <div className={legalContentStyles.details}>이용약관 내용</div>
    </div>
  );
}
