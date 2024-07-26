export interface ThumbnailProps {
  size: 240 | 280 | 380;
  type: 'default' | 'package' | 'check';
  info: any;
  onClick: (videoId: number) => void;
  children?: React.ReactNode;
}

const sizeStyles = {
  240: {
    container: 'w-[240px]',
    contentPadding: 'pt-[32px] pb-[20px]',
    titleDiv: 'h-[42px]',
    titleInfo: 'space-y-[8px] pb-[12px]',
    titleText:
      'font-head text-[15.429px] leading-[20.571px] tracking-[-0.386px]',
    subTitle: ' items-center space-x-[8px] flex flex-row ',
    subTitleText:
      'text-[12px] font-normal leading-[18.85px] tracking-[-0.3px] text-grayScale-8',
    channelText: 'text-[14px] font-normal leading-[22px] tracking-[-0.35px]',
  },
  280: {
    container: 'w-[280px]',
    contentPadding: 'pt-[32px] pb-[20px]',
    titleDiv: 'h-[48px] overflow-hidden text-ellipsis text-start',
    titleInfo: 'space-y-[10px] pb-[14px]',
    titleText: 'font-head text-[18px] leading-[24px] tracking-[-0.45px]',
    subTitle: 'h-full items-center space-x-[8px] flex flex-row',
    subTitleText:
      'text-[14px] font-normal leading-[22px] tracking-[-0.35px] text-grayScale-8',
    channelText: 'text-[14px] font-normal leading-[22px] tracking-[-0.35px]',
  },
  380: {
    container: 'w-[380px]',
    contentPadding: 'pt-[32px] pb-[20px]',
    titleDiv: 'h-[48px]',
    titleInfo: 'space-y-[12px] pb-[16px]',
    titleText: 'font-head text-[18px] leading-[24px] tracking-[-0.45px]',
    subTitle: 'items-center  gap-[8px] flex flex-row',
    subTitleText:
      'text-[14px] font-normal leading-[22px] tracking-[-0.35px]  text-grayScale-8',
    channelText: 'text-[14px] font-normal leading-[22px] tracking-[-0.35px]',
  },
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  size = 240,
  type = 'default',
  info,
  onClick,
  children,
}) => {
  const video = info;
  const styles = sizeStyles[size];
  return (
    <div
      key={video.id}
      className={`group relative flex ${styles.container} min-w-200pxr cursor-pointer flex-col overflow-visible rounded-lg border bg-white shadow-lg`}
      onClick={() => onClick(video.id)}
    >
      <div className='relative'>
        <div className='absolute left-0 top-0 z-10 flex'>
          <div
            className={`align-center h-20pxr bg-point-light_blue px-4pxr duration-500 group-hover:translate-y-[-10px]`}
          >
            <p className='text-shadow text-[13px] font-normal leading-[20px] tracking-[-0.325px] text-white'>
              수강신청 중
            </p>
          </div>
          <div
            className={`align-center h-20pxr bg-point-blue px-4pxr duration-500 group-hover:translate-y-[-10px]`}
          >
            <p className='text-shadow text-[13px] font-normal leading-[20px] tracking-[-0.325px] text-white'>
              이러닝
            </p>
          </div>
        </div>
        <img
          src={video.course.thumbnailUrl}
          alt={video.course.title}
          className='w-full rounded-md object-cover duration-500 group-hover:translate-y-[-10px]'
        />
      </div>
      <div className='relative px-2'>
        <div className={`${styles.contentPadding}`}>
          <div className={`${styles.titleInfo}`}>
            <div className={`${styles.titleDiv}`}>
              <p className={`${styles.titleText}`}>{video.course.title}</p>
            </div>

            <div className={`${styles.subTitle}`}>
              <p className={`${styles.subTitleText}`}>
                <img src='/assets/icons/ic_star_filled_16px.svg' />
              </p>
              <div className='h-12pxr w-1pxr bg-grayScale-7' />
              <p className={`${styles.subTitleText}`}>조회 1230</p>

              <div className='h-12pxr w-1pxr bg-grayScale-7' />
              <p className={`${styles.subTitleText}`}>05:12</p>
            </div>
          </div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 px-16pxr text-center text-xs font-semibold text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
          {video.course.title}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
