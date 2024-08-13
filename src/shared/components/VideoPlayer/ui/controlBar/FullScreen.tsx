import { useEffect, useState } from 'react';
import { FaCompress, FaExpand } from 'react-icons/fa';
import screenfull from 'screenfull';

const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(screenfull.isFullscreen);
    };
    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
    };
  }, []);

  const onFullscreenToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(document.querySelector('.player-wrapper')!);
    }
  };
  return (
    <>
      <button onClick={onFullscreenToggle} className='w-30pxr text-white'>
        {isFullScreen ? <FaCompress /> : <FaExpand />}
      </button>
    </>
  );
};

export default FullScreen;
