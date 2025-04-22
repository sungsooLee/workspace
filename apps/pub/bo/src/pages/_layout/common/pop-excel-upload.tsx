/* eslint-disable @nx/enforce-module-boundaries */
import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  Progress,
  Badge,
} from '@learnway/ui';
import {
  IcoFileExcel,
  IcoDownload,
  IcoComplete02,
  IcoTrash03,
  IcoPause,
  IcoRefresh,
} from '@learnway/icons';

/* styles */
import styles from '@learnway/styles/bo/assets/styles/modules/file-upload.module.css'; // 파일 업로드
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { NoticeBox } from '../../../../../../bo/src/shared/ui/';

export const Route = createFileRoute('/_layout/common/pop-excel-upload')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const ExcelUploadContents = () => {
    return (
      <ModalContainer>
        <ModalTitle>엑셀 업로드</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(styles.start, styles.wrap)}>
              <div className={cn(styles.file_wrap)}>
                {/* 파일 첨부 하기 전 */}
                {/* <div className={styles.attach_area}>
                  <Button className={styles.btn_file}>
                    <IcoUploadCloud width={'40'} height={'40'} stroke={'#131C30'} />
                    <strong className={styles.file_title}>
                      {'영역을 클릭하거나 파일을 마우스로 끌어놓으세요'}
                    </strong>
                    <span className={styles.file_guide}>{'XLSX, CSV / Max file size : 50MB'}</span>
                    <input type="file" className={styles.input_file} />
                  </Button>
                </div> */}
                {/* 파일 업로드 */}
                <div className={styles.upload_status}>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
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
                    <div className={styles.control_wrap}>
                      <IcoComplete02
                        width={20}
                        height={20}
                        fill="#3EB838"
                        className={styles.complete}
                      />
                    </div>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
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
                      <Progress className={styles.progress} value={0} label={'대기중'} />
                    </div>
                    <div className={styles.control_wrap}>
                      <Button className={styles.btn_status} onlyIcon>
                        <IcoPause width={20} height={20} fill="#A9AFB8" />
                      </Button>
                    </div>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
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
                      <Progress className={styles.progress} value={40} label={'진행중'} />
                    </div>
                    <div className={styles.control_wrap}>
                      <Button className={styles.btn_status} onlyIcon>
                        <IcoPause width={20} height={20} fill="#A9AFB8" />
                      </Button>
                    </div>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
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
                      <Progress className={styles.progress} value={40} label={'실패'} isFailed />
                    </div>
                    <div className={styles.control_wrap}>
                      <Button className={styles.btn_status} onlyIcon>
                        <IcoRefresh width={20} height={20} fill="#00AFD5" />
                      </Button>
                    </div>
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
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
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                  {/* file_item */}
                  <div className={styles.file_item}>
                    <div className={styles.file_name}>
                      <IcoFileExcel width={'24'} height={'25'} className={styles.icon_type} />
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
                    <Button className={styles.btn_delete} onlyIcon>
                      <IcoTrash03 width={20} height={20} stroke="#131C30" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className={styles.title_box}>
                <h3 className={styles.sub_title}>{'업로드 결과'}</h3>
                {/* 실패 CASE */}
                <p className={styles.status_text}>
                  실패<span className={cn(styles.data_text, styles.error)}>100행</span>
                </p>
                {/* 완료 CASE */}
                <p className={styles.status_text}>
                  완료<span className={cn(styles.data_text)}>100행</span>
                </p>
              </div>
              <div className={styles.result_wrap}>
                <p className={styles.status_text}>{'상단 영역에 데이터를 업로드하세요.'}</p>
                <p className={styles.status_text}>{`${'{12행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{20행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{30행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
                <p className={styles.status_text}>{`${'{40행}'} 데이터를 확인해 주세요.`}</p>
              </div>
              <NoticeBox
                iconVisible={false}
                descriptions={[
                  '양식과 다르게 작성된 파일은 업로드를 할 수 없습니다.',
                  '업로드가 되지 않을 경우, 결과를 확인 후 다시 작성하여 업로드해 주세요.',
                ]}
              />
              <div className={styles.btn_wrap}>
                <Button
                  label={'엑셀 양식 다운로드'}
                  variant={'text'}
                  size={'sm'}
                  icon={<IcoDownload width={'16'} height={16} stroke={'#4C515E'} />}
                />
                <Button
                  label={'CSV 양식 다운로드'}
                  variant={'text'}
                  size={'sm'}
                  icon={<IcoDownload width={'16'} height={16} stroke={'#4C515E'} />}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  // 한번만 실행
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      openModal({
        width: 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <ExcelUploadContents />,
      });
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  return <div>공통 엑셀업로드 팝업</div>;
}
