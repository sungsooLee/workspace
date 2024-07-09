import ChannelDetailInfo from '@/components/channel/detail/channel-detail';
import ChannelProfile from '@/components/channel/detail/channel-profile';
import Filter from '@/components/channel/detail/channel-filter';
import '@/styles/channel-detail.scss';
import {
  ChannelDetailProps,
  ChannelProfileProps,
  Video,
} from '@/types/channel';
import VideoList from '@/components/channel/detail/video-list';
import { useState } from 'react';
import {
  LearningFormatEnum,
  LearningTypeEnum,
} from '@/constants/enums/LearningEnum';
import { getEnumValueByKey } from '@/lib/utils/enum';
import { useQuery } from '@tanstack/react-query';
import { fetchChannelVideos, fetchProfileDetail } from '@/api/comment';

const ChannelDetail = () => {
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
  const profile: ChannelProfileProps = {
    title: profileData.title,
    description: profileData.description,
    profileImage: profileData.profileImage,
  };

  const details: ChannelDetailProps = {
    youtbeLink: profileData.details.youtubeLink,
    subscribers: profileData.subscribers,
    videos: profileData.videos,
    views: profileData.views,
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
      <div className='flex flex-col'>
        <div className='flex flex-col lg:flex-row items-center p-20pxr lg:p-70pxr justify-between bg-white'>
          <ChannelProfile {...profile} />
          <ChannelDetailInfo {...details} />
        </div>
        <Filter
          selectedType={selectedType}
          selectedFormats={selectedFormats}
          onTypeSelect={handleTypeSelect}
          onFormatToggle={handleFormatToggle}
        />
        <div className='px-20pxr'>
          <VideoList videos={filteredVideos} />
        </div>
      </div>
    </>
  );
};

export default ChannelDetail;
