import { ChannelProfileProps } from '@/types/channel';

const ChannelProfile: React.FC<ChannelProfileProps> = ({
  title,
  description,
}) => {
  return (
    <div className='flex flex-row w-full'>
      <div className='profile-image min-w-50pxr min-h-50pxr' />
      <div className='flex flex-col items-start ml-50pxr'>
        <p className='font-bold pb-25pxr truncate'>{title}</p>
        <p className='font-thin truncate'>{description}</p>
      </div>
    </div>
  );
};

export default ChannelProfile;
