import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Company } from '../model/company';

export default class CompanyService {
  static fetchCompanies() {
    return httpService.get<Company[]>(`${PMSApiPrefix()}/organization`);
  }
}
