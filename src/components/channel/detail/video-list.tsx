import { Badge } from '@/components/ui/badge';
import { Video } from '@/types/channel';
import { useNavigate } from 'react-router-dom';

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId: number) => {
    navigate(`/my/video/${videoId}`, { replace: true });
  };

  return (
    <div>
      {/* <div
        className='grid gap-6'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      > */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {videos.length > 0 &&
          videos.map((video: any) => (
            <div
              key={video.id}
              className='group cursor-pointer border rounded-lg overflow-visible relative shadow-lg  h-full flex flex-col bg-white min-w-200pxr'
              onClick={() => handleVideoClick(video.id)}
            >
              <div className='relative'>
                <img
                  src={video.course.thumbnailUrl}
                  alt={video.course.title}
                  className='object-cover rounded-md w-full duration-500 group-hover:translate-y-[-10px]'
                />
              </div>
              <div className='relative p-19pxr overflow-hidden flex flex-col items-start gap-[6px] self-stretch'>
                <div className='flex justify-between items-center self-stretch w-full'>
                  <Badge variant='info' size='lg'>
                    <p>공개채널</p>
                  </Badge>
                  <p className='text-11pxr text-right leading-16pxr text-[#AAA]'>
                    HRD 솔루션팀
                  </p>
                </div>
                <div className='py-10pxr'>
                  <p className='h-27pxr leading-27pxr text-sm text-ellipsis whitespace-nowrap self-stretch font-[700]'>
                    {video.course.title}
                  </p>
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white text-center text-xs font-semibold px-16pxr py-8pxr opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                    {video.course.title}
                  </div>
                </div>
                <div>
                  <p className='font-[500] text-[#727272] text-ellipsis whitespace-nowrap text-12pxr'>
                    동영상 7·디지털 교재 2
                  </p>
                </div>
                <div className='py-6pxr flex items-center gap-1 self-stretch'>
                  <Badge variant='outline' size='sm'>
                    #Skill up
                  </Badge>
                  <Badge variant='outline' size='sm'>
                    # 우선순위
                  </Badge>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoList;
