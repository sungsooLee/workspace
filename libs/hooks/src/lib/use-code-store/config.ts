import { CodeApiConfig, CodeOption } from './types';
import { CODE_GROUP } from './constants';
import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

/**
 * 기본 코드 조회 API 가 아닌 케이스만 작성 해준다.
 * ** 주의 ** getCode 에는 filter 라는 항목이 존재한다. filter 가 변경 되면서 코드를 불러와야 하는 경우에는 반드시 codeOptions 에
 * disableCache 등록을 해야지 변경된 filter 로 재조회 한다.
 *
 * * 초기 구성계획은 조회 후 filter 를 사용하려 했으나. API 정의가 어떻게 될지 몰라 사용하지 못했다.
 */
export const codeOptions: CodeApiConfig = {
  [CODE_GROUP['vps.video.FfmpegTaskType']]: {
    api: 'default',
    options: [
      {
        value: '01',
        label: 'FfmpegTaskType 01',
      },
      {
        value: '02',
        label: 'FfmpegTaskType 02',
      },
    ],
  },
  [CODE_GROUP['manual.code']]: {
    options: [
      {
        value: '01',
        label: 'DEFAULT 호출 1번 옵션',
      },
      {
        value: '02',
        label: 'DEFAULT 호출 2번 옵션',
      },
      {
        value: '03',
        label: 'DEFAULT 호출 3번 옵션',
      },
    ],
  },
  [CODE_GROUP['manual.company.companyCode']]: {
    api: async () => {
      const data: any = await httpService.get(`${PMSApiPrefix()}/companies`, { size: 1000 });
      console.log('manual.', data);
      return [
        ...data.content.map((item: any) => ({
          label: item.name,
          value: item.companyCode,
        })),
      ];
    },
    disableCache: true,
  },
  [CODE_GROUP['manual.tenant.tenantId']]: {
    api: async () => {
      const data: any = await httpService.get(`${PMSApiPrefix()}/tenants`, { size: 1000 });
      return [
        ...data.content.map((item: any) => ({
          label: item.tenantName,
          value: item.tenantId,
        })),
      ];
    },
    disableCache: true,
  },
};
