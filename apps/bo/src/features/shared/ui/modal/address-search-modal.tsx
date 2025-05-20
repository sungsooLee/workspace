import React, { FC, memo, useState, useEffect } from 'react';
import { cn } from '@learnway/shared';
import { t } from 'i18next';
import {
  ModalBody,
  ModalContainer,
  ModalTitle,
  ContentsRow,
  Input,
  Button,
  Pagination,
  useModal,
} from '@learnway/ui';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './address-search-modal.module.css';

// 페이지별 게시 수
const PAGE_SIZE = 3;
// 행안부 API가 허용하는 최대 조회 건수
const MAX_TOTAL_ROWS = 9000;
// SQL 예약어 필터링
const RESERVED_WORD_SQL = [
  'OR',
  'SELECT',
  'INSERT',
  'DELETE',
  'UPDATE',
  'CREATE',
  'DROP',
  'EXEC',
  'UNION',
  'FETCH',
  'DECLARE',
  'TRUNCATE',
];

const AddressSearchModalComponent: FC<any> = ({ onSelect }) => {
  const { close } = useModal();

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [errorCode, setErrorCode] = useState('0');

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 0) {
      searchAddress(pageIndex + 1, searchKeyword);
    }
  }, [pageIndex, searchKeyword]);

  const handleOnSearch = async () => {
    if (searchValue.length > 0) {
      if (new RegExp(/[%=><]/).test(searchValue)) setErrorCode('E0013');
      else {
        setSearchKeyword(searchValue);
        setPageIndex(0);
      }
    } else {
      setSearchKeyword('');
      setPageIndex(0);
      setTotalRows(0);
    }
  };

  const removeReservedWords = (input: string) => {
    let replaced = input;
    RESERVED_WORD_SQL.map((word) => {
      const regExp = new RegExp(word, 'gi');
      if (regExp.test(input)) {
        replaced = input.replace(word, '');
      }
    });
    return replaced;
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(removeReservedWords(value).trim());
  };

  const handleInputEnterKeyDown = () => {
    handleOnSearch();
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
    const totalCount =
      data.results.common.totalCount > MAX_TOTAL_ROWS
        ? MAX_TOTAL_ROWS
        : data.results.common.totalCount;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    setErrorCode(data.results.common.errorCode);
    setTotalRows(totalCount);
    setTotalPages(totalPages);
  };

  const handleSelect = (item: any) => {
    onSelect(item);
    close();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value - 1);
  };

  const getError = () => {
    return errorCode !== '0' ? (
      <p className={cn(formStyles.guide_text, formStyles.error)}>
        {t('LABEL.modal.addressSearch.error.' + errorCode.toLowerCase())}
      </p>
    ) : null;
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('LABEL.modal.addressSearch.title')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.address}`}>
          <div className={styles.input_box}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.input_box}>
                  <Input
                    id="searchWord"
                    type="text"
                    placeholder={t('LABEL.modal.addressSearch.placeholder')}
                    value={searchValue}
                    onChange={handleInputChange}
                    onEnterKeyDown={handleInputEnterKeyDown}
                  />
                  <Button variant="primary" size="lg" onClick={handleOnSearch}>
                    {t('LABEL.button.retrieve')}
                  </Button>
                </div>
                {getError()}
              </div>
            </ContentsRow>
          </div>
          {totalRows > 0 ? (
            <div className={styles.address_list}>
              <ul>
                {searchResult.length > 0 &&
                  searchResult.map((item) => (
                    <li key={item.bdMgtSn}>
                      <Button onClick={() => handleSelect(item)}>
                        <p>
                          <strong>{item.roadAddr}</strong>
                          <span className={styles.info_box}>
                            <span>{item.jibunAddr}</span>
                            <span className={styles.info_post}>
                              {t('LABEL.modal.addressSearch.zipCodePrefix')}
                              {item.zipNo}
                            </span>
                          </span>
                        </p>
                        <span>{t('LABEL.button.select')}</span>
                      </Button>
                    </li>
                  ))}
              </ul>
              <Pagination
                className={styles.pagenation}
                count={totalPages}
                page={pageIndex + 1}
                onChange={handlePageChange}
              />
            </div>
          ) : (
            <div className={styles.example_box}>
              <p>{t('LABEL.modal.addressSearch.guideText')}</p>
              <div className={styles.box}>
                <dl>
                  <dt>{t('LABEL.modal.addressSearch.roadAddress')}</dt>
                  <dd>{t('LABEL.modal.addressSearch.sampleRoadAddress')}</dd>
                </dl>
                <dl>
                  <dt>{t('LABEL.modal.addressSearch.jibunAddress')}</dt>
                  <dd>{t('LABEL.modal.addressSearch.sampleJibunAddress')}</dd>
                </dl>
              </div>
            </div>
          )}
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const AddressSearchModal = AddressSearchModalComponent;
