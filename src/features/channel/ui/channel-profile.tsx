import { Channel } from '@/entities/channel/model/channel';

const ChannelProfile: React.FC<Channel> = ({ title, description }) => {
  return (
    <div className='flex w-full flex-row'>
      <div className='profile-image min-h-50pxr min-w-50pxr' />
      <div className='ml-50pxr flex flex-col items-start'>
        <p className='truncate pb-25pxr font-bold'>{title}</p>
        <p className='truncate font-thin'>{description}</p>
      </div>
    </div>
  );
};

export default ChannelProfile;
