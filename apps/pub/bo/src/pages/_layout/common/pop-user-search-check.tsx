import { useEffect, useState } from 'react';
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
  ShuttleGridToGrid,
  Divider,
} from '@learnway/ui';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

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
    const gridData = Array(5)
      .fill(null)
      .map((d, i) => ({
        Company: `Company${i}`,
        Affiliation: `Affiliation${i}`,
        CompanyNum: `CompanyNum${i}`,
        Name: `Name${i}`,
        Selection: `Selection${i}`,
      }));
    const columnHelper = createColumnHelper();
    const columns = [
      columnHelper.accessor('Company', {
        header: '회사',
        size: 130,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('Affiliation', {
        header: '소속',
        size: 130,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('CompanyNum', {
        header: '사번',
        size: 130,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('Name', {
        header: '이름',
        size: 130,
        cell: (info) => info.getValue(),
      }),
    ] as ColumnDef<any, unknown>[];
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
            <Divider />
            <ShuttleGridToGrid
              gridData={gridData}
              columns={columns}
              leftTitle={'유저 목록'}
              rightTitle={'유저 선택'}
              rowKey={'test'}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            icon={<IcoRefresh02 width={16} height={16} className="icon_refresh" />}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
            label={'초기화'}
          />
          <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </ModalFooter>
      </ModalContainer>
    );
  };
  useEffect(() => {
    openModal({
      width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
      content: <UserSearchContent />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  return <div>Hello "/_layout/common/pop-user-search-check"!</div>;
}
