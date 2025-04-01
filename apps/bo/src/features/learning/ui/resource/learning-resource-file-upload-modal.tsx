import React, { useEffect, useRef } from 'react';
import {
  Badge,
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  Progress,
  UppyUpload,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import { useFileUploader } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import {
  IcoComplete02,
  IcoPause,
  IcoPpt,
  IcoRefresh,
  IcoTrash03,
  IcoUploadCloud,
} from '@learnway/icons';
import { cn } from '@learnway/shared';

const LearningResourceFileUploadModalComponent = () => {
  const { close } = useModal();
  const { files, addFiles, removeFile } = useFileUploader(uploadConfig);
  const ref = useRef(null);

  const handleFileChange = (e: any) => {
    addFiles(e.target.files);
    if (ref.current) {
      ref.current.value = '';
    }
  };
  return (
    <ModalContainer>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.title_wrap}>
            <h2 className={popupStyles.title}>{'파일 업로드'}</h2>
            <p className={popupStyles.text}>{'파일은 최대 1개, 4G 이하로 업로드 가능합니다.'}</p>
            <p className={styles.file_status_view}>
              <span className={styles.file_completed}>
                {'완료'} <em className={styles.num}>{'4'}</em>
              </span>
              <span className={styles.file_failed}>
                {'실패'} <em className={styles.num}>{'2'}</em>
              </span>
              <span className={styles.file_ing}>
                파일 올리는중 <em className={styles.ing}>1/1</em>
              </span>
            </p>
            <div className={cn(styles.start, styles.wrap)}>
              <div className={cn(styles.file_wrap)}>
                {/* 파일 첨부 하기 전 */}
                <div className={styles.attach_area}>
                  <Button className={styles.btn_file}>
                    <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
                    <strong className={styles.file_title}>
                      {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
                    </strong>
                    <span className={styles.file_guide}>
                      {'PNG, JPG, GIF, PDF / Max file size : 50MB'}
                    </span>
                    <input
                      ref={ref}
                      type="file"
                      className={styles.input_file}
                      onChange={handleFileChange}
                      multiple={true}
                    />
                  </Button>
                </div>
                {/* 파일 업로드 */}
                <div className={styles.upload_status}>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>
                        {
                          'dsdbnshbdhsdbshbdhsbdhsbdhsbdhsbdshjdbsjhdbshdbshjdbajhbdhjasbjhdbsajhbshjbshdbhdbhsdbhjdbshdbhsbdhsbdhsbdhsdbshdbshdbshdbshdbshdbsdhbhdbdbshdbhsdbhsbdhbshdbshdbshhbdshbdshdbshdbshb.pdf'
                        }
                      </em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <Progress className={styles.progress} value={100} label={'완료'} />
                    </div>
                    <IcoComplete02
                      width={20}
                      height={20}
                      fill="#3EB838"
                      className={styles.complete}
                    />
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>{'file.pdf'}</em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <p className={styles.file_status_text}>{'유효성 검토 중'}</p>
                      <Badge
                        className={styles.file_status}
                        option={{ label: '', value: '' }}
                        variant="dot"
                        status="ing"
                      />
                    </div>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>{'file.pdf'}</em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <p className={styles.file_status_text}>{'업로드 불가'}</p>
                      <Badge
                        className={styles.file_status}
                        option={{ label: '', value: '' }}
                        variant="dot"
                        status="error"
                      />
                    </div>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>{'file.pdf'}</em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <p className={styles.file_status_text}>{'업로드 취소'}</p>
                    </div>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoRefresh width={20} height={20} fill="#00AFD5" />
                    </Button>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>{'file.pdf'}</em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <Progress className={styles.progress} value={40} label={'실패'} isFailed />
                    </div>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoRefresh width={20} height={20} fill="#00AFD5" />
                    </Button>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>{'file.pdf'}</em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <Progress className={styles.progress} value={40} label={'진행중'} />
                    </div>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoPause width={20} height={20} fill="#A9AFB8" />
                    </Button>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
                      <em className={styles.name}>{'file.pdf'}</em>
                    </div>
                    <p className={styles.status_view}>
                      <em className={styles.file_size}>100MB</em>
                    </p>
                    <div className={styles.progress_area}>
                      <Progress className={styles.progress} value={0} label={'대기중'} />
                    </div>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoPause width={20} height={20} fill="#A9AFB8" />
                    </Button>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.guide_text}>
              {'업로드된 동영상은 학습자원목록에서 조회가능합니다.'}
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => close()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearningResourceFileUploadModal = LearningResourceFileUploadModalComponent;

const uploadConfig = {
  isAuto: true,
  maxFileCount: 1,
  maxFileSize: 1024 * 1024 * 500,
  s3Path: '/learning/resource/video',
};
