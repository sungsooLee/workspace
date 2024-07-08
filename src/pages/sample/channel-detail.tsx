import ChannelDetailInfo from '@/components/channel/detail/channel-detail';
import ChannelProfile from '@/components/channel/detail/channel-profile';
import Filter from '@/components/channel/detail/channel-filter';
import fetchData from '@/lib/utils/fetchData';
import '@/styles/channel-detail.scss';
import { ChannelDetailProps, ChannelProfileProps } from '@/types/channel';
import VideoList from '@/components/channel/detail/video-list';
import { useState } from 'react';
import {
  LearningFormatEnum,
  LearningTypeEnum,
} from '@/constants/enums/LearningEnum';
import { getEnumValueByKey } from '@/lib/utils/enum';

const videoResource = fetchData('/api/channel/test/videos');
const profileDetailResource = fetchData('/api/channel/testId/profile');
const ChannelDetail = () => {
  const res = videoResource.read();
  const getProfileDetail = profileDetailResource.read();
  const [selectedType, setSelectedType] = useState<LearningTypeEnum>(
    LearningTypeEnum.ALL
  );
  const [selectedFormats, setSelectedFormats] = useState<LearningFormatEnum[]>(
    []
  );

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
    title: getProfileDetail.title,
    description: getProfileDetail.description,
    profileImage: getProfileDetail.profileImage,
  };

  const videos = res.data.items;

  const details: ChannelDetailProps = {
    yotubeLink: getProfileDetail.details.youtubeLink,
    subscribers: getProfileDetail.subscribers,
    videos: getProfileDetail.videos,
    views: getProfileDetail.views,
  };

  const filteredVideos = videos.filter((video: any) => {
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
