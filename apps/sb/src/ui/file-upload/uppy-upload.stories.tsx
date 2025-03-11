import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { ThumbnailImageUpload } from '@learnway/ui';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';
import { UppyUpload } from '@learnway/ui';

export default {
  title: 'Components/UppyUpload',
  component: UppyUpload,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    onCheckedChange: { action: 'onCheckedChange' },
  },
} as Meta;

// ImageUpload
export const Template: any = (args: any) => {
  const [folderPath, setFolderPath] = useState('contents/');
  const [allowedTypes, setAllowedTypes] = useState<string[]>([
    '.mp4',
    '.wmv',
    '.ts',
    '.avi',
    '.mkv',
    '.mts',
    '.mov',
    '.mxf',
    '.mpeg',
    '.mpg',
    '.webm',
    '.asf',
    '.skm',
    '.k3g',
    '.pdf',
    '.doc',
    '.docx',
    '.ppt',
    '.pptx',
    '.xls',
    '.xlsx',
  ]);
  const [maxSize, setMaxSize] = useState(1024); // MB 단위

  // 파일 크기 MB -> 바이트 변환
  const maxSizeBytes = maxSize * 1024 * 1024;
  return (
    <div>
      <UppyUpload
        allowedFileTypes={allowedTypes}
        maxFileSize={maxSizeBytes}
        folderPath={folderPath}
      />
    </div>
  );
};
