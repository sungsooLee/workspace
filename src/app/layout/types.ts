export interface MenuItem {
  id: number;
  name: string;
  link: string;
  subMenu?: MenuItem[];
}

export interface TestMenuConfig {
  gnb: MenuItem[];
  lnb: Record<string, MenuItem[]>;
}

export const menuConfig: TestMenuConfig = {
  gnb: [
    { id: 1, name: 'channel', link: '#' },
    { id: 2, name: '샘플', link: '#' },
  ],
  lnb: {
    1: [{ id: 11, name: '키트 샘플', link: 'my/subscribe' }],
    2: [
      { id: 21, name: '에러 처리', link: 'sample/error' },
      { id: 22, name: '입력', link: 'sample/input' },
    ],
  },
};
