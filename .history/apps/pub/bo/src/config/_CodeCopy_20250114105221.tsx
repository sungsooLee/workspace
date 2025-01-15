import React, { useState } from 'react';

const CodeCopy = ({ code }) => {
  // 버튼 텍스트 상태 관리
  const [buttonText, setButtonText] = useState('코드 복사');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code); // 전달받은 코드 복사
      setButtonText('복사되었습니다!'); // 텍스트 변경

      // 4초 후에 원래 텍스트로 복구
      setTimeout(() => {
        setButtonText('코드 복사');
      }, 4000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      {buttonText}
    </button>
  );
};

export default CodeCopy;
