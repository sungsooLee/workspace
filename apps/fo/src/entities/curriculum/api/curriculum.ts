import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export class CurriculumService {
  static getDetail(curriculumId: number): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/curriculum/${curriculumId}`);
  }
}
