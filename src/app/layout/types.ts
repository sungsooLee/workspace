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
    { id: 1, name: '학습채널', link: '#' },
    { id: 2, name: '학습현황', link: '#' },
    { id: 3, name: '학습지원', link: '#' },
  ],
  lnb: {
    1: [
      { id: 11, name: '구독', link: 'my/subscribe' },
      { id: 12, name: '나의 학습현황', link: 'my/learnig-state' },
      { id: 13, name: '채널 상세', link: 'my/channel-detail' },
    ],
    2: [
      { id: 21, name: '지식공유', link: 'knowledge/share' },
      { id: 22, name: 'COP', link: 'knowledge/cop' },
    ],
  },
};
