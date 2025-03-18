import {
  Button,
  ContentsRow,
  Input,
  List,
  ModalBody,
  ModalContainer,
  ModalFooter,
  Select,
  useModal,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';
import { t } from 'i18next';
import React, { useState } from 'react';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { cn } from '@learnway/shared';
import { SearchBox } from '../../../../shared/ui/search-box';

const ManagerChoicePopupComponent = () => {
  const { close } = useModal();
  const { config: sConfig } = useSearchBox(searchConfig);
  const [option, setOption] = useState<{ value: string; label: string }>();
  const [options, setOptions] = useState([
    { value: 'type1', label: '선택한 채널의 소속 채널 소유자명1 (사번 또는 이메일)' },
    { value: 'type2', label: '선택한 채널의 소속 채널 소유자명2 (사번 또는 이메일)' },
    { value: 'type3', label: '선택한 채널의 소속 채널 소유자명3 (사번 또는 이메일)' },
    { value: 'type4', label: '선택한 채널의 소속 채널 소유자명4 (사번 또는 이메일)' },
    { value: 'type5', label: '선택한 채널의 소속 채널 소유자명5 (사번 또는 이메일)' },
    { value: 'type6', label: '선택한 채널의 소속 채널 소유자명6 (사번 또는 이메일)' },
    { value: 'type7', label: '선택한 채널의 소속 채널 소유자명7 (사번 또는 이메일)' },
    { value: 'type8', label: '선택한 채널의 소속 채널 소유자명8 (사번 또는 이메일)' },
    { value: 'type9', label: '선택한 채널의 소속 채널 소유자명9 (사번 또는 이메일)' },
    { value: 'type10', label: '선택한 채널의 소속 채널 소유자명10 (사번 또는 이메일)' },
  ]);

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    const newOptions = [
      { value: 'type11', label: '선택한 채널의 소속 채널 소유자명11 (사번 또는 이메일)' },
      { value: 'type12', label: '선택한 채널의 소속 채널 소유자명12 (사번 또는 이메일)' },
      { value: 'type13', label: '선택한 채널의 소속 채널 소유자명13 (사번 또는 이메일)' },
      { value: 'type14', label: '선택한 채널의 소속 채널 소유자명14 (사번 또는 이메일)' },
      { value: 'type15', label: '선택한 채널의 소속 채널 소유자명15 (사번 또는 이메일)' },
      { value: 'type16', label: '선택한 채널의 소속 채널 소유자명16 (사번 또는 이메일)' },
      { value: 'type17', label: '선택한 채널의 소속 채널 소유자명17 (사번 또는 이메일)' },
      { value: 'type18', label: '선택한 채널의 소속 채널 소유자명18 (사번 또는 이메일)' },
      { value: 'type19', label: '선택한 채널의 소속 채널 소유자명19 (사번 또는 이메일)' },
      { value: 'type20', label: '선택한 채널의 소속 채널 소유자명20 (사번 또는 이메일)' },
      { value: 'type21', label: '선택한 채널의 소속 채널 소유자명21 (사번 또는 이메일)' },
    ];
    setOptions((state) => [...state, ...newOptions]);
  };

  const handleOnClose = () => {
    close({
      managerId: '',
      managerName: '',
    });
  };
  const handleOnConfirm = () => {
    if (!option) return;
    console.log(option);
    close({ managerId: option.value, managerName: option.label });
  };

  return (
    <div className={styles.contents}>
      <ModalContainer>
        <ModalBody>
          <strong className={styles.title}>{'담당자를 선택하세요.'}</strong>
          <div className={cn(styles.start, styles.wrap)}>
            <div className={styles.contents}>
              {/* form */}
              {options.length > 20 && (
                <ContentsRow>
                  <SearchBox config={sConfig} onSearch={handleOnSearch} />
                </ContentsRow>
              )}
              <div className={styles.channel_wrap}>
                <List options={options} onOptionsSelect={(options) => setOption(options[0])} />
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
    </div>
  );
};

export const ManagerChoiceModal = ManagerChoicePopupComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
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
};
