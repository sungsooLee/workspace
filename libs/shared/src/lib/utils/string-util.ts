/**
 * @description 핸드폰번호 변환
 * @param t String | number
 * @returns string
 */
export function formatPhoneNumber(t?: string | number): string {
  if (!t) return '';
  const text = typeof t === 'number' ? String(t) : t;

  // 숫자만 남기기
  const cleaned = text.replace(/\D/g, '');

  if (cleaned.length === 11) {
    // 010-1234-5678
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 10) {
    // 010-123-4567
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else {
    // 자릿수 맞지 않을 경우 그대로 반환
    return text;
  }
}
