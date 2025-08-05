import { cn } from '@learnway/shared';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { GridBox } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { SharedBoxContent } from '@types';
import { t } from 'i18next';

interface Props {
  data: SharedBoxContent;
}

const LearingResourceSharedInfoModalComponent = ({ data }: Props) => {
  const { closeModal } = useModal();

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('destTenantName', {
      cell: (info) => info.getValue(),
      header: t('수신 테넌트'),
      size: 185,
      enableGrouping: false,
    }),
    columnHelper.accessor('destChannelName', {
      cell: (info) => info.getValue(),
      header: t('수신 채널'),
      size: 185,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: t('수신자'),
      size: 185,
      enableGrouping: false,
    }),
    columnHelper.accessor('date', {
      cell: (info) => info.getValue(),
      header: t('수신일'),
      size: 185,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, string>[];

  return (
    <ModalContainer width="md">
      <ModalTitle>{t('수신 정보')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <FormSubTitle label={t('공유 발송 정보')} noLine />
          <div className={cn(tableStyles.start, tableStyles.wrap)}>
            <table>
              <caption>{t('공유 발송 정보')}</caption>
              <colgroup>
                <col style={{ width: '160px' }} />
                <col />
                <col style={{ width: '160px' }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">{t('테넌트')}</th>
                  <td>{data?.sourceTenantName}</td>
                  <th scope="row">{t('채널')}</th>
                  <td>{data?.sourceChannelName}</td>
                </tr>
                <tr>
                  <th scope="row">{t('학습자원명')}</th>
                  <td>{data?.sourceContentName}</td>
                  <th scope="row">{t('언어')}</th>
                  <td>{t(`pms.multilingual.LangCountryCode.${data?.languageCountryCode}`)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <GridBox title={t('수신현황')} disabledSelectionToggle columns={columns} data={[]} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          label={t('확인')}
          variant="primary"
          size="lg"
          onClick={() => closeModal()}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const LearingResourceSharedInfoModal = LearingResourceSharedInfoModalComponent;
