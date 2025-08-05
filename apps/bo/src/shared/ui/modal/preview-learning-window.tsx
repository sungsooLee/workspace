import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import { useGetCurriculumDetail } from '@entities/curriculum';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import {
  CmsContentProgressMultiRes,
  CmsEnContentType,
  CmsHtml5Resource,
  CmsImageItem,
} from '@learnway/types';
import { LearnwayLearningWindowLayout, useLearningWindow } from '@learnway/ui/learning-window';
import { ContentInformation, ContentType } from '@types';
import { Button } from '@learnway/ui/button';
import { useFileManager } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';

/**
 *
 * @param scoId : 스콤 item 미리 보기 시 같이 전달 할 것
 * @returns
 */
const PreviewLearningWindowComponent: FC<any> = ({
  contentUuid,
  curriculumId,
  scoId,
}: {
  contentUuid?: string;
  curriculumId?: number;
  scoId?: string;
}) => {
  const { alert: openAlert } = useModal();
  const [isPc, setIsPc] = useState<boolean>(true);

  const {
    playList,
    playInfo,
    curriculum,
    setBlogInfo,
    setVideoInfo,
    setHtmlInfo,
    setPlayInfo,
    setScormInfo,
    setGalleryInfo,
    setOtherInfo,
    setFuncInfo,
    setCurriculum,
    clearInfo,
    setBaseInfo,
    setPreviewMobile,
  } = useLearningWindow();

  const [newContentUuid, setNewContentUuid] = useState<string>();

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(newContentUuid || ''),
  );

  const { data: curriculumnData } = useGetCurriculumDetail(curriculumId || 0);
  const { getFileInfo, fileDownload } = useFileManager();
  const getScormItemByScoId = (scoId?: string) => {
    if (!scoId) return;
    let retval: any;
    data?.children.forEach((mod: any, index: number) => {
      if (retval) return;
      mod.items.forEach((item: any, index: number) => {
        if (retval) return;
        if (item.scoId === scoId) {
          console.log('322323232', item);
          retval = item;
        }
      });
    });
    return retval;
  };
  const genCuliculumInfo = (data: any): any => {
    const moduleList: any[] = [];
    let lessonIndex = 1;
    data.children.forEach((mod: any, index: number) => {
      const module: any = { moduleId: index + 1, moduleName: mod.orgnTitle };
      moduleList.push(module);
      const lessonList: any[] = [];
      mod.items.forEach((item: any, index: number) => {
        lessonIndex++;
        lessonList.push({
          lessonId: lessonIndex,
          lessonName: item.itemTitle,
          contentUuid: data.channelUuid,
          orgnId: mod.orgnId,
          itemId: item.itemId,
          scoId: item.scoId,
          contentType: 'SCORM',
        });
        module.lessonList = lessonList;
      });
    });
    const retval = { moduleList };

    return retval;
  };

  const genCuliculumInfoOneContent = (data: ContentInformation): any => {
    return {
      moduleList: [
        {
          moduleId: 1,
          lessonId: 1,
          isDummy: true,
          lessonName: data.contentName,
          contentUuid: data.channelUuid,
          contentType: data.contentType,
        },
      ],
    };
  };

  useEffect(() => {
    if (!playInfo) return;
    console.log('playInfo ', playInfo);
    //curriculumId 가 없는 경우에 대한 스콤 처리
    if (!curriculumId) {
      if (playInfo.scoId) {
        const info = getScormItemByScoId(playInfo.scoId);
        console.log(`scomItem ${playInfo.scoId}`, info);
        if (info) {
          setScormInfo({ ...info, itemURL: info.itemUrl });
        }
      }
    } else {
      // FO 학습창과 동일하게 컨텐츠 정보를 조회 하여 미리보기 할 수 있어야 함.
      clearInfo();
      setNewContentUuid(playInfo.contentUuid);
    }
  }, [playInfo]);

  useEffect(() => {
    if (!curriculum) return;
    if (!playList) return;
    if (scoId) {
      curriculum.moduleList.forEach((module) => {
        module.lessonList.forEach((lesson) => {
          if (lesson.scoId === scoId) {
            setPlayInfo(module.moduleId, lesson.lessonId);
          }
        });
      });
    } else {
      if (playList.length > 0) {
        const first = playList[0];
        setPlayInfo(first.moduleId, first.lessonId);
      }
    }
  }, [curriculum, playList]);

  useEffect(() => {
    clearInfo();
    if (!data) return;
    if (!curriculumId) setCurriculum(undefined);
    console.log('🚀 ~ useEffect ~ data:', data);
    switch (data.contentType) {
      case ContentType.SCORM:
        if (!curriculumId) {
          setCurriculum(genCuliculumInfo(data));
        } else {
          const info = getScormItemByScoId(playInfo?.scoId);
          if (info) {
            setScormInfo({ ...info, itemURL: info.itemUrl });
          }
        }
        break;
      case ContentType.BLOG:
        setCurriculum(genCuliculumInfoOneContent(data));
        setBlogInfo(data as any);
        break;
      case ContentType.VIDEO:
        setCurriculum(genCuliculumInfoOneContent(data));
        setVideoInfo(data);
        break;
      case ContentType.HTML5_VIDEO:
        setCurriculum(genCuliculumInfoOneContent(data));
        setHtmlInfo(data.resource as CmsHtml5Resource);
        break;
      case ContentType.IMAGE:
        setCurriculum(genCuliculumInfoOneContent(data));
        setGalleryInfo({
          contentType: data.contentType,
          contentUuid: data.contentUuid,
          images: data.images as CmsImageItem[],
        });
        break;
      case ContentType.ETC:
        setCurriculum(genCuliculumInfoOneContent(data));

        if (data.fileUuid) {
          getFileInfo(data.fileUuid).then((result) => {
            setOtherInfo({
              label: result.originalFileName,
              lessonTime: undefined,
              contentUuid: data.contentUuid,
              contentType: CmsEnContentType.search(data.contentType),
              fileInfo: {
                ...result,
                groupUuid: result.group?.groupUuid,
                fileName: result.originalFileName,
              },
            });
          });
        }

        break;
    }
    setFuncInfo({
      lessonProgress: async (payload: any) => {
        console.log('lessonProgress called', payload);
        return {} as CmsContentProgressMultiRes;
      },
      scormInitialize: async (payload) => {
        console.log('scormInitialize called ', payload);
        return 'true';
      },
      scormCommit: async (payload) => {
        console.log('scormCommit called', payload);
        return 'true';
      },
      videoOnProgress: async (payload) => {
        console.log('videoOnProgress called', payload);
      },
      videoWatchStatistics: async (payload) => {
        console.log('videoWatchStatistics', payload);
      },
      html5LearningHistory: (payload) => {
        console.log('html5LearningHistory called', payload);
      },
      galleryLearningHistory: (payload) => {
        console.log('galleryLearningHistory called', payload);
      },
      otherClickButton: async (playInfo, otherInfo) => {
        console.log('otherClickButton called', playInfo, otherInfo);
        if (otherInfo.contentType === CmsEnContentType.ETC) {
          if (otherInfo.fileInfo) {
            fileDownload(otherInfo.fileInfo.fileUuid);
          }
        }
      },
      goCoursePage: (courseId) => {
        console.log('goCoursePage called', courseId);
      },
      goHomePage: () => {
        console.log('goHomePage called');
      },
    });
  }, [data]);

  useEffect(() => {
    if (!contentUuid) return;
    setNewContentUuid(contentUuid);
  }, [contentUuid]);

  useEffect(() => {
    setPreviewMobile(!isPc);
  }, [isPc]);

  useEffect(() => {
    if (!curriculumnData) return;
    setCurriculum(curriculumnData);
  }, [curriculumnData]);
  useEffect(() => {
    setBaseInfo({ courseName: '미리보기', courseId: 0, curriculumId: 0, sequenceId: 0 });
  }, []);

  return (
    <div>
      {/* <Button
        variant={isPc ? 'primary' : 'gray'}
        size="md"
        label="PC"
        style={{ zIndex: 10, position: 'absolute', top: 22, right: 140 }}
        onClick={() => {
          setIsPc(true);
        }}
      />
      <Button
        variant={isPc ? 'gray' : 'primary'}
        size="md"
        label="Mobile"
        style={{ zIndex: 10, position: 'absolute', top: 22, right: 60 }}
        onClick={() => {
          setIsPc(false);
        }}
       /> */}
      <div className={isPc ? 'auto' : 'flex w-[300px] justify-center'}>
        <LearnwayLearningWindowLayout />
      </div>
    </div>
  );
};

export const PreviewLearningWindow = PreviewLearningWindowComponent;
