import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Checkbox, Progress } from '@learnway/ui';
import { IcoPaperClip, IcoUploadCloud, IcoPpt, IcoTrash03, IcoCloseCircle } from '@learnway/icons';

import styles from './file-upload.module.css';
export const Route = createFileRoute('/_guide/guide/file-upload')({
  component: RouteComponent,
});

function RouteComponent() {
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
              <Progress className={styles.progress} value={40} />
            </div>

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
    </div>
  );
}
