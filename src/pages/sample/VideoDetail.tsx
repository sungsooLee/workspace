// import { fetchCommnetApi, saveCommentApi } from '@/features/commentList';
// // import VideoList from '@/features/video/ui/video-list';
// import Spinner from '@/shared/components/spinner/spinner';
// import fetchData from '@/shared/utils/fetchData';
// import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import useComments from '@/features/commentList/hooks/useComments';
// import VideoList from '@/features/videoList/ui/VideoList';
// import CommentList from '@/features/commentList/ui/CommentList';
// import VideoPlayerContainer from '@/shared/components/videoPlayer/ui/VideoPlayerContainer';
// import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { CommonResponse } from '@/shared/types/response';
// import useContentStore from '@/shared/stores/useContentStore';

// const videoResource = fetchData('/api/channel/test/videos');
// const VideoDetail = () => {
//   const navigate = useNavigate();
//   const res = videoResource.read();
//   const videos = res?.data?.items;
//   const [videoInfo, setVideoInfo] = useState<Video | null>(null);
//   const [tmpVideoInfo, setTmpVideoInfo] = useState<any>({});
//   const { id } = useParams<{ id: string }>();
//   const userEmail = sessionStorage.getItem('user') || '';
//   const {
//     comments,
//     incrementPage,
//     loading,
//     isLastPage,
//     addComment,
//     deleteComment,
//     isFetchingNextPage,
//     reset,
//   } = useComments(id, 10, fetchCommnetApi, saveCommentApi);
//   const videoState = useContentStore((state: any) => state.content);
//   //비디오 시청 지점과 정보 가지고 오기. (가정)
//   // const { data, isLoading, isError } = useQuery<CommonResponse, Error>({
//   //   queryKey: ['getVideoInfo'],
//   //   queryFn: () => {
//   //     // return axios.get('http://10.204.240.36:8073/cms-module/api/v1/video', {
//   //     //   params: {
//   //     //     userId: 1,
//   //     //     contentId: 1,
//   //     //     chapterId: 1,
//   //     //     kitId: 1,
//   //     //     courseId: 1,
//   //     //     classId: 1,
//   //     //   },
//   //     // });
//   //     // throw new Error('강제로 오류 발생시키기');
//   //   },
//   //   // throwOnError: (error) => {
//   //   //   console.log(error);
//   //   // },
//   // });

//   // 무한 스크롤을 위한 설정
//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastElementRef = useCallback(
//     (node: HTMLDivElement) => {
//       if (loading || isLastPage) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver(
//         (entries) => {
//           if (entries[0].isIntersecting) {
//             incrementPage();
//           }
//         },
//         { threshold: 0.1 }
//       );
//       if (node) observer.current.observe(node);
//     },
//     [loading, isLastPage]
//   );

//   const handleCommentSubmit = async (comment: string) => {
//     const email = sessionStorage.getItem('user') || '';
//     const newComment = { email, comment, id: id };
//     return addComment(newComment);
//   };

//   useEffect(() => {
//     const video = videos.filter(
//       (tmp: { id: number }) => tmp.id === parseInt(id!)
//     );
//     setVideoInfo(video[0]);
//     reset();
//   }, [id]);
//   const handleVideoClick = (videoId: number) => {
//     navigate(`/my/video/${videoId}`);
//   };

//   return (
//     <div key={id} className='flex flex-col overflow-hidden md:flex-row'>
//       <div className='w-full flex-[6_6_0%] p-4 md:flex md:flex-col'>
//         <div className='relative mb-4 min-w-200pxr'>
//           {videoState && <VideoPlayerContainer {...videoState} />}
//         </div>
//         <div>
//           {videos.length && (
//             <VideoList videos={videos} onClick={handleVideoClick} size={240} />
//           )}
//         </div>
//       </div>

//       <div className='flex-[4_4_0%] p-4 md:flex md:flex-col md:pl-4'>
//         <div className='mb-4'>
//           <h1 className='text-xl font-bold'>{tmpVideoInfo?.contentName}</h1>
//         </div>
//         <div className='flex-1 p-4'>
//           <CommentList
//             comments={comments}
//             onSubmit={handleCommentSubmit}
//             onDelete={deleteComment}
//           />
//           {(loading || isFetchingNextPage) && (
//             <div className='py-4'>
//               <Spinner />
//             </div>
//           )}
//           <div ref={lastElementRef}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoDetail;
