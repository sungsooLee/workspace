import { Video } from '@/types/channel';
import { useNavigate } from 'react-router-dom';

interface VideoListProps {
  videos: Video[];
}

// const VideoList : React.FC<Video
const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId: number) => {
    navigate(`/my/video/${videoId}`);
  };

  return (
    <div className='px-[80px]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {videos.map((video: any) => (
          <div
            key={video.id}
            className='cursor-pointer border rounded-lg overflow-visible relative shadow-lg h-full flex flex-col bg-white'
            onClick={() => handleVideoClick(video.id)}
          >
            <div className='duration-500 hover:-translate-y-3 hover:shadow-2xl relative '>
              <img
                src={video.course.thumbnailUrl}
                alt={video.course.title}
                className='object-cover'
              />
            </div>
            <div className='p-4  border-1 border-solid'>
              <p className='truncate'>{video.course.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
