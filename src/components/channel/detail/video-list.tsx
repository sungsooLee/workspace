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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {videos.map((video: any) => (
          <div
            key={video.id}
            className='cursor-pointer border rounded-lg overflow-visible relative shadow-lg  h-full flex flex-col bg-white min-w-60pxr'
            onClick={() => handleVideoClick(video.id)}
          >
            <div className='duration-500 hover:-translate-y-3 hover:shadow-2xl relative '>
              <img
                src={video.course.thumbnailUrl}
                alt={video.course.title}
                className='object-cover rounded-md w-full'
              />
            </div>
            <div className='p-3 h-80pxr border-1 border-solid overflow-hidden'>
              <p className='text-sm line-clamp-3 text-ellipsis'>
                {video.course.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
