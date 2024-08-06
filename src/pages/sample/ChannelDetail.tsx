import ChannelProfile from '@/features/channel/ui/ChannelProfile';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Channel } from '@/entities/channel/model/channel';
import { fetchChannelVideos } from '@/features/video';
import { fetchProfileDetail } from '@/features/channel';
import { getEnumValueByKey } from '@/shared/utils/enum';
import { LearningFormatEnum, LearningTypeEnum } from '@/entities/learning';
import { useNavigate } from 'react-router-dom';
import ChannelDetailInfo from '@/features/channel/ui/ChannelDetail';
import VideoFilter from '@/features/video/ui/VideoFilter';
import VideoList from '@/features/videoList/ui/VideoList';

const ChannelDetail = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<LearningTypeEnum>(
    LearningTypeEnum.ALL
  );
  const [selectedFormats, setSelectedFormats] = useState<LearningFormatEnum[]>(
    []
  );
  const {
    data: videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchChannelVideos,
  });
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfileDetail,
  });

  // 로딩 중 또는 에러 시 처리
  if (isVideoLoading || isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (isVideoError || isProfileError) {
    return <div>Error loading data</div>;
  }

  if (!videoData || !profileData) {
    return <div>No data available</div>;
  }

  const handleVideoClick = (videoId: number) => {
    navigate(`/my/video/${videoId}`);
  };
  const handleTypeSelect = (type: LearningTypeEnum) => {
    setSelectedType(type);
  };

  const handleFormatToggle = (format: LearningFormatEnum) => {
    setSelectedFormats((prevSelectedFormats) =>
      prevSelectedFormats.includes(format)
        ? prevSelectedFormats.filter((f) => f !== format)
        : [...prevSelectedFormats, format]
    );
  };
  const profile: Channel = {
    title: profileData.title,
    description: profileData.description,
    profileImage: profileData.profileImage,
    youtubeLink: profileData.details?.youtubeLink,
    subscribers: profileData.subscribers,
    videos: profileData.videos,
    view: profileData.view,
  };

  const filteredVideos = videoData.data.items.filter((video: Video) => {
    const matchesType =
      selectedType == LearningTypeEnum.ALL
        ? true
        : selectedType
          ? video.course.type === selectedType
          : true;
    const matchesFormat = selectedFormats.length
      ? selectedFormats.includes(
          getEnumValueByKey(
            LearningFormatEnum,
            video.course.format
          ) as LearningFormatEnum
        )
      : true;
    return matchesType && matchesFormat;
  });

  return (
    <>
      <div className='flex flex-col pb-[80px]'>
        <div className='flex flex-col items-center justify-between bg-white p-20pxr lg:flex-row lg:p-70pxr'>
          <ChannelProfile {...profile} />
          <ChannelDetailInfo {...profile} />
        </div>
        <VideoFilter
          selectedType={selectedType}
          selectedFormats={selectedFormats}
          onTypeSelect={handleTypeSelect}
          onFormatToggle={handleFormatToggle}
        />
        <div className='px-20pxr'>
          <VideoList
            videos={filteredVideos}
            onClick={handleVideoClick}
            size={280}
          />
        </div>
      </div>
    </>
  );
};

export default ChannelDetail;
