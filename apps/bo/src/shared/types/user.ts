import { PaginationRequest } from './api';
import { ISODateString } from './common';

export type UsersParams = PaginationRequest & {
  tenantId?: number;
  companyType?: 'CAR';
  companyId?: number;
  deptId?: number;
  roleId?: number;
  userName?: string;
  email?: string;
  employeeNumber?: string;
  userState?: 'NORMAL';
  createdDateFrom?: ISODateString;
  createdDateTo?: ISODateString;
};
