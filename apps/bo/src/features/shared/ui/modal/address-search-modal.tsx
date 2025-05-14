import React, { useEffect, useState, FC } from 'react';
import { t } from 'i18next';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import {
  IcoChevronLeft,
  IcoChevronLeftDouble,
  IcoChevronRight,
  IcoChevronRightDouble,
} from '@/libs/icons/src';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const AddressSearchModalComponent: FC<any> = ({ onSelect }) => {
  const { close } = useModal();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalRows, setTotalRows] = useState(0);

  const PAGE_SIZE = 10;

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 0) {
      searchAddress(pageIndex + 1, searchKeyword);
    }
  }, [pageIndex, searchKeyword]);

  const handleOnSearch = async (data: any) => {
    console.log('data', data);
    if (data.searchString.trim().length > 0) {
      setSearchKeyword(data.searchString.trim());
      setPageIndex(0);
    }
  };

  const searchAddress = async (currentPage: number, keyword: string) => {
    const formData = new FormData();
    formData.append('currentPage', currentPage.toString());
    formData.append('countPerPage', PAGE_SIZE.toString());
    formData.append('resultType', 'json');
    formData.append('confmKey', 'devU01TX0FVVEgyMDI1MDUxNDA5MjA0MzExNTc0NzM=');
    formData.append('keyword', keyword.trim());

    const response = await fetch('/juso-api/addrlink/addrLinkApi.do', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
    }

    const data = await response.json();
    if (data.results.common.errorCode === '0') {
      setSearchResult(data.results.juso);
    } else {
      setSearchResult([]);
    }
    setTotalRows(data.results.common.totalCount);
  };

  const handleSelect = (item: any) => {
    onSelect(item);
    close();
  };

  const onPageChange = (index: number) => {
    setPageIndex(index);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalRows / PAGE_SIZE);
    console.log('### totalPages', totalPages);
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <Button onClick={() => onPageChange(0)} disabled={pageIndex === 0} onlyIcon>
            {<IcoChevronLeftDouble width={32} height={32} fill="#4C515E" />}
          </Button>
          <Button onClick={() => onPageChange(pageIndex - 1)} disabled={pageIndex === 0}>
            {<IcoChevronLeft width={32} height={32} fill="#4C515E" />}
          </Button>

          {/* 페이지 번호들 */}
          <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} onClick={() => onPageChange(i)}>
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            {<IcoChevronRight width={32} height={32} fill="#4C515E" />}
          </Button>
          <Button
            onClick={() => onPageChange(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            {<IcoChevronRightDouble width={32} height={32} fill="#4C515E" />}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ModalContainer>
      <ModalTitle>주소 찾기</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          {searchResult.length > 0 &&
            searchResult.map((item) => (
              <div>
                <div>{item.roadAddr}</div>
                <div>{item.jibunAddr}</div>
                <div>
                  우 {item.zipNo}{' '}
                  <Button
                    variant={'gray'}
                    size={'sm'}
                    style={{ float: 'right' }}
                    onClick={() => handleSelect(item)}
                  >
                    선택
                  </Button>
                </div>
              </div>
            ))}
          {searchResult.length > 0 && renderPagination()}
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const AddressSearchModal = AddressSearchModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'searchString',
        type: 'text',
        label: t('검색어'),
        value: '',
      },
    ],
  ],
  validator: {
    searchString: true,
  },
};
