import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Company } from '../model/company';

import organizationMock from '../../mock/organization.json';

export default class CompanyService {
  static fetchCompanies() {
    //return httpService.get<Company[]>(`${PMSApiPrefix()}/organization`);
    return new Promise((resolve) => setTimeout(() => resolve(organizationMock as any)));
  }
}
