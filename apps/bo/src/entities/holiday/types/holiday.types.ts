export interface HolidayTypes {
  tenantId: number;
  companyCode: string;
  holidayType: string;
  holidayName: string,
  startDate: string;
  endDate: string;
  holidayDesc: string;
  isUsed: boolean;
}

export interface HolidayParams {
  tenantId: number;
  companyCode: string;
  holidayName: string;
  holidayType: string;
  isUsed: boolean;
  startDate: string;
  endDate: string;
}

export interface HolidayResponse {
  holidayId: number;
  tenantId: number;
  tenantName: string;
  companyCode: string;
  companyName: string;
  holidayType: string;
  holidayName: string;
  startDate: string;
  endDate: string;
  holidayDesc: string;
  isUsed: boolean;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  modifiedDate: string;
}
