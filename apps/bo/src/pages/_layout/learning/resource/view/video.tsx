import { createFileRoute, useLocation, useRouter } from '@tanstack/react-router';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, ContentsRow } from '@learnway/ui';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../../../widgets/layout/ui/container/slot/sub-contents';
import { FormRow } from '../../../../../shared/ui/form-row';
import { TempSearchPopup } from '../../../../../features/learning/ui/resource/temp';
import { DynamicFormConfig, DynamicFormField } from '../../../../../shared/ui/dynamic-form-field';
import { z } from '@learnway/shared';
import { t } from 'i18next';
import useDynamicForm from '../../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TempContact } from '../../../../../features/learning/ui/resource/temp/form/temp_contact';
import ReactPlayer from 'react-player';
import { useDropzone } from 'react-dropzone';

export const Route = createFileRoute('/_layout/learning/resource/view/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { state } = useLocation();
  const router = useRouter();
  const { provider } = useDynamicForm(formConfig);
  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm">
          등록
        </Button>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => router.navigate({ to: '/learning/resource' })}>
          목록
        </Button>
      </ContentsButtons>
      <MainContents>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'channel'}>
              <TempSearchPopup />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'learningResourceName'} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'learningResourceDescription'} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'manager'}>
              <TempSearchPopup />
            </DynamicFormField>
          </FormRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'contact'}>
              <TempContact />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'expirationDate'} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <VideoThumbnailExtractor />
        </ContentsRow>
      </MainContents>
      <SubContents>
        <ReactPlayer
          url={'http://localhost:8080/videos/d38ef8df-811b-415a-ab88-74dd28b36ef9_720p.m3u8'}
          controls
          width="100%"
        />

        <VideoPlayerWithUpload />
      </SubContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      label: t('채널'),
      name: 'channel',
      type: 'custom',
      value: '',
    },
    {
      label: t('학습자원명'),
      name: 'learningResourceName',
      type: 'text',
      value: '',
      placeholder: '학습자원명을 입력하세요.',
      maxLength: 150,
    },
    {
      label: t('학습자원 설명'),
      name: 'learningResourceDescription',
      type: 'textarea',
      value: '',
      placeholder: '콘텐츠에 대한 설명을 입력해주세요.',
      maxLength: 2000,
    },
    {
      label: t('담당자'),
      name: 'manager',
      type: 'text',
      value: '',
    },
    {
      label: t('연락처'),
      name: 'contact',
      type: 'custom',
      value: '',
    },
    {
      label: t('사용기한'),
      name: 'expirationDate',
      type: 'switch',
      value: '',
      tooltip: '사용기한 내 콘텐츠 공유/교육자원활용이  가능합니다.',
    },
  ],
  validator: {
    channel: z.string().required(),
    learningResourceName: z.string().required(),
    manager: z.string().required(),
    contact: z.string().required(),
    expirationDate: z.string().required(),
  },
};

const VideoThumbnailExtractor: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = url;
      }
    }
  };

  // 메타데이터가 로드되면 동영상의 duration을 활용해 5개의 시간 포인트를 계산하고 썸네일을 추출합니다.
  const handleLoadedMetadata = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const duration = video.duration;
      const numThumbs = 5;
      // 동영상 전체 길이를 numThumbs+1로 나누어 중간값을 선택 (첫 프레임이나 마지막 프레임은 피하는 경우)
      const times = Array.from(
        { length: numThumbs },
        (_, i) => (duration / (numThumbs + 1)) * (i + 1),
      );
      const thumbs: string[] = [];

      // 순차적으로 각 시간 포인트의 썸네일을 추출
      for (const time of times) {
        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageUrl = canvas.toDataURL('image/png');
              thumbs.push(imageUrl);
            }
            resolve();
          };

          // 현재 시간 설정 후 seeked 이벤트 발생 시 onSeeked 실행
          video.currentTime = time;
          video.onseeked = onSeeked;
        });
      }
      setThumbnails(thumbs);
    }
  };

  return (
    <div>
      <h2>동영상 썸네일 추출 (5개)</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {/* 화면에 보이지 않는 video & canvas 요소 */}
      <video ref={videoRef} style={{ display: 'none' }} onLoadedMetadata={handleLoadedMetadata} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {thumbnails.length > 0 && (
        <div>
          <h3>추출된 썸네일:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                style={{ maxWidth: '150px' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const VideoPlayerWithUpload: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const playerRef = useRef<ReactPlayer>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['video/mp4', 'video/webm', 'video/ogg'],
    },
    multiple: false,
  });

  const captureThumbnail = () => {
    // ReactPlayer의 내부 플레이어(HTMLVideoElement)에 접근
    const internalPlayer = playerRef.current?.getInternalPlayer();
    if (internalPlayer instanceof HTMLVideoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = internalPlayer.videoWidth;
      canvas.height = internalPlayer.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 현재 프레임을 캔버스에 그립니다.
        ctx.drawImage(internalPlayer, 0, 0, canvas.width, canvas.height);
        // 캔버스 내용을 데이터 URL(이미지)로 변환
        const dataURL = canvas.toDataURL('image/png');
        setThumbnail(dataURL);
      }
    } else {
      console.error('내부 플레이어가 HTMLVideoElement가 아닙니다.');
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>여기에 동영상 파일을 드롭하세요...</p>
        ) : (
          <p>동영상 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요.</p>
        )}
      </div>

      {videoUrl && (
        <div>
          <h3>업로드한 동영상 재생</h3>
          <ReactPlayer ref={playerRef} url={videoUrl} controls width="100%" />

          <Button onClick={captureThumbnail}>현재 프레임 캡쳐</Button>

          {thumbnail && (
            <div>
              <h3>캡쳐된 썸네일:</h3>
              <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
