import { UppyUpload } from '@/libs/ui/src';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/upload-temp/')({
  component: RouteComponent,
});

function RouteComponent() {
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
      {/* <UppyUpload
        allowedFileTypes={allowedTypes}
        maxFileSize={maxSizeBytes}
        folderPath={folderPath}
      /> */}
    </div>
  );
}
