import {
  Button,
  ContentsRow,
  Grid,
  Input,
  List,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Select,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';
import { t } from 'i18next';
import React, { useState } from 'react';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '../../../../shared/ui/search-box';
import { cn } from '@learnway/shared';
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
  ]);
  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    const newOptions = [
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
      <ModalBody>
        <div className={styles.contents}>
          <strong className={styles.title}>{'등록 채널을 선택하세요.'}</strong>
          <div className={cn(styles.start, styles.wrap)}>
            <div className={styles.contents}>
              {/* form */}
              {options.length > 20 && (
                <ContentsRow>
                  <SearchBox provider={sProvider} onSearch={handleOnSearch} />
                </ContentsRow>
              )}
              <div className={styles.channel_wrap}>
                <List options={options} onOptionsSelect={(options) => setOption(options[0])} />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          label={'취소'}
          variant={'gray'}
          size={'lg'}
          actionKey={'cancel'}
          onClick={handleOnClose}
        />
        <Button
          type={'button'}
          label={'확인'}
          variant={'primary'}
          size={'lg'}
          actionKey={'confirm'}
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
        name: 'keyType',
        type: 'dropdown',
        label: t('다국어 분류'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('공통코드') },
          { value: 'LABEL', label: t('라벨') },
          { value: 'CATEGORY', label: t('카테고리') },
          { value: 'ERROR', label: t('에러') },
          { value: 'MESSAGE', label: t('메세지') },
        ],
      },
      {
        name: 'translationCode',
        type: 'text',
        label: t('다국어 코드'),
      },
      {
        name: 'useYn',
        type: 'dropdown',
        label: '사용여부',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'Y', label: '사용' },
          { value: 'N', label: '미사용' },
        ],
      },
    ],
  ],
};
