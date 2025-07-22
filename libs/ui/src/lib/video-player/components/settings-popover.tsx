import { useState } from 'react';
import { IcoChevronLeft, IcoCheck } from '@learnway/icons';
import { VideoPlayerContainerProps } from '../types';

import styles from './settings-popover.module.css';
import { VideoQuerites } from '../hooks/video-player.hook';

const MENU = {
  ROOT: 'root',
  SPEED: 'speed',
  SOURCE: 'source',
  QUALITY: 'quality',
  SUBTITLE: 'subtitle',
} as const;

type MenuType = (typeof MENU)[keyof typeof MENU];

const hasHeightValueEncodedVideo = (data: any[], height: number) => {
  return !!data.find((item) => {
    return item.height === height;
  });
};

const SettingsPopover = (props: VideoPlayerContainerProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuType>(MENU.ROOT);
  const [selected, setSelected] = useState({
    speed: '1x',
    source: 'Auto',
    quality: 'Auto',
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
                  props.changePlaybackRate(parseFloat(v.replace('x', '')));
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
      case MENU.QUALITY: {
        const listQuerites: any[] = [{ ...VideoQuerites.auto }];
        if (props.encodedVideos) {
          if (hasHeightValueEncodedVideo(props.encodedVideos, VideoQuerites.high.height))
            listQuerites.push(VideoQuerites.high);
          if (hasHeightValueEncodedVideo(props.encodedVideos, VideoQuerites.middle.height))
            listQuerites.push(VideoQuerites.middle);
          if (hasHeightValueEncodedVideo(props.encodedVideos, VideoQuerites.low.height))
            listQuerites.push(VideoQuerites.low);
        }
        return (
          <SubMenu title="품질" badge="9-4" onBack={() => setActiveMenu(MENU.ROOT)}>
            {listQuerites.map((v) => (
              <MenuItem
                key={v.label}
                label={v.label}
                active={props.videoQuality.label === v.label}
                onClick={() => {
                  handleSelect('quality', v.label);
                  props.changeQuality(v);
                }}
              />
            ))}
          </SubMenu>
        );
      }
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
          <div className={`${styles.start} ${styles.settings}`}>
            <div className={styles.title}>
              <span>설정</span>
            </div>
            <div className={styles.option}>
              <MenuItem
                label="재생속도"
                value={selected.speed}
                onClick={() => setActiveMenu(MENU.SPEED)}
              />
              <MenuItem
                label="품질"
                value={props.videoQuality.label}
                onClick={() => setActiveMenu(MENU.QUALITY)}
              />
              {props.videoConfig && (
                <MenuItem
                  label="자막"
                  value={selected.subtitle}
                  onClick={() => setActiveMenu(MENU.SUBTITLE)}
                />
              )}
            </div>
          </div>
        );
    }
  };

  return <div className={styles.setting_popup}>{renderMenu()}</div>;
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
      className={`${styles.start} ${styles.menu_items} ${value && styles.main_setting}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {value && <span>{value}</span>}
      {active && !value && (
        <span className={styles.selected}>
          <IcoCheck width={20} height={20} stroke="#fff" />
        </span>
      )}
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
    <div className={`${styles.start} ${styles.menu}`}>
      <div className={styles.title}>
        <button onClick={onBack}>
          <IcoChevronLeft width={20} height={20} stroke="#fff" />
        </button>
        <span>{title}</span>
      </div>
      <div className={styles.label}>{children}</div>
    </div>
  );
}

export default SettingsPopover;
