import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  Dropdown,
  Input,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';

import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export const Route = createFileRoute('/_layout/common/pop-user-search-check')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal, close: closeModal } = useModal();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '전체' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const UserSearchContent = () => {
    return (
      <ModalContainer>
        <ModalTitle>유저 조회</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={cn(searchStyles.start, searchStyles.wrap)}>
              <div className={searchStyles.contents}>
                <div className={searchStyles.item_row}>
                  <div className={searchStyles.item_wrap}>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select1" className={searchStyles.label}>
                          <span className={searchStyles.text}>회사</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-select2" className={searchStyles.label}>
                          <span className={searchStyles.text}>소속</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Dropdown
                            options={options}
                            value={selectedValues}
                            onChange={(selected) => setSelectedValues(selected)}
                            variant="default"
                            size={'sm'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-input1" className={searchStyles.label}>
                          <span className={searchStyles.text}>사번</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-input1" type="text" placeholder="입력" />
                        </div>
                      </div>
                    </div>
                    <div className={searchStyles.inner}>
                      <div className={searchStyles.item}>
                        <label htmlFor="name-input2" className={searchStyles.label}>
                          <span className={searchStyles.text}>이름</span>
                        </label>
                        <div className={searchStyles.box}>
                          <Input id="name-input2" type="text" placeholder="입력" />
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
            <div className="grid_wrap line">TransferGrid 영역(Grid height={440})</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant={'gray'} size={'lg'} onClick={() => closeModal()}>
            <IcoRefresh02 width={16} height={16} className="icon_refresh" />
            {'초기화'}
          </Button>
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
        width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
        content: <UserSearchContent />,
      });
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  return <div>Hello "/_layout/common/pop-user-search-check"!</div>;
}
