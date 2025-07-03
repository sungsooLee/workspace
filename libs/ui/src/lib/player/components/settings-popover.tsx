import { useState } from 'react';
import { PlayerContainerProps } from '../types';

const MENU = {
  ROOT: 'root',
  SPEED: 'speed',
  SOURCE: 'source',
  QUALITY: 'quality',
  SUBTITLE: 'subtitle',
} as const;

type MenuType = (typeof MENU)[keyof typeof MENU];

const SettingsPopover = ({
  changePlaybackRate,
}: Pick<PlayerContainerProps, 'changePlaybackRate'>) => {
  const [activeMenu, setActiveMenu] = useState<MenuType>(MENU.ROOT);
  const [selected, setSelected] = useState({
    speed: '1x',
    source: 'Auto',
    quality: '1920×1080, 5.1Mbps',
    subtitle: 'Korean',
  });

  const handleSelect = (key: keyof typeof selected, value: string) => {
    setSelected({ ...selected, [key]: value });
    setActiveMenu(MENU.ROOT); // 선택 후 root로 복귀
  };

  const renderMenu = () => {
    switch (activeMenu) {
      case MENU.SPEED:
        return (
          <SubMenu title="재생속도" badge="9-2" onBack={() => setActiveMenu(MENU.ROOT)}>
            {['0.25x', '0.5x', '0.75x', '1x', '1.25x', '1.5x', '1.75x', '2x'].map((v) => (
              <MenuItem
                key={v}
                label={v}
                active={selected.speed === v}
                onClick={() => {
                  changePlaybackRate(parseFloat(v.replace('x', '')));
                  handleSelect('speed', v);
                }}
              />
            ))}
          </SubMenu>
        );
      case MENU.SOURCE:
        return (
          <SubMenu title="소스" badge="9-3" onBack={() => setActiveMenu(MENU.ROOT)}>
            {['Auto', '1080P', '720P', '480P'].map((v) => (
              <MenuItem
                key={v}
                label={v}
                active={selected.source === v}
                onClick={() => handleSelect('source', v)}
              />
            ))}
          </SubMenu>
        );
      case MENU.QUALITY:
        return (
          <SubMenu title="품질" badge="9-4" onBack={() => setActiveMenu(MENU.ROOT)}>
            {['Auto', '854×480, 1.1Mbps', '1280×720, 2.2Mbps', '1920×1080, 5.1Mbps'].map((v) => (
              <MenuItem
                key={v}
                label={v}
                active={selected.quality === v}
                onClick={() => handleSelect('quality', v)}
              />
            ))}
          </SubMenu>
        );
      case MENU.SUBTITLE:
        return (
          <SubMenu title="자막" badge="9-5" onBack={() => setActiveMenu(MENU.ROOT)}>
            {[
              'Korean',
              'العربية',
              '中國台灣',
              'Deutsch',
              'English',
              'Spanish',
              'French',
              'Indonesian',
              '日本語',
            ].map((v) => (
              <MenuItem
                key={v}
                label={v}
                active={selected.subtitle === v}
                onClick={() => handleSelect('subtitle', v)}
              />
            ))}
          </SubMenu>
        );
      default:
        return (
          <div className="w-60 rounded-xl bg-[#1C1C1E] p-4 text-sm text-white shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-white">설정</span>
            </div>
            <div className="space-y-3">
              <MenuItem
                label="재생속도"
                value={selected.speed}
                onClick={() => setActiveMenu(MENU.SPEED)}
              />
              <MenuItem
                label="소스"
                value={selected.source}
                onClick={() => setActiveMenu(MENU.SOURCE)}
              />
              <MenuItem
                label="품질"
                value={selected.quality}
                onClick={() => setActiveMenu(MENU.QUALITY)}
              />
              <MenuItem
                label="자막"
                value={selected.subtitle}
                onClick={() => setActiveMenu(MENU.SUBTITLE)}
              />
            </div>
          </div>
        );
    }
  };

  return <div className="absolute bottom-10 right-0 z-50">{renderMenu()}</div>;
};

function MenuItem({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value?: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between text-white/80 hover:text-white ${
        active ? 'font-semibold text-white' : ''
      }`}
      onClick={onClick}
    >
      <span className="text-sm">{label}</span>
      {value && <span className="truncate text-right">{value}</span>}
      {active && !value && <span className="text-white">✓</span>}
    </div>
  );
}

function SubMenu({
  title,
  badge,
  onBack,
  children,
}: {
  title: string;
  badge: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="w-64 rounded-xl bg-[#1C1C1E] p-4 text-sm text-white shadow-xl">
      <div className="mb-3 flex items-center">
        <button className="text-white/70 hover:text-white" onClick={onBack}>
          ←
        </button>
        <span className="text-base">{title}</span>
      </div>
      <div className="max-h-[315px] space-y-2 overflow-auto pr-1">{children}</div>
    </div>
  );
}

export default SettingsPopover;
