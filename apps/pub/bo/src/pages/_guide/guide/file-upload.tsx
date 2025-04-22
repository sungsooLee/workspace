import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  Button,
  Checkbox,
  Progress,
  Badge,
  useModal,
  ModalContainer,
  ModalBody,
  ModalFooter,
} from '@learnway/ui';
import {
  IcoPaperClip,
  IcoUploadCloud,
  IcoPpt,
  IcoTrash03,
  IcoCloseCircle,
  IcoFormRequired,
  IcoRefresh,
  IcoComplete02,
  IcoPause,
} from '@learnway/icons';

import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import statusStyles from './status.module.css';
import boxStyles from './box-data.module.css';
import PopupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css'; // 팝업 styles
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
export const Route = createFileRoute('/_guide/guide/file-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const FileUploadContent = () => {
    return (
      <ModalContainer>
        <ModalBody>
          <div className={PopupStyles.wrap}>
            <div className={PopupStyles.title_wrap}>
              <p className={cn(statusStyles.start, statusStyles.file_status_view)}>
                <span className={statusStyles.file_completed}>
                  {'완료'} <em className={styles.num}>{'4'}</em>
                </span>
                <span className={statusStyles.file_failed}>
                  {'실패'} <em className={styles.num}>{'2'}</em>
                </span>
              </p>
            </div>
            <div className={cn(boxStyles.start)}>
              <p className={boxStyles.text}>{'선택한 관리채널명채널명채널명'}</p>
            </div>
            {/* 파일 업로드 영역 */}
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
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <FileUploadContent />,
      });
      hasRun.current = true;
    }
  }, []);
  return (
    <div className={cn(styles.start, styles.wrap)}>
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
              {'개'}
            </span>
            <span className={styles.file_volume}>
              <em className={styles.volume}>0</em>
              {'KB'}
            </span>
          </span>
        </div>
        <div className={styles.btn_area}>
          <span className={styles.info_text}>{'최대 파일 사이즈 50MB'}</span>
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
            <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
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
                <em className={styles.now_status}>100</em> /
                <em className={styles.file_size}>100MB</em>
              </span>
              <Progress className={styles.progress} value={100} label={'완료'} />
            </div>
            <IcoComplete02 width={20} height={20} fill="#3EB838" className={styles.complete} />
            <Button className={styles.btn_delete} onlyIcon>
              <IcoTrash03 width={20} height={20} stroke="#131C30" />
            </Button>
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
                <em className={styles.now_status}>100</em> /
                <em className={styles.file_size}>100MB</em>
              </span>
              <Progress className={styles.progress} value={40} />
            </div>
            <Badge
              className={styles.file_status}
              option={{ label: '', value: '' }}
              variant="dot"
              status="ing"
            />
            <Button className={styles.btn_delete} onlyIcon>
              <IcoTrash03 width={20} height={20} stroke="#131C30" />
            </Button>
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
                <em className={styles.now_status}>100</em> /
                <em className={styles.file_size}>100MB</em>
              </span>
              <Progress className={styles.progress} value={40} label={'실패'} isFailed />
            </div>
            <Badge
              className={styles.file_status}
              option={{ label: '', value: '' }}
              variant="dot"
              status="error"
            />
            <Button className={styles.btn_status} onlyIcon>
              <IcoRefresh width={20} height={20} fill="#00AFD5" />
            </Button>
            <Button className={styles.btn_delete} onlyIcon>
              <IcoTrash03 width={20} height={20} stroke="#131C30" />
            </Button>
          </div>
        </div>
        {/* 파일 업로드 다른 타입 */}
        <div className={styles.upload_status_type2}>
          {/* file_box */}
          <div className={styles.file_box}>
            <div className={styles.file_inner}>
              <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
            </div>
            <Button className={styles.btn_cancel} onlyIcon>
              <IcoCloseCircle width={24} height={24} fill="#6F798B" stroke="#ffffff" />
            </Button>
            <p className={styles.file_name}>{'file.pdf'}</p>
          </div>
          {/* file_box */}
          <div className={styles.file_box}>
            <div className={styles.file_inner}>
              <IcoPpt width={'24'} height={'25'} className={styles.icon_type} />
            </div>
            <Button className={styles.btn_cancel} onlyIcon>
              <IcoCloseCircle width={24} height={24} fill="#6F798B" stroke="#ffffff" />
            </Button>
            <p className={styles.file_name}>{'file.pdf'}</p>
          </div>
        </div>
      </div>
      {/* 단일로 사용하는 경우 : 첨부 전 케이스 */}
      <div className={styles.upload_single}>
        <div className={styles.view_file}>
          <div className={styles.attach_area}>
            <p className={styles.text}>버튼을 클릭하여 파일을 추가하세요.</p>
          </div>
        </div>
        <Button className={styles.btn_attach} size={'sm'} variant={'gray'}>
          <input type="file" className={styles.input_file} />
          {'파일첨부'}
        </Button>
      </div>
      {/* 단일로 사용하는 경우 : 첨부 후 케이스 */}
      <div className={styles.upload_single}>
        <div className={styles.view_file}>
          <div className={styles.attach_area}>
            <p className={styles.attach_view}>
              <IcoPpt width={'20'} height={'21'} className={styles.icon_type} />
              <span className={styles.attached_name}>{'파일명.png'}</span>
            </p>
            <Button className={styles.btn_clear} onlyIcon>
              <IcoTrash03 width={20} height={20} stroke="#131C30" />
            </Button>
          </div>
        </div>
        <Button className={styles.btn_attach} size={'sm'} variant={'gray'}>
          <input type="file" className={styles.input_file} />
          {'파일첨부'}
        </Button>
      </div>
      {/* form_item에서 사용하는 경우 */}
      {/* form_item */}
      <div className={formStyles.form_item}>
        <label htmlFor="name-channel" className={formStyles.form_label}>
          <span className={formStyles.form_text}>채널</span>
          {/* 필수 케이스 */}
          <span className={cn(formStyles.status, formStyles.required)}>
            <IcoFormRequired width={12} height={12} />
          </span>
        </label>
        <div className={formStyles.input_box}>
          <div className={styles.upload_single}>
            <div className={styles.view_file}>
              <div className={styles.attach_area}>
                <p className={styles.text}>버튼을 클릭하여 파일을 추가하세요.</p>
              </div>
            </div>
            <Button className={styles.btn_attach} size={'sm'} variant={'gray'}>
              <input type="file" className={styles.input_file} />
              {'파일첨부'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
