import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDropzone } from 'react-dropzone';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import {
  Button,
  ContentsRow,
  InputModalButtonFormField,
  selectStyles,
  ThumbnailImageUpload,
} from '@learnway/ui';
import { z } from '@learnway/shared';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../../../widgets/layout/ui/container/slot/sub-contents';
import { FormDisplay, FormGroup, FormRow } from '../../../../../shared/ui/form-row';
import { TempSearchPopup } from '../../../../../features/learning/ui/resource/temp';
import { DynamicFormConfig, DynamicFormField } from '../../../../../shared/ui/dynamic-form-field';
import useDynamicForm from '../../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { TempContact } from '../../../../../features/learning/ui/resource/temp/form/temp_contact';
import {
  ChannelChoicePopup,
  FormSubtitles,
  ThumbnailUploaderFormField,
} from '../../../../../features/learning';
import { DateRangePickerFormField } from '../../../../../features/learning/ui/resource/date-range-picker-form-field';
import { ManagerChoicePopup } from '../../../../../features/learning/ui/resource/manager-choice-popup';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';

export const Route = createFileRoute('/_layout/learning/resource/view/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider, onSubmit, onFormChange } = useDynamicForm(formConfig);

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  const openModal = () => {
    // 모달 다으면 oncofmr(value)
  };
  return (
    <form onSubmit={onSubmit(handleFormSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button type="submit" variant="point" size="sm" className={selectStyles.select_item}>
            등록
          </Button>
          <Button
            type="button"
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/learning/resource' })}>
            목록
          </Button>
          <Button type={'button'} variant={'point'}>
            테스트 변경
          </Button>
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow provider={provider}>
              {/* 채널 */}
              <DynamicFormField name={'channelName'}>
                <InputModalButtonFormField
                  modalConfig={{
                    content: <ChannelChoicePopup />,
                    footer: true,
                    width: 'md',
                  }}
                />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              {/*학습자원명*/}
              <DynamicFormField name={'learningResourceName'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              {/*학습자원 설명*/}
              <DynamicFormField name={'learningResourceDescription'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              {/*담당자*/}
              <DynamicFormField name={'managerName'}>
                <InputModalButtonFormField
                  modalConfig={{
                    content: <ManagerChoicePopup />,
                    footer: true,
                    width: 'md',
                  }}
                />
              </DynamicFormField>
            </FormRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'contact'}>
                {/*연락처*/}
                <TempContact />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow type={'horizontal'}>
            <FormRow provider={provider}>
              {/*사용기한*/}
              <DynamicFormField name={'expirationDate'} />
            </FormRow>
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'expirationDate', value: true }]}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'expirationDateFrom'}>
                  <DateRangePickerFormField />
                </DynamicFormField>
              </FormRow>
            </ContentsRow>
          </FormDisplay>
          {/*외주개발업체 정보*/}
          <ContentsRow type={'horizontal'} className={'inactive'}>
            <FormRow provider={provider}>
              <DynamicFormField name={'isSubtitles'} />
            </FormRow>
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'isSubtitles', value: true }]}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'subtitles'}>
                  <FormSubtitles />
                </DynamicFormField>
              </FormRow>
            </ContentsRow>
          </FormDisplay>
          <ContentsRow>
            <FormRow provider={provider}>
              <ThumbnailUploaderFormField name="thumbnails" />
            </FormRow>
          </ContentsRow>
          <FormGroup title={'최종확인'} required={true}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isInspectionConfirmed'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isCopyrightConfirmed'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'isSecurityConfirmed'} />
              </FormRow>
            </ContentsRow>
          </FormGroup>
          <ContentsRow>
            <VideoThumbnailExtractor />
          </ContentsRow>
        </MainContents>
        <SubContents>123123</SubContents>
      </PageContainer>
    </form>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channelId',
      type: 'hidden',
      value: '',
    },
    {
      label: t('채널'),
      name: 'channelName',
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
      name: 'managerId',
      type: 'text',
      value: '',
    },
    {
      label: t('담당자'),
      name: 'managerName',
      type: 'custom',
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
    {
      name: 'expirationDateFrom',
      type: 'custom',
      value: '',
      guideText: '사용기한 가이드 텍스트',
    },
    {
      name: 'expirationDateTo',
      type: 'custom',
      value: '',
    },
    {
      label: t('외주개발업체정보'),
      name: 'isExternalDevelopmentCompany',
      type: 'checkbox',
      value: false,
    },
    {
      label: t('개발업체'),
      name: 'externalDevelopmentCompany',
      type: 'text',
      value: '',
    },
    {
      label: t('외주개발업체'),
      name: 'externalDevelopmentCompany',
      type: 'text',
      value: '',
    },
    {
      label: t('외주개발업체 담당자'),
      name: 'externalDevelopmentCompanyManager',
      type: 'text',
      value: '',
    },
    {
      label: t('외주개발업체 연락처'),
      name: 'externalDevelopmentCompanyContact',
      type: 'text',
      value: '',
    },
    {
      label: t('외주개발업체 과정코드'),
      name: 'externalDevelopmentCompanyResourceCode',
      type: 'text',
      value: '',
    },
    {
      label: t('외주학습시작 URL(비표준)'),
      name: 'externalDevelopmentCompanyResourceUrl',
      type: 'text',
      value: '',
    },
    /*{
      label: t('오히부학습시작 파라미터'),
      name: 'externalDevelopmentCompanyResourceParams',
      type: 'text',
      value: '',
    },*/
    {
      label: t('썸네일'),
      name: 'thumbnails',
      type: 'custom',
      value: [],
    },
    {
      label: t('자막여부'),
      name: 'isSubtitles',
      type: 'switch',
      value: true,
    },
    {
      name: 'subtitles',
      type: 'custom',
      value: [],
    },
    {
      label: t('검수확인'),
      name: 'isInspectionConfirmed',
      type: 'checkbox',
      guideText: '등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.',
      value: false,
    },
    {
      label: t('저작권확인'),
      name: 'isCopyrightConfirmed',
      guideText:
        '저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에 동의합니다.',
      type: 'checkbox',
      value: false,
    },
    {
      label: t('보안확인'),
      name: 'isSecurityConfirmed',
      guideText:
        '보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다',
      type: 'checkbox',
      value: false,
    },
  ],
  validator: {
    /*channel: z.string().required(),*/
    /*learningResourceName: z.string().required(),
    manager: z.string().required(),
    contact: z.string().required(),
    expirationDate: z.string().required(),
    isInspectionConfirmed: z.boolean().refine((value) => !value, {
      message: '‘{{label}}’ 체크하세요..',
    }),
    isCopyrightConfirmed: z.boolean().refine((value) => !value, {}),
    isSecurityConfirmed: z.boolean().refine((value) => !value, {}),*/
  },
  /*globalValidator: (({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });*/
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
