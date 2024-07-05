import { ChannelDetailProps } from '@/types/channel';

const ChannelDetailInfo: React.FC<ChannelDetailProps> = ({
  videos,
  yotubeLink,
  subscribers,
  views,
}) => {
  return (
    <>
      <div className='w-full flex flex-col items-start space-y-3'>
        <p className='font-bold truncate'>채널 세부정보</p>
        <p className='font-thin truncate'>{yotubeLink}</p>
        <p className='font-thin truncate'>{subscribers}</p>
        <p className='font-thin truncate'>{videos}</p>
        <p className='font-thin truncate'>{views}</p>
      </div>
    </>
  );
};

export default ChannelDetailInfo;
