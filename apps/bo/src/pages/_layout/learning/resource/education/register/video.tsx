import { createFileRoute, useRouter } from '@tanstack/react-router';
import {
  Button,
  Input,
  Select,
  TreeEventPayload,
  TreeNode,
  TreeView,
  useModalContext,
  useModalControl,
} from '@learnway/ui';
import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { SubContents } from '../../../../../../widgets/layout/ui/container/slot/sub-contents';
import { MovieInfo } from '../../../../../../widgets/contents/movie-info';
import { FormRow } from '../../../../../../shared/ui/form-row';
import { z } from '@learnway/shared';
import { useFieldArray } from 'react-hook-form';
const sampleData: TreeNode[] = [
  {
    key: '1',
    title: 'Root Node 1',
    children: [
      {
        key: '1-1',
        title: 'Child 1',
        children: [
          { key: '1-1-1', title: 'Grandchild 1' },
          { key: '1-1-2', title: 'Grandchild 2' },
        ],
      },
      { key: '1-2', title: 'Child 2' },
    ],
  },
  {
    key: '2',
    title: 'Root Node 2',
    children: [
      { key: '2-1', title: 'Child 3' },
      { key: '2-2', title: 'Child 4' },
    ],
  },
];
export const Route = createFileRoute('/_layout/learning/resource/education/register/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit } = useDynamicForm(formConfig);
  const router = useRouter();
  const { open } = useModalControl();
  const [file, setFile] = useState<any>();
  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
  const handleAction = (payload: TreeEventPayload) => {
    switch (payload.type) {
      case 'NODE_SELECT':
        break;
      case 'NODE_MOVE':
        break;
      case 'NODE_COPY':
        break;
    }
  };
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
    /*open(
      <VideoUploadPopup />,
      {
        title: '학습 자료 업로드',
        width: 'lg',
      },
      handleVideoPopupClose,
    );*/
  };

  const handleOnSubmit = (data: any) => {
    console.log('data => ', data);
  };

  useEffect(() => {
    /*if (!file) {
      init();
    }*/
  }, []);
  return (
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
        <MainContents>
          <ContentsRow>
            <FormRow provider={provider} name={'channel2'}>
              <DynamicFormField name="channel" />
              -
              <DynamicFormField name="channel2" />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="educationName" />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="category" />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name="educationDescription" />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'manager'}>
                <ManagerComponent />
              </DynamicFormField>
            </FormRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'contact'}>
                <ContactComponent />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'thumbnails'}>
                <ThumbnailComponent />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'tag'}>
                <ThumbnailComponent />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'isResourceUsed'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'isSecureContent'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'marketplaceAccessType'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'shareChannelSetting'}>
                <ManagerComponent />
              </DynamicFormField>
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'reviewCheck'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'copyrightVerified'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'securityCheck'} />
            </FormRow>
          </ContentsRow>

          <TreeView treeId="source" data={sourceData} onAction={handleAction} />
        </MainContents>

        <SubContents>
          <MovieInfo />
        </SubContents>
      </PageContainer>
    </form>
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
      name: 'channel2',
      type: 'text',
      label: '채널 그룹',
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
      placeHolder: '학습자원을 분류할 카테고리를 선택하세요.',
      value: '',
    },
    {
      name: 'educationDescription',
      type: 'textarea',
      label: '학습자원 설명',
      value: '',
      placeHolder: '한글,영문,숫자 포함 2500자 이하',
    },
    {
      name: 'manager',
      type: 'custom',
      label: '담당자',
      value: '',
    },
    {
      name: 'contact',
      type: 'custom',
      label: '연락처',
      value: '',
    },
    {
      name: 'thumbnails',
      type: 'custom',
      label: '썸내일',
      value: [],
    },
    {
      name: 'tag',
      type: 'chip-list',
      label: '태그',
      tooltip: '비디오 태그',
      value: [
        { label: '현대자동차 A', value: 'A' },
        { label: '현대자동차 B', value: 'B' },
        { label: '현대자동차 C', value: 'C' },
      ],
      showInput: true,
    },
    {
      name: 'isResourceUsed',
      type: 'switch',
      label: '교육자원 활용여부',
      value: '',
      subText: '해당 학습자원으로 교육과정읠 개설할 수 있습니다.',
      showLabel: false,
    },
    {
      name: 'isSecureContent',
      type: 'switch',
      label: '보안콘텐츠 여부',
      value: '',
      subText: '해당 학습자원으로 교육과정읠 개설할 수 있습니다.',
      showLabel: false,
    },
    {
      name: 'marketplaceAccessType',
      type: 'radio-group',
      label: '마켓플레이스 공개설정',
      value: '',
      tooltip: '마켓플레이스 공개설정',
      options: [
        {
          value: 'private',
          label: '비공개',
        },
        {
          value: 'public',
          label: '전체공개',
        },
        {
          value: 'partial',
          label: '일부공개',
        },
      ],
    },
    {
      name: 'shareChannelSetting',
      type: 'custom',
      label: '공유채널 설정',
      value: '',
      tooltip: '공유채널 설정',
    },
    {
      name: 'reviewCheck',
      type: 'checkbox',
      label: '검수 확인',
      value: '',
      subText: '등록하고자 한 동영상이며, 처음부터 끝까지 정상적으로 재생됨이 확인되었습니다.',
    },
    {
      name: 'copyrightVerified',
      type: 'checkbox',
      label: '저작권 확인',
      value: '',
      subText:
        '저작권법(제25조2항)에 따라 학습자원(동영상,이미지등)은 해당 학습플랫폼에서만 이용가능하며, 이 외의 공간에서 저작물을 공유 또는 게시하는 행위는 저작권법 위반에 해당될 수 있음에 동의합니다.',
    },
    {
      name: 'securityCheck',
      type: 'checkbox',
      label: '보안 확인',
      subText:
        '보안콘텐츠 미 설정 시, 불법복제, 무단사용,저작권 침해 위험에 노출되고, 이에 따른 피해를 입을 수 있음에 인지합니다.',
      value: '',
    },
  ],
  validator: {
    /*channel: z.string().required('채널 입력'),
    channel2: z.string().required('채널2 입력'),*/
    /*channel: z.string().required(),*/
  },
};

const ManagerComponent: FC<any> = ({ onChange, ...props }) => {
  const [displayValue, setDisplayValue] = useState('');
  const { open } = useModalControl();

  const handleClose = (data: any) => {
    console.log('data => ', data);
    setDisplayValue(data.userName);
    onChange(data.userId);
  };

  const handleModalOpen = () => {
    open(
      <UserSelectPop />,
      {
        title: '학습 자료 업로드',
        width: 'lg',
      },
      handleClose,
    );
  };

  return (
    <>
      <Input value={displayValue} disabled={true} />
      <Button type={'button'} variant="point" size="sm" onClick={handleModalOpen}>
        선택
      </Button>
    </>
  );
};

const ContactComponent: FC<any> = ({ onChange }) => {
  const [contact, setContact] = useState({
    first: '+82',
    second: '',
  });

  useEffect(() => {
    onChange(contact.first + contact.second);
  }, [contact]);
  return (
    <>
      <Select
        value={contact.first}
        onChange={(value) => setContact((state) => ({ ...state, first: value.value }))}
        options={[
          { value: '+82', label: '+82' },
          { value: '+83', label: '+83' },
        ]}
      />
      <Input
        id="name-1-6"
        type="text"
        placeholder="- 제외한 숫자만 입력"
        value={contact.second}
        onChange={(e) => setContact((state) => ({ ...state, second: e.target.value }))}
      />
    </>
  );
};

const UserSelectPop = () => {
  const { closeModal } = useModalContext();
  const users = [
    {
      userId: '1',
      userName: '일번',
    },
    {
      userId: '2',
      userName: '이번',
    },
    {
      userId: '3',
      userName: '삼번',
    },
    {
      userId: '4',
      userName: '사번',
    },
  ];

  const handleUserSelect = (userId: string, userName: string) => {
    closeModal({ userId, userName });
  };
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>아이디</th>
          <th>사용자명</th>
          <th>선택</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td align={'center'}>{user.userId}</td>
            <td align={'center'}>{user.userName}</td>
            <td align={'center'}>
              <Button
                type={'button'}
                variant="point"
                size="sm"
                onClick={() => handleUserSelect(user.userId, user.userName)}>
                선택
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ThumbnailComponent: FC<any> = ({ control, name, value, onChange }) => {
  const { fields, append, update } = useFieldArray({
    control,
    name: name,
  });
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => {
          append({ title: '썸네일', url: 'https://placehold.co/120x70', check: false });
        }}>
        <div className="flex h-28 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-blue-50">
          <svg
            className="h-8 w-8 text-gray-500"
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

          <p className="mt-2 text-sm text-gray-600">썸네일 업로드</p>
        </div>
      </button>

      {fields.map((item: any, index: any) => (
        <div
          key={index}
          className="relative flex h-28 w-48 flex-col items-center justify-center rounded-lg border border-gray-300 bg-blue-50">
          <p className="mt-2 text-sm text-gray-600">
            <img src={item.url} alt="" />
          </p>

          <button
            onClick={() => {
              update(index, { ...item, check: !item.check });
            }}>
            <div
              className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full ${item.check ? 'bg-blue-400' : 'bg-white-400'}`}>
              <svg
                className="h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};
