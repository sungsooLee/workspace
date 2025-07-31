import { useState } from 'react';
import { t } from 'i18next';

import styles from './settings-popover.module.css';

import { IcoChevronLeft, IcoCheck } from '@learnway/icons';
import { VideoPlayerContainerProps } from '../types';
import { getHeightValueEncodedVideo, VideoQualities, VideoSpeed } from '../hooks/video-player.hook';

const MENU = {
  ROOT: 'root',
  SPEED: 'speed',
  SOURCE: 'source',
  QUALITY: 'quality',
  SUBTITLE: 'subtitle',
} as const;

type MenuType = (typeof MENU)[keyof typeof MENU];

const SettingsPopover = (props: VideoPlayerContainerProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuType>(MENU.ROOT);
  const [selected, setSelected] = useState({
    speed: '1x',
    source: 'Auto',
    quality: 'Auto',
  });

  const handleSelect = (key: keyof typeof selected, value: string) => {
    setSelected({ ...selected, [key]: value });
    setActiveMenu(MENU.ROOT); // 선택 후 root로 복귀
  };

  const renderMenu = () => {
    switch (activeMenu) {
      case MENU.SPEED:
        return (
          <SubMenu title={t('재생속도')} badge="9-2" onBack={() => setActiveMenu(MENU.ROOT)}>
            {VideoSpeed.map((v) => (
              <MenuItem
                key={v.label}
                label={v.label}
                active={props.playbackRate === v.value}
                onClick={() => {
                  props.changePlaybackRate(v.value);
                }}
              />
            ))}
          </SubMenu>
        );
      case MENU.SOURCE:
        return (
          <SubMenu title={t('소스')} badge="9-3" onBack={() => setActiveMenu(MENU.ROOT)}>
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
        const listQuerites: any[] = [{ ...VideoQualities.auto }];
        if (props.encodedVideos) {
          if (getHeightValueEncodedVideo(props.encodedVideos, VideoQualities.high.height))
            listQuerites.push(VideoQualities.high);
          if (getHeightValueEncodedVideo(props.encodedVideos, VideoQualities.middle.height))
            listQuerites.push(VideoQualities.middle);
          if (getHeightValueEncodedVideo(props.encodedVideos, VideoQualities.low.height))
            listQuerites.push(VideoQualities.low);
        }
        return (
          <SubMenu title={t('품질')} badge="9-4" onBack={() => setActiveMenu(MENU.ROOT)}>
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
          <SubMenu title={t('자막')} badge="9-5" onBack={() => setActiveMenu(MENU.ROOT)}>
            {props.videoSubtitles?.map((v) => (
              <MenuItem
                key={v.label}
                label={v.label}
                active={props.selectedSubtitle.srcLang === v.srcLang}
                onClick={() => props.changeSubtitle(v)}
              />
            ))}
          </SubMenu>
        );
      default:
        return (
          <div className={`${styles.start} ${styles.settings}`}>
            <div className={styles.title}>
              <span>{t('설정')}</span>
            </div>
            <div className={styles.option}>
              <MenuItem
                label={t('재생속도')}
                value={VideoSpeed.find((item) => item.value === props.playbackRate)?.label}
                onClick={() => setActiveMenu(MENU.SPEED)}
              />
              {props.encodedVideos && (
                <MenuItem
                  label={t('품질')}
                  value={props.videoQuality.label}
                  onClick={() => setActiveMenu(MENU.QUALITY)}
                />
              )}
              {props.videoSubtitles && (
                <MenuItem
                  label={t('자막')}
                  value={props.selectedSubtitle.label}
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
