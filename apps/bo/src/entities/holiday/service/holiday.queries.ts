import HolidayService from '@entities/holiday/api/holiday';
import { Holiday } from '../../../types/entities/holiday';

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
  }),
  detail: (holidayId: number) => ({
    queryKey: holidayQueryKeys.detail,
    queryFn: () => HolidayService.fetchHoliday(holidayId),
  }),
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
