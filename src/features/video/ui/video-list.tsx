import { Badge } from '@/shared/components/Badge/badge';

interface VideoListProps {
  videos: Video[];
  onClick: (videoId: number) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onClick }) => {
  return (
    <div>
      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(0, 200px))',
        }}
      >
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'> */}
        {videos.length > 0 &&
          videos.map((video: any) => (
            <div
              key={video.id}
              className='group relative flex h-full min-w-200pxr cursor-pointer flex-col overflow-visible rounded-lg border bg-white shadow-lg'
              onClick={() => onClick(video.id)}
            >
              <div className='relative'>
                <img
                  src={video.course.thumbnailUrl}
                  alt={video.course.title}
                  className='w-full rounded-md object-cover duration-500 group-hover:translate-y-[-10px]'
                />
              </div>
              <div className='relative flex flex-col items-start gap-[6px] self-stretch overflow-hidden p-19pxr'>
                <div className='flex w-full items-center justify-between self-stretch'>
                  <Badge variant='info' size='lg'>
                    <p>공개채널</p>
                  </Badge>
                  <p className='text-right text-11pxr leading-16pxr text-[#AAA]'>
                    HRD 솔루션팀
                  </p>
                </div>
                <div className='py-10pxr'>
                  <p className='h-27pxr self-stretch text-ellipsis whitespace-nowrap text-sm font-[700] leading-27pxr'>
                    {video.course.title}
                  </p>
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 px-16pxr py-8pxr text-center text-xs font-semibold text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                    {video.course.title}
                  </div>
                </div>
                <div>
                  <p className='text-ellipsis whitespace-nowrap text-12pxr font-[500] text-[#727272]'>
                    동영상 7·디지털 교재 2
                  </p>
                </div>
                <div className='flex items-center gap-1 self-stretch py-6pxr'>
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
