import { httpService } from '@learnway/shared';

export default class MockCodeService {
  static fetchCode(code: string) {
    return httpService.get<any>(`http://localhost:4000/api/codes?code=${code}`);
  }
  static fetchCodes() {
    return httpService.get<any>(`http://localhost:4000/api/codes`);
  }
  static getTestCodes() {
    return httpService.get<any>(`http://localhost:4000/api/codes/test-code`);
  }
  static getTestCode(code: string) {
    return httpService.get<any>(`http://localhost:4000/api/codes/test-code/${code}`);
  }
}
