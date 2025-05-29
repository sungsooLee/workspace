import { FC } from 'react';
import { t } from 'i18next';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  GridBox,
  useGridBox,
} from '@learnway/ui';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const LearningResourceProductionGuideModalComponent: FC<any> = () => {
  const { open: openModal, close: closeModal, confirm: openConfirm } = useModal();
  const { config } = useGridBox(gridConfig);
  return (
    <ModalContainer>
      <ModalTitle>{t('프로그램/가이드 다운로드')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.container}>
            <GridBox
              config={config}
              showColumnSettings={false}
              showTotalCount={true}
              hideRowSelectionCheckBox={false}
              title={t('공유현황')}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={t('적용')} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearningResourceProductionGuideModal = LearningResourceProductionGuideModalComponent;

const handleDownload = (fileName: string, fileUrl: string) => {
  const link = document.createElement('a');

  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const gridConfig = {
  query: '',
  data: [
    {
      fileName: t('테스트 문서 1'),
      downloadButton: (
        <Button
          className="link"
          onClick={() =>
            handleDownload(
              'test.epub',
              'https://mond-al.github.io/assets/images/forTest/ratio/all_ratio.zip',
            )
          }
        >
          {t('다운로드')}
        </Button>
      ),
    },
    {
      fileName: t('* 다운로드 자료 전달 받아야 함 *'),
      downloadButton: <Button className="link">{t('다운로드')}</Button>,
    },
  ],
  columns: [
    { name: 'fileName', sortBy: true, label: t('파일명') },
    { name: 'downloadButton', sortBy: true, label: t('다운로드') },
  ],
};
