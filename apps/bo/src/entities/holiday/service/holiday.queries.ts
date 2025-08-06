import HolidayService from '@entities/holiday/api/holiday';
import { Holiday } from '../../../types/entities/holiday';
import { getQuerySkipToken } from '@learnway/shared';

export const holidayQueryKeys = {
  list: ['holiday-page'] as const,
  detail: ['holiday-detail'] as const,
  upload: ['holiday-upload'] as const,
  download: ['holiday-download'] as const,
}

export const holidayQueryOptions = {
  list: (params: any) => ({
    query: holidayQueryKeys.list,
    queryFn: () => HolidayService.fetchListHoliday(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (holidayId: number) =>
    holidayId ? {
      queryKey: holidayQueryKeys.detail,
      queryFn: (): Promise<any> => HolidayService.fetchHoliday(holidayId)
    } : getQuerySkipToken<any>(),
  upload: (params: any) => ({
    queryKey: holidayQueryKeys.upload,
    queryFn: () => HolidayService.excelUploadHoliday(params),
  }),
  download: (params: any) => ({
    queryKey: holidayQueryKeys.download,
    queryFn: () => HolidayService.excelDownloadHoliday(params),
  }),
}

export const holidayMutateOptions = {
  create: () => ({
    mutationFn: (payload: Holiday) => HolidayService.createHoliday(payload) }),
  update: () => ({
    mutationFn: (payload: Holiday) => HolidayService.updateHoliday(payload) }),
  delete: () => ({
    mutationFn: (holidayId: number) => HolidayService.deleteHoliday(holidayId) })
}
