import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import popSearchStyles from '@learnway/styles/bo/assets/styles/modules/popup-search.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useState } from 'react';
import {
  Button,
  Dropdown,
  Input,
  List,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { cn } from '@learnway/shared';

function SelectCoordinatorModalComponent() {
  const { close: closeModal } = useModal();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  return (
    <ModalContainer>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <div className={popupStyles.title_wrap}>
            <h2 className={popupStyles.title}>{'담당자를 선택하세요.'}</h2>
          </div>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <div className={searchStyles.contents}>
              <div className={searchStyles.item_row}>
                <div className={searchStyles.item_wrap}>
                  <div className={searchStyles.inner}>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-channelName" className={searchStyles.label}>
                        <span className={searchStyles.text}>채널</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Dropdown
                          options={[
                            { value: 'type1', label: '전체' },
                            { value: 'type2', label: '항목' },
                            { value: 'type3', label: '항목3' },
                          ]}
                          value={selectedValues}
                          onChange={(selected) => setSelectedValues(selected)}
                          variant="default"
                          size={'sm'}
                        />
                      </div>
                    </div>
                    <div className={searchStyles.item}>
                      <label htmlFor="name-managerName" className={searchStyles.label}>
                        <span className={searchStyles.text}>담당자명</span>
                      </label>
                      <div className={searchStyles.box}>
                        <Input
                          id="name-managerName"
                          type="text"
                          placeholder="담당자명으로 조회하세요."
                          value=""
                          className={searchStyles.input}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={searchStyles.btn_box}>
                <Button
                  type="button"
                  className={searchStyles.btn_refresh}
                  variant="search"
                  size="sm"
                  onlyIcon
                >
                  <IcoRefresh02 className={searchStyles.icon_refresh} />
                </Button>
                <Button
                  type="button"
                  variant="search"
                  size="sm"
                  className={searchStyles.btn_search}
                >
                  <IcoSearch className={searchStyles.icon_sm_search} />
                  조회
                </Button>
              </div>
            </div>
          </div>
          {/* 채널 리스트 */}
          <div className={popSearchStyles.channel_wrap}>
            <List
              options={[
                { value: 'type1', label: '선택한 채널의 소속 채널 소유자명 (사번 또는 이메일)' },
                { value: 'type2', label: '선택한 채널의 소속 채널 소유자명2 (사번 또는 이메일)' },
                { value: 'type3', label: '선택한 채널의 소속 채널 소유자명3 (사번 또는 이메일)' },
                { value: 'type4', label: '선택한 채널의 소속 채널 소유자명4 (사번 또는 이메일)' },
                { value: 'type5', label: '선택한 채널의 소속 채널 소유자명5 (사번 또는 이메일)' },
                { value: 'type6', label: '선택한 채널의 소속 채널 소유자명6 (사번 또는 이메일)' },
                { value: 'type7', label: '선택한 채널의 소속 채널 소유자명7 (사번 또는 이메일)' },
                { value: 'type8', label: '선택한 채널의 소속 채널 소유자명8 (사번 또는 이메일)' },
                { value: 'type9', label: '선택한 채널의 소속 채널 소유자명9 (사번 또는 이메일)' },
                {
                  value: 'type10',
                  label: '선택한 채널의 소속 채널 소유자명10 (사번 또는 이메일)',
                },
              ]}
              onOptionsSelect={(options) => console.log(options)}
              hideBorder
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
}

export const SelectCoordinatorModal = SelectCoordinatorModalComponent;
