import { httpService, objectToQueryString } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import type { Menu } from '../../../types';
//import menuMock from '../../mock/menu.json';

export default class MenuService {
  static getMenus(tenantId: number, isMobile: boolean): Promise<any> {
    const url = objectToQueryString(`${PMSApiPrefix()}/menus/tenantTree`, { tenantId });
    return httpService.get<Menu>(url);
  }

  static getMenu(menuId: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/menu/${menuId}`);
  }
}
/*
API 인터페이스 규칙
- http method rule
    - GET: 단건, 복수건 조회
    - POST: 등록 or 수정
    - PATCH: 수정 > 사용 여부
    - DELETE: 삭제
- naming rule
    - 단수: 단건 조회, 수정, 삭제
    - 복수: 복수건 조회, 수정, 삭제
    ex) 
        get> user: 단건 사용자 조회
        get> users: 여러건 사용자 조회
        delete> user: 단건 사용자 삭제
        delete> users: 여러건 사용자 삭제
        post> user: 단건 사용자 등록
        post> users: 여러건 사용자 등록
*/
