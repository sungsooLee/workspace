import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Checkbox, Select, Dropdown, DropdownOption } from '@learnway/ui';
// import styles from './legal-content.module.css'; // 이용약관, 개인정보처리방침 공통모듈
import styles from '@learnway/styles/fo/pages/_layout/terms/terms.module.css';

export const Route = createFileRoute('/_layout/footer-menu/agreement')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
    { value: 'option5', label: '옵션 5' },
    { value: 'option6', label: '옵션 6' },
    { value: 'option7', label: '옵션 7' },
    { value: 'option8', label: '옵션 8' },
    { value: 'option9', label: '옵션 9' },
    { value: 'option10', label: '옵션 10' },
  ];
  return (
    <div className={styles.start}>
      <div className={styles.title_box}>
        <h2>이용약관</h2>
        <Dropdown
          options={options}
          value={selectedOptions}
          onChange={(selected: DropdownOption[]) =>
            setSelectedOptions(selected as DropdownOption[])
          }
          placeholder="약관 선택"
          label="다중 선택 (체크박스)"
          variant="default"
          isMulti={false}
          size={'lg'}
          className={styles.select}
        />
        {/* <Dropdown
          size="lg"
          options={[
            { value: 'type1', label: '약관 명 YYYY-MM-DD' },
            { value: 'type2', label: '약관 명 YYYY-MM-DD' },
          ]}
        /> */}
      </div>

      <div className={styles.details}>이용약관 내용</div>
    </div>
  );
}
