import { useState } from 'react';
import { FaCompress, FaExpand } from 'react-icons/fa';
import screenfull from 'screenfull';

type FullScreenProps = {
  isFullScreen: boolean;
  onFullscreenToggle: () => void;
};

// const FullScreen = ({ isFullScreen, onFullscreenToggle }: FullScreenProps) => {
const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullscreenToggle = () => {
    if (isFullScreen) {
      screenfull.exit();
    } else {
      screenfull.request(document.querySelector('.video-container')!);
    }
    setIsFullScreen(!isFullScreen);
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
