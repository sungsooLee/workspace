const SUPPORTED_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'sms:', 'tel:']);

/**
 * URL을 검증하여 안전하지 않은 URL을 'about:blank'로 대체하는 함수
 *
 * @param {string} url - 검증할 URL 문자열
 * @returns {string} - 안전한 URL 문자열 (허용된 프로토콜이 아니면 'about:blank' 반환)
 */
export function sanitizeUrl(url: string): string {
  try {
    // 주어진 URL 문자열을 파싱하여 URL 객체를 생성
    const parsedUrl = new URL(url);

    // URL의 프로토콜을 검사
    // SUPPORTED_URL_PROTOCOLS는 허용된 프로토콜 집합 (예: 'http:', 'https:', 'ftp:')
    // eslint-disable-next-line no-script-url
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      // 허용되지 않은 프로토콜인 경우 안전한 기본 URL 'about:blank'를 반환
      return 'about:blank';
    }
  } catch {
    // URL 파싱 중 에러가 발생하면 원래 URL을 그대로 반환
    // 이 경우 URL이 상대 경로 등으로 올바르지 않을 가능성이 있음
    return url;
  }

  // URL이 안전한 경우 원래 URL 반환
  return url;
}
