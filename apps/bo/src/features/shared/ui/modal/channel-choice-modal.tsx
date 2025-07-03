import {
  Button,
  List,
  ModalBody,
  ModalContainer,
  ModalTitle,
  ModalFooter,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';
import { t } from 'i18next';
import React, { useState } from 'react';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../shared/ui/search-box';
import { cn } from '@learnway/shared';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const ChannelChoicePopupComponent = () => {
  const { close } = useModal();
  const { provider: sProvider } = useSearchBox(searchConfig);
  const [option, setOption] = useState<{ value: string; label: string }>();
  const [options, setOptions] = useState([
    { value: 'type1', label: '경영지원시스템 채널 01' },
    { value: 'type2', label: '경영지원시스템 채널 02' },
    { value: 'type3', label: '경영지원시스템 채널 03' },
    { value: 'type4', label: '경영지원시스템 채널 04' },
    { value: 'type5', label: '경영지원시스템 채널 05' },
    { value: 'type6', label: '경영지원시스템 채널 06' },
    { value: 'type7', label: '경영지원시스템 채널 07' },
    { value: 'type8', label: '경영지원시스템 채널 08' },
    { value: 'type9', label: '경영지원시스템 채널 09' },
    { value: 'type10', label: '경영지원시스템 채널 10' },
    { value: 'type11', label: '경영지원시스템 채널 11' },
    { value: 'type12', label: '경영지원시스템 채널 12' },
    { value: 'type13', label: '경영지원시스템 채널 13' },
    { value: 'type14', label: '경영지원시스템 채널 14' },
    { value: 'type15', label: '경영지원시스템 채널 15' },
    { value: 'type16', label: '경영지원시스템 채널 16' },
    { value: 'type17', label: '경영지원시스템 채널 17' },
    { value: 'type18', label: '경영지원시스템 채널 18' },
    { value: 'type19', label: '경영지원시스템 채널 19' },
    { value: 'type20', label: '경영지원시스템 채널 20' },
    { value: 'type21', label: '경영지원시스템 채널 21' },
  ]);
  /**
   * @param data
   */
  const handleOnSearch = (data: Record<string, any>) => {
    console.log('searchData {} => ', data);
    /* const newOptions = [
      { value: 'type11', label: '경영지원시스템 채널 11' },
      { value: 'type12', label: '경영지원시스템 채널 12' },
      { value: 'type13', label: '경영지원시스템 채널 13' },
      { value: 'type14', label: '경영지원시스템 채널 14' },
      { value: 'type15', label: '경영지원시스템 채널 15' },
      { value: 'type16', label: '경영지원시스템 채널 16' },
      { value: 'type17', label: '경영지원시스템 채널 17' },
      { value: 'type18', label: '경영지원시스템 채널 18' },
      { value: 'type19', label: '경영지원시스템 채널 19' },
      { value: 'type20', label: '경영지원시스템 채널 20' },
      { value: 'type21', label: '경영지원시스템 채널 21' },
    ];
    setOptions((state) => [...state, ...newOptions]);
    */
  };

  const handleOnClose = () => {
    close({
      channelId: '',
      channelName: '',
    });
  };
  const handleOnConfirm = () => {
    if (!option) return;
    close({ channelId: option.value, channelName: option.label });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'등록 채널을 선택하세요.'}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={cn(styles.start, styles.wrap)}>
            <div className={styles.contents}>
              {/* form */}
              {options.length > 20 && <SearchBox provider={sProvider} onSearch={handleOnSearch} />}
              <div className={styles.channel_wrap}>
                <List
                  value={option}
                  options={options}
                  onOptionSelect={(option) => setOption(option)}
                  hideBorder
                />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={handleOnClose} />
        <Button
          type={'button'}
          label={'확인'}
          variant={'primary'}
          size={'lg'}
          onClick={handleOnConfirm}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ChannelChoiceModal = ChannelChoicePopupComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
        ],
      },
      {
        name: 'channel',
        type: 'dropdown',
        label: t('채널'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'channelA', label: t('채널A') },
          { value: 'channelB', label: t('채널B') },
          { value: 'channelC', label: t('채널C') },
          { value: 'channelD', label: t('채널D') },
          { value: 'channelE', label: t('채널E') },
        ],
      },
      {
        name: 'manager',
        type: 'text',
        label: t('담당자'),
        value: '',
      },
    ],
  ],
};
