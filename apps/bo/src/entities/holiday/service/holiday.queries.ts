import HolidayService from '@entities/holiday/api/holiday';

export const holidayQueryKeys = {
  list: ['holiday-page'] as const,
}

export const holidayQueryOptions = {
  list: (params: any) => ({
    query: holidayQueryKeys.list,
    queryFn: () => HolidayService.fetchListHoliday(params),
  }),
}
