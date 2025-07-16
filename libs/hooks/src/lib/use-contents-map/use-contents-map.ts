import { useEffect, useMemo, useState } from 'react';
import { useCodeStore } from '../use-code-store/use-code-store';
import { CODE_GROUP } from '../use-code-store/constants';

/**
 * 콘텐츠 타입 맵핑을 위한 커스텀 훅
 */
export const useContentsMap = () => {
  const { getCode } = useCodeStore();
  const [contentTypeCodes, setContentTypeCodes] = useState<any[]>([]);

  const contentTypeMapByCdId = useMemo(() => {
    const map = new Map<string, string>();
    contentTypeCodes.forEach((code) => {
      map.set(code.cdId, code.cdContent);
    });
    return map;
  }, [contentTypeCodes]);

  const getContentsTypeName = (cdId: string): string => {
    if (!cdId) return '';
    return contentTypeMapByCdId.get(cdId.toUpperCase()) || cdId;
  };

  useEffect(() => {
    const init = async () => {
      const codes = await getCode(CODE_GROUP['cms.content.ContentType']);
      setContentTypeCodes(codes);
    };
    init();
  }, [getCode]);

  return {
    contentTypeCodes,
    contentTypeMapByCdId,
    getContentsTypeName,
    isLoading: contentTypeCodes.length === 0,
  };
};
