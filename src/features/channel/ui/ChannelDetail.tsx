import { Channel } from '@/entities/channel/model/channel';

const ChannelDetailInfo: React.FC<Channel> = ({
  videos,
  youtubeLink,
  subscribers,
  view,
}) => {
  return (
    <>
      <div className='flex w-full flex-col space-y-3 sm:items-center lg:items-start'>
        <p className='truncate font-bold'>채널 세부정보</p>
        <p className='truncate font-thin'>{youtubeLink}</p>
        <p className='truncate font-thin'>{subscribers}</p>
        <p className='truncate font-thin'>{videos}</p>
        <p className='truncate font-thin'>{view}</p>
      </div>
    </>
  );
};

export default ChannelDetailInfo;
