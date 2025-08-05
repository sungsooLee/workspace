import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import {
  IcoAlertCircle,
  IcoComplete02,
  IcoFileUpload,
  IcoPaperClip,
  IcoPause,
  IcoPpt,
  IcoRefresh,
  IcoTrash03,
} from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import PopupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

import { Badge } from '@learnway/ui/badge';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ProgressBar } from '@learnway/ui/progress';
import { isMobile } from 'react-device-detect';

export const Route = createFileRoute('/_guide/guide/file-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();
  useEffect(() => {
    openModal({
      width: isMobile ? 'm_full' : 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <FileUploadContent />,
    });
  }, [openModal]);

  return (
    <div className={cn(styles.start, styles.wrap, 'attach_wrap')}>
      {/* info_wrap : 상단 타이틀 버튼 영역 */}
      <div className={styles.info_wrap}>
        <div className={styles.title_area}>
          <strong className={styles.title}>{'파일 올리기'}</strong>
          <span className={styles.file_info}>
            <IcoPaperClip
              width={'16'}
              height={'17'}
              stroke={'#131C30'}
              className={styles.icon_clip}
            />
            <span className={styles.file_length}>
              <strong className={styles.num}>0</strong>
              <span className={styles.slash}>/</span>
              <span className={styles.length}>10</span>
              {'개'}
            </span>
            <span className={styles.file_volume}>
              <em className={styles.volume}>0</em>
              {'KB'}
            </span>
          </span>
        </div>
        <div className={styles.btn_area}>
          <p className={styles.file_text}>
            <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
            <span className={styles.info_text}>{`최대 ${'00'}개, 최대 파일 사이즈 ${'50'}MB`}</span>
          </p>
          <Button variant={'line'} size={'sm'} className={styles.btn_add}>
            {'추가'}
          </Button>
          <Button variant={'line'} size={'sm'} className={styles.btn_add}>
            {'저장'}
          </Button>
          <Button variant={'line'} size={'sm'} disabled className={styles.btn_delete}>
            {'삭제'}
          </Button>
        </div>
      </div>
      {/* file_wrap : 라운드 박스 영역 */}
      <div className={cn(styles.file_wrap)}>
        {/* 파일 첨부 하기 전 */}
        <div className={styles.attach_area}>
          <Button className={styles.btn_file}>
            <IcoFileUpload className={styles.icon_upload} />
            <strong className={styles.file_title}>
              {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
            </strong>
            <span className={styles.file_guide}>{'PNG, JPG, GIF, PDF / Max file size : 50MB'}</span>
            <input type="file" className={styles.input_file} />
          </Button>
        </div>
        {/* 파일 업로드 */}
        <div className={styles.upload_status}>
          {/* file_item */}
          <div className={styles.file_item}>
            <Checkbox className={styles.check} />
            <div className={styles.file_name}>
              <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
              <em className={styles.name}>
                {
                  'dsdbnshbdhsdbshbdhsbdhsbdhsbdhsbdshjdbsjhdbshdbshjdbajhbdhjasbjhdbsajhbshjbshdbhdbhsdbhjdbshdbhsbdhsbdhsbdhsdbshdbshdbshdbshdbshdbsdhbhdbdbshdbhsdbhsbdhbshdbshdbshhbdshbdshdbshdbshb.pdf'
                }
              </em>
            </div>
            <div className={styles.progress_area}>
              <span className={styles.status_view}>
                <em className={styles.file_size}>100MB</em>
              </span>
              <ProgressBar className={styles.progress} progress={100} />
            </div>
            <div className={styles.control_wrap}>
              <IcoComplete02 width={20} height={20} fill="#3EB838" className={styles.complete} />
            </div>
            <div className={styles.delele_btn_wrap}>
              <Button className={styles.btn_delete} onlyIcon>
                <IcoTrash03 width={20} height={20} stroke="#131C30" />
              </Button>
            </div>
          </div>
          {/* file_item */}
          <div className={styles.file_item}>
            <Checkbox className={styles.check} />
            <div className={styles.file_name}>
              <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
              <em className={styles.name}>{'file.pdf'}</em>
            </div>
            <div className={styles.progress_area}>
              <span className={styles.status_view}>
                <em className={styles.file_size}>100MB</em>
              </span>
              <ProgressBar className={styles.progress} progress={40} />
            </div>
            <div className={styles.control_wrap}>
              <Badge
                className={styles.file_status}
                option={{ label: '', value: '' }}
                variant="dot"
                status="ing"
              />
            </div>
            <div className={styles.delele_btn_wrap}>
              <Button className={styles.btn_delete} onlyIcon>
                <IcoTrash03 width={20} height={20} stroke="#131C30" />
              </Button>
            </div>
          </div>
          {/* file_item */}
          <div className={styles.file_item}>
            <Checkbox className={styles.check} />
            <div className={styles.file_name}>
              <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
              <em className={styles.name}>{'file.pdf'}</em>
            </div>
            <div className={styles.progress_area}>
              <span className={styles.status_view}>
                <em className={styles.file_size}>100MB</em>
              </span>
              <ProgressBar className={styles.progress} progress={40} isFailed />
            </div>
            <div className={styles.control_wrap}>
              <Badge
                className={styles.file_status}
                option={{ label: '', value: '' }}
                variant="dot"
                status="error"
              />
            </div>
            <div className={styles.delele_btn_wrap}>
              <Button className={styles.btn_delete} onlyIcon>
                <IcoTrash03 width={20} height={20} stroke="#131C30" />
              </Button>
            </div>
          </div>
          {/* file_item */}
          <div className={styles.file_item}>
            <Checkbox className={styles.check} />
            <div className={styles.file_name}>
              <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
              <em className={styles.name}>{'file.pdf'}</em>
            </div>
            <div className={styles.progress_area}>
              <span className={styles.status_view}>
                <em className={styles.file_size}>100MB</em>
              </span>
              <ProgressBar className={styles.progress} progress={40} isFailed />
            </div>
            <div className={styles.control_wrap}>
              <Button className={styles.btn_status} onlyIcon>
                <IcoRefresh width={20} height={20} fill="#00AFD5" />
              </Button>
            </div>
            <div className={styles.delele_btn_wrap}>
              <Button className={styles.btn_delete} onlyIcon>
                <IcoTrash03 width={20} height={20} stroke="#131C30" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FileUploadContent = () => {
  const { closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>파일 업로드</ModalTitle>
      <ModalBody>
        <div className={PopupStyles.wrap}>
          <div className={PopupStyles.title_wrap}>
            <p className={cn(styles.file_status_view)}>
              <span className={styles.file_completed}>
                {'완료'} <em className={styles.num}>{'4'}</em>
              </span>
              <span className={styles.file_failed}>
                {'실패'} <em className={styles.num}>{'2'}</em>
              </span>
              <span className={styles.file_ing}>
                파일 올리는중 <em className={styles.ing}>1/1</em>
              </span>
              <span>{'파일은 최대1개, 4GB 이하로 업로드 가능합니다.'}</span>
            </p>
          </div>
          {/* 파일 업로드 영역 */}
          <div className={cn(styles.start, styles.wrap)}>
            <div className={cn(styles.file_wrap)}>
              {/* 파일 첨부 하기 전 */}
              <div className={styles.attach_area}>
                <Button className={styles.btn_file}>
                  <IcoFileUpload className={styles.icon_upload} />
                  <strong className={styles.file_title}>
                    {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
                  </strong>
                  <span className={styles.file_guide}>
                    {'PNG, JPG, GIF, PDF / Max file size : 50MB'}
                  </span>
                  <input type="file" className={styles.input_file} />
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
                    <ProgressBar className={styles.progress} progress={100} label={'완료'} />
                  </div>
                  <div className={styles.control_wrap}>
                    <IcoComplete02
                      width={20}
                      height={20}
                      fill="#3EB838"
                      className={styles.complete}
                    />
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
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
                  </div>
                  <div className={styles.control_wrap}>
                    <Badge
                      className={styles.file_status}
                      option={{ label: '', value: '' }}
                      variant="dot"
                      status="ing"
                    />
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
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
                  </div>
                  <div className={styles.control_wrap}>
                    <Badge
                      className={styles.file_status}
                      option={{ label: '', value: '' }}
                      variant="dot"
                      status="error"
                    />
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
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
                  <div className={styles.control_wrap}>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoRefresh width={20} height={20} fill="#00AFD5" />
                    </Button>
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
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
                    <ProgressBar
                      className={styles.progress}
                      progress={40}
                      label={'실패'}
                      isFailed
                    />
                  </div>
                  <div className={styles.control_wrap}>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoRefresh width={20} height={20} fill="#00AFD5" />
                    </Button>
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
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
                    <ProgressBar className={styles.progress} progress={40} label={'진행중'} />
                  </div>
                  <div className={styles.control_wrap}>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoPause width={20} height={20} fill="#A9AFB8" />
                    </Button>
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
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
                    <ProgressBar className={styles.progress} progress={0} label={'대기중'} />
                  </div>
                  <div className={styles.control_wrap}>
                    <Button className={styles.btn_status} onlyIcon>
                      <IcoPause width={20} height={20} fill="#A9AFB8" />
                    </Button>
                  </div>
                  <div className={styles.delele_btn_wrap}>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.guide_text}>
            {
              '업로드한 파일은 DRM/AIP 적용 여부와 관계없이 등록되며, 저장 시 테넌트의 보안 정책에 따라 원본 또는 DRM/AIP 방식으로 보관됩니다. 단, 학습자가 다운로드할 때 DRM/AIP가 적용된 파일은 외부망에서 열람이 제한될 수 있으므로 보안 문서는 DRM/AIP 적용 상태로 업로드하시길 권장합니다'
            }
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};
