import { ChannelProfileProps } from '@/types/channel';

const ChannelProfile: React.FC<ChannelProfileProps> = ({
  title,
  description,
}) => {
  return (
    <div className='flex flex-row w-full'>
      <div className='profile-image'></div>
      <div className='flex flex-col ml-[50px]'>
        <p className='font-bold pb-[25px] truncate'>{title}</p>
        <p className='font-thin truncate'>{description}</p>
      </div>
    </div>
  );
};

export default ChannelProfile;
