import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Menu } from '../model/menu';

export default class MenuService {
  static getMenus(parentMenuId?: string) {
    //return httpService.get<Menu[]>(`/menus/${parentMenuId}`);
    return new Promise((resolve) => {
      resolve([
        {
          title: 'Menu 2',
          path: '/menu2',
          roles: 'ROLE_HAE_USER',
          children: [
            {
              title: 'Menu 3',
              path: '/menu3',
              roles: 'ROLE_HAE_USER',
              tenantName: '현대자동차',
            },
            {
              title: 'Menu 4',
              path: '/menu4',
              roles: 'ROLE_HAE_USER',
              children: [
                {
                  title: 'Menu 5',
                  path: '/menu4/menu5',
                  roles: 'ROLE_HAE_USER',
                  tenantName: '현대자동차',
                },
              ],
              tenantName: '현대자동차',
            },
            {
              title: 'Menu 6',
              path: '/menu6',
              roles: 'ROLE_HAE_USER',
              children: [
                {
                  title: 'Menu 7',
                  path: '/menu6/menu7',
                  roles: 'ROLE_HAE_USER',
                  tenantName: '현대자동차',
                },
              ],
              tenantName: '현대자동차',
            },
          ],
          tenantName: '현대자동차',
        },
      ]);
    });
  }

  static getMenu(menuId: string) {
    return httpService.get<Menu>(`${PMSApiPrefix()}/menu/${menuId}`);
  }

  static createMenus(menu: Menu[]) {
    return httpService.post<Menu>(`/menus`, menu);
  }

  static updateMenu(menuId: string, menu: Menu) {
    return httpService.patch<Menu>(`/menus`, menu);
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
