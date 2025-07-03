import { httpService } from '@learnway/shared';

export default class MockUserService {
  static fetchUsers() {
    return httpService.get<any>(`http://localhost:4000/api/users`);
  }
}
