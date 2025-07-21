// menuData.ts
export const menuData = [
  {
    name: '메뉴1',
    link: '/',
    isLabel: false, // 라벨
    hasEvent: false, // 이벤트 메뉴 유무
    desc: '메뉴1 설명',
    subMenus: [
      {
        title: '메뉴1-1',
        items: [
          { name: '메뉴1-1 서브메뉴1', link: '' },
          { name: '메뉴1-1 서브메뉴2', link: '' },
        ],
      },
      {
        title: '메뉴1-2',
        items: [{ name: '메뉴1-2 서브메뉴1', link: '' }],
      },
    ],
  },
  {
    name: '메뉴2',
    link: '/',
    isLabel: false,
    hasEvent: false,
    desc: '메뉴2 설명',
    subMenus: [
      {
        title: '메뉴2-1',
        items: [
          { name: '메뉴2-1 서브메뉴1', link: '' },
          { name: '메뉴2-1 서브메뉴2', link: '' },
          { name: '메뉴2-1 서브메뉴3', link: '' },
        ],
      },
      {
        title: '메뉴2-2',
        items: [
          { name: '메뉴2-2 서브메뉴1', link: '' },
          { name: '메뉴2-2 서브메뉴2', link: '' },
          { name: '메뉴2-2 서브메뉴3', link: '' },
        ],
      },
      {
        title: '메뉴2-3',
        items: [
          { name: '메뉴2-3 서브메뉴1', link: '' },
          { name: '메뉴2-3 서브메뉴2', link: '' },
          { name: '메뉴2-3 서브메뉴3', link: '' },
        ],
      },
      {
        title: '메뉴2-4',
        items: [
          { name: '메뉴2-4 서브메뉴1', link: '' },
          { name: '메뉴2-4 서브메뉴2', link: '' },
          { name: '메뉴2-4 서브메뉴3', link: '' },
        ],
      },
      {
        title: '메뉴2-5',
        items: [
          { name: '메뉴2-5 서브메뉴1', link: '' },
          { name: '메뉴2-5 서브메뉴2', link: '' },
          { name: '메뉴2-5 서브메뉴3', link: '' },
        ],
      },
    ],
  },
  {
    name: '메뉴3',
    link: '/',
    isLabel: false,
    hasEvent: false,
    desc: '',
    subMenus: [], // 서브메뉴 없을경우 서브메뉴 레이어 hover 노출안됨
  },
  {
    name: '메뉴4',
    link: '/',
    isLabel: false,
    hasEvent: false,
    desc: '',
    subMenus: [], // 서브메뉴 없을경우 서브메뉴 레이어 hover 노출안됨
  },
  {
    name: '메뉴5',
    link: '/',
    isLabel: false,
    hasEvent: false,
    desc: '',
    subMenus: [], // 서브메뉴 없을경우 서브메뉴 레이어 hover 노출안됨
  },
  {
    name: '메뉴6',
    link: '/',
    isLabel: false,
    hasEvent: false,
    desc: '',
    subMenus: [], // 서브메뉴 없을경우 서브메뉴 레이어 hover 노출안됨
  },
  {
    name: '이벤트메뉴1',
    link: '/',
    isLabel: false,
    hasEvent: true,
    desc: '',
    subMenus: [],
  },
  {
    name: '이벤트메뉴2',
    link: '/',
    isLabel: false,
    hasEvent: true,
    desc: '',
    subMenus: [],
  },
];
