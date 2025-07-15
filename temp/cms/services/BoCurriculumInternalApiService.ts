/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_curriculum_dto_res_CurriculumResDto } from '../models/com_ever_edu_cms_curriculum_dto_res_CurriculumResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoCurriculumInternalApiService {
    /**
     * 커리큘럼의 ID를 통해 내부 레슨/모듈 구조를 조회한다
     * 단건 커리큘럼 ID를 통해 커리큘럼 내부의 레슨과 모듈의 구조를 조회한다.<br><br>매핑 콘텐츠 분류에 따른 구성 데이터 구분 : <br><GENERAL 모듈인 경우> <br>- 레슨 정보: contentId(Long) <br><br><FIXED 모듈인 경우>  <br>- 모듈 정보: contentId(Long), orgnId(Long) <br>- 레슨 정보: itemId(Long), itemElementId(SCOID, String)
     * @param curriculumId
     * @returns com_ever_edu_cms_curriculum_dto_res_CurriculumResDto OK
     * @throws ApiError
     */
    public static getCurriculum1(
        curriculumId: number,
    ): CancelablePromise<com_ever_edu_cms_curriculum_dto_res_CurriculumResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/curriculum/{curriculumId}',
            path: {
                'curriculumId': curriculumId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
