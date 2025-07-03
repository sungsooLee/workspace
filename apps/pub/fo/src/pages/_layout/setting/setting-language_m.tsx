import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useModal, Button } from '@learnway/ui';

import { IcoCheck } from '@learnway/icons';

import styles from './setting-language_m.module.css';

export const Route = createFileRoute('/_layout/setting/setting-language_m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { confirm: openConfirm } = useModal();

  const language = ['언어명', '언어명2', '언어명3', '언어명4', '언어명5'];
  const [languageActive, setLanguageActive] = useState(0);

  const languageConfirm = (index: number): void => {
    openConfirm({
      content: <>선택한 언어로 변경하시겠습니까?</>,
      cancelButtonLabel: '취소',
      okButtonLabel: '확인',
    });
    setLanguageActive(index); // 선택된 언어
  };

  return (
    <div className={`${styles.start} ${styles.language_wrap}`}>
      <ul>
        {language.map((text, index) => (
          <li key={index}>
            <Button onClick={() => languageConfirm(index)}>
              {text}
              {languageActive === index ? (
                <IcoCheck width={24} height={24} stroke="#00afd5" fill="none"></IcoCheck>
              ) : null}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
