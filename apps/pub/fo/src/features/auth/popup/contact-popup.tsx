import {
  IcoAlertCircle,
  IcoCaution,
  IcoComplete02,
  IcoFileUpload,
  IcoFormRequired,
  IcoLock,
  IcoPaperClip,
  IcoPause,
  IcoPdf,
  IcoRefresh,
  IcoTrash03,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import uploadStyles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css'; // 폼모듈
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css'; // 유의사항
import { Badge } from '@learnway/ui/badge';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Dropdown } from '@learnway/ui/dropdown';
import { Input } from '@learnway/ui/input';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ProgressBar } from '@learnway/ui/progress';
import { Textarea } from '@learnway/ui/textarea';
import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import styles from './contact-popup.module.css';

const ContactPopupCompoment = () => {
  const { closeModal } = useModal();
  return (
    <form className="form_row">
      <ModalContainer>
        <ModalTitle>{'고객지원'}</ModalTitle>
        <ModalBody>
          <div className={`${styles.start} ${styles.contact_popup}`}>
            <div className={cn(styles.auth_form, 'no_line', 'col')}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>문의유형</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Dropdown
                      size="lg"
                      options={[{ value: 'type1', label: '선택' }]}
                      className={formStyles.select_option}
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>이름</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name" type="text" placeholder="이름(김현대)" value="" />
                  </div>
                </div>
              </ContentsRow>
              {/* 이메일 인증일때 */}
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name-1-6" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>이메일</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input id="name-1-6" type="text" placeholder="생년월일(19991229)" />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>제목</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Input
                      id="name"
                      type="text"
                      placeholder="제목을 입력하세요.(최대 50자)"
                      value=""
                    />
                  </div>
                </div>
              </ContentsRow>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="name" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>내용</span>
                    {/* 필수 케이스 */}
                    <span className={cn(formStyles.status, formStyles.required)}>
                      <IcoFormRequired width={12} height={12} />
                    </span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Textarea
                      id="name-1-4"
                      rows={5}
                      cols={33}
                      resize="none"
                      placeholder="한글,영문,숫자 포함 2500자 이하"
                      maxLength={2500}
                      className={formStyles.textarea}
                    />
                  </div>
                </div>
              </ContentsRow>
            </div>

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

            {/* 유의사항 모듈 */}
            <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
              <dl className={noticeBoxStyles.check_point}>
                <dt>
                  <IcoCaution />
                  유의사항
                </dt>
                <dd>
                  문의하신 내용에 대한 답변이 등록될 경우 입력하신 이메일로 답변이 전송됩니다.
                </dd>
                <dd>
                  연락 받으실 이메일 정보가 잘못 입력하실 경우 문의내용에 대한 안내를 받으실 수
                  없으니 정확안 정보를 입력해 주세요.
                </dd>
                <dd>상문담의가 급증 시 답변처리가 다소 지연될 수 있으니 이 점 양해부탁드립니다.</dd>
              </dl>
            </div>
            {/* 유의사항 모듈 */}
          </div>
        </ModalBody>

        <ModalFooter>
          {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
              <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
            </MobileContainerFooter>
          </MobileView>
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ContactPopup = memo(ContactPopupCompoment);
