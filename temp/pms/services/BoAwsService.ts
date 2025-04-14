/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResultResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResultResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoAwsService {
    /**
     * 스케줄 목록 조회
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResDto OK
     * @throws ApiError
     */
    public static getScheduleList(
        page?: number,
        size: number = 10,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/asw/schedules',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * 스케줄 결과 목록 조회
     * @param uuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResultResDto OK
     * @throws ApiError
     */
    public static getScheduleResultList(
        uuid: string,
        page?: number,
        size: number = 10,
        sort?: Array<string>,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_schedule_dto_res_ScheduleResultResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/asw/schedules/{uuid}',
            path: {
                'uuid': uuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
}
