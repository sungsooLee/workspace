import { ChannelDetailProps } from '@/types/channel';

const ChannelDetailInfo: React.FC<ChannelDetailProps> = ({
  videos,
  youtbeLink,
  subscribers,
  views,
}) => {
  return (
    <>
      <div className='w-full flex flex-col lg:items-start space-y-3 sm:items-center'>
        <p className='font-bold truncate'>채널 세부정보</p>
        <p className='font-thin truncate'>{youtbeLink}</p>
        <p className='font-thin truncate'>{subscribers}</p>
        <p className='font-thin truncate'>{videos}</p>
        <p className='font-thin truncate'>{views}</p>
      </div>
    </>
  );
};

export default ChannelDetailInfo;
