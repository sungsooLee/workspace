import Thumbnail from '@/shared/components/Thumbnail/thumbnail';

interface VideoListProps {
  videos: Video[];
  onClick: (videoId: number) => void;
  size: 240 | 280 | 380;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onClick, size }) => {
  const getGridTemplateColumns = (size: number) => {
    return `repeat(auto-fit, minmax(${size}px, 1fr))`;
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(size),
    gap: '1.5rem',
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div style={gridStyle}>
        {videos.length > 0 &&
          videos.map((video: any) => (
            <Thumbnail
              size={size}
              type='default'
              info={video}
              onClick={onClick}
            ></Thumbnail>
          ))}
      </div>
    </div>
  );
};

export default VideoList;
export type { VideoListProps };
