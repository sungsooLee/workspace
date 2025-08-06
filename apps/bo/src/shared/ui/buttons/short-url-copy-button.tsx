import { Button, ButtonComponentProps } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ShortUrlCopyButtonProps extends ButtonComponentProps {
  url?: string;
  params?: Record<string, string | number | boolean>;
}

const Component: React.FC<ShortUrlCopyButtonProps> = ({
  label,
  variant = 'gray2',
  size = 'xs',
  ...props
}) => {
  const { t } = useTranslation();
  const { alert } = useModal();

  // 단축 URL 생성 시뮬레이션 (보통은 API 호출)
  const createShortUrl = async (): Promise<string> => {
    // 실제 환경이라면 여기서 fetch/post 요청
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://sample.com');
      }, 1000); // 1초 delay 시뮬레이션
    });
  };

  const handleClick = async () => {
    alert('준비중입니다.');
    // try {
    //   const shortUrl = await createShortUrl();
    //   await navigator.clipboard.writeText(shortUrl);
    //   alert(`복사되었습니다: ${shortUrl}`);
    // } catch (err: any) {
    //   console.error('복사 중 오류가 발생했습니다.', err);
    //   alert('복사 중 오류가 발생했습니다.');
    // }
  };

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      label={label || t('URL 생성')}
      preventDefault
      stopPropagation
      onClick={handleClick}
    />
  );
};

export const ShortUrlCopyButton = Component;
