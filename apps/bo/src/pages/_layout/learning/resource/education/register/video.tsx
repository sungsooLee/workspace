import { createFileRoute, useRouter } from '@tanstack/react-router';
import useSearchBox from '../../../../../../shared/ui/search-box/use-search-box';
import { Button, useModalContext, useModalControl } from '@learnway/ui';
import React, { useEffect, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PageContainer } from '../../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../../widgets/layout/ui/container/slot/main-contents';
import { ContentsRow } from '../../../../../../widgets/layout/ui/container/parts/contents-row';
import {
  DynamicFormConfig,
  DynamicFormField,
} from '../../../../../../shared/ui/dynamic-form-field';
import useDynamicForm from '../../../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { z } from '@learnway/shared';
import { SubContents } from '../../../../../../widgets/layout/ui/container/slot/sub-contents';
import { MovieInfo } from '../../../../../../widgets/contents/movie-info';

export const Route = createFileRoute('/_layout/learning/resource/education/register/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit } = useDynamicForm(formConfig);
  const router = useRouter();
  const { open } = useModalControl();
  const [file, setFile] = useState<any>();

  const handleGoToListPage = () => {
    router.navigate({ to: '/learning/resource/education/list' });
  };

  const handleVideoPopupClose = (data: any) => {
    if (data) {
      setFile(data);
    } else {
      handleGoToListPage();
    }
  };

  const init = () => {
    console.log('init');
    open(
      <VideoUploadPopup />,
      {
        title: '학습 자료 업로드',
        width: 'lg',
      },
      handleVideoPopupClose,
    );
  };

  const handleOnSubmit = (data: any) => {
    console.log('data => ', data);
  };

  useEffect(() => {
    if (!file) {
      init();
    }
  }, []);
  return (
    file && (
      <form onSubmit={onSubmit(handleOnSubmit)}>
        <PageContainer>
          <ContentsButtons>
            <Button type="submit" variant="point" size="sm">
              저장
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleGoToListPage}>
              목록
            </Button>
          </ContentsButtons>
          <MainContents>1</MainContents>
          <SubContents>
            <MovieInfo />
          </SubContents>
        </PageContainer>
      </form>
    )
  );
}

const VideoUploadPopup = () => {
  const { closeModal } = useModalContext();
  const [files, setFiles] = useState<any[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('acceptedFiles => ', acceptedFiles);
    setFiles((state) => [...state, ...acceptedFiles]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">파일 선택</h3>
          <p className="mt-1 text-sm text-gray-600">파일은 1개, 4G 이하로 업로드 가능합니다.</p>
          <p className="text-sm text-gray-600">업로드 가능한 파일 - Zip</p>
        </div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {files.length > 0 ? (
            <>
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">파일 올리는 중 1/1</h2>
                <p className="text-sm text-gray-600">동영상을 올리는 중입니다.</p>
              </div>

              <div className="p-6">
                <div className="rounded-lg border bg-gray-50 p-4">
                  {files.map((file) => (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-500">
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M10 16V12H14V16H19V10H22L12 3L2 10H5V16H10Z" />
                          </svg>
                        </div>

                        <p className="max-w-[300px] truncate text-sm text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
                        <p className="text-sm text-gray-500">완료</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-300">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: '100%' }}></div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              <svg
                className="h-10 w-10 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v12m0 0l-3-3m3 3l3-3m-3 3V4m-6 12h12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                영역을 클릭하거나, 파일을 마우스로 끌어놓으세요.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center border-t px-6 py-4">
        {files.length > 0 && (
          <Button type={'button'} variant="point" size="sm" onClick={() => closeModal(files[0])}>
            등록
          </Button>
        )}
        <Button type={'button'} variant="point" size="sm" onClick={() => closeModal()}>
          취소
        </Button>
      </div>
    </div>
  );
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'channel',
      type: 'text',
      label: '채널',
      value: '',
    },
    {
      name: 'educationName',
      type: 'text',
      label: '학습자원명',
      value: '',
    },
    {
      name: 'category',
      type: 'text',
      label: '카테고리',
      value: '',
    },
    {
      name: 'category',
      type: 'text',
      label: '학습자원 설명',
      value: '',
    },
    {
      name: 'category',
      type: 'text',
      label: '담당자',
      value: '',
    },
  ],
  validator: {},
};
