import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import menuMock from '../../mock/menu.json';

export default class MenuService {
  static getMenus(params?: any): Promise<any> {
    /*
    return httpService.get<Menu>(
      `${PMSApiPrefix()}/menus/${params.parentMenuId ?? ''}?roleIds=${params.roleIds}&tenantId=${
        params.tenantId
      }`,
    );
*/
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log('menu api fetch');
        resolve(menuMock as any);
      }),
    );
  }

  static getMenu(menuId: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/menu/${menuId}`);
  }

  static createMenus(menu: any[]) {
    return httpService.post<any>(`/menus`, menu);
  }

  static updateMenu(menuId: string, menu: any) {
    return httpService.patch<any>(`/menus`, menu);
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
