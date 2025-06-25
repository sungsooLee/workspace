import { useEffect, useMemo, useState } from 'react';
import { useCodeStore } from '../use-code-store/use-code-store';
import { CODE_GROUP } from '../use-code-store/constants';

/**
 * 언어 코드 맵핑을 위한 커스텀 훅
 * LangCountryCode를 조회하여 cdId -> cdContent 맵을 제공
 */
export const useLanguageMap = () => {
  const { getCode } = useCodeStore();
  const [languageCodes, setLanguageCodes] = useState<any[]>([]);

  const languageMapByCdId = useMemo(() => {
    const map = new Map<string, string>();
    languageCodes.forEach((code) => {
      map.set(code.cdId, code.cdContent);
    });
    return map;
  }, [languageCodes]);

  const getLanguageName = (cdId: string): string => {
    if (!cdId) return '';
    return languageMapByCdId.get(cdId.toUpperCase()) || cdId;
  };

  useEffect(() => {
    const init = async () => {
      const codes = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      setLanguageCodes(codes);
    };
    init();
  }, [getCode]);

  return {
    languageCodes,
    languageMapByCdId,
    getLanguageName,
    isLoading: languageCodes.length === 0,
  };
};
