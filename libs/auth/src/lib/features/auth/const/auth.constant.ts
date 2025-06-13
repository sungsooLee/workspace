export const SESSION_TIMEOUT_LIMIT_DURATION = 1000 * 60 * 60 * 2; // 2시간 = 1000 * 60 * 60 * 2 = 7200000
export const SESSION_TIMEOUT_EXTENSION_ALERT_DURATION = 1000 * 60 * 5; // 경과 5분전 = 1000 * 60 * 5 = 300000

// 25/06/13
// |------------------------------+------------------+------------+---------|
// | 에러 타입                    | HTTP Status Code | Error Code | 팝업 ID |
// |------------------------------+------------------+------------+---------|
// | UNAUTHORIZED                 |              401 | A001       |         |
// | INVALID_USERNAME_OR_PASSWORD |              401 | A002       | 1,2     |
// | JWT_EXPIRED                  |              401 | A003       |         |
// | RTJWT_EXPIRED                |              401 | A004       |         |
// | USER_LOCKED                  |              401 | A005       | 3       |
// | SSO_LOCKED                   |              401 | A006       | 4       |
// | APPROVAL_REQUIRED            |              401 | A007       | 7,9     |
// | PASSWORD_EXPIRED             |              401 | A008       | 11,12   |
// | ACCESS_DENIED                |              403 | A020       |         |
// |------------------------------+------------------+------------+---------|
// NLP_BO_LOG_1000 / 로그인 / 로그인 > 로그인 > 관리자 로그인 얼럿
export const AUTH_ERROR_CODE = {
  NOTFOUND_ID: '', // 아이디 없음  1
  PASSWORD_FAIL: 'A002', // 패스워드 실패  2
  LOGIN_LOCK_PASSWORD_USE: 'A005', // 잠김 - 패스워드 사용자  3
  LOGIN_LOCK_PASSWORD_NOT_USE: 'A006', // 잠김 - 패스워드 미사용자  4
  APPROVAL_ADMIN_PENDING: 'A007', // 어드민 승인 대기  7
  APPROVAL_ADMIN_REJECT: '', // 어드민 승인 반려  8
  APPROVAL_CP_PENDING: 'A007', // CP 승인 대기  9
  APPROVAL_CP_REJECT: '', // CP 승인 반려  10
  PASSWORD_CHANGE_PASSWORD_USE: 'A008', // 패스워드 변경 안내 - 패스워드 사용자  11
  PASSWORD_CHANGE_PASSWORD_NOT_USE: '', // 패스워드 변경 안내 - 패스워드 미사용자  12
  TENANT_PENDING: '', //테넌트 개설 대기중  13
};
