import { httpService } from '@learnway/shared';

export default class MockCodeService {
  static fetchCodes(code: string) {
    return httpService.get<any>(`http://localhost:4000/api/codes?code=${code}`);
  }
}
