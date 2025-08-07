import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useMobileAuthTitle = (path: string) => {
  const { t } = useTranslation();

  console.log('@@@ path', path);

  const PAGE_TITLE: Record<string, string> = {
    '/agreement_check': t('약관동의'),
    '/signup-step1': t('회원가입'),
    '/signup-step2': t('회원가입'),
    '/signup-step3': t('회원가입'),
    '/login': t('Welcome\nLearning-Way'),
    '/success': t('휴면 계정 해제'), // 휴먼 계정 해제결과와 동일
    '/progress-status-email': t('회원가입 진행현황'),
    '/progress-status-cert': t('회원가입 진행현황'),
    '/progress-status-result': t('회원가입 진행현황'),
    '/search-account': t('아이디 / 비밀번호 찾기'),
    '/dormant-account': t('휴면 계정 해제'),
    '/password-input': t('비밀번호 입력'), //// 휴먼 계정 해제와 동일
    '/password-set': t('비밀번호 설정'),
    '/password-modify': t('비밀번호 변경'),
    '/search-id-success': t('아이디찾기'),
    '/mpass-cert': t('MPASS 인증'),
    '/google-cert': t('구글 OTP 인증'),
    '/signup-step2-en': t('Create An Account'),
    '/signup-step3-en': t('Create An Account'),
    '/agreement-privacy': t('이용약관 및 개인정보 처리방침'),
    '/dormant-info': t('휴면 계정 안내'),
    '/tenant-select': t('테넌트 선택'),
  };

  const title: string = useMemo(() => {
    try {
      const matchedKey = Object.keys(PAGE_TITLE).find((key) => path.endsWith(key));

      if (matchedKey) {
        return PAGE_TITLE[matchedKey];
      } else {
        return '';
      }
    } catch (error) {
      console.log('@@@ error', error);
      return '';
    }
  }, [path]);

  return { title };
};
