// IA011 / NLP_BO_PMS_1100_5
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css';
import { IcoFilePng, IcoTrash03 } from '@learnway/icons';
import { UploadFile, useFileManager } from '@learnway/hooks';
import { useDropzone } from 'react-dropzone';
import { AttachmentProps } from './types';
import { t } from 'i18next';
import { Button } from '../button/button';
import { useModal } from '../modal/modal.hook';
import { compact, first, get } from 'lodash-es';
import { cn, splitFileName } from '@learnway/shared';

const SingleAttachmentComponent = ({
  files,
  addFiles,
  onRemove,
  inputAccept,
  maxFileCount,
  maxFileSize,
  readOnly,
  disabled,
}: AttachmentProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: maxFileSize || 999,
    multiple: maxFileCount > 1,
  });

  const { fileDownload } = useFileManager();

  const { alert: openAlert } = useModal();

  useEffect(() => {
    if (!files.length) return;
    if (['validating-error', 'failed'].includes(get(first(files), 'status', ''))) {
      openAlert({
        title: '파일을 확인해 주세요.',
        content: '파일 확장자, 용량을 확인하고 다시 업로드해 주세요.',
      });
      onRemove(get(first(files), 'id', ''));
    }
  }, [files]);

  const { base, ext } = useMemo(
    () => splitFileName(get(first(files), 'fileName', '')),
    [get(first(files), 'fileName')],
  );

  return (
    <div className={cn(styles.start, styles.wrap)}>
      <div className={styles.upload_single}>
        <div className={styles.view_file}>
          {['fetched', 'completed'].includes(get(first(files), 'status', '')) ? (
            <div className={cn(styles.attach_area, styles.attached)}>
              <p className={styles.attach_view}>
                <IcoFilePng
                  width={16}
                  height={16}
                  className={styles.icon_type}
                  onClick={() => fileDownload(get(first(files), 'fileUuid', ''))}
                />
                <Button
                  className={cn(styles.attached_name, styles.disabled)}
                  onClick={() => fileDownload(get(first(files), 'fileUuid', ''))}
                  disabled={disabled}
                >
                  <span className="flex-1 truncate">{base}</span>
                  {ext && <span className="flex-none">.{ext}</span>}
                </Button>
              </p>
              <Button
                className={cn(styles.btn_clear, (readOnly || disabled) && 'hidden')}
                onlyIcon
                onClick={() => onRemove(get(first(files), 'id', ''))}
                disabled={readOnly || disabled}
              >
                <IcoTrash03 width={20} height={20} stroke="#131C30" />
              </Button>
            </div>
          ) : (
            <div className={cn(styles.attach_area, (readOnly || disabled) && styles.attached)}>
              <p className={styles.text}>{'버튼을 클릭하여 파일을 추가하세요.'}</p>
            </div>
          )}
        </div>
        <Button
          className={styles.btn_attach}
          size={'sm'}
          variant={'gray'}
          {...getRootProps()}
          disabled={Boolean(files.length) || readOnly || disabled}
        >
          <input
            type="file"
            {...getInputProps()}
            accept={inputAccept}
            disabled={Boolean(files.length) || readOnly || disabled}
          />
          {'파일첨부'}
        </Button>
      </div>
    </div>
  );
};

export const SingleAttachment = SingleAttachmentComponent;
