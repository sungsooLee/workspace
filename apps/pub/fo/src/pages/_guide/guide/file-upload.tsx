import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import {
  IcoAlertCircle,
  IcoComplete02,
  IcoFileUpload,
  IcoLock,
  IcoPaperClip,
  IcoPause,
  IcoPdf,
  IcoRefresh,
  IcoTrash03,
} from '@learnway/icons';
import { cn } from '@learnway/shared';

import uploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
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
    <>
      <h2 className="guide_tit2">file-upload Page Component</h2>
      <p className="loc css">@learnway/styles/bo/assets/styles/modules/file-upload.module.css</p>
      <div className="info">
        BO와 동일(이미 개발 완료) 컬러나 아이콘, DRM 케이스만 다름 : 모바일 반응형 작업 완료
      </div>
      <div className="group">
        <h3 className="guide_tit3">파일 업로드 미리보기</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <div className={cn(uploadStyles.start, uploadStyles.wrap, 'attach_wrap')}>
              {/* info_wrap : 상단 타이틀 버튼 영역 */}
              <div className={uploadStyles.info_wrap}>
                <div className={uploadStyles.title_area}>
                  <strong className={uploadStyles.title}>{'파일 올리기'}</strong>
                  <span className={uploadStyles.file_info}>
                    <IcoPaperClip
                      width={'16'}
                      height={'17'}
                      stroke={'#131C30'}
                      className={uploadStyles.icon_clip}
                    />
                    <span className={uploadStyles.file_length}>
                      <strong className={uploadStyles.num}>0</strong>
                      <span className={uploadStyles.slash}>/</span>
                      <span className={uploadStyles.length}>10</span>
                      {'개'}
                    </span>
                    <span className={uploadStyles.file_volume}>
                      <em className={uploadStyles.volume}>0</em>
                      {'KB'}
                    </span>
                  </span>
                </div>
                <div className={uploadStyles.btn_area}>
                  <p className={uploadStyles.file_text}>
                    <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                    <span
                      className={uploadStyles.info_text}
                    >{`최대 ${'00'}개, 최대 파일 사이즈 ${'50'}MB`}</span>
                  </p>
                  <Button variant={'line'} size={'sm'} className={uploadStyles.btn_add}>
                    {'추가'}
                  </Button>
                  <Button variant={'line'} size={'sm'} className={uploadStyles.btn_add}>
                    {'저장'}
                  </Button>
                  <Button variant={'line'} size={'sm'} disabled className={uploadStyles.btn_delete}>
                    {'삭제'}
                  </Button>
                </div>
              </div>
              {/* file_wrap : 라운드 박스 영역 */}
              <div className={cn(uploadStyles.file_wrap)}>
                {/* 파일 첨부 하기 전 */}
                <div className={uploadStyles.attach_area}>
                  <Button className={uploadStyles.btn_file}>
                    <IcoFileUpload className={uploadStyles.icon_upload} />
                    <strong className={uploadStyles.file_title}>
                      {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
                    </strong>
                    <span className={uploadStyles.file_guide}>
                      {'PNG, JPG, GIF, PDF / Max file size : 50MB'}
                    </span>
                    <input type="file" className={uploadStyles.input_file} />
                  </Button>
                </div>
                {/* 파일 업로드 */}
                <div className={uploadStyles.upload_status}>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>
                        {
                          'dsdbnshbdhsdbshbdhsbdhsbdhsbdhsbdshjdbsjhdbshdbshjdbajhbdhjasbjhdbsajhbshjbshdbhdbhsdbhjdbshdbhsbdhsbdhsbdhsdbshdbshdbshdbshdbshdbsdhbhdbdbshdbhsdbhsbdhbshdbshdbshhbdshbdshdbshdbshb.pdf'
                        }
                      </em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <ProgressBar
                        className={uploadStyles.progress}
                        progress={100}
                        label={'완료'}
                      />
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <IcoComplete02
                        width={20}
                        height={20}
                        fill="#3EB838"
                        className={uploadStyles.complete}
                      />
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>{'file.pdf'}</em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <p className={uploadStyles.file_status_text}>{'유효성 검토 중'}</p>
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <Badge
                        className={uploadStyles.file_status}
                        option={{ label: '', value: '' }}
                        variant="dot"
                        status="ing"
                      />
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>{'file.pdf'}</em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <p className={uploadStyles.file_status_text}>{'업로드 불가'}</p>
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <Badge
                        className={uploadStyles.file_status}
                        option={{ label: '', value: '' }}
                        variant="dot"
                        status="error"
                      />
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>{'file.pdf'}</em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <p className={uploadStyles.file_status_text}>{'업로드 취소'}</p>
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <Button className={uploadStyles.btn_status} onlyIcon>
                        <IcoRefresh
                          width={20}
                          height={20}
                          fill="#00AFD5"
                          className={uploadStyles.icon_refresh}
                        />
                      </Button>
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>{'file.pdf'}</em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <ProgressBar
                        className={uploadStyles.progress}
                        progress={40}
                        label={'실패'}
                        isFailed
                      />
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <Button className={uploadStyles.btn_status} onlyIcon>
                        <IcoRefresh
                          width={20}
                          height={20}
                          fill="#00AFD5"
                          className={uploadStyles.icon_refresh}
                        />
                      </Button>
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>{'file.pdf'}</em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <ProgressBar
                        className={uploadStyles.progress}
                        progress={40}
                        label={'진행중'}
                      />
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <Button className={uploadStyles.btn_status} onlyIcon>
                        <IcoPause
                          width={20}
                          height={20}
                          fill="#A9AFB8"
                          className={uploadStyles.icon_pause}
                        />
                      </Button>
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                  {/* file_item */}
                  <div className={uploadStyles.file_item}>
                    <Checkbox className={uploadStyles.check} />
                    <div className={uploadStyles.file_name}>
                      <IcoPdf className={uploadStyles.ico_pdf} />
                      <em className={uploadStyles.name}>{'file.pdf'}</em>
                      <IcoLock className={uploadStyles.ico_lock} />
                    </div>
                    <p className={uploadStyles.status_view}>
                      <em className={uploadStyles.file_size}>100MB</em>
                    </p>
                    <div className={uploadStyles.progress_area}>
                      <ProgressBar
                        className={uploadStyles.progress}
                        progress={0}
                        label={'대기중'}
                      />
                    </div>
                    <div className={uploadStyles.control_wrap}>
                      <Button className={uploadStyles.btn_status} onlyIcon>
                        <IcoPause
                          width={20}
                          height={20}
                          fill="#A9AFB8"
                          className={uploadStyles.icon_pause}
                        />
                      </Button>
                    </div>
                    <div className={uploadStyles.delele_btn_wrap}>
                      <Button className={uploadStyles.btn_delete} onlyIcon>
                        <IcoTrash03 width={20} height={20} stroke="#131C30" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const FileUploadContent = () => {
  const { closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>파일 업로드</ModalTitle>
      <ModalBody>
        <div className={PopupStyles.wrap}>
          {/* 파일 업로드 영역 */}
          <div className={cn(uploadStyles.start, uploadStyles.wrap)}>
            <div className={uploadStyles.info_wrap}>
              <div className={uploadStyles.title_area}>
                <strong className={uploadStyles.title}>{'파일 올리기'}</strong>
                <span className={uploadStyles.file_info}>
                  <IcoPaperClip
                    width={'16'}
                    height={'17'}
                    stroke={'#131C30'}
                    className={uploadStyles.icon_clip}
                  />
                  <span className={uploadStyles.file_length}>
                    <strong className={uploadStyles.num}>0</strong>
                    <span className={uploadStyles.slash}>/</span>
                    <span className={uploadStyles.length}>10</span>
                    {'개'}
                  </span>
                  <span className={uploadStyles.file_volume}>
                    <em className={uploadStyles.volume}>0</em>
                    {'KB'}
                  </span>
                </span>
              </div>
              <div className={uploadStyles.btn_area}>
                <p className={uploadStyles.file_text}>
                  <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
                  <span
                    className={uploadStyles.info_text}
                  >{`최대 ${'00'}개, 최대 파일 사이즈 ${'50'}MB`}</span>
                </p>
                <Button variant={'line'} size={'sm'} className={uploadStyles.btn_add}>
                  {'추가'}
                </Button>
                <Button variant={'line'} size={'sm'} className={uploadStyles.btn_add}>
                  {'저장'}
                </Button>
                <Button variant={'line'} size={'sm'} disabled className={uploadStyles.btn_delete}>
                  {'삭제'}
                </Button>
              </div>
            </div>
            <div className={cn(uploadStyles.file_wrap)}>
              {/* 파일 첨부 하기 전 */}
              <div className={uploadStyles.attach_area}>
                <Button className={uploadStyles.btn_file}>
                  <IcoFileUpload className={uploadStyles.icon_upload} />
                  <strong className={uploadStyles.file_title}>
                    {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
                  </strong>
                  <span className={uploadStyles.file_guide}>
                    {'PNG, JPG, GIF, PDF / Max file size : 50MB'}
                  </span>
                  <input type="file" className={uploadStyles.input_file} />
                </Button>
              </div>
              {/* 파일 업로드 */}
              <div className={uploadStyles.upload_status}>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>
                      {
                        'dsdbnshbdhsdbshbdhsbdhsbdhsbdhsbdshjdbsjhdbshdbshjdbajhbdhjasbjhdbsajhbshjbshdbhdbhsdbhjdbshdbhsbdhsbdhsbdhsdbshdbshdbshdbshdbshdbsdhbhdbdbshdbhsdbhsbdhbshdbshdbshhbdshbdshdbshdbshb.pdf'
                      }
                    </em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <ProgressBar className={uploadStyles.progress} progress={100} label={'완료'} />
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <IcoComplete02
                      width={20}
                      height={20}
                      fill="#3EB838"
                      className={uploadStyles.complete}
                    />
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>{'file.pdf'}</em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <p className={uploadStyles.file_status_text}>{'유효성 검토 중'}</p>
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <Badge
                      className={uploadStyles.file_status}
                      option={{ label: '', value: '' }}
                      variant="dot"
                      status="ing"
                    />
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>{'file.pdf'}</em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <p className={uploadStyles.file_status_text}>{'업로드 불가'}</p>
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <Badge
                      className={uploadStyles.file_status}
                      option={{ label: '', value: '' }}
                      variant="dot"
                      status="error"
                    />
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>{'file.pdf'}</em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <p className={uploadStyles.file_status_text}>{'업로드 취소'}</p>
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <Button className={uploadStyles.btn_status} onlyIcon>
                      <IcoRefresh width={20} height={20} fill="#00AFD5" />
                    </Button>
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>{'file.pdf'}</em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <ProgressBar
                      className={uploadStyles.progress}
                      progress={40}
                      label={'실패'}
                      isFailed
                    />
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <Button className={uploadStyles.btn_status} onlyIcon>
                      <IcoRefresh width={20} height={20} fill="#00AFD5" />
                    </Button>
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>{'file.pdf'}</em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <ProgressBar className={uploadStyles.progress} progress={40} label={'진행중'} />
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <Button className={uploadStyles.btn_status} onlyIcon>
                      <IcoPause width={20} height={20} fill="#A9AFB8" />
                    </Button>
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
                {/* file_item */}
                <div className={uploadStyles.file_item}>
                  <Checkbox className={uploadStyles.check} />
                  <div className={uploadStyles.file_name}>
                    <IcoPdf className={uploadStyles.ico_pdf} />
                    <em className={uploadStyles.name}>{'file.pdf'}</em>
                    <IcoLock className={uploadStyles.ico_lock} />
                  </div>
                  <p className={uploadStyles.status_view}>
                    <em className={uploadStyles.file_size}>100MB</em>
                  </p>
                  <div className={uploadStyles.progress_area}>
                    <ProgressBar className={uploadStyles.progress} progress={0} label={'대기중'} />
                  </div>
                  <div className={uploadStyles.control_wrap}>
                    <Button className={uploadStyles.btn_status} onlyIcon>
                      <IcoPause width={20} height={20} fill="#A9AFB8" />
                    </Button>
                  </div>
                  <div className={uploadStyles.delele_btn_wrap}>
                    <Button className={uploadStyles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className={uploadStyles.guide_text}>
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
