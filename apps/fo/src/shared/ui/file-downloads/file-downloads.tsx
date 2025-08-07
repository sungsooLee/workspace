// IA285 / NLP_FO_CLA_1008_1/2 강의실_자료실_상세(파일다운로드_공통/DRM)

import { FileInfo, useFileManager } from '@learnway/hooks';
import { IcoLock, IcoPdf } from '@learnway/icons';
import { formatBytes } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/dashboard.module.css';
import pdsStyles from '@learnway/styles/fo/features/layout/ui/course-introduction/pds.module.css';
import { Button } from '@learnway/ui/button';
import { Panel } from '@learnway/ui/panel';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

interface Props {
  label?: string;
}

/**
 * fileUuid, fileUuids, grouUuid 세 props중 하나만 입력해야 합니다.
 */
type FileProps =
  | {
      fileUuid: string;
      fileUuids?: never;
      groupUuid?: never;
    }
  | {
      fileUuid?: never;
      fileUuids: string[];
      groupUuid?: never;
    }
  | {
      fileUuid?: never;
      fileUuids?: never;
      groupUuid: string;
    };

export const FileDownloads = ({ label, fileUuid, fileUuids, groupUuid }: Props & FileProps) => {
  const { getFileInfo, getGroupInfo, fileDownload, filesDownload } = useFileManager();
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    if (fileUuid) {
      (async () => {
        setFiles([await getFileInfo(fileUuid)]);
      })();
      return;
    }

    if (fileUuids?.length) {
      (async () => {
        setFiles(await Promise.all(fileUuids.map(async (fileUuid) => getFileInfo(fileUuid))));
      })();
      return;
    }

    if (groupUuid) {
      (async () => {
        const groupInfo = await getGroupInfo(groupUuid);
        setFiles(groupInfo.files);
      })();
      return;
    }
  }, [groupUuid, fileUuids, fileUuid]);

  return (
    <div className={styles.start}>
      <div className={`${styles.info_box} ${styles.curriculum}`}>
        <div className={`${styles.info_box} ${styles.pds}`}>
          {/* 퍼블수정 20250723 자료 개수 추가 및 버튼 수정 */}
          {(label || !fileUuid) && (
            <div className={styles.tit_box}>
              <h3>
                {label}
                {!fileUuid && <em>{files.length}</em>}
              </h3>
              {/* 퍼블수정 20250724 사이즈 수정 */}
              {files && files.length > 1 && (
                <Button
                  variant="line"
                  size={isMobile ? 'md' : 'lx'}
                  className={styles.btn}
                  onClick={() => {
                    filesDownload(files.map((_) => _.fileUuid));
                  }}
                >
                  전체 다운로드
                </Button>
              )}
            </div>
          )}
          <div className={pdsStyles.start}>
            {files?.map((file) => (
              <Panel
                key={file.fileUuid}
                hideHeaderUnderline
                actions=""
                className="w_full"
                type="rounded"
              >
                <div className={pdsStyles.pds_box}>
                  <span className={pdsStyles.txt}>
                    {/* 퍼블수정 20250724 pdf 원복 */}
                    <IcoPdf className={styles.ico_pdf} />
                    <span>{file.originalFileName}</span>
                    {file.isSecured && <IcoLock className={styles.ico_lock} />}
                  </span>
                  <div className={pdsStyles.info}>
                    {/* 퍼블수정 20250724 mobile에서 hide */}
                    {isMobile || (
                      <span className={pdsStyles.size}>{formatBytes(file.fileSize)}</span>
                    )}
                    {/* 퍼블수정 20250724 버튼 사이즈 수정 */}
                    <Button
                      variant="line"
                      size="md"
                      className={pdsStyles.btn}
                      onClick={() => {
                        fileDownload(file.fileUuid);
                      }}
                    >
                      {t('다운로드')}
                    </Button>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
